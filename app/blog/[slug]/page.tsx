// app/blog/[slug]/page.tsx (Server Component)
import { notFound } from 'next/navigation';
import BlogDetailsContent from '@/components/blog/BlogDetailsContent';
import { getPublishedBlogBySlug } from '@/lib/data/blogs';

interface PageProps {
params: Promise<{
slug: string;
}>;
}

export default async function BlogDetails({ params }: PageProps) {
const { slug } = await params;
const blog = await getPublishedBlogBySlug(slug);

if (!blog) {
notFound();
}

return <BlogDetailsContent blog={blog} />;
}
