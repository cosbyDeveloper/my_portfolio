/**
 * useScrollSpy Hook
 * Tracks which section is currently in viewport
 * Only active on homepage (when pathname === '/')
 */

import { useEffect, useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';

export interface NavItem {
	label: string;
	icon: React.ComponentType<{ className?: string }>;
	section: string;
	pageRoute?: string;
}

/**
 * Hook for tracking active section during scroll
 * Only operates on homepage, returns null on other pages
 * @param navItems - Navigation items to observe
 * @returns Active section name or null
 */
export function useScrollSpy(navItems: NavItem[]) {
	const pathname = usePathname();
	const [activeSection, setActiveSection] = useState<string | null>(null);

	// Set up Intersection Observer for scroll spy (homepage only)
	useEffect(() => {
		if (pathname !== '/') return;

		const sections = navItems
			.filter((item) => item.section)
			.map((item) => document.getElementById(item.section))
			.filter(Boolean) as HTMLElement[];

		if (!sections.length) return;

		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((entry) => entry.isIntersecting)
					.sort((a, b) => b.intersectionRatio - a.intersectionRatio);

				if (visible.length > 0) {
					const newActiveSection = visible[0].target.id;
					setActiveSection(newActiveSection);
				}
			},
			{
				root: null,
				rootMargin: '0px 0px -40% 0px',
				threshold: [0.2, 0.4, 0.6],
			},
		);

		sections.forEach((section) => observer.observe(section));

		return () => observer.disconnect();
	}, [pathname, navItems]);

	// Handle scroll events to detect when at top of page
	useEffect(() => {
		if (pathname !== '/') return;

		const handleScroll = () => {
			if (window.scrollY < 100) {
				setActiveSection('introduction');
			}
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	}, [pathname]);

	// Handle hash navigation on mount
	useEffect(() => {
		if (pathname !== '/') return;

		let timeoutId: number | undefined;
		const hash = window.location.hash.replace('#', '');

		if (hash && navItems.some((item) => item.section === hash)) {
			timeoutId = window.setTimeout(() => {
				setActiveSection(hash);
				const el = document.getElementById(hash);
				if (el) {
					el.scrollIntoView({ behavior: 'smooth' });
				}
			}, 100);
		} else if (window.scrollY < 100) {
			timeoutId = window.setTimeout(() => {
				setActiveSection('introduction');
			}, 100);
		}

		return () => {
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
		};
	}, [pathname, navItems]);

	return activeSection;
}

/**
 * Determines if a nav item is currently active
 * Handles both page routes and homepage sections
 * @param item - Navigation item to check
 * @param pathname - Current pathname
 * @param activeSection - Currently active section from scroll spy
 * @returns boolean indicating if item is active
 */
export function isNavItemActive(
	item: NavItem,
	pathname: string,
	activeSection: string | null,
): boolean {
	// If we're NOT on homepage
	if (pathname !== '/') {
		// Check if current path matches pageRoute
		if (item.pageRoute && pathname === item.pageRoute) {
			return true;
		}
		return false;
	}

	// If we ARE on homepage
	// Introduction should only be active when at the very top
	if (item.label === 'Introduction') {
		return (
			activeSection === null ||
			activeSection === 'introduction' ||
			window.scrollY < 100
		);
	}

	// For other sections on homepage
	return activeSection === item.section;
}
