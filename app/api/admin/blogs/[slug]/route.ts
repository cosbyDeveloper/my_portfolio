import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db/mongoose';
import { Blog } from '@/lib/models';
import { authenticateRequest, createAuthResponse } from '@/lib/middleware/auth';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { user, error } = await authenticateRequest(request);
    if (!user || error) {
      return createAuthResponse(401, error || 'Unauthorized');
    }

    await connectDB();

    const body = await request.json();
    const { title, description, content, tags, image, featured, readTime } = body;

    const blog = await Blog.findOne({ slug });
    if (!blog) {
      return createAuthResponse(404, 'Blog not found');
    }

    // Update fields
    if (title) blog.title = title;
    if (description) blog.description = description;
    if (content) blog.content = content;
    if (tags) blog.tags = tags;
    if (image !== undefined) blog.image = image;
    if (featured !== undefined) blog.featured = featured;
    if (readTime) blog.readTime = readTime;

    await blog.save();

    return createAuthResponse(200, 'Blog updated successfully', blog);
  } catch (error: any) {
    console.error('Error updating blog:', error);
    return createAuthResponse(500, error.message || 'Failed to update blog');
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { user, error } = await authenticateRequest(request);
    if (!user || error) {
      return createAuthResponse(401, error || 'Unauthorized');
    }

    await connectDB();

    const blog = await Blog.findOneAndDelete({ slug });
    if (!blog) {
      return createAuthResponse(404, 'Blog not found');
    }

    return createAuthResponse(200, 'Blog deleted successfully');
  } catch (error: any) {
    console.error('Error deleting blog:', error);
    return createAuthResponse(500, error.message || 'Failed to delete blog');
  }
}
