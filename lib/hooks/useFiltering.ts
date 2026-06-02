/**
 * useFiltering Hook
 * Reusable filtering and pagination logic
 * Used by both BlogContent and PortfolioContent
 * 
 * Handles:
 * - URL-based state management
 * - Filtering items
 * - Pagination
 * - URL updates when filters/page changes
 */

import { useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export interface UseFilteringOptions<T> {
	items: T[];
	itemsPerPage: number;
	filterParam?: string; // Name of URL parameter (default: 'filter')
	pageParam?: string; // Name of URL parameter (default: 'page')
	filterFn: (item: T, filter: string) => boolean; // Function to filter items
}

export interface UseFilteringResult<T> {
	filtered: T[];
	paginated: T[];
	activeFilter: string;
	currentPage: number;
	totalPages: number;
	handleFilterChange: (filter: string) => void;
	handlePageChange: (page: number) => void;
}

/**
 * Hook for handling filtering and pagination with URL-based state
 * @param options - Configuration object
 * @returns Object with filtering state and handlers
 */
export function useFiltering<T>({
	items,
	itemsPerPage,
	filterParam = 'filter',
	pageParam = 'page',
	filterFn,
}: UseFilteringOptions<T>): UseFilteringResult<T> {
	const router = useRouter();
	const searchParams = useSearchParams();

	// Get current filter and page from URL
	const activeFilter = (searchParams.get(filterParam) as string) || 'all';
	const currentPage = (() => {
		const pageStr = searchParams.get(pageParam) || '1';
		const parsed = parseInt(pageStr, 10);
		return Number.isNaN(parsed) ? 1 : parsed;
	})();

	// Filter items
	const filtered = useMemo(
		() => items.filter((item) => filterFn(item, activeFilter)),
		[items, activeFilter, filterFn],
	);

	// Calculate pagination
	const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
	const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

	// Paginate items
	const paginated = useMemo(() => {
		const startIndex = (safeCurrentPage - 1) * itemsPerPage;
		const endIndex = Math.min(startIndex + itemsPerPage, filtered.length);
		return filtered.slice(startIndex, endIndex);
	}, [filtered, safeCurrentPage, itemsPerPage]);

	// Handle filter change
	const handleFilterChange = (filter: string) => {
		const params = new URLSearchParams(window.location.search);

		if (filter !== 'all') {
			params.set(filterParam, filter);
		} else {
			params.delete(filterParam);
		}

		// Reset to page 1 when filter changes
		params.set(pageParam, '1');
		router.push(`?${params.toString()}`);
	};

	// Handle page change
	const handlePageChange = (page: number) => {
		const params = new URLSearchParams(window.location.search);

		if (page !== 1) {
			params.set(pageParam, String(page));
		} else {
			params.delete(pageParam);
		}

		// Keep existing filter if any
		if (activeFilter !== 'all' && !params.has(filterParam)) {
			params.set(filterParam, activeFilter);
		}

		router.push(`?${params.toString()}`);
	};

	return {
		filtered,
		paginated,
		activeFilter,
		currentPage: safeCurrentPage,
		totalPages,
		handleFilterChange,
		handlePageChange,
	};
}
