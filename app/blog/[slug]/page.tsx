// app/blog/[slug]/page.tsx (Server Component)
import { notFound } from 'next/navigation';
import { blogsApi } from '@/lib/api/client';
import BlogDetailsContent from '@/components/blog/BlogDetailsContent';

interface PageProps {
params: Promise<{
slug: string;
}>;
}

export default async function BlogDetails({ params }: PageProps) {
const { slug } = await params;
const blog = await blogsApi.getBySlug(slug);

if (!blog) {
notFound();
}

return <BlogDetailsContent blog={blog} />;
}
