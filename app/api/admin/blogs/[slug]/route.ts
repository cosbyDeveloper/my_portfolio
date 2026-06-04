import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db/mongoose';
import { Blog } from '@/lib/models';
import { authenticateRequest, createAuthResponse } from '@/lib/middleware/auth';

type BlogRequestBody = {
  slug?: string;
  title?: string;
  excerpt?: string;
  description?: string;
  content?: string;
  htmlContent?: string;
  jsonContent?: unknown;
  date?: string;
  tags?: string[];
  featured?: boolean;
  image?: string;
  author?: string;
  readTime?: string;
  metaDescription?: string;
  category?: string;
  published?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  updatedAt?: string;
};

function cleanString(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function normalizeBlogUpdates(body: BlogRequestBody) {
  const updates: Partial<BlogRequestBody> = {};

  if (body.slug !== undefined) updates.slug = cleanString(body.slug).toLowerCase();
  if (body.title !== undefined) updates.title = cleanString(body.title);
  if (body.excerpt !== undefined || body.description !== undefined) {
    updates.excerpt = cleanString(body.excerpt) || cleanString(body.description);
  }
  if (body.content !== undefined || body.htmlContent !== undefined) {
    updates.content = cleanString(body.content) || cleanString(body.htmlContent);
  }
  if (body.htmlContent !== undefined) updates.htmlContent = cleanString(body.htmlContent);
  if (body.jsonContent !== undefined) updates.jsonContent = body.jsonContent;
  if (body.date !== undefined) updates.date = cleanString(body.date);
  if (body.tags !== undefined) {
    updates.tags = Array.isArray(body.tags)
      ? body.tags.map((tag) => cleanString(tag)).filter(Boolean)
      : [];
  }
  if (body.image !== undefined) updates.image = cleanString(body.image);
  if (body.featured !== undefined) updates.featured = body.featured;
  if (body.author !== undefined) updates.author = cleanString(body.author);
  if (body.readTime !== undefined) updates.readTime = cleanString(body.readTime);
  if (body.metaDescription !== undefined) {
    updates.metaDescription = cleanString(body.metaDescription);
  }
  if (body.category !== undefined) updates.category = cleanString(body.category);
  if (body.published !== undefined) updates.published = body.published;
  if (body.seoTitle !== undefined) updates.seoTitle = cleanString(body.seoTitle);
  if (body.seoDescription !== undefined) {
    updates.seoDescription = cleanString(body.seoDescription);
  }
  if (body.updatedAt !== undefined) updates.updatedAt = cleanString(body.updatedAt);

  return updates;
}

export async function GET(
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

    const blog = await Blog.findOne({ slug });
    if (!blog) {
      return createAuthResponse(404, 'Blog not found');
    }

    return createAuthResponse(200, 'Blog fetched successfully', blog);
  } catch (error: unknown) {
    console.error('Error fetching blog:', error);
    const message = error instanceof Error ? error.message : 'Failed to fetch blog';
    return createAuthResponse(500, message);
  }
}

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

    const updates = normalizeBlogUpdates((await request.json()) as BlogRequestBody);

    const blog = await Blog.findOne({ slug });
    if (!blog) {
      return createAuthResponse(404, 'Blog not found');
    }

    Object.assign(blog, updates);

    await blog.save();

    return createAuthResponse(200, 'Blog updated successfully', blog);
  } catch (error: unknown) {
    console.error('Error updating blog:', error);
    const message = error instanceof Error ? error.message : 'Failed to update blog';
    return createAuthResponse(500, message);
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
  } catch (error: unknown) {
    console.error('Error deleting blog:', error);
    const message = error instanceof Error ? error.message : 'Failed to delete blog';
    return createAuthResponse(500, message);
  }
}
