// app/admin/(protected)/projects/[slug]/edit/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ProjectForm from '../../_components/ProjectForm';
import { Project } from '@/lib/types';
import { FaSpinner } from 'react-icons/fa';

export default function EditProjectPage() {
	const params = useParams();
	const slug = params.slug as string;
	const [project, setProject] = useState<Project | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetchProject();
	}, [slug]);

	const fetchProject = async () => {
		try {
			const response = await fetch(`/api/admin/projects/${slug}`, {
				credentials: 'include',
			});
			if (response.ok) {
				const data = await response.json();
				setProject(data.data);
			}
		} catch (err) {
			console.error('Failed to load project:', err);
		} finally {
			setIsLoading(false);
		}
	};

	if (isLoading) {
		return (
			<div className='flex items-center justify-center h-64'>
				<div className='text-center'>
					<FaSpinner className='w-8 h-8 text-primary animate-spin mx-auto mb-4' />
					<p className='text-muted-foreground'>Loading project...</p>
				</div>
			</div>
		);
	}

	if (!project) {
		return (
			<div className='rounded-xl bg-red-500/10 border border-red-500/20 p-4 text-center'>
				<p className='text-red-600 dark:text-red-400'>Project not found</p>
			</div>
		);
	}

	return (
		<div>
			<ProjectForm initialData={project} isEditing />
		</div>
	);
}
