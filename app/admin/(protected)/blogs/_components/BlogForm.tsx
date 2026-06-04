// app/admin/(protected)/blogs/_components/BlogForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
	FaSave,
	FaTimes,
	FaUpload,
	FaImage,
	FaTags,
	FaUser,
	FaClock,
	FaStar,
	FaSpinner,
	FaBlog,
	FaSearch,
	FaCode,
} from 'react-icons/fa';
import { BlogPost } from '@/lib/types';

interface BlogFormProps {
	initialData?: BlogPost;
	isEditing?: boolean;
}

function toDateInputValue(value?: string | Date) {
	if (!value) return '';
	if (value instanceof Date) return value.toISOString().split('T')[0];
	return value.includes('T') ? value.split('T')[0] : value;
}

export default function BlogForm({ initialData, isEditing }: BlogFormProps) {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [uploading, setUploading] = useState(false);
	const [error, setError] = useState('');
	const [formData, setFormData] = useState({
		slug: initialData?.slug || '',
		title: initialData?.title || '',
		excerpt: initialData?.excerpt || '',
		content: initialData?.content || '',
		htmlContent: initialData?.htmlContent || '',
		jsonContent: initialData?.jsonContent
			? JSON.stringify(initialData.jsonContent, null, 2)
			: '',
		date:
			toDateInputValue(initialData?.date) ||
			new Date().toISOString().split('T')[0],
		tags: initialData?.tags?.join(', ') || '',
		image: initialData?.image || '',
		author: initialData?.author || 'Godfred Awusi',
		readTime: initialData?.readTime || '',
		featured: initialData?.featured || false,
		metaDescription: initialData?.metaDescription || '',
		category: initialData?.category || '',
		published: initialData?.published ?? true,
		seoTitle: initialData?.seoTitle || '',
		seoDescription: initialData?.seoDescription || '',
		updatedAt: toDateInputValue(initialData?.updatedAt),
	});

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>,
	) => {
		const { name, value, type } = e.target;
		if (type === 'checkbox') {
			setFormData((prev) => ({
				...prev,
				[name]: (e.target as HTMLInputElement).checked,
			}));
		} else {
			setFormData((prev) => ({ ...prev, [name]: value }));
		}
	};

	const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		setUploading(true);
		try {
			const formDataToSend = new FormData();
			formDataToSend.append('file', file);

			const response = await fetch('/api/upload', {
				method: 'POST',
				body: formDataToSend,
			});

			const data = await response.json();
			if (data.success) {
				setFormData((prev) => ({ ...prev, image: data.url }));
			}
		} catch (err) {
			console.error('Upload failed:', err);
			setError('File upload failed');
		} finally {
			setUploading(false);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');
		setIsLoading(true);

		try {
			let parsedJsonContent: unknown = undefined;
			if (formData.jsonContent.trim()) {
				try {
					parsedJsonContent = JSON.parse(formData.jsonContent);
				} catch {
					setError('JSON content must be valid JSON');
					setIsLoading(false);
					return;
				}
			}

			const payload = {
				slug: formData.slug.trim().toLowerCase(),
				title: formData.title.trim(),
				excerpt: formData.excerpt.trim(),
				content: formData.content.trim() || formData.htmlContent.trim(),
				htmlContent: formData.htmlContent.trim(),
				jsonContent: parsedJsonContent,
				date: formData.date,
				tags: formData.tags
					.split(',')
					.map((t) => t.trim())
					.filter(Boolean),
				image: formData.image.trim(),
				author: formData.author.trim(),
				readTime: formData.readTime.trim(),
				featured: formData.featured,
				metaDescription: formData.metaDescription.trim(),
				category: formData.category.trim(),
				published: formData.published,
				seoTitle: formData.seoTitle.trim(),
				seoDescription: formData.seoDescription.trim(),
				updatedAt: formData.updatedAt,
			};

			const method = isEditing ? 'PUT' : 'POST';
			const url = isEditing
				? `/api/admin/blogs/${initialData?.slug}`
				: '/api/admin/blogs';

			const response = await fetch(url, {
				method,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
				credentials: 'include',
			});

			const data = await response.json();

			if (response.ok) {
				router.push('/admin/blogs');
				router.refresh();
			} else {
				setError(data.message || data.error || 'Failed to save blog');
			}
		} catch (err) {
			setError('An error occurred');
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<motion.form
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6 }}
			onSubmit={handleSubmit}
			className='max-w-4xl'>
			{/* Header */}
			<div className='flex items-center justify-between mb-6'>
				<div className='flex items-center gap-3'>
					<div className='p-2 rounded-lg bg-secondary/10'>
						<FaBlog className='w-6 h-6 text-secondary' />
					</div>
					<h1 className='text-3xl font-bold tracking-tight'>
						{isEditing ? 'Edit Blog Post' : 'Create Blog Post'}
					</h1>
				</div>
				<div className='flex gap-3'>
					<button
						type='button'
						onClick={() => router.back()}
						className='flex items-center gap-2 px-4 py-2 rounded-xl border border-default hover:bg-muted/50 transition-all hover:scale-105 active:scale-95'>
						<FaTimes className='w-4 h-4' />
						<span>Cancel</span>
					</button>
					<button
						type='submit'
						disabled={isLoading || uploading}
						className='flex items-center gap-2 px-6 py-2 rounded-xl bg-secondary text-secondary-foreground font-semibold hover:opacity-90 transition-all hover:scale-105 active:scale-95 disabled:opacity-50'>
						{isLoading ? (
							<>
								<FaSpinner className='w-4 h-4 animate-spin' />
								<span>Saving...</span>
							</>
						) : (
							<>
								<FaSave className='w-4 h-4' />
								<span>{isEditing ? 'Update' : 'Create'}</span>
							</>
						)}
					</button>
				</div>
			</div>

			{/* Error Message */}
			{error && (
				<motion.div
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					className='mb-6 rounded-xl bg-red-500/10 border border-red-500/20 p-4'>
					<p className='text-red-600 dark:text-red-400 text-sm'>{error}</p>
				</motion.div>
			)}

			{/* Form Content */}
			<div className='relative bg-background/50 backdrop-blur-sm rounded-2xl border border-default p-6'>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					{/* Slug */}
					<div>
						<label className='block text-sm font-medium mb-2'>
							Slug <span className='text-red-500'>*</span>
						</label>
						<input
							type='text'
							name='slug'
							value={formData.slug}
							onChange={handleChange}
							required
							disabled={isEditing}
							className='w-full px-4 py-2 rounded-xl border border-default bg-background focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed'
							placeholder='blog-slug'
						/>
					</div>

					{/* Title */}
					<div>
						<label className='block text-sm font-medium mb-2'>
							Title <span className='text-red-500'>*</span>
						</label>
						<input
							type='text'
							name='title'
							value={formData.title}
							onChange={handleChange}
							required
							className='w-full px-4 py-2 rounded-xl border border-default bg-background focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all'
							placeholder='Blog Title'
						/>
					</div>

					{/* Date */}
					<div>
						<label className='block text-sm font-medium mb-2'>
							Date <span className='text-red-500'>*</span>
						</label>
						<input
							type='date'
							name='date'
							value={formData.date}
							onChange={handleChange}
							required
							className='w-full px-4 py-2 rounded-xl border border-default bg-background focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all'
						/>
					</div>

					{/* Read Time */}
					<div>
						<label className='block text-sm font-medium mb-2'>
							<FaClock className='inline w-4 h-4 mr-1' /> Read Time{' '}
							<span className='text-red-500'>*</span>
						</label>
						<input
							type='text'
							name='readTime'
							value={formData.readTime}
							onChange={handleChange}
							required
							className='w-full px-4 py-2 rounded-xl border border-default bg-background focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all'
							placeholder='5 min read'
						/>
					</div>

					{/* Author */}
					<div>
						<label className='block text-sm font-medium mb-2'>
							<FaUser className='inline w-4 h-4 mr-1' /> Author{' '}
							<span className='text-red-500'>*</span>
						</label>
						<input
							type='text'
							name='author'
							value={formData.author}
							onChange={handleChange}
							required
							className='w-full px-4 py-2 rounded-xl border border-default bg-background focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all'
							placeholder='Author Name'
						/>
					</div>

					{/* Category */}
					<div>
						<label className='block text-sm font-medium mb-2'>
							<FaTags className='inline w-4 h-4 mr-1' /> Category
						</label>
						<input
							type='text'
							name='category'
							value={formData.category}
							onChange={handleChange}
							className='w-full px-4 py-2 rounded-xl border border-default bg-background focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all'
							placeholder='Engineering'
						/>
					</div>

					{/* Featured */}
					<div>
						<label className='block text-sm font-medium mb-2'>
							<FaStar className='inline w-4 h-4 mr-1' /> Featured
						</label>
						<label className='flex items-center gap-3 cursor-pointer'>
							<input
								type='checkbox'
								name='featured'
								checked={formData.featured}
								onChange={handleChange}
								className='w-5 h-5 rounded border-default text-secondary focus:ring-secondary/20'
							/>
							<span className='text-sm text-muted-foreground'>
								Mark as featured blog
							</span>
						</label>
					</div>

					{/* Published */}
					<div>
						<label className='block text-sm font-medium mb-2'>Published</label>
						<label className='flex items-center gap-3 cursor-pointer'>
							<input
								type='checkbox'
								name='published'
								checked={formData.published}
								onChange={handleChange}
								className='w-5 h-5 rounded border-default text-secondary focus:ring-secondary/20'
							/>
							<span className='text-sm text-muted-foreground'>
								Show this post publicly
							</span>
						</label>
					</div>
				</div>

				{/* Image Upload */}
				<div className='mt-6'>
					<label className='block text-sm font-medium mb-2'>
						<FaImage className='inline w-4 h-4 mr-1' /> Blog Image
					</label>
					<div className='space-y-3'>
						<div className='flex items-center gap-3'>
							<label className='cursor-pointer'>
								<input
									type='file'
									accept='image/*'
									onChange={handleFileUpload}
									disabled={uploading}
									className='hidden'
								/>
								<div className='flex items-center gap-2 px-4 py-2 rounded-xl border border-default hover:bg-muted/50 transition-all'>
									{uploading ? (
										<FaSpinner className='w-4 h-4 animate-spin' />
									) : (
										<FaUpload className='w-4 h-4' />
									)}
									<span>{uploading ? 'Uploading...' : 'Upload Image'}</span>
								</div>
							</label>
							{formData.image && (
								<span className='text-sm text-green-600 dark:text-green-400'>
									✓ Image uploaded
								</span>
							)}
						</div>
						{formData.image && (
							<div className='text-sm text-muted-foreground break-all'>
								{formData.image.split('/').pop()}
							</div>
						)}
					</div>
				</div>

				{/* Tags */}
				<div className='mt-6'>
					<label className='block text-sm font-medium mb-2'>
						<FaTags className='inline w-4 h-4 mr-1' /> Tags (comma-separated)
					</label>
					<input
						type='text'
						name='tags'
						value={formData.tags}
						onChange={handleChange}
						className='w-full px-4 py-2 rounded-xl border border-default bg-background focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all'
						placeholder='React, TypeScript, Next.js'
					/>
				</div>

				{/* Excerpt */}
				<div className='mt-6'>
					<label className='block text-sm font-medium mb-2'>
						Excerpt <span className='text-red-500'>*</span>
					</label>
					<textarea
						name='excerpt'
						value={formData.excerpt}
						onChange={handleChange}
						required
						rows={3}
						className='w-full px-4 py-2 rounded-xl border border-default bg-background focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all resize-none'
						placeholder='Short summary of the blog post...'
					/>
				</div>

				{/* Content */}
				<div className='mt-6'>
					<label className='block text-sm font-medium mb-2'>
						Content <span className='text-red-500'>*</span>
					</label>
					<textarea
						name='content'
						value={formData.content}
						onChange={handleChange}
						required
						rows={12}
						className='w-full px-4 py-2 rounded-xl border border-default bg-background focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all font-mono text-sm resize-y'
						placeholder='Blog content (markdown supported)...'
					/>
					<p className='text-xs text-muted-foreground mt-2'>
						HTML formatting is supported
					</p>
				</div>

				{/* HTML Content */}
				<div className='mt-6'>
					<label className='block text-sm font-medium mb-2'>
						<FaCode className='inline w-4 h-4 mr-1' /> HTML Content
					</label>
					<textarea
						name='htmlContent'
						value={formData.htmlContent}
						onChange={handleChange}
						rows={6}
						className='w-full px-4 py-2 rounded-xl border border-default bg-background focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all font-mono text-sm resize-y'
						placeholder='Optional rendered HTML content'
					/>
				</div>

				{/* JSON Content */}
				<div className='mt-6'>
					<label className='block text-sm font-medium mb-2'>
						<FaCode className='inline w-4 h-4 mr-1' /> JSON Content
					</label>
					<textarea
						name='jsonContent'
						value={formData.jsonContent}
						onChange={handleChange}
						rows={6}
						className='w-full px-4 py-2 rounded-xl border border-default bg-background focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all font-mono text-sm resize-y'
						placeholder='Optional structured editor JSON'
					/>
				</div>

				{/* SEO */}
				<div className='mt-6 pt-6 border-t border-default'>
					<h2 className='text-lg font-semibold mb-4 flex items-center gap-2'>
						<FaSearch className='w-4 h-4 text-secondary' />
						<span>SEO & Metadata</span>
					</h2>
					<div className='space-y-6'>
						<div>
							<label className='block text-sm font-medium mb-2'>
								Meta Description
							</label>
							<textarea
								name='metaDescription'
								value={formData.metaDescription}
								onChange={handleChange}
								rows={3}
								className='w-full px-4 py-2 rounded-xl border border-default bg-background focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all resize-none'
								placeholder='Short search/social description'
							/>
						</div>

						<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							<div>
								<label className='block text-sm font-medium mb-2'>
									SEO Title
								</label>
								<input
									type='text'
									name='seoTitle'
									value={formData.seoTitle}
									onChange={handleChange}
									className='w-full px-4 py-2 rounded-xl border border-default bg-background focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all'
									placeholder='Optional SEO title'
								/>
							</div>

							<div>
								<label className='block text-sm font-medium mb-2'>
									Updated At
								</label>
								<input
									type='date'
									name='updatedAt'
									value={formData.updatedAt}
									onChange={handleChange}
									className='w-full px-4 py-2 rounded-xl border border-default bg-background focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all'
								/>
							</div>
						</div>

						<div>
							<label className='block text-sm font-medium mb-2'>
								SEO Description
							</label>
							<textarea
								name='seoDescription'
								value={formData.seoDescription}
								onChange={handleChange}
								rows={3}
								className='w-full px-4 py-2 rounded-xl border border-default bg-background focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all resize-none'
								placeholder='Optional SEO-specific description'
							/>
						</div>
					</div>
				</div>
			</div>
		</motion.form>
	);
}
