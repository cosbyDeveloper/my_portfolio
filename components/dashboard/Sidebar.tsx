'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import {
	FaHome,
	FaUserTie,
	FaFileAlt,
	FaBriefcase,
	FaBlog,
	FaEnvelope,
	FaBars,
	FaChevronLeft,
	FaChevronRight,
	FaTimes,
	FaQuestionCircle,
} from 'react-icons/fa';

import SidebarFooter from './SidebarFooter';

// Define the nav item structure
interface NavItem {
	label: string;
	icon: React.ComponentType<{ className?: string }>;
	section: string; // For homepage scroll sections
	pageRoute?: string; // Only for actual pages (not for Introduction)
}

const navItems: NavItem[] = [
	{
		label: 'Introduction',
		icon: FaHome,
		section: 'introduction',
		// NO pageRoute - this is the homepage itself
	},
	{
		label: 'About',
		icon: FaUserTie,
		section: 'about',
		pageRoute: '/about',
	},
	{
		label: 'Resume',
		icon: FaFileAlt,
		section: 'resume',
		pageRoute: '/resume',
	},
	{
		label: 'Portfolio',
		icon: FaBriefcase,
		section: 'portfolio',
		pageRoute: '/portfolio',
	},
	{
		label: 'Blog',
		icon: FaBlog,
		section: 'blog',
		pageRoute: '/blog',
	},
	{
		label: 'FAQ',
		icon: FaQuestionCircle,
		section: 'faq',
		pageRoute: '/faq',
	},
	{
		label: 'Contact',
		icon: FaEnvelope,
		section: 'contact',
		pageRoute: '/contact',
	},
];

const Sidebar = () => {
	const pathname = usePathname();
	const router = useRouter();

	const [collapsed, setCollapsed] = useState<boolean>(() => {
		if (typeof window === 'undefined') return false;
		return localStorage.getItem('sidebar-collapsed') === 'true';
	});
	const [mobileOpen, setMobileOpen] = useState(false);
	const [activeSection, setActiveSection] = useState<string | null>(null);

	/* --------------------------------------------
	Persist collapsed state (desktop only)
	--------------------------------------------- */
	useEffect(() => {
		localStorage.setItem('sidebar-collapsed', String(collapsed));
	}, [collapsed]);

	/* --------------------------------------------
	Handle navigation to section or page
	--------------------------------------------- */
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
		setMobileOpen(false);
	};

	/* --------------------------------------------
	Scroll to section (homepage only)
	--------------------------------------------- */
	const scrollToSection = (section: string) => {
		const el = document.getElementById(section);
		if (!el) return;

		// If we're already at the section, don't scroll
		if (activeSection === section) return;

		el.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		});
	};

	/* --------------------------------------------
	Scroll-spy (homepage only)
	--------------------------------------------- */
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
	}, [pathname]);

	/* --------------------------------------------
	Active state logic (BOTH homepage sections AND actual pages)
	--------------------------------------------- */
	const isActive = (item: NavItem) => {
		// If we're NOT on homepage
		if (pathname !== '/') {
			// Check if current path matches pageRoute
			if (item.pageRoute && pathname === item.pageRoute) {
				return true;
			}
			// Check if it's the Introduction/Home button
			// Should be active when on homepage OR when no pageRoute (home)
			if (!item.pageRoute && pathname === '/') {
				return false; // We're not on homepage, so don't highlight Home
			}
			return false;
		}

		// If we ARE on homepage
		// Introduction should only be active when at the very top
		if (item.label === 'Introduction') {
			// Introduction is active when no section is active OR when at top
			return (
				activeSection === null ||
				activeSection === 'introduction' ||
				window.scrollY < 100
			);
		}

		// For other sections on homepage
		return activeSection === item.section;
	};

	/* --------------------------------------------
	Update active section based on URL hash on mount
	Also handle scroll to top
	--------------------------------------------- */
	useEffect(() => {
		if (pathname !== '/') return;

		let timeoutId: number | undefined;
		const hash = window.location.hash.replace('#', '');

		if (hash && navItems.some((item) => item.section === hash)) {
			// Defer updating state and scrolling to avoid synchronous setState in effect
			timeoutId = window.setTimeout(() => {
				setActiveSection(hash);

				const el = document.getElementById(hash);
				if (el) {
					el.scrollIntoView({ behavior: 'smooth' });
				}
			}, 100);
		} else if (window.scrollY < 100) {
			// At the top of the page - defer the state update
			timeoutId = window.setTimeout(() => {
				setActiveSection('introduction');
			}, 100);
		}

		return () => {
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
		};
	}, [pathname]);

	/* --------------------------------------------
	Listen to scroll events to detect when at top of page
	--------------------------------------------- */
	useEffect(() => {
		if (pathname !== '/') return;

		const handleScroll = () => {
			if (window.scrollY < 100) {
				// At the top of the page
				setActiveSection('introduction');
			}
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	}, [pathname]);

	return (
		<>
			{/* ============ DESKTOP SIDEBAR ============ */}
			<aside
				className={`hidden lg:block fixed top-0 left-0 h-screen ${
					collapsed ? 'w-20' : 'w-60'
				} overflow-hidden transition-[width] duration-300 ease-in-out shadow-lg bg-background z-40`}>
				<div className='flex flex-col h-full p-4'>
					{/* Collapse Toggle */}
					<button
						onClick={() => setCollapsed(!collapsed)}
						className='w-10 rounded-md border border-default p-2 hover:bg-muted flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95'
						aria-label='Toggle sidebar'>
						{collapsed ? <FaChevronRight /> : <FaChevronLeft />}
					</button>

					{/* Navigation */}
					<nav className='mt-4 flex-1 space-y-1'>
						{navItems.map((item) => (
							<button
								key={item.label}
								onClick={() => handleNavClick(item)}
								aria-current={isActive(item) ? 'page' : undefined}
								className={`w-full flex items-center gap-3 rounded-md px-3 py-2 text-lg transition-all duration-300
									hover:bg-primary/10 hover:pl-4
									${isActive(item) ? 'bg-primary/20 text-primary' : ''}`}>
								<div
									className={`transition-all duration-300 ${
										collapsed ? 'scale-125' : 'scale-100'
									}`}>
									<item.icon className='text-lg' />
								</div>
								<span
									className={`transition-all duration-300 ${
										collapsed
											? 'opacity-0 w-0 overflow-hidden -translate-x-2'
											: 'opacity-100 w-auto translate-x-0'
									}`}>
									{item.label}
								</span>
							</button>
						))}
					</nav>

					{/* Footer */}
					<SidebarFooter collapsed={collapsed} />
				</div>
			</aside>

			{/* ============ SPACER FOR DESKTOP CONTENT ============ */}
			<div
				className={`hidden lg:block ${
					collapsed ? 'w-20' : 'w-60'
				} transition-[width] duration-300 ease-in-out shrink-0`}
				aria-hidden='true'
			/>

			{/* ============ MOBILE SIDEBAR ============ */}
			{/* Mobile hamburger - positioned absolutely so it doesn't shift content */}
			<button
				onClick={() => setMobileOpen(true)}
				className='lg:hidden fixed top-4 left-4 z-30 m-2 rounded-md border border-default p-2 hover:bg-muted flex items-center justify-center bg-background shadow-md transition-all duration-200 hover:scale-105'
				aria-label='Open menu'>
				<FaBars />
			</button>

			{/* Mobile sidebar overlay */}
			<div
				className={`lg:hidden fixed inset-0 z-50 flex transition-opacity duration-300 ease-in-out ${
					mobileOpen
						? 'opacity-100 visible'
						: 'opacity-0 invisible pointer-events-none'
				}`}>
				{/* Sidebar - comes first in flex container */}
				<div
					className={`flex w-72 flex-col bg-background p-4 h-full transform transition-transform duration-300 ease-out ${
						mobileOpen ? 'translate-x-0' : '-translate-x-full'
					}`}>
					{/* Close Button */}
					<button
						onClick={() => setMobileOpen(false)}
						className='mb-4 w-10 rounded-md border border-default p-2 hover:bg-muted flex items-center justify-center transition-colors duration-200 hover:scale-105'
						aria-label='Close menu'>
						<FaTimes />
					</button>

					{/* Navigation */}
					<nav className='space-y-1'>
						{navItems.map((item) => (
							<button
								key={item.label}
								onClick={() => handleNavClick(item)}
								className={`w-full flex items-center gap-3 rounded-md px-3 py-2 text-lg transition-all duration-200
									hover:bg-primary/10 hover:pl-4
									${isActive(item) ? 'bg-primary/20 text-primary' : ''}`}>
								<item.icon />
								<span>{item.label}</span>
							</button>
						))}
					</nav>

					{/* Footer */}
					<div className='mt-auto pt-10'>
						<SidebarFooter />
					</div>
				</div>

				{/* Overlay - takes remaining space (right side) */}
				<div
					className={`flex-1 bg-black/40 transition-opacity duration-300 ${
						mobileOpen ? 'opacity-100' : 'opacity-0'
					}`}
					onClick={() => setMobileOpen(false)}
				/>
			</div>
		</>
	);
};

export default Sidebar;
