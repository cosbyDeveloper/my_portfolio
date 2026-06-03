'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import BlogForm from '../../_components/BlogForm';
import { BlogPost } from '@/lib/types';
import { FaSpinner } from 'react-icons/fa';

export default function EditBlogPage() {
	const params = useParams();
	const slug = params.slug as string;
	const [blog, setBlog] = useState<BlogPost | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetchBlog();
	}, [slug]);

	const fetchBlog = async () => {
		try {
			const response = await fetch(`/api/admin/blogs/${slug}`, {
				credentials: 'include',
			});
			if (response.ok) {
				const data = await response.json();
				setBlog(data.data);
			}
		} catch (err) {
			console.error('Failed to load blog:', err);
		} finally {
			setIsLoading(false);
		}
	};

	if (isLoading) {
		return (
			<div className='flex items-center justify-center h-64'>
				<div className='text-center'>
					<FaSpinner className='w-8 h-8 text-secondary animate-spin mx-auto mb-4' />
					<p className='text-muted-foreground'>Loading blog...</p>
				</div>
			</div>
		);
	}

	if (!blog) {
		return (
			<div className='rounded-xl bg-red-500/10 border border-red-500/20 p-4 text-center'>
				<p className='text-red-600 dark:text-red-400'>Blog not found</p>
			</div>
		);
	}

	return (
		<div>
			<BlogForm initialData={blog} isEditing />
		</div>
	);
}
