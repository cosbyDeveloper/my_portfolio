import { connectDB } from '@/lib/db/mongoose';
import { Blog as BlogModel } from '@/lib/models';
import { BlogPost, FilterOption } from '@/lib/types';

function serializeBlogs(blogs: unknown): BlogPost[] {
	return JSON.parse(JSON.stringify(blogs)) as BlogPost[];
}

function serializeBlog(blog: unknown): BlogPost | null {
	if (!blog) return null;
	return JSON.parse(JSON.stringify(blog)) as BlogPost;
}

export async function getPublishedBlogs(): Promise<BlogPost[]> {
	await connectDB();
	const blogs = await BlogModel.find({ published: true })
		.sort({ date: -1, createdAt: -1 })
		.lean();
	return serializeBlogs(blogs);
}

export async function getPublishedBlogBySlug(
	slug: string,
): Promise<BlogPost | null> {
	await connectDB();
	const blog = await BlogModel.findOne({ slug, published: true }).lean();
	return serializeBlog(blog);
}

export async function getBlogTagFilters(): Promise<FilterOption[]> {
	const blogs = await getPublishedBlogs();
	const uniqueTags = Array.from(new Set(blogs.flatMap((blog) => blog.tags)))
		.filter(Boolean)
		.sort();

	return [
		{ key: 'all', label: 'All Posts' },
		...uniqueTags.map((tag) => ({
			key: tag,
			label: tag,
		})),
	];
}
