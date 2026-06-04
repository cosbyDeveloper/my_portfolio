import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db/mongoose';
import { Blog } from '@/lib/models';

type BlogListQuery = {
  published: boolean;
  tags?: { $in: string[] };
  featured?: boolean;
};

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const tag = searchParams.get('tag');
    const featured = searchParams.get('featured');

    const query: BlogListQuery = { published: true };

    if (tag) {
      query.tags = { $in: [tag] };
    }

    if (featured === 'true') {
      query.featured = true;
    }

    const blogs = await Blog.find(query).sort({ date: -1, createdAt: -1 });

    return Response.json(
      {
        success: true,
        data: blogs,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return Response.json(
      {
        success: false,
        error: 'Failed to fetch blogs',
      },
      { status: 500 }
    );
  }
}
