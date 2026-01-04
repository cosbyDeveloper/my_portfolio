// app/blog/page.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import { blogs } from '@/constants/blogs';
import BlogContent from '@/components/blog/BlogContent';

const BlogPage = () => {
	const searchParams = useSearchParams();

	const filter = searchParams.get('filter') || 'all';
	const page = parseInt(searchParams.get('page') || '1', 10);
	const itemsPerPage = 9;

	// Validate blog dates and sort newest first
	const sortedBlogs = [...blogs].sort((a, b) => {
		const dateA = new Date(a.date).getTime() || 0;
		const dateB = new Date(b.date).getTime() || 0;
		return dateB - dateA;
	});

	// Get all unique tags for filtering
	const allTags = Array.from(
		new Set(blogs.flatMap((blog) => blog.tags)),
	).sort();

	// Filter options
	const filters = [
		{ key: 'all', label: 'All Posts' },
		...allTags.map((tag) => ({ key: tag, label: tag })),
	];

	// Featured blogs: 3 latest featured
	const featuredBlogs = sortedBlogs.filter((blog) => blog.featured).slice(0, 3);

	// Filter blogs based on active filter
	const filteredBlogs =
		filter === 'all'
			? sortedBlogs
			: sortedBlogs.filter((blog) => blog.tags.includes(filter));

	// Non-featured blogs for pagination
	const nonFeaturedBlogs = filteredBlogs.filter(
		(blog) => !featuredBlogs.some((f) => f.slug === blog.slug),
	);

	// Pagination logic
	let paginatedBlogs = [];
	const showFeaturedSection = page === 1 && featuredBlogs.length > 0;

	if (page === 1) {
		// Page 1: show featured + remaining posts up to itemsPerPage
		const regularItems =
			itemsPerPage - (showFeaturedSection ? featuredBlogs.length : 0);
		paginatedBlogs = nonFeaturedBlogs.slice(0, regularItems);
	} else {
		// Page > 1: paginate remaining posts
		const startIndex = Math.max(
			0,
			(page - 2) * itemsPerPage + (itemsPerPage - featuredBlogs.length),
		);
		const endIndex = startIndex + itemsPerPage;
		paginatedBlogs = nonFeaturedBlogs.slice(startIndex, endIndex);
	}

	// Total display items for pagination
	const totalDisplayItems = nonFeaturedBlogs.length;
	const totalPages = Math.max(1, Math.ceil(totalDisplayItems / itemsPerPage));
	const currentPage = Math.min(Math.max(1, page), totalPages);

	return (
		<BlogContent
			filters={filters}
			activeFilter={filter}
			featuredBlogs={featuredBlogs}
			sortedBlogs={filteredBlogs}
			paginatedBlogs={paginatedBlogs}
			currentPage={currentPage}
			itemsPerPage={itemsPerPage}
			totalDisplayItems={totalDisplayItems}
			showFeaturedSection={showFeaturedSection}
		/>
	);
};

export default BlogPage;
