import { blogs } from '@/constants/blogs';
import BlogContent from '@/components/blog/BlogContent';

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

    // Get all unique tags for filters
    const allTags = Array.from(
        new Set(blogs.flatMap((blog) => blog.tags)),
    ).sort();

    // Filter options
    const filters = [
        { key: 'all', label: 'All Posts' },
        ...allTags.map((tag) => ({ key: tag, label: tag })),
    ];

    return (
        <BlogContent
            filters={filters}
            initialFilter={filter}
            initialPage={page}
            itemsPerPage={itemsPerPage}
            allBlogs={blogs}
        />
    );
};

export default BlogPage;