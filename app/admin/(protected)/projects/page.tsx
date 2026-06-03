// app/admin/(protected)/projects/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
	FaProjectDiagram,
	FaPlus,
	FaEdit,
	FaTrash,
	FaSpinner,
	FaStar,
} from 'react-icons/fa';
import { Project } from '@/lib/types';

export default function ProjectsPage() {
	const [projects, setProjects] = useState<Project[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState('');
	const [deleting, setDeleting] = useState<string | null>(null);

	useEffect(() => {
		fetchProjects();
	}, []);

	const fetchProjects = async () => {
		try {
			const response = await fetch('/api/admin/projects', {
				method: 'GET',
				credentials: 'include',
			});

			if (!response.ok) {
				throw new Error('Failed to fetch projects');
			}

			const data = await response.json();
			setProjects(data.data || []);
		} catch (err) {
			setError('Failed to load projects');
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	};

	const handleDelete = async (slug: string) => {
		if (!confirm('Are you sure you want to delete this project?')) return;

		setDeleting(slug);
		try {
			const response = await fetch(`/api/admin/projects/${slug}`, {
				method: 'DELETE',
				credentials: 'include',
			});

			if (response.ok) {
				setProjects(projects.filter((p) => p.slug !== slug));
			}
		} catch (err) {
			console.error('Delete failed:', err);
			alert('Failed to delete project');
		} finally {
			setDeleting(null);
		}
	};

	if (isLoading) {
		return (
			<div className='flex items-center justify-center h-64'>
				<div className='text-center'>
					<FaSpinner className='w-8 h-8 text-primary animate-spin mx-auto mb-4' />
					<p className='text-muted-foreground'>Loading projects...</p>
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
						<div className='p-2 rounded-lg bg-primary/10'>
							<FaProjectDiagram className='w-6 h-6 text-primary' />
						</div>
						<div>
							<h1 className='text-3xl md:text-4xl font-bold tracking-tight'>
								Projects
							</h1>
							<p className='text-muted-foreground mt-1'>
								Manage your project portfolio
							</p>
						</div>
					</div>
					<Link
						href='/admin/projects/new'
						className='flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all hover:scale-105 active:scale-95'>
						<FaPlus className='w-4 h-4' />
						<span>New Project</span>
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
			{projects.length === 0 ? (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className='text-center py-16'>
					<div className='inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 mb-4'>
						<FaProjectDiagram className='w-10 h-10 text-primary/40' />
					</div>
					<h3 className='text-xl font-semibold mb-2'>No projects yet</h3>
					<p className='text-muted-foreground mb-6'>
						Start by creating your first project
					</p>
					<Link
						href='/admin/projects/new'
						className='inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all hover:scale-105'>
						<FaPlus className='w-4 h-4' />
						<span>Create Project</span>
					</Link>
				</motion.div>
			) : (
				/* Projects List */
				<div className='space-y-3'>
					{projects.map((project, index) => (
						<motion.div
							key={project.slug}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.05 }}
							className='group relative'>
							<div className='absolute -inset-0.5 bg-linear-to-r from-primary/20 to-secondary/20 rounded-xl blur opacity-0 group-hover:opacity-50 transition duration-300' />
							<div className='relative bg-background/50 backdrop-blur-sm rounded-xl border border-default p-5 hover:border-primary/50 transition-all'>
								<div className='flex items-start justify-between gap-4'>
									{/* Project Info */}
									<div className='flex-1 min-w-0'>
										<div className='flex items-center gap-3 flex-wrap'>
											<h3 className='text-lg font-semibold truncate'>
												{project.title}
											</h3>
											{project.featured && (
												<span className='inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600'>
													<FaStar className='w-3 h-3' />
													Featured
												</span>
											)}
										</div>
										{project.summary && (
											<p className='text-sm text-muted-foreground mt-1 line-clamp-2'>
												{project.summary}
											</p>
										)}
										<div className='flex items-center gap-3 mt-3'>
											<span className='text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded'>
												{project.category.label}
											</span>
											{project.stack && project.stack.length > 0 && (
												<div className='flex flex-wrap gap-1'>
													{project.stack.slice(0, 3).map((tech) => (
														<span
															key={tech}
															className='text-xs px-2 py-0.5 rounded-full bg-muted/50 text-muted-foreground'>
															{tech}
														</span>
													))}
													{project.stack.length > 3 && (
														<span className='text-xs text-muted-foreground'>
															+{project.stack.length - 3}
														</span>
													)}
												</div>
											)}
										</div>
									</div>

									{/* Actions */}
									<div className='flex items-center gap-2 shrink-0'>
										<Link
											href={`/admin/projects/${project.slug}/edit`}
											className='p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-all hover:scale-110'>
											<FaEdit className='w-4 h-4' />
										</Link>
										<button
											onClick={() => handleDelete(project.slug)}
											disabled={deleting === project.slug}
											className='p-2 rounded-lg bg-red-500/10 text-red-600 hover:bg-red-500/20 transition-all hover:scale-110 disabled:opacity-50'>
											{deleting === project.slug ? (
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
