// app/portfolio/page.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import { projects } from '@/constants/projects';
import PortfolioContent from '@/components/portfolio/PortfolioContent';

const PortfolioPage = () => {
	const searchParams = useSearchParams();

	const category = searchParams.get('category') || 'all';
	const page = parseInt(searchParams.get('page') || '1', 10);
	const itemsPerPage = 9;

	// Get unique categories
	const categories = [
		{ key: 'all', label: 'All Projects' },
		...Array.from(new Set(projects.map((project) => project.category.key))).map(
			(key) => {
				const project = projects.find((p) => p.category.key === key);
				return { key, label: project?.category.label || key };
			},
		),
	];

	// Filter projects based on category
	const filteredProjects = projects.filter(
		(project) => category === 'all' || project.category.key === category,
	);

	// Calculate pagination
	const totalPages = Math.max(
		1,
		Math.ceil(filteredProjects.length / itemsPerPage),
	);
	const currentPage = Math.min(Math.max(1, page), totalPages);

	// Paginate projects
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = Math.min(startIndex + itemsPerPage, filteredProjects.length);
	const paginatedProjects = filteredProjects.slice(startIndex, endIndex);

	return (
		<PortfolioContent
			categories={categories}
			activeCategory={category}
			filteredProjects={filteredProjects}
			paginatedProjects={paginatedProjects}
			currentPage={currentPage}
			itemsPerPage={itemsPerPage}
		/>
	);
};

export default PortfolioPage;
