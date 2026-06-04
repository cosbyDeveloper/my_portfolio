// app/portfolio/page.tsx
import PortfolioContent from '@/components/portfolio/PortfolioContent';
import { getAllProjects, getProjectCategories } from '@/lib/data/projects';

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

	const [categories, allProjects] = await Promise.all([
		getProjectCategories(),
		getAllProjects(),
	]);

	return (
		<PortfolioContent
			categories={categories}
			initialCategory={category}
			initialPage={page}
			itemsPerPage={itemsPerPage}
			allProjects={allProjects}
		/>
	);
};

export default PortfolioPage;
