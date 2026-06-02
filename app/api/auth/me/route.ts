import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db/mongoose';
import { User } from '@/lib/models';
import { authenticateRequest } from '@/lib/middleware/auth';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { user, error } = await authenticateRequest(request);

    if (!user || error) {
      return Response.json(
        {
          success: false,
          error: error || 'Not authenticated',
        },
        { status: 401 }
      );
    }

    // Fetch user from database
    const dbUser = await User.findById(user.userId);

    if (!dbUser) {
      return Response.json(
        {
          success: false,
          error: 'User not found',
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        data: {
          id: dbUser._id,
          email: dbUser.email,
          name: dbUser.name,
          role: dbUser.role,
          isActive: dbUser.isActive,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching user:', error);
    return Response.json(
      {
        success: false,
        error: error.message || 'Failed to fetch user',
      },
      { status: 500 }
    );
  }
}
