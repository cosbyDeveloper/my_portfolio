/**
 * useNavigation Hook
 * Handles navigation logic (routing + scroll to sections)
 * Separates routing concerns from UI rendering
 */

import { useRouter, usePathname } from 'next/navigation';

export interface NavItem {
	label: string;
	icon: React.ComponentType<{ className?: string }>;
	section: string; // For homepage scroll sections
	pageRoute?: string; // Only for actual pages (not for Introduction)
}

/**
 * Hook for handling navigation between pages and sections
 * @returns Object with handleNavigation function
 */
export function useNavigation() {
	const pathname = usePathname();
	const router = useRouter();

	/**
	 * Handle navigation click for both pages and sections
	 * On homepage: scroll to section
	 * On other pages: navigate to page route
	 */
	const handleNavClick = (item: NavItem) => {
		if (pathname === '/') {
			// We're on homepage
			if (item.label === 'Introduction') {
				// Scroll to top of page
				window.scrollTo({ top: 0, behavior: 'smooth' });
			} else if (item.section) {
				// Scroll to section
				scrollToSection(item.section);
			}
		} else {
			// We're NOT on homepage
			if (item.pageRoute) {
				// Navigate to the actual page
				router.push(item.pageRoute);
			} else {
				// This is the Introduction/Home - navigate to homepage
				router.push('/');
			}
		}
	};

	/**
	 * Scroll smoothly to a specific section by ID
	 */
	const scrollToSection = (section: string) => {
		const el = document.getElementById(section);
		if (!el) return;

		el.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		});
	};

	return {
		handleNavClick,
		scrollToSection,
		currentPath: pathname,
	};
}
