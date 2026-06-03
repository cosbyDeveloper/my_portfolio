import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db/mongoose';
import { authenticateRequest } from '@/lib/middleware/auth';
import Project from '@/lib/models/Project';

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

    const [total, featured] = await Promise.all([
      Project.countDocuments(),
      Project.countDocuments({ featured: true }),
    ]);

    return new Response(
      JSON.stringify({
        count: total,
        featured,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Projects stats error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch project stats' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
