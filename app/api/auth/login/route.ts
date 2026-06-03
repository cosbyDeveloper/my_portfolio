import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/mongoose';
import { User } from '@/lib/models';
import { signToken } from '@/lib/auth/jwt';

export async function POST(request: NextRequest) {
	try {
		await connectDB();

		const body = await request.json();
		const { email, password } = body;

		// Validation
		if (!email || !password) {
			return NextResponse.json(
				{
					success: false,
					error: 'Email and password are required',
				},
				{ status: 400 },
			);
		}

		// Find user
		const user = await User.findOne({ email }).select('+password');
		if (!user) {
			return NextResponse.json(
				{
					success: false,
					error: 'Invalid email or password',
				},
				{ status: 401 },
			);
		}

		// Check password
		const isPasswordValid = await user.comparePassword(password);
		if (!isPasswordValid) {
			return NextResponse.json(
				{
					success: false,
					error: 'Invalid email or password',
				},
				{ status: 401 },
			);
		}

		// Check if user is active
		if (!user.isActive) {
			return NextResponse.json(
				{
					success: false,
					error: 'User account is inactive',
				},
				{ status: 403 },
			);
		}

		// Generate token
		const token = signToken({
			userId: user._id.toString(),
			name: user.name,
			email: user.email,
			role: user.role,
		});

		const response = NextResponse.json(
			{
				success: true,
				message: 'Login successful',
				data: {
					user: {
						id: user._id,
						email: user.email,
						name: user.name,
						role: user.role,
					},
					token,
				},
			},
			{ status: 200 },
		);

		// Set httpOnly cookie
		response.cookies.set('authToken', token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			path: '/',
			maxAge: 7 * 24 * 60 * 60,
		});

		return response;
	} catch (error: any) {
		console.error('Error logging in:', error);
		return NextResponse.json(
			{
				success: false,
				error: error.message || 'Login failed',
			},
			{ status: 500 },
		);
	}
}
