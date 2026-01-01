'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
} from 'react-icons/fa';

import SidebarFooter from './SidebarFooter';

const navItems = [
	{
		label: 'Introduction',
		href: '/',
		icon: FaHome,
		section: 'introduction',
	},
	{ label: 'About', href: '/about', icon: FaUserTie },
	{ label: 'Resume', href: '/resume', icon: FaFileAlt },
	{ label: 'Portfolio', href: '/portfolio', icon: FaBriefcase },
	{ label: 'Blog', href: '/blog', icon: FaBlog },
	{ label: 'Contact', href: '/contact', icon: FaEnvelope },
];

export default function Sidebar() {
	const pathname = usePathname();

	const [collapsed, setCollapsed] = useState<boolean>(() => {
		if (typeof window === 'undefined') return false;
		return localStorage.getItem('sidebar-collapsed') === 'true';
	});
	const [mobileOpen, setMobileOpen] = useState(false);
	const [activeSection, setActiveSection] = useState<string | null>(null);

	/* --------------------------------------------
	Persist collapsed state (desktop only)
	--------------------------------------------- */
	// Collapsed state is initialized from localStorage via the lazy initializer above
	// to avoid calling setState synchronously within an effect.

	useEffect(() => {
		localStorage.setItem('sidebar-collapsed', String(collapsed));
	}, [collapsed]);

	/* --------------------------------------------
	Scroll-spy (homepage only)
	--------------------------------------------- */
	useEffect(() => {
		if (pathname !== '/') return;

		const section = document.getElementById('introduction');
		if (!section) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setActiveSection('introduction');
				}
			},
			{ threshold: 0.6 },
		);

		observer.observe(section);
		return () => observer.disconnect();
	}, [pathname]);

	/* --------------------------------------------
	Active state logic
	--------------------------------------------- */
	const isActive = (href: string, section?: string) => {
		if (pathname !== '/') return pathname === href;
		if (section) return activeSection === section;
		return pathname === href;
	};

	return (
		<>
			{/* ============ DESKTOP SIDEBAR ============ */}
			<aside
				className={`hidden lg:flex ${
					collapsed ? 'w-20' : 'w-60'
				} overflow-hidden transition-[width] duration-300 ease-in-out shadow-lg bg-background flex-col h-screen p-4`}>
				{/* Collapse Toggle */}
				<button
					onClick={() => setCollapsed(!collapsed)}
					className='w-10 rounded-md border border-default p-2 hover:bg-muted flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95'
					aria-label='Toggle sidebar'>
					{collapsed ? <FaChevronRight /> : <FaChevronLeft />}
				</button>

				{/* Navigation */}
				<nav className='mt-4 flex-1 space-y-1'>
					{navItems.map(({ label, href, icon: Icon, section }) => (
						<Link
							key={href}
							href={href}
							aria-current={isActive(href, section) ? 'page' : undefined}
							className={`flex items-center gap-3 rounded-md px-3 py-2 text-lg transition-all duration-300
					hover:bg-primary/10 hover:pl-4
					${isActive(href, section) ? 'bg-primary/20 text-primary' : ''}`}>
							<div
								className={`transition-all duration-300 ${
									collapsed ? 'scale-125' : 'scale-100'
								}`}>
								<Icon className='text-lg' />
							</div>
							<span
								className={`transition-all duration-300 ${
									collapsed
										? 'opacity-0 w-0 overflow-hidden -translate-x-2'
										: 'opacity-100 w-auto translate-x-0'
								}`}>
								{label}
							</span>
						</Link>
					))}
				</nav>

				{/* Footer */}
				<SidebarFooter collapsed={collapsed} />
			</aside>

			{/* ============ MOBILE SIDEBAR ============ */}
			<div className='lg:hidden'>
				{/* Hamburger Button */}
				<button
					onClick={() => setMobileOpen(true)}
					className='m-2 rounded-md border border-default p-2 hover:bg-muted flex items-center justify-center'
					aria-label='Open menu'>
					<FaBars />
				</button>

				<div
					className={`fixed inset-0 z-50 flex transition-opacity duration-300 ease-in-out ${
						mobileOpen
							? 'opacity-100 visible'
							: 'opacity-0 invisible pointer-events-none'
					}`}>
					<div
						className={`flex w-72 flex-col bg-background p-4 transform transition-transform duration-300 ease-out ${
							mobileOpen ? 'translate-x-0' : '-translate-x-full'
						}`}>
						{/* Close Button */}
						<button
							onClick={() => setMobileOpen(false)}
							className='mb-4 w-10 rounded-md border border-default p-2 hover:bg-muted flex items-center justify-center transition-colors duration-200'
							aria-label='Close menu'>
							<FaTimes />
						</button>

						{/* Navigation */}
						<nav className='space-y-1'>
							{navItems.map(({ label, href, icon: Icon }) => (
								<Link
									key={href}
									href={href}
									onClick={() => setMobileOpen(false)}
									className={`flex items-center gap-3 rounded-md px-3 py-2 transition-all duration-200
							hover:bg-primary/10 hover:pl-4
							${pathname === href ? 'bg-primary/20 text-primary' : ''}`}>
									<Icon />
									<span>{label}</span>
								</Link>
							))}
						</nav>

						{/* Footer */}
						<div className='mt-auto pt-10'>
							<SidebarFooter />
						</div>
					</div>

					{/* Overlay */}
					<div
						className={`flex-1 bg-black/40 transition-opacity duration-300 ${
							mobileOpen ? 'opacity-100' : 'opacity-0'
						}`}
						onClick={() => setMobileOpen(false)}
					/>
				</div>
			</div>
		</>
	);
}
