import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db/mongoose';
import { authenticateRequest } from '@/lib/middleware/auth';
import Blog from '@/lib/models/Blog';

export async function GET(request: NextRequest) {
  try {
    const auth = await authenticateRequest(request);
    if (!auth.user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await connectDB();

    const total = await Blog.countDocuments();

    return new Response(
      JSON.stringify({
        count: total,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Blogs stats error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch blog stats' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
