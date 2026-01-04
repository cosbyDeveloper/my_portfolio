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

	// Get all unique tags
	const allTags = Array.from(
		new Set(blogs.flatMap((blog) => blog.tags)),
	).sort();

	// Filter options
	const filters = [
		{ key: 'all', label: 'All Posts' },
		...allTags.map((tag) => ({ key: tag, label: tag })),
	];

	// Get featured blogs (3 latest featured)
	const featuredBlogs = blogs
		.filter((blog) => blog.featured)
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
		.slice(0, 3);

	// Filter blogs based on active filter
	const filteredBlogs =
		filter === 'all'
			? blogs
			: blogs.filter((blog) => blog.tags.includes(filter));

	// Sort all filtered blogs by date (newest first)
	const sortedBlogs = [...filteredBlogs].sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
	);

	// For page 1: show featured + 6 regular posts (total 9)
	// For other pages: show 9 regular posts
	let paginatedBlogs: typeof blogs = [];
	let totalDisplayItems = sortedBlogs.length;
	let showFeaturedSection = false;

	if (page === 1) {
		// Remove featured blogs from regular list for page 1
		const nonFeaturedBlogs = sortedBlogs.filter(
			(blog) => !featuredBlogs.some((featured) => featured.slug === blog.slug),
		);

		showFeaturedSection = featuredBlogs.length > 0;

		// On page 1, show featured + remaining regular posts
		if (showFeaturedSection) {
			// For regular posts on page 1, show itemsPerPage - featuredBlogs.length
			const regularItemsPerPage = itemsPerPage - featuredBlogs.length;
			const startIndex = 0;
			const endIndex = Math.min(
				startIndex + regularItemsPerPage,
				nonFeaturedBlogs.length,
			);
			paginatedBlogs = nonFeaturedBlogs.slice(startIndex, endIndex);
		} else {
			// No featured blogs, just paginate normally
			const startIndex = (page - 1) * itemsPerPage;
			const endIndex = Math.min(startIndex + itemsPerPage, totalDisplayItems);
			paginatedBlogs = sortedBlogs.slice(startIndex, endIndex);
		}
	} else {
		// For page > 1, remove featured from total count and paginate normally
		const blogsWithoutFeatured = sortedBlogs.filter(
			(blog) => !featuredBlogs.some((featured) => featured.slug === blog.slug),
		);

		const startIndex =
			(page - 2) * itemsPerPage + (itemsPerPage - featuredBlogs.length);
		const endIndex = Math.min(
			startIndex + itemsPerPage,
			blogsWithoutFeatured.length,
		);
		paginatedBlogs = blogsWithoutFeatured.slice(startIndex, endIndex);
		totalDisplayItems = blogsWithoutFeatured.length;
	}

	// Calculate current page safely
	const totalPages = Math.max(1, Math.ceil(totalDisplayItems / itemsPerPage));
	const currentPage = Math.min(Math.max(1, page), totalPages);

	return (
		<BlogContent
			filters={filters}
			activeFilter={filter}
			featuredBlogs={featuredBlogs}
			sortedBlogs={sortedBlogs}
			paginatedBlogs={paginatedBlogs}
			currentPage={currentPage}
			itemsPerPage={itemsPerPage}
			totalDisplayItems={totalDisplayItems}
			showFeaturedSection={showFeaturedSection && page === 1}
		/>
	);
};

export default BlogPage;
