// components/blog/BlogContent.tsx
'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { BlogPost } from '@/constants/blogs';
import BlogCard from '@/components/blog/BlogCard';
import Pagination from '@/components/shared/Pagination';
import { useRouter, useSearchParams } from 'next/navigation';

interface BlogContentProps {
	filters: { key: string; label: string }[];
	initialFilter: string;
	initialPage: number;
	itemsPerPage: number;
	allBlogs: BlogPost[];
}

const BlogContent = ({
	filters,
	initialFilter,
	initialPage,
	itemsPerPage,
	allBlogs,
}: BlogContentProps) => {
	const router = useRouter();
	const searchParams = useSearchParams();

	// Derive filter and page directly from URL search params (avoid setState in effect)
	const activeFilter =
		(searchParams.get('filter') as string) || initialFilter || 'all';
	const currentPage = (() => {
		const pageStr = searchParams.get('page') || String(initialPage || 1);
		const parsed = parseInt(pageStr, 10);
		return Number.isNaN(parsed) ? 1 : parsed;
	})();

	// Memoize sorted blogs
	const sortedBlogs = useMemo(() => {
		return [...allBlogs].sort((a, b) => {
			const dateA = new Date(a.date).getTime() || 0;
			const dateB = new Date(b.date).getTime() || 0;
			return dateB - dateA;
		});
	}, [allBlogs]);

	// Memoize filtered blogs
	const filteredBlogs = useMemo(() => {
		if (activeFilter === 'all') {
			return sortedBlogs;
		}
		return sortedBlogs.filter((blog) => blog.tags.includes(activeFilter));
	}, [sortedBlogs, activeFilter]);

	// Memoize featured blogs
	const featuredBlogs = useMemo(() => {
		return sortedBlogs.filter((blog) => blog.featured).slice(0, 3);
	}, [sortedBlogs]);

	// Memoize non-featured blogs for pagination
	const nonFeaturedBlogs = useMemo(() => {
		return filteredBlogs.filter(
			(blog) => !featuredBlogs.some((f) => f.slug === blog.slug),
		);
	}, [filteredBlogs, featuredBlogs]);

	// Calculate paginated blogs
	const paginatedBlogs = useMemo(() => {
		const showFeaturedSection = currentPage === 1 && featuredBlogs.length > 0;

		if (currentPage === 1) {
			// Page 1: show featured + remaining posts up to itemsPerPage
			const regularItems =
				itemsPerPage - (showFeaturedSection ? featuredBlogs.length : 0);
			return nonFeaturedBlogs.slice(0, regularItems);
		} else {
			// Page > 1: paginate remaining posts
			const startIndex = Math.max(
				0,
				(currentPage - 2) * itemsPerPage +
					(itemsPerPage - featuredBlogs.length),
			);
			const endIndex = startIndex + itemsPerPage;
			return nonFeaturedBlogs.slice(startIndex, endIndex);
		}
	}, [nonFeaturedBlogs, currentPage, itemsPerPage, featuredBlogs]);

	// Calculate total display items and pages
	const totalDisplayItems = nonFeaturedBlogs.length;
	const totalPages = Math.max(1, Math.ceil(totalDisplayItems / itemsPerPage));
	const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);
	const showFeaturedSection = safeCurrentPage === 1 && featuredBlogs.length > 0;

	// Handle filter change
	const handleFilterChange = (filter: string) => {
		const params = new URLSearchParams(window.location.search);
		if (filter !== 'all') {
			params.set('filter', filter);
		} else {
			params.delete('filter');
		}
		params.set('page', '1');
		router.push(`/blog?${params.toString()}`);
	};

	// Handle page change
	const handlePageChange = (page: number) => {
		const params = new URLSearchParams(window.location.search);

		// Keep existing filter if any
		if (activeFilter !== 'all') {
			params.set('filter', activeFilter);
		} else {
			params.delete('filter');
		}

		// Update page
		params.set('page', page.toString());

		router.push(`/blog?${params.toString()}`);
	};

	return (
		<main className='min-h-screen'>
			{/* Hero Section */}
			<section className='relative pt-16 lg:pt-24 pb-12 lg:pb-16 px-6 lg:px-12'>
				<div className='max-w-6xl mx-auto'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className='text-center max-w-3xl mx-auto mb-12'>
						<h1 className='text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6'>
							My <span className='text-primary'>Blog</span>
						</h1>
						<p className='text-xl text-muted-foreground'>
							Thoughts, tutorials, and insights on software development, AI,
							career growth, and technology trends.
						</p>
					</motion.div>

					{/* Filter Tabs */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2, duration: 0.6 }}
						className='mb-12'>
						<div className='flex flex-wrap gap-3 justify-center'>
							{filters.map((filter) => (
								<button
									key={filter.key}
									onClick={() => handleFilterChange(filter.key)}
									className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
										activeFilter === filter.key
											? 'bg-primary text-primary-foreground'
											: 'bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground'
									}`}>
									{filter.label}
								</button>
							))}
						</div>
					</motion.div>

					{/* Blogs Count */}
					<div className='mb-8 text-center'>
						<p className='text-muted-foreground'>
							{filteredBlogs.length} article
							{filteredBlogs.length !== 1 ? 's' : ''}
							{activeFilter !== 'all' && ` tagged with "${activeFilter}"`}
						</p>
					</div>
				</div>
			</section>

			{/* Blogs Section */}
			<section className='pb-16 lg:pb-24 px-6 lg:px-12'>
				<div className='max-w-6xl mx-auto'>
					{filteredBlogs.length === 0 ? (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							className='rounded-2xl border border-default p-12 text-center'>
							<h3 className='text-xl font-semibold mb-4'>No articles found</h3>
							<p className='text-muted-foreground mb-6'>
								{`No blog posts match "${activeFilter}". Try another filter.`}
							</p>
							<button
								onClick={() => handleFilterChange('all')}
								className='px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition'>
								Show All Articles
							</button>
						</motion.div>
					) : (
						<>
							{/* Featured Section */}
							{showFeaturedSection && featuredBlogs.length > 0 && (
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									className='mb-16'>
									<div className='flex items-center justify-between mb-8'>
										<h2 className='text-2xl md:text-3xl font-bold'>
											Featured <span className='text-primary'>Articles</span>
										</h2>
										<div className='hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium'>
											<span className='text-yellow-500'>★</span>
											<span>Top Picks</span>
										</div>
									</div>
									<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
										{featuredBlogs.map((post, index) => (
											<div key={post.slug} className='relative'>
												<div className='absolute top-4 right-4 z-10'>
													<span className='px-3 py-1 rounded-full bg-primary/90 text-white text-xs font-medium flex items-center gap-1'>
														<span className='text-yellow-300'>★</span>
														Featured
													</span>
												</div>
												<BlogCard
													post={post}
													index={index}
													layout='grid'
													showMeta={true}
													showTags={true}
													className='h-full'
												/>
											</div>
										))}
									</div>
								</motion.div>
							)}

							{/* All Posts Section Header */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								className='mb-8'>
								<h2 className='text-2xl font-semibold'>
									{safeCurrentPage === 1 && showFeaturedSection
										? 'More Articles'
										: `Page ${safeCurrentPage}`}
								</h2>
								{safeCurrentPage === 1 && showFeaturedSection && (
									<p className='text-muted-foreground mt-2'>
										Browse all articles below. Featured articles are highlighted
										above.
									</p>
								)}
							</motion.div>

							{/* Blog Grid */}
							{paginatedBlogs.length === 0 ? (
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									className='rounded-2xl border border-default p-12 text-center'>
									<h3 className='text-xl font-semibold mb-4'>
										No more articles on this page
									</h3>
									<button
										onClick={() => handlePageChange(1)}
										className='px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition'>
										Go to First Page
									</button>
								</motion.div>
							) : (
								<>
									<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
										{paginatedBlogs.map((post, index) => (
											<BlogCard
												key={post.slug}
												post={post}
												index={index}
												layout='grid'
												showMeta={true}
												showTags={true}
											/>
										))}
									</div>

									{/* Pagination */}
									{totalDisplayItems > itemsPerPage && (
										<motion.div
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											className='mt-12'>
											<Pagination
												totalItems={totalDisplayItems}
												itemsPerPage={itemsPerPage}
												currentPage={safeCurrentPage}
												onPageChange={handlePageChange}
												showCount={true}
											/>
										</motion.div>
									)}
								</>
							)}

							{/* Newsletter CTA */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								className='mt-16 pt-8 border-t border-default'>
								<div className='text-center'>
									<h3 className='text-2xl font-semibold mb-4'>Stay Updated</h3>
									<p className='text-muted-foreground mb-8 max-w-2xl mx-auto'>
										Subscribe to get notified when I publish new articles about
										software development, AI, and career growth.
									</p>
									<form
										onSubmit={(e) => e.preventDefault()}
										className='flex flex-col sm:flex-row gap-3 max-w-md mx-auto'>
										<input
											type='email'
											placeholder='Your email address'
											required
											className='flex-1 px-4 py-3 rounded-xl border border-default bg-background focus:outline-none focus:ring-2 focus:ring-primary/50'
										/>
										<button
											type='submit'
											className='px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition'>
											Subscribe
										</button>
									</form>
									<p className='mt-4 text-sm text-muted-foreground'>
										No spam, unsubscribe at any time.
									</p>
								</div>
							</motion.div>
						</>
					)}
				</div>
			</section>
		</main>
	);
};

export default BlogContent;
