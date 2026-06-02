import BlogContent from '@/components/blog/BlogContent';
import { blogsApi } from '@/lib/api/client';

interface BlogPageProps {
	searchParams?: {
		filter?: string;
		page?: string;
	};
}

const BlogPage = async ({ searchParams }: BlogPageProps) => {
	// searchParams can be a Promise in Next.js app router — unwrap it
	const resolvedSearchParams = (((await (searchParams as unknown)) as {
		filter?: string;
		page?: string;
	}) ?? {});
	const paramFilter = resolvedSearchParams.filter ?? 'all';
	const pageFilter = resolvedSearchParams.page ?? '1';

	const filter = paramFilter;
	const page = parseInt(pageFilter, 10);
	const itemsPerPage = 9;

	// Fetch data through API layer
	const filters = await blogsApi.getTags();
	const allBlogs = await blogsApi.listAll();

	return (
		<BlogContent
			filters={filters}
			initialFilter={filter}
			initialPage={page}
			itemsPerPage={itemsPerPage}
			allBlogs={allBlogs}
		/>
	);
};

export default BlogPage;