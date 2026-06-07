'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
	FaProjectDiagram,
	FaBlog,
	FaEnvelope,
	FaArrowUp,
	FaUserShield,
	FaSpinner,
	FaCheckCircle,
} from 'react-icons/fa';

interface Stats {
	projects: number;
	blogs: number;
	messages: number;
	unread: number;
	projectsByCategory?: Record<string, number>;
}

export default function DashboardPage() {
	const [stats, setStats] = useState<Stats>({
		projects: 0,
		blogs: 0,
		messages: 0,
		unread: 0,
	});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		fetchStats();
	}, []);

	const fetchStats = async () => {
		try {
			const response = await fetch('/api/admin/stats', {
				credentials: 'include',
			});

			if (!response.ok) {
				throw new Error('Failed to fetch stats');
			}

			const data = await response.json();
			setStats(data);
		} catch (err) {
			console.error('Failed to fetch stats:', err);
			setError('Failed to load dashboard stats');
		} finally {
			setLoading(false);
		}
	};

	const statCards = [
		{
			title: 'Total Projects',
			value: stats.projects,
			icon: FaProjectDiagram,
			color: 'primary',
			bgClass: 'bg-primary/10',
			iconClass: 'text-primary',
			href: '/admin/projects',
		},
		{
			title: 'Total Blogs',
			value: stats.blogs,
			icon: FaBlog,
			color: 'secondary',
			bgClass: 'bg-secondary/10',
			iconClass: 'text-secondary',
			href: '/admin/blogs',
		},
		{
			title: 'Unread Messages',
			value: stats.unread,
			icon: FaEnvelope,
			color: 'accent',
			bgClass: 'bg-accent/10',
			iconClass: 'text-accent',
			href: '/admin/messages',
		},
		{
			title: 'Total Messages',
			value: stats.messages,
			icon: FaCheckCircle,
			color: 'primary',
			bgClass: 'bg-primary/10',
			iconClass: 'text-primary',
		},
	];

	if (loading) {
		return (
			<div className='flex items-center justify-center h-64'>
				<div className='text-center'>
					<FaSpinner className='w-8 h-8 text-primary animate-spin mx-auto mb-4' />
					<p className='text-muted-foreground'>Loading dashboard...</p>
				</div>
			</div>
		);
	}

	return (
		<div>
			{error && (
				<motion.div
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					className='mb-6 rounded-xl bg-red-500/10 border border-red-500/20 p-4'>
					<p className='text-red-600 dark:text-red-400 text-sm'>{error}</p>
				</motion.div>
			)}

			{/* Header */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className='mb-8'>
				<div className='flex items-center gap-3 mb-2'>
					<div className='p-2 rounded-lg bg-primary/10'>
						<FaUserShield className='w-6 h-6 text-primary' />
					</div>
					<h1 className='text-3xl md:text-4xl font-bold tracking-tight'>
						Dashboard
					</h1>
				</div>
				<p className='text-muted-foreground'>
					Welcome back! Here&apos;s a quick overview of your content and
					activity.
				</p>
			</motion.div>

			{/* Stats Grid */}
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
				{statCards.map((card, index) => {
					const Icon = card.icon;
					return (
						<motion.div
							key={card.title}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.1, duration: 0.5 }}
							className={`group relative ${card.href ? 'cursor-pointer' : ''}`}
							onClick={() => card.href && (window.location.href = card.href)}>
							<div className='absolute -inset-0.5 bg-linear-to-r from-primary/20 to-secondary/20 rounded-2xl blur opacity-0 group-hover:opacity-70 transition duration-500' />
							<div className='relative bg-background/50 backdrop-blur-sm rounded-2xl border border-default p-6 hover:border-primary/50 transition-all'>
								<div className='flex items-center justify-between mb-4'>
									<div className={`p-3 rounded-xl ${card.bgClass}`}>
										<Icon className={`w-6 h-6 ${card.iconClass}`} />
									</div>
									{card.value > 0 && (
										<div className='flex items-center gap-1 text-emerald-500 text-sm'>
											<FaArrowUp className='w-3 h-3' />
											<span>Active</span>
										</div>
									)}
								</div>
								<h3 className='text-sm font-medium text-muted-foreground mb-1'>
									{card.title}
								</h3>
								<p className='text-3xl font-bold tracking-tight'>
									{card.value}
								</p>
							</div>
						</motion.div>
					);
				})}
			</div>

			{/* Two Column Layout */}
			<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
				{/* Welcome Card - Takes 2/3 on large screens */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4, duration: 0.6 }}
					className='lg:col-span-2'>
					<div className='relative bg-linear-to-br from-primary/5 to-secondary/5 rounded-2xl border border-default p-8'>
						<div className='absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl' />
						<h2 className='text-2xl font-bold mb-3'>Welcome to Admin Panel</h2>
						<p className='text-muted-foreground mb-6 max-w-2xl'>
							Manage your portfolio content efficiently. Use the navigation to
							add, edit, or delete projects, blogs, and respond to contact
							messages. All changes are saved to the database instantly.
						</p>
						<div className='flex flex-wrap gap-3'>
							<Link
								href='/admin/projects/new'
								className='px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-all hover:scale-105 active:scale-95'>
								+ New Project
							</Link>
							<Link
								href='/admin/blogs/new'
								className='px-4 py-2 rounded-lg bg-secondary border border-default text-secondary-foreground text-sm font-medium hover:opacity-90 transition-all hover:scale-105 active:scale-95'>
								+ New Blog
							</Link>
						</div>
					</div>
				</motion.div>

				{/* Content Summary - Takes 1/3 on large screens */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.5, duration: 0.6 }}
					className='relative'>
					<div className='relative bg-background/50 backdrop-blur-sm rounded-2xl border border-default p-6 h-full'>
						<h3 className='text-lg font-semibold mb-4'>Content Summary</h3>
						<div className='space-y-4'>
							<div className='flex items-center justify-between p-3 rounded-lg bg-primary/5 border border-primary/10'>
								<div>
									<p className='text-xs text-muted-foreground'>Projects</p>
									<p className='text-2xl font-bold'>{stats.projects}</p>
								</div>
								<FaProjectDiagram className='w-6 h-6 text-primary opacity-30' />
							</div>
							<div className='flex items-center justify-between p-3 rounded-lg bg-secondary/5 border border-secondary/10'>
								<div>
									<p className='text-xs text-muted-foreground'>Blog Posts</p>
									<p className='text-2xl font-bold'>{stats.blogs}</p>
								</div>
								<FaBlog className='w-6 h-6 text-secondary opacity-30' />
							</div>
							<div className='flex items-center justify-between p-3 rounded-lg bg-accent/5 border border-accent/10'>
								<div>
									<p className='text-xs text-muted-foreground'>
										Unread Messages
									</p>
									<p className='text-2xl font-bold text-accent'>
										{stats.unread}
									</p>
								</div>
								<FaEnvelope className='w-6 h-6 text-accent opacity-30' />
							</div>
						</div>
					</div>
				</motion.div>
			</div>

			{/* Quick Actions */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.6, duration: 0.6 }}
				className='mt-8'>
				<h3 className='text-lg font-semibold mb-4'>Quick Actions</h3>
				<div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
					<Link href='/admin/projects' className='group relative'>
						<div className='relative bg-background/50 backdrop-blur-sm rounded-xl border border-default p-4 text-center hover:border-primary/50 transition-all hover:scale-105'>
							<FaProjectDiagram className='w-8 h-8 text-primary mx-auto mb-2' />
							<p className='text-sm font-medium'>View Projects</p>
							<p className='text-xs text-muted-foreground mt-1'>
								{stats.projects} total
							</p>
						</div>
					</Link>
					<Link href='/admin/blogs' className='group relative'>
						<div className='relative bg-background/50 backdrop-blur-sm rounded-xl border border-default p-4 text-center hover:border-secondary/50 transition-all hover:scale-105'>
							<FaBlog className='w-8 h-8 text-secondary mx-auto mb-2' />
							<p className='text-sm font-medium'>View Blogs</p>
							<p className='text-xs text-muted-foreground mt-1'>
								{stats.blogs} total
							</p>
						</div>
					</Link>
					<Link href='/admin/messages' className='group relative'>
						<div className='relative bg-background/50 backdrop-blur-sm rounded-xl border border-default p-4 text-center hover:border-accent/50 transition-all hover:scale-105'>
							<FaEnvelope className='w-8 h-8 text-accent mx-auto mb-2' />
							<p className='text-sm font-medium'>View Messages</p>
							<p className='text-xs text-muted-foreground mt-1'>
								{stats.unread} unread
							</p>
						</div>
					</Link>
				</div>
			</motion.div>
		</div>
	);
}
