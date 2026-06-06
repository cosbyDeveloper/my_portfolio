import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db/mongoose';
import { Message } from '@/lib/models';
import { authenticateRequest, createAuthResponse } from '@/lib/middleware/auth';

export async function GET(request: NextRequest) {
	try {
		const { user, error } = await authenticateRequest(request);
		if (!user || error) return createAuthResponse(401, error || 'Unauthorized');

		await connectDB();

		const stats = await Message.getStats();

		return createAuthResponse(200, 'Stats fetched successfully', stats);
	} catch (error: any) {
		console.error('Messages stats error:', error);
		return createAuthResponse(
			500,
			error.message || 'Failed to fetch message stats',
		);
	}
}
