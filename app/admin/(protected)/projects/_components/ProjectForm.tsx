// app/admin/_components/ProjectForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
	FaSave,
	FaTimes,
	FaUpload,
	FaImage,
	FaTags,
	FaLink,
	FaGithub,
	FaUser,
	FaCalendarAlt,
	FaStar,
	FaSpinner,
	FaTrash,
	FaProjectDiagram,
	FaExclamationTriangle,
	FaLightbulb,
	FaChartLine,
	FaCode,
	FaChevronDown,
	FaChevronUp,
} from 'react-icons/fa';
import { Project } from '@/lib/types';

interface ProjectFormProps {
	initialData?: Project;
	isEditing?: boolean;
}

const CATEGORIES: Array<{
	key: 'cosby' | 'freelance' | 'personal' | 'course';
	label: string;
}> = [
	{ key: 'cosby', label: 'Cosby Technologies Project' },
	{ key: 'freelance', label: 'Freelance Project' },
	{ key: 'personal', label: 'Personal Project' },
	{ key: 'course', label: 'Course Project' },
];

const STATUS_OPTIONS = [
	{ value: 'initial stage', label: 'Initial Stage' },
	{ value: 'in progress', label: 'In Progress' },
	{ value: 'completed', label: 'Completed' },
	{ value: 'on hold', label: 'On Hold' },
];

const COMPLEXITY_OPTIONS = [
	{ value: 'low', label: 'Low' },
	{ value: 'medium', label: 'Medium' },
	{ value: 'high', label: 'High' },
];

function splitLines(value: string) {
	return value
		.split('\n')
		.map((line) => line.trim())
		.filter(Boolean);
}

function formatTechnicalDetails(
	details?: Array<{ title: string; description: string }>,
) {
	return (
		details
			?.map((detail) => {
				const title = detail.title?.trim();
				const description = detail.description?.trim();
				return [title, description].filter(Boolean).join(': ');
			})
			.filter(Boolean)
			.join('\n') || ''
	);
}

function parseTechnicalDetails(value: string) {
	return splitLines(value).map((line, index) => {
		const separatorIndex = line.indexOf(':');
		if (separatorIndex === -1) {
			return {
				title: `Detail ${index + 1}`,
				description: line,
			};
		}

		const title = line.slice(0, separatorIndex).trim();
		const description = line.slice(separatorIndex + 1).trim();

		return {
			title: title || `Detail ${index + 1}`,
			description,
		};
	});
}

export default function ProjectForm({
	initialData,
	isEditing,
}: ProjectFormProps) {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const [uploading, setUploading] = useState(false);
	const [showAdvanced, setShowAdvanced] = useState(false);

	const [formData, setFormData] = useState({
		// Basic fields
		slug: initialData?.slug || '',
		title: initialData?.title || '',
		category: initialData?.category || {
			key: 'personal' as const,
			label: 'Personal Project',
		},
		summary: initialData?.summary || '',
		description: initialData?.description || '',
		stack: initialData?.stack?.join(', ') || '',
		coverImage: initialData?.coverImage || '',
		images: initialData?.images || [],
		demoUrl: initialData?.demoUrl || '',
		repoUrl: initialData?.repoUrl || '',
		featured: initialData?.featured || false,
		role: initialData?.role || '',
		timeline: initialData?.timeline || '',

		// Advanced fields from API
		acknowledgement: initialData?.acknowledgement || '',
		challenges: initialData?.challenges?.join('\n') || '',
		solutions: initialData?.solutions?.join('\n') || '',
		lessons: initialData?.lessons?.join('\n') || '',
		keyFeatures: initialData?.keyFeatures?.join('\n') || '',
		technicalDetails: formatTechnicalDetails(initialData?.technicalDetails),
		status: initialData?.status || 'completed',
		complexity: initialData?.complexity || 'medium',
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

	const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const key = e.target.value as 'cosby' | 'freelance' | 'personal' | 'course';
		const category = CATEGORIES.find((c) => c.key === key)!;
		setFormData((prev) => ({ ...prev, category }));
	};

	const handleFileUpload = async (
		e: React.ChangeEvent<HTMLInputElement>,
		fieldName: 'coverImage' | 'images',
	) => {
		const files = e.target.files;
		if (!files) return;

		setUploading(true);
		try {
			if (fieldName === 'coverImage') {
				const file = files[0];
				const formDataToSend = new FormData();
				formDataToSend.append('file', file);

				const response = await fetch('/api/upload', {
					method: 'POST',
					body: formDataToSend,
				});

				const data = await response.json();
				if (data.success) {
					setFormData((prev) => ({ ...prev, coverImage: data.url }));
				}
			} else if (fieldName === 'images') {
				const uploadedUrls: string[] = [];
				for (let i = 0; i < files.length; i++) {
					const formDataToSend = new FormData();
					formDataToSend.append('file', files[i]);

					const response = await fetch('/api/upload', {
						method: 'POST',
						body: formDataToSend,
					});

					const data = await response.json();
					if (data.success) {
						uploadedUrls.push(data.url);
					}
				}
				setFormData((prev) => ({
					...prev,
					images: [...prev.images, ...uploadedUrls],
				}));
			}
		} catch (err) {
			console.error('Upload failed:', err);
			setError('File upload failed');
		} finally {
			setUploading(false);
		}
	};

	const removeImage = (index: number) => {
		setFormData((prev) => ({
			...prev,
			images: prev.images.filter((_, i) => i !== index),
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');
		setIsLoading(true);

		try {
			const payload = {
				// Basic fields
				slug: formData.slug.trim().toLowerCase(),
				title: formData.title.trim(),
				category: formData.category,
				summary: formData.summary.trim(),
				description: formData.description.trim(),
				stack: formData.stack
					.split(',')
					.map((s) => s.trim())
					.filter(Boolean),
				coverImage: formData.coverImage.trim(),
				images: formData.images,
				demoUrl: formData.demoUrl.trim(),
				repoUrl: formData.repoUrl.trim(),
				featured: formData.featured,
				role: formData.role.trim(),
				timeline: formData.timeline.trim(),

				// Advanced fields
				acknowledgement: formData.acknowledgement.trim(),
				challenges: splitLines(formData.challenges),
				solutions: splitLines(formData.solutions),
				lessons: splitLines(formData.lessons),
				keyFeatures: splitLines(formData.keyFeatures),
				technicalDetails: parseTechnicalDetails(formData.technicalDetails),
				status: formData.status,
				complexity: formData.complexity,
			};

			const method = isEditing ? 'PUT' : 'POST';
			const url = isEditing
				? `/api/admin/projects/${initialData?.slug}`
				: '/api/admin/projects';

			const response = await fetch(url, {
				method,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
				credentials: 'include',
			});

			const data = await response.json();

			if (response.ok) {
				router.push('/admin/projects');
				router.refresh();
			} else {
				setError(data.message || data.error || 'Failed to save project');
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
					<div className='p-2 rounded-lg bg-primary/10'>
						<FaProjectDiagram className='w-6 h-6 text-primary' />
					</div>
					<h1 className='text-3xl font-bold tracking-tight'>
						{isEditing ? 'Edit Project' : 'Create Project'}
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
						className='flex items-center gap-2 px-6 py-2 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all hover:scale-105 active:scale-95 disabled:opacity-50'>
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
				{/* Basic Information Section */}
				<div className='mb-6 pb-4 border-b border-default'>
					<h2 className='text-lg font-semibold mb-4'>Basic Information</h2>
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
								className='w-full px-4 py-2 rounded-xl border border-default bg-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed'
								placeholder='project-slug'
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
								className='w-full px-4 py-2 rounded-xl border border-default bg-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all'
								placeholder='Project Title'
							/>
						</div>

						{/* Category */}
						<div>
							<label className='block text-sm font-medium mb-2'>
								Category <span className='text-red-500'>*</span>
							</label>
							<select
								value={formData.category.key}
								onChange={handleCategoryChange}
								className='w-full px-4 py-2 rounded-xl border border-default bg-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all'>
								{CATEGORIES.map((cat) => (
									<option key={cat.key} value={cat.key}>
										{cat.label}
									</option>
								))}
							</select>
						</div>

						{/* Status */}
						<div>
							<label className='block text-sm font-medium mb-2'>Status</label>
							<select
								name='status'
								value={formData.status}
								onChange={handleChange}
								className='w-full px-4 py-2 rounded-xl border border-default bg-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all'>
								{STATUS_OPTIONS.map((option) => (
									<option key={option.value} value={option.value}>
										{option.label}
									</option>
								))}
							</select>
						</div>

						{/* Complexity */}
						<div>
							<label className='block text-sm font-medium mb-2'>
								Complexity
							</label>
							<select
								name='complexity'
								value={formData.complexity}
								onChange={handleChange}
								className='w-full px-4 py-2 rounded-xl border border-default bg-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all'>
								{COMPLEXITY_OPTIONS.map((option) => (
									<option key={option.value} value={option.value}>
										{option.label}
									</option>
								))}
							</select>
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
									className='w-5 h-5 rounded border-default text-primary focus:ring-primary/20'
								/>
								<span className='text-sm text-muted-foreground'>
									Mark as featured project
								</span>
							</label>
						</div>

						{/* Role */}
						<div>
							<label className='block text-sm font-medium mb-2'>
								<FaUser className='inline w-4 h-4 mr-1' /> Role
							</label>
							<input
								type='text'
								name='role'
								value={formData.role}
								onChange={handleChange}
								className='w-full px-4 py-2 rounded-xl border border-default bg-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all'
								placeholder='Full-Stack Developer'
							/>
						</div>

						{/* Timeline */}
						<div>
							<label className='block text-sm font-medium mb-2'>
								<FaCalendarAlt className='inline w-4 h-4 mr-1' /> Timeline
							</label>
							<input
								type='text'
								name='timeline'
								value={formData.timeline}
								onChange={handleChange}
								className='w-full px-4 py-2 rounded-xl border border-default bg-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all'
								placeholder='3 months'
							/>
						</div>
					</div>
				</div>

				{/* Content Section */}
				<div className='mb-6 pb-4 border-b border-default'>
					<h2 className='text-lg font-semibold mb-4'>Content</h2>

					{/* Summary */}
					<div className='mb-6'>
						<label className='block text-sm font-medium mb-2'>
							Summary <span className='text-red-500'>*</span>
						</label>
						<textarea
							name='summary'
							value={formData.summary}
							onChange={handleChange}
							required
							rows={2}
							className='w-full px-4 py-2 rounded-xl border border-default bg-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none'
							placeholder='Short description of the project...'
						/>
					</div>

					{/* Description */}
					<div className='mb-6'>
						<label className='block text-sm font-medium mb-2'>
							Description <span className='text-red-500'>*</span>
						</label>
						<textarea
							name='description'
							value={formData.description}
							onChange={handleChange}
							required
							rows={4}
							className='w-full px-4 py-2 rounded-xl border border-default bg-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-y'
							placeholder='Detailed description of the project...'
						/>
					</div>

					{/* Stack */}
					<div>
						<label className='block text-sm font-medium mb-2'>
							<FaTags className='inline w-4 h-4 mr-1' /> Stack (comma-separated)
						</label>
						<input
							type='text'
							name='stack'
							value={formData.stack}
							onChange={handleChange}
							className='w-full px-4 py-2 rounded-xl border border-default bg-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all'
							placeholder='Next.js, TypeScript, Tailwind, PostgreSQL'
						/>
					</div>
				</div>

				{/* Media Section */}
				<div className='mb-6 pb-4 border-b border-default'>
					<h2 className='text-lg font-semibold mb-4'>Media</h2>

					{/* URLs */}
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
						<div>
							<label className='block text-sm font-medium mb-2'>
								<FaLink className='inline w-4 h-4 mr-1' /> Demo URL
							</label>
							<input
								type='url'
								name='demoUrl'
								value={formData.demoUrl}
								onChange={handleChange}
								className='w-full px-4 py-2 rounded-xl border border-default bg-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all'
								placeholder='https://example.com'
							/>
						</div>

						<div>
							<label className='block text-sm font-medium mb-2'>
								<FaGithub className='inline w-4 h-4 mr-1' /> Repository URL
							</label>
							<input
								type='url'
								name='repoUrl'
								value={formData.repoUrl}
								onChange={handleChange}
								className='w-full px-4 py-2 rounded-xl border border-default bg-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all'
								placeholder='https://github.com/username/project'
							/>
						</div>
					</div>

					{/* Cover Image */}
					<div className='mb-6'>
						<label className='block text-sm font-medium mb-2'>
							<FaImage className='inline w-4 h-4 mr-1' /> Cover Image{' '}
							<span className='text-red-500'>*</span>
						</label>
						<div className='space-y-3'>
							<div className='flex items-center gap-3'>
								<label className='cursor-pointer'>
									<input
										type='file'
										accept='image/*'
										onChange={(e) => handleFileUpload(e, 'coverImage')}
										disabled={uploading}
										className='hidden'
									/>
									<div className='flex items-center gap-2 px-4 py-2 rounded-xl border border-default hover:bg-muted/50 transition-all'>
										{uploading ? (
											<FaSpinner className='w-4 h-4 animate-spin' />
										) : (
											<FaUpload className='w-4 h-4' />
										)}
										<span>
											{uploading ? 'Uploading...' : 'Upload Cover Image'}
										</span>
									</div>
								</label>
								{formData.coverImage && (
									<span className='text-sm text-green-600 dark:text-green-400'>
										✓ Image uploaded
									</span>
								)}
							</div>
							{formData.coverImage && (
								<div className='text-sm text-muted-foreground break-all'>
									{formData.coverImage.split('/').pop()}
								</div>
							)}
						</div>
					</div>

					{/* Project Images */}
					<div>
						<label className='block text-sm font-medium mb-2'>
							<FaImage className='inline w-4 h-4 mr-1' /> Project Images
						</label>
						<div className='space-y-3'>
							<label className='cursor-pointer'>
								<input
									type='file'
									multiple
									accept='image/*'
									onChange={(e) => handleFileUpload(e, 'images')}
									disabled={uploading}
									className='hidden'
								/>
								<div className='inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-default hover:bg-muted/50 transition-all'>
									<FaUpload className='w-4 h-4' />
									<span>Upload Images</span>
								</div>
							</label>
							{formData.images.length > 0 && (
								<div className='space-y-2'>
									{formData.images.map((img, idx) => (
										<div
											key={idx}
											className='flex items-center justify-between bg-muted/30 rounded-lg p-2'>
											<span className='text-sm text-muted-foreground truncate flex-1'>
												{img.split('/').pop()}
											</span>
											<button
												type='button'
												onClick={() => removeImage(idx)}
												className='p-1 rounded-lg text-red-600 hover:bg-red-500/10 transition-all'>
												<FaTrash className='w-3 h-3' />
											</button>
										</div>
									))}
								</div>
							)}
						</div>
					</div>
				</div>

				{/* Advanced Details - Collapsible */}
				<div>
					<button
						type='button'
						onClick={() => setShowAdvanced(!showAdvanced)}
						className='flex items-center justify-between w-full py-3 text-left'>
						<div className='flex items-center gap-2'>
							<FaCode className='w-4 h-4 text-primary' />
							<span className='font-semibold'>Advanced Project Details</span>
						</div>
						{showAdvanced ? <FaChevronUp /> : <FaChevronDown />}
					</button>

					<AnimatePresence>
						{showAdvanced && (
							<motion.div
								initial={{ opacity: 0, height: 0 }}
								animate={{ opacity: 1, height: 'auto' }}
								exit={{ opacity: 0, height: 0 }}
								transition={{ duration: 0.3 }}
								className='overflow-hidden'>
								<div className='pt-4 space-y-6'>
									{/* Key Features */}
									<div>
										<label className='block text-sm font-medium mb-2'>
											<FaStar className='inline w-4 h-4 mr-1' /> Key Features
											(one per line)
										</label>
										<textarea
											name='keyFeatures'
											value={formData.keyFeatures}
											onChange={handleChange}
											rows={3}
											className='w-full px-4 py-2 rounded-xl border border-default bg-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-mono text-sm'
											placeholder='User authentication&#10;Real-time chat&#10;Payment integration'
										/>
									</div>

									{/* Technical Details */}
									<div>
										<label className='block text-sm font-medium mb-2'>
											<FaCode className='inline w-4 h-4 mr-1' /> Technical
											Details (Title: description per line)
										</label>
										<textarea
											name='technicalDetails'
											value={formData.technicalDetails}
											onChange={handleChange}
											rows={3}
											className='w-full px-4 py-2 rounded-xl border border-default bg-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-mono text-sm'
											placeholder='Frontend Architecture: Built with Next.js and TypeScript&#10;Backend Services: API routes with MongoDB persistence'
										/>
									</div>

									{/* Challenges */}
									<div>
										<label className='block text-sm font-medium mb-2'>
											<FaExclamationTriangle className='inline w-4 h-4 mr-1' />{' '}
											Challenges Faced (one per line)
										</label>
										<textarea
											name='challenges'
											value={formData.challenges}
											onChange={handleChange}
											rows={3}
											className='w-full px-4 py-2 rounded-xl border border-default bg-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-mono text-sm'
											placeholder='Scaling database for high traffic&#10;Real-time synchronization issues'
										/>
									</div>

									{/* Solutions */}
									<div>
										<label className='block text-sm font-medium mb-2'>
											<FaLightbulb className='inline w-4 h-4 mr-1' /> Solutions
											Implemented (one per line)
										</label>
										<textarea
											name='solutions'
											value={formData.solutions}
											onChange={handleChange}
											rows={3}
											className='w-full px-4 py-2 rounded-xl border border-default bg-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-mono text-sm'
											placeholder='Implemented database indexing&#10;Used Redis for caching'
										/>
									</div>

									{/* Lessons Learned */}
									<div>
										<label className='block text-sm font-medium mb-2'>
											<FaChartLine className='inline w-4 h-4 mr-1' /> Lessons
											Learned (one per line)
										</label>
										<textarea
											name='lessons'
											value={formData.lessons}
											onChange={handleChange}
											rows={3}
											className='w-full px-4 py-2 rounded-xl border border-default bg-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-mono text-sm'
											placeholder='Always plan for scaling from day one&#10;Comprehensive testing saves time'
										/>
									</div>

									{/* Acknowledgements */}
									<div>
										<label className='block text-sm font-medium mb-2'>
											Acknowledgements
										</label>
										<textarea
											name='acknowledgement'
											value={formData.acknowledgement}
											onChange={handleChange}
											rows={2}
											className='w-full px-4 py-2 rounded-xl border border-default bg-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all'
											placeholder='Special thanks to...'
										/>
									</div>
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</div>
		</motion.form>
	);
}
