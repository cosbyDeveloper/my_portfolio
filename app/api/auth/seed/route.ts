import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/mongoose';
import { User } from '@/lib/models';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    // Get credentials from request body or env
    const body = await request.json().catch(() => ({}));
    const email = body.email || process.env.ADMIN_EMAIL;
    const password = body.password || process.env.ADMIN_PASSWORD;
    const name = body.name || process.env.ADMIN_NAME || 'Admin';

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing ADMIN_EMAIL and ADMIN_PASSWORD',
        },
        { status: 400 }
      );
    }

    // Check if any admin exists
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      return NextResponse.json(
        {
          success: false,
          error: 'Admin user already exists',
          email: existingAdmin.email,
        },
        { status: 409 }
      );
    }

    // Create admin user
    const user = new User({
      name,
      email,
      password,
      role: 'admin',
    });

    await user.save();

    return NextResponse.json(
      {
        success: true,
        message: 'Admin user created successfully',
        data: {
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Seed error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to seed admin',
      },
      { status: 500 }
    );
  }
}
