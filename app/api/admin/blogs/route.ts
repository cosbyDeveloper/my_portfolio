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

function normalizeBlogPayload(body: BlogRequestBody) {
  const htmlContent = cleanString(body.htmlContent);
  const content = cleanString(body.content) || htmlContent;
  const excerpt = cleanString(body.excerpt) || cleanString(body.description);

  return {
    slug: cleanString(body.slug).toLowerCase(),
    title: cleanString(body.title),
    excerpt,
    content,
    htmlContent,
    jsonContent: body.jsonContent,
    date: cleanString(body.date),
    tags: Array.isArray(body.tags)
      ? body.tags.map((tag) => cleanString(tag)).filter(Boolean)
      : [],
    image: cleanString(body.image),
    featured: body.featured ?? false,
    author: cleanString(body.author),
    readTime: cleanString(body.readTime),
    metaDescription: cleanString(body.metaDescription),
    category: cleanString(body.category),
    published: body.published ?? true,
    seoTitle: cleanString(body.seoTitle),
    seoDescription: cleanString(body.seoDescription),
    updatedAt: cleanString(body.updatedAt),
  };
}

export async function POST(request: NextRequest) {
  try {
    const { user, error } = await authenticateRequest(request);
    if (!user || error) {
      return createAuthResponse(401, error || 'Unauthorized');
    }

    await connectDB();

    const payload = normalizeBlogPayload((await request.json()) as BlogRequestBody);
    const missingFields = [
      'slug',
      'title',
      'excerpt',
      'content',
      'date',
      'author',
      'readTime',
    ].filter((field) => !payload[field as keyof typeof payload]);

    if (missingFields.length > 0) {
      return createAuthResponse(
        400,
        `Missing required fields: ${missingFields.join(', ')}`
      );
    }

    // Check if slug already exists
    const existingBlog = await Blog.findOne({ slug: payload.slug });
    if (existingBlog) {
      return createAuthResponse(409, 'Blog with this slug already exists');
    }

    const blog = new Blog(payload);

    await blog.save();

    return createAuthResponse(201, 'Blog created successfully', blog);
  } catch (error: unknown) {
    console.error('Error creating blog:', error);
    const message = error instanceof Error ? error.message : 'Failed to create blog';
    return createAuthResponse(500, message);
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
  } catch (error: unknown) {
    console.error('Error fetching blogs:', error);
    const message = error instanceof Error ? error.message : 'Failed to fetch blogs';
    return createAuthResponse(500, message);
  }
}
