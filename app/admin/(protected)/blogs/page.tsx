// app/admin/(protected)/blogs/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
	FaBlog,
	FaPlus,
	FaEdit,
	FaTrash,
	FaSpinner,
	FaCalendarAlt,
} from 'react-icons/fa';
import { BlogPost as Blog } from '@/lib/types';

export default function BlogsPage() {
	const [blogs, setBlogs] = useState<Blog[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState('');
	const [deleting, setDeleting] = useState<string | null>(null);

	useEffect(() => {
		fetchBlogs();
	}, []);

	const fetchBlogs = async () => {
		try {
			const response = await fetch('/api/admin/blogs', {
				method: 'GET',
				credentials: 'include',
			});

			if (!response.ok) {
				throw new Error('Failed to fetch blogs');
			}

			const data = await response.json();
			setBlogs(data.data || []);
		} catch (err) {
			setError('Failed to load blogs');
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	};

	const handleDelete = async (slug: string) => {
		if (!confirm('Are you sure you want to delete this blog?')) return;

		setDeleting(slug);
		try {
			const response = await fetch(`/api/admin/blogs/${slug}`, {
				method: 'DELETE',
				credentials: 'include',
			});

			if (response.ok) {
				setBlogs(blogs.filter((b) => b.slug !== slug));
			}
		} catch (err) {
			console.error('Delete failed:', err);
			alert('Failed to delete blog');
		} finally {
			setDeleting(null);
		}
	};

	if (isLoading) {
		return (
			<div className='flex items-center justify-center h-64'>
				<div className='text-center'>
					<FaSpinner className='w-8 h-8 text-secondary animate-spin mx-auto mb-4' />
					<p className='text-muted-foreground'>Loading blogs...</p>
				</div>
			</div>
		);
	}

	return (
		<div>
			{/* Header */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className='mb-8'>
				<div className='flex items-center justify-between flex-wrap gap-4'>
					<div className='flex items-center gap-3'>
						<div className='p-2 rounded-lg bg-secondary/10'>
							<FaBlog className='w-6 h-6 text-secondary' />
						</div>
						<div>
							<h1 className='text-3xl md:text-4xl font-bold tracking-tight'>
								Blogs
							</h1>
							<p className='text-muted-foreground mt-1'>
								Manage your blog posts
							</p>
						</div>
					</div>
					<Link
						href='/admin/blogs/new'
						className='flex items-center gap-2 px-5 py-2.5 rounded-xl bg-secondary text-secondary-foreground font-semibold hover:opacity-90 transition-all hover:scale-105 active:scale-95'>
						<FaPlus className='w-4 h-4' />
						<span>New Blog</span>
					</Link>
				</div>
			</motion.div>

			{/* Error Message */}
			{error && (
				<motion.div
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					className='mb-6 rounded-xl bg-red-500/10 border border-red-500/20 p-4'>
					<p className='text-red-600 dark:text-red-400 text-sm'>{error}</p>
				</motion.div>
			)}

			{/* Empty State */}
			{blogs.length === 0 ? (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className='text-center py-16'>
					<div className='inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-secondary/10 mb-4'>
						<FaBlog className='w-10 h-10 text-secondary/40' />
					</div>
					<h3 className='text-xl font-semibold mb-2'>No blogs yet</h3>
					<p className='text-muted-foreground mb-6'>
						Start by writing your first blog post
					</p>
					<Link
						href='/admin/blogs/new'
						className='inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-secondary text-secondary-foreground font-semibold hover:opacity-90 transition-all hover:scale-105'>
						<FaPlus className='w-4 h-4' />
						<span>Write Blog</span>
					</Link>
				</motion.div>
			) : (
				/* Blogs List */
				<div className='space-y-3'>
					{blogs.map((blog, index) => (
						<motion.div
							key={blog.slug}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.05 }}
							className='group relative'>
							<div className='absolute -inset-0.5 bg-linear-to-r from-secondary/20 to-primary/20 rounded-xl blur opacity-0 group-hover:opacity-50 transition duration-300' />
							<div className='relative bg-background/50 backdrop-blur-sm rounded-xl border border-default p-5 hover:border-secondary/50 transition-all'>
								<div className='flex items-start justify-between gap-4'>
									{/* Blog Info */}
									<div className='flex-1 min-w-0'>
										<h3 className='text-lg font-semibold truncate'>
											{blog.title}
										</h3>
										{blog.excerpt && (
											<p className='text-sm text-muted-foreground mt-1 line-clamp-2'>
												{blog.excerpt}
											</p>
										)}
										<div className='flex items-center gap-4 mt-3'>
											{blog.date && (
												<div className='flex items-center gap-1 text-xs text-muted-foreground'>
													<FaCalendarAlt className='w-3 h-3' />
													<span>
														{new Date(blog.date).toLocaleDateString()}
													</span>
												</div>
											)}
											{blog.tags && blog.tags.length > 0 && (
												<div className='flex flex-wrap gap-1'>
													{blog.tags.slice(0, 2).map((tag) => (
														<span
															key={tag}
															className='text-xs px-2 py-0.5 rounded-full bg-secondary/10 text-secondary'>
															{tag}
														</span>
													))}
													{blog.tags.length > 2 && (
														<span className='text-xs text-muted-foreground'>
															+{blog.tags.length - 2}
														</span>
													)}
												</div>
											)}
										</div>
									</div>

									{/* Actions */}
									<div className='flex items-center gap-2 shrink-0'>
										<Link
											href={`/admin/blogs/${blog.slug}/edit`}
											className='p-2 rounded-lg bg-secondary/10 text-secondary hover:bg-secondary/20 transition-all hover:scale-110'>
											<FaEdit className='w-4 h-4' />
										</Link>
										<button
											onClick={() => handleDelete(blog.slug)}
											disabled={deleting === blog.slug}
											className='p-2 rounded-lg bg-red-500/10 text-red-600 hover:bg-red-500/20 transition-all hover:scale-110 disabled:opacity-50'>
											{deleting === blog.slug ? (
												<FaSpinner className='w-4 h-4 animate-spin' />
											) : (
												<FaTrash className='w-4 h-4' />
											)}
										</button>
									</div>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			)}
		</div>
	);
}
