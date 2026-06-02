// app/portfolio/page.tsx
import PortfolioContent from '@/components/portfolio/PortfolioContent';
import { projectsApi } from '@/lib/api/client';

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

	// Fetch data through API layer
	const categories = await projectsApi.getCategories();
	const allProjects = await projectsApi.listAll();

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
