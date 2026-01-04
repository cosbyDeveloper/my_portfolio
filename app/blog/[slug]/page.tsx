// app/blog/[slug]/page.tsx (Server Component)
import { notFound } from 'next/navigation';
import { blogs } from '@/constants/blogs';
import BlogDetailsContent from '@/components/blog/BlogDetailsContent';

interface PageProps {
	params: Promise<{
		slug: string;
	}>;
}

export default async function BlogDetails({ params }: PageProps) {
	const { slug } = await params;
	const blog = blogs.find((b) => b.slug === slug);

	if (!blog) {
		notFound();
	}

	return <BlogDetailsContent blog={blog} />;
}
