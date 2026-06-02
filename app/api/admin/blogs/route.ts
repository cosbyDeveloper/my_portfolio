import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db/mongoose';
import { Blog } from '@/lib/models';
import { authenticateRequest, createAuthResponse } from '@/lib/middleware/auth';

export async function POST(request: NextRequest) {
  try {
    const { user, error } = await authenticateRequest(request);
    if (!user || error) {
      return createAuthResponse(401, error || 'Unauthorized');
    }

    await connectDB();

    const body = await request.json();
    const { title, slug, description, content, tags, image, featured, readTime } = body;

    if (!title || !slug || !description || !content || readTime === undefined) {
      return createAuthResponse(400, 'Missing required fields');
    }

    // Check if slug already exists
    const existingBlog = await Blog.findOne({ slug });
    if (existingBlog) {
      return createAuthResponse(409, 'Blog with this slug already exists');
    }

    const blog = new Blog({
      title,
      slug,
      description,
      content,
      tags: tags || [],
      image,
      featured: featured || false,
      readTime,
    });

    await blog.save();

    return createAuthResponse(201, 'Blog created successfully', blog);
  } catch (error: any) {
    console.error('Error creating blog:', error);
    return createAuthResponse(500, error.message || 'Failed to create blog');
  }
}

export async function GET(request: NextRequest) {
  try {
    const { user, error } = await authenticateRequest(request);
    if (!user || error) {
      return createAuthResponse(401, error || 'Unauthorized');
    }

    await connectDB();

    const blogs = await Blog.find().sort({ createdAt: -1 });

    return createAuthResponse(200, 'Blogs fetched successfully', blogs);
  } catch (error: any) {
    console.error('Error fetching blogs:', error);
    return createAuthResponse(500, error.message || 'Failed to fetch blogs');
  }
}
