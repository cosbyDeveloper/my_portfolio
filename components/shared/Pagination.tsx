// components/shared/Pagination.tsx
'use client';

import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface PaginationProps {
	totalItems: number;
	itemsPerPage: number;
	currentPage: number;
	onPageChange: (page: number) => void;
	showCount?: boolean;
	className?: string;
}

const Pagination = ({
	totalItems,
	itemsPerPage,
	currentPage,
	onPageChange,
	showCount = true,
	className = '',
}: PaginationProps) => {
	const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

	// Ensure currentPage is within valid bounds
	const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

	// Calculate start and end items correctly
	const startItem =
		totalItems === 0 ? 0 : (safeCurrentPage - 1) * itemsPerPage + 1;
	const endItem = Math.min(safeCurrentPage * itemsPerPage, totalItems);

	const handlePrevious = () => {
		if (safeCurrentPage > 1) {
			onPageChange(safeCurrentPage - 1);
		}
	};

	const handleNext = () => {
		if (safeCurrentPage < totalPages) {
			onPageChange(safeCurrentPage + 1);
		}
	};

	const handlePageClick = (page: number) => {
		// Ensure the clicked page is within bounds
		const targetPage = Math.min(Math.max(1, page), totalPages);
		if (targetPage !== safeCurrentPage) {
			onPageChange(targetPage);
		}
	};

	const renderPageNumbers = () => {
		const pages: (number | string)[] = [];
		const maxVisiblePages = 5;

		if (totalPages <= maxVisiblePages) {
			// Show all pages
			for (let i = 1; i <= totalPages; i++) {
				pages.push(i);
			}
		} else {
			// Always show first page
			pages.push(1);

			let start = Math.max(2, safeCurrentPage - 1);
			let end = Math.min(totalPages - 1, safeCurrentPage + 1);

			// Adjust for near start
			if (safeCurrentPage <= 2) {
				end = Math.min(4, totalPages - 1);
			}
			// Adjust for near end
			else if (safeCurrentPage >= totalPages - 2) {
				start = Math.max(totalPages - 3, 2);
			}

			// Add ellipsis before middle pages if needed
			if (start > 2) {
				pages.push('...');
			}

			// Add middle pages
			for (let i = start; i <= end; i++) {
				pages.push(i);
			}

			// Add ellipsis after middle pages if needed
			if (end < totalPages - 1) {
				pages.push('...');
			}

			// Always show last page if not already included
			if (totalPages > 1) {
				pages.push(totalPages);
			}
		}

		return pages;
	};

	if (totalItems === 0) return null;
	if (totalPages <= 1 && !showCount) return null;

	return (
		<div
			className={`flex flex-col sm:flex-row items-center justify-between gap-4 ${className}`}>
			{showCount && (
				<div className='text-sm text-muted-foreground'>
					Showing {startItem} - {endItem} of {totalItems} items
				</div>
			)}

			<div className='flex items-center gap-2'>
				{/* Previous button */}
				<button
					onClick={handlePrevious}
					disabled={safeCurrentPage === 1}
					className={`p-2 rounded-lg border border-default transition ${
						safeCurrentPage === 1
							? 'opacity-50 cursor-not-allowed'
							: 'hover:bg-muted/50'
					}`}
					aria-label='Previous page'>
					<FaChevronLeft className='w-4 h-4' />
				</button>

				{/* Page numbers */}
				<div className='flex items-center gap-1'>
					{renderPageNumbers().map((page, index) => (
						<button
							key={`${page}-${index}`}
							onClick={() => typeof page === 'number' && handlePageClick(page)}
							className={`min-w-10 h-10 flex items-center justify-center rounded-lg border transition ${
								page === safeCurrentPage
									? 'bg-primary border-primary text-primary-foreground'
									: page === '...'
									? 'cursor-default border-transparent'
									: 'border-default hover:bg-muted/50'
							}`}
							disabled={page === '...'}
							aria-label={`Go to page ${page}`}
							aria-current={page === safeCurrentPage ? 'page' : undefined}>
							{page}
						</button>
					))}
				</div>

				{/* Next button */}
				<button
					onClick={handleNext}
					disabled={safeCurrentPage === totalPages}
					className={`p-2 rounded-lg border border-default transition ${
						safeCurrentPage === totalPages
							? 'opacity-50 cursor-not-allowed'
							: 'hover:bg-muted/50'
					}`}
					aria-label='Next page'>
					<FaChevronRight className='w-4 h-4' />
				</button>
			</div>
		</div>
	);
};

export default Pagination;
