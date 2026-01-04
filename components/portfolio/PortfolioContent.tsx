// components/portfolio/PortfolioContent.tsx
'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import ProjectCard from '@/components/portfolio/ProjectCard';
import Pagination from '@/components/shared/Pagination';
import { Project } from '@/constants/projects';

interface PortfolioContentProps {
	categories: { key: string; label: string }[];
	initialCategory: string;
	initialPage: number;
	itemsPerPage: number;
	allProjects: Project[];
}

const PortfolioContent = ({
	categories,
	initialCategory,
	initialPage,
	itemsPerPage,
	allProjects,
}: PortfolioContentProps) => {
	const router = useRouter();
	const searchParams = useSearchParams();

	// Derive category and page directly from URL search params
	const activeCategory =
		(searchParams.get('category') as string) || initialCategory || 'all';
	const currentPage = (() => {
		const pageStr = searchParams.get('page') || String(initialPage || 1);
		const parsed = parseInt(pageStr, 10);
		return Number.isNaN(parsed) ? 1 : parsed;
	})();

	// Memoize filtered projects
	const filteredProjects = useMemo(() => {
		return allProjects.filter(
			(project) =>
				activeCategory === 'all' || project.category.key === activeCategory,
		);
	}, [allProjects, activeCategory]);

	// Calculate pagination
	const totalPages = Math.max(
		1,
		Math.ceil(filteredProjects.length / itemsPerPage),
	);
	const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

	// Paginate projects
	const paginatedProjects = useMemo(() => {
		const startIndex = (safeCurrentPage - 1) * itemsPerPage;
		const endIndex = Math.min(
			startIndex + itemsPerPage,
			filteredProjects.length,
		);
		return filteredProjects.slice(startIndex, endIndex);
	}, [filteredProjects, safeCurrentPage, itemsPerPage]);

	// Handle category change
	const handleCategoryChange = (category: string) => {
		const params = new URLSearchParams(window.location.search);
		if (category !== 'all') {
			params.set('category', category);
		} else {
			params.delete('category');
		}
		params.set('page', '1');
		router.push(`/portfolio?${params.toString()}`);
	};

	// Handle page change
	const handlePageChange = (page: number) => {
		const params = new URLSearchParams(window.location.search);

		// Keep existing category if any
		if (activeCategory !== 'all') {
			params.set('category', activeCategory);
		} else {
			params.delete('category');
		}

		// Update page
		params.set('page', page.toString());

		router.push(`/portfolio?${params.toString()}`);
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
							My <span className='text-primary'>Portfolio</span>
						</h1>
						<p className='text-xl text-muted-foreground'>
							A comprehensive collection of my work across various domains,
							technologies, and project types.
						</p>
					</motion.div>

					{/* Category Filters */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2, duration: 0.6 }}
						className='mb-12'>
						<div className='flex flex-wrap gap-3 justify-center'>
							{categories.map((category) => (
								<button
									key={category.key}
									onClick={() => handleCategoryChange(category.key)}
									className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
										activeCategory === category.key
											? 'bg-primary text-primary-foreground'
											: 'bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground'
									}`}>
									{category.label}
								</button>
							))}
						</div>
					</motion.div>

					{/* Projects Count */}
					<div className='mb-8 text-center'>
						<p className='text-muted-foreground'>
							{filteredProjects.length} project
							{filteredProjects.length !== 1 ? 's' : ''}
							{activeCategory !== 'all' && ` in "${activeCategory}"`}
						</p>
					</div>
				</div>
			</section>

			{/* Projects Section */}
			<section className='pb-16 lg:pb-24 px-6 lg:px-12'>
				<div className='max-w-6xl mx-auto'>
					{filteredProjects.length === 0 ? (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							className='rounded-2xl border border-default p-12 text-center'>
							<h3 className='text-xl font-semibold mb-4'>No projects found</h3>
							<p className='text-muted-foreground mb-6'>
								No projects match the selected category. Try another filter or
								check back soon for new additions.
							</p>
							<button
								onClick={() => handleCategoryChange('all')}
								className='px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition'>
								Show All Projects
							</button>
						</motion.div>
					) : (
						<>
							{/* Grid View */}
							<div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
								{paginatedProjects.map((project, index) => (
									<ProjectCard
										key={project.slug}
										project={project}
										index={index}
										layout='grid'
										showCategory={true}
										showSummary={true}
										showTechStack={true}
										showLinks={true}
									/>
								))}
							</div>

							{/* Pagination */}
							{filteredProjects.length > itemsPerPage && (
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									className='mt-12'>
									<Pagination
										totalItems={filteredProjects.length}
										itemsPerPage={itemsPerPage}
										currentPage={safeCurrentPage}
										onPageChange={handlePageChange}
										showCount={true}
									/>
								</motion.div>
							)}

							{/* Contact CTA */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								className='mt-16 pt-8 border-t border-default'>
								<div className='text-center'>
									<h3 className='text-2xl font-semibold mb-4'>
										Interested in collaborating?
									</h3>
									<p className='text-muted-foreground mb-8 max-w-2xl mx-auto'>
										Have a project in mind or want to discuss how we can work
										together? I&apos;m always open to interesting opportunities
										and challenging problems.
									</p>
									<div className='flex flex-col sm:flex-row gap-4 justify-center'>
										<Link
											href='/contact'
											className='px-8 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition'>
											Get in Touch
										</Link>
										<Link
											href='/resume'
											className='px-8 py-3 rounded-xl border border-default hover:bg-muted/50 transition'>
											View My Resume
										</Link>
									</div>
								</div>
							</motion.div>
						</>
					)}
				</div>
			</section>
		</main>
	);
};

export default PortfolioContent;
