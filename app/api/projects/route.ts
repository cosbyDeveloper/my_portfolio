import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db/mongoose';
import { Project } from '@/lib/models';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const featured = searchParams.get('featured');

    let query: any = {};

    if (featured === 'true') {
      query.featured = true;
    }

    const projects = await Project.find(query).sort({ createdAt: -1 });

    return Response.json(
      {
        success: true,
        data: projects,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching projects:', error);
    return Response.json(
      {
        success: false,
        error: 'Failed to fetch projects',
      },
      { status: 500 }
    );
  }
}
