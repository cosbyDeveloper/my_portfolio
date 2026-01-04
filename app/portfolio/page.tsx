// app/portfolio/page.tsx
import { projects } from '@/constants/projects';
import PortfolioContent from '@/components/portfolio/PortfolioContent';

interface PortfolioPageProps {
	searchParams?: {
		category?: string;
		page?: string;
	};
}

const PortfolioPage = async ({ searchParams }: PortfolioPageProps) => {
	// searchParams can be a Promise in Next.js app router — unwrap it
	const resolvedSearchParams =
		((await (searchParams as unknown)) as {
			category?: string;
			page?: string;
		}) ?? {};
	const paramCategory = resolvedSearchParams.category ?? 'all';
	const pageParam = resolvedSearchParams.page ?? '1';

	const category = paramCategory;
	const page = parseInt(pageParam, 10);
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

	return (
		<PortfolioContent
			categories={categories}
			initialCategory={category}
			initialPage={page}
			itemsPerPage={itemsPerPage}
			allProjects={projects}
		/>
	);
};

export default PortfolioPage;
