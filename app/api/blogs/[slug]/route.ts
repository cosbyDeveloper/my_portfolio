import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db/mongoose';
import { Blog } from '@/lib/models';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    await connectDB();

    const blog = await Blog.findOne({ slug });

    if (!blog) {
      return Response.json(
        {
          success: false,
          error: 'Blog not found',
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        data: blog,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching blog:', error);
    return Response.json(
      {
        success: false,
        error: 'Failed to fetch blog',
      },
      { status: 500 }
    );
  }
}
