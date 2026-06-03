'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import {
	FaTachometerAlt,
	FaProjectDiagram,
	FaBlog,
	FaEnvelope,
	FaSignOutAlt,
	FaBars,
	FaTimes,
	FaUserShield,
} from 'react-icons/fa';

import { AnimatePresence, motion } from 'framer-motion';

interface AdminSidebarProps {
	user: {
		userId: string;
		email: string;
		name: string;
		role: 'admin' | 'editor';
	};
}

export default function AdminSidebar({ user }: AdminSidebarProps) {
	const router = useRouter();
	const pathname = usePathname();

	const [mobileOpen, setMobileOpen] = useState(false);
	const [collapsed, setCollapsed] = useState(false);

	const navItems = [
		{
			href: '/admin/dashboard',
			label: 'Dashboard',
			icon: FaTachometerAlt,
		},
		{
			href: '/admin/projects',
			label: 'Projects',
			icon: FaProjectDiagram,
		},
		{
			href: '/admin/blogs',
			label: 'Blogs',
			icon: FaBlog,
		},
		{
			href: '/admin/messages',
			label: 'Messages',
			icon: FaEnvelope,
		},
	];

	const isActive = (href: string) => pathname === href;

	async function handleLogout() {
		try {
			await fetch('/api/auth/logout', {
				method: 'POST',
			});

			router.push('/admin/login');
			router.refresh();
		} catch (error) {
			console.error('Logout failed:', error);
		}
	}

	return (
		<>
			{/* ==========================
			    DESKTOP SIDEBAR
			========================== */}

			<aside
				className={`hidden lg:block fixed top-0 left-0 h-screen bg-background border-r border-default z-40 transition-all duration-300 ${
					collapsed ? 'w-20' : 'w-64'
				}`}>
				<div className='flex flex-col h-full p-4'>
					{/* Header */}

					<div className='flex items-center justify-between mb-6'>
						{!collapsed && (
							<div className='flex items-center gap-2'>
								<FaUserShield className='text-primary' />
								<span className='font-semibold text-lg'>Admin Panel</span>
							</div>
						)}

						<button
							onClick={() => setCollapsed(!collapsed)}
							className='w-8 h-8 flex items-center justify-center rounded-md border border-default hover:bg-muted'>
							<FaBars className='w-4 h-4' />
						</button>
					</div>

					{/* User */}

					<div className='border-y border-default py-4 mb-4'>
						<div
							className={`flex items-center ${
								collapsed ? 'justify-center' : 'gap-3'
							}`}>
							<div className='w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center'>
								<FaUserShield />
							</div>

							{!collapsed && (
								<div className='overflow-hidden'>
									<p className='font-medium truncate'>{user.name}</p>
									<p className='font-medium truncate'>{user.email}</p>
									<p className='text-xs text-muted-foreground uppercase'>
										{user.role}
									</p>
								</div>
							)}
						</div>
					</div>

					{/* Navigation */}

					<nav className='flex-1 space-y-1'>
						{navItems.map((item) => {
							const Icon = item.icon;
							const active = isActive(item.href);

							return (
								<Link
									key={item.href}
									href={item.href}
									className={`flex items-center rounded-lg px-3 py-2.5 transition-all duration-200 ${
										active
											? 'bg-primary/20 text-primary'
											: 'hover:bg-primary/10'
									} ${collapsed ? 'justify-center' : 'gap-3'}`}>
									<Icon className='w-5 h-5' />

									{!collapsed && (
										<span className='font-medium text-sm'>{item.label}</span>
									)}
								</Link>
							);
						})}
					</nav>

					{/* Logout */}

					<div className='border-t border-default pt-4'>
						<button
							onClick={handleLogout}
							className={`w-full flex items-center rounded-lg px-3 py-2.5 text-red-500 hover:bg-red-500/10 ${
								collapsed ? 'justify-center' : 'gap-3'
							}`}>
							<FaSignOutAlt />

							{!collapsed && (
								<span className='font-medium text-sm'>Logout</span>
							)}
						</button>
					</div>
				</div>
			</aside>

			{/* ==========================
			    MOBILE HEADER
			========================== */}

			<header className='lg:hidden fixed top-0 left-0 right-0 h-16 border-b border-default bg-background z-30 flex items-center justify-between px-4'>
				<button
					onClick={() => setMobileOpen(true)}
					className='p-2 rounded-md border border-default'>
					<FaBars />
				</button>

				<div className='flex items-center gap-2'>
					<FaUserShield />
					<span className='font-semibold'>Admin Panel</span>
				</div>

				<div className='w-10' />
			</header>

			{/* ==========================
			    MOBILE DRAWER
			========================== */}

			<AnimatePresence>
				{mobileOpen && (
					<>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className='fixed inset-0 bg-black/50 z-40'
							onClick={() => setMobileOpen(false)}
						/>

						<motion.aside
							initial={{ x: -300 }}
							animate={{ x: 0 }}
							exit={{ x: -300 }}
							transition={{
								type: 'spring',
								damping: 25,
							}}
							className='fixed top-0 left-0 bottom-0 w-72 bg-background border-r border-default z-50'>
							<div className='flex flex-col h-full p-4'>
								<div className='flex justify-end mb-4'>
									<button
										onClick={() => setMobileOpen(false)}
										className='p-2 rounded-md border border-default'>
										<FaTimes />
									</button>
								</div>

								<div className='mb-6'>
									<p className='font-medium'>{user.email}</p>

									<p className='text-xs text-muted-foreground uppercase'>
										{user.role}
									</p>
								</div>

								<nav className='flex-1 space-y-1'>
									{navItems.map((item) => {
										const Icon = item.icon;
										const active = isActive(item.href);

										return (
											<Link
												key={item.href}
												href={item.href}
												onClick={() => setMobileOpen(false)}
												className={`flex items-center gap-3 rounded-lg px-3 py-2.5 ${
													active
														? 'bg-primary/20 text-primary'
														: 'hover:bg-primary/10'
												}`}>
												<Icon />
												<span>{item.label}</span>
											</Link>
										);
									})}
								</nav>

								<button
									onClick={handleLogout}
									className='mt-4 flex items-center gap-3 rounded-lg px-3 py-2.5 text-red-500 hover:bg-red-500/10'>
									<FaSignOutAlt />
									<span>Logout</span>
								</button>
							</div>
						</motion.aside>
					</>
				)}
			</AnimatePresence>
		</>
	);
}
