// components/portfolio/ProjectDetailsContent.tsx (Client Component)
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Project, projects } from '@/constants/projects';
import Lightbox from '@/components/shared/Lightbox';
import {
	FaGithub,
	FaExternalLinkAlt,
	FaCalendarAlt,
	FaArrowLeft,
	FaCode,
	FaLightbulb,
	FaCheckCircle,
	FaTools,
	FaRobot,
} from 'react-icons/fa';

interface ProjectDetailsContentProps {
	project: Project;
	screenshots: {
		src: string;
		alt: string;
		caption: string;
	}[];
}

const ProjectDetailsContent = ({
	project,
	screenshots,
}: ProjectDetailsContentProps) => {
	const [lightboxOpen, setLightboxOpen] = useState(false);
	const [lightboxIndex, setLightboxIndex] = useState(0);

	const openLightbox = (index: number) => {
		setLightboxIndex(index);
		setLightboxOpen(true);
	};

	return (
		<main className='min-h-screen'>
			{/* Back Navigation */}
			<div className='sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b border-default'>
				<div className='max-w-6xl mx-auto px-6 lg:px-12 py-4'>
					<Link
						href='/portfolio'
						className='inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors'>
						<FaArrowLeft className='w-3 h-3' />
						<span>Back to Portfolio</span>
					</Link>
				</div>
			</div>

			{/* Hero Section */}
			<section className='pt-12 pb-16 px-6 lg:px-12'>
				<div className='max-w-6xl mx-auto'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className='mb-12'>
						{/* Category & Date */}
						<div className='flex flex-wrap items-center gap-4 mb-6'>
							<span className='px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium'>
								{project.category.label}
							</span>
							<div className='flex items-center gap-2 text-sm text-muted-foreground'>
								<FaCalendarAlt className='w-3 h-3' />
								<span>2024</span>
							</div>
						</div>

						{/* Title */}
						<h1 className='text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6'>
							{project.title}
						</h1>

						{/* Summary */}
						<p className='text-xl text-muted-foreground max-w-3xl mb-8'>
							{project.summary}
						</p>

						{/* Links */}
						<div className='flex flex-wrap gap-4'>
							{project.demoUrl && (
								<a
									href={project.demoUrl}
									target='_blank'
									rel='noopener noreferrer'
									className='inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition'>
									<FaExternalLinkAlt className='w-4 h-4' />
									<span>Live Demo</span>
								</a>
							)}
							{project.repoUrl && (
								<a
									href={project.repoUrl}
									target='_blank'
									rel='noopener noreferrer'
									className='inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-default hover:bg-muted/50 transition'>
									<FaGithub className='w-4 h-4' />
									<span>View Code</span>
								</a>
							)}
						</div>
					</motion.div>

					{/* Main Image */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
						className='relative rounded-2xl overflow-hidden border border-default mb-12'>
						<Image
							src={project.coverImage}
							alt={project.title}
							width={1200}
							height={600}
							className='w-full h-auto object-cover cursor-pointer hover:scale-105 transition-transform duration-300'
							onClick={() => openLightbox(0)}
						/>
						<button
							onClick={() => openLightbox(0)}
							className='absolute top-4 right-4 px-4 py-2 rounded-lg bg-black/50 text-white text-sm backdrop-blur-sm hover:bg-black/70 transition'>
							View Fullscreen
						</button>
					</motion.div>

					{/* Content Grid */}
					<div className='grid lg:grid-cols-3 gap-12'>
						{/* Main Content */}
						<div className='lg:col-span-2'>
							{/* Project Description */}
							<motion.section
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								className='mb-12'>
								<h2 className='text-2xl font-semibold mb-6 flex items-center gap-3'>
									<FaLightbulb className='text-primary' />
									<span>Project Overview</span>
								</h2>
								<div className='prose prose-lg max-w-none'>
									<p className='text-muted-foreground leading-relaxed'>
										{project.description}
									</p>
								</div>
							</motion.section>

							{/* Key Features */}
							<motion.section
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								className='mb-12'>
								<h2 className='text-2xl font-semibold mb-6 flex items-center gap-3'>
									<FaCheckCircle className='text-primary' />
									<span>Technical Implementation</span>
								</h2>
								<div className='space-y-6'>
									<div>
										<h3 className='text-lg font-semibold mb-3 flex items-center gap-2'>
											<FaCode className='text-primary' />
											<span>Technology Stack</span>
										</h3>
										<div className='flex flex-wrap gap-2'>
											{project.stack.map((tech, index) => (
												<span
													key={index}
													className='px-4 py-2 rounded-full bg-muted/50 text-sm border border-default'>
													{tech}
												</span>
											))}
										</div>
									</div>

									{/* Challenges & Solutions */}
									{project.challenges && project.solutions && (
										<div className='grid md:grid-cols-2 gap-6'>
											<div>
												<h4 className='font-semibold mb-3 text-primary'>
													Challenges
												</h4>
												<ul className='space-y-2'>
													{project.challenges.map((challenge, index) => (
														<li key={index} className='flex items-start gap-2'>
															<span className='text-red-500 mt-1'>•</span>
															<span className='text-muted-foreground'>
																{challenge}
															</span>
														</li>
													))}
												</ul>
											</div>
											<div>
												<h4 className='font-semibold mb-3 text-green-500'>
													Solutions
												</h4>
												<ul className='space-y-2'>
													{project.solutions.map((solution, index) => (
														<li key={index} className='flex items-start gap-2'>
															<span className='text-green-500 mt-1'>✓</span>
															<span className='text-muted-foreground'>
																{solution}
															</span>
														</li>
													))}
												</ul>
											</div>
										</div>
									)}
								</div>
							</motion.section>

							{/* Screenshots Gallery */}
							{project.images.length > 0 && (
								<motion.section
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									className='mb-12'>
									<h2 className='text-2xl font-semibold mb-6'>
										Project Screenshots
									</h2>
									<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
										{screenshots.slice(1).map((screenshot, index) => (
											<div
												key={index}
												className='relative rounded-xl overflow-hidden border border-default group cursor-pointer'
												onClick={() => openLightbox(index + 1)}>
												<Image
													src={screenshot.src}
													alt={screenshot.alt}
													width={600}
													height={400}
													className='w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300'
												/>
												<div className='absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center'>
													<div className='opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white'>
														Click to view
													</div>
												</div>
												{screenshot.caption && (
													<div className='absolute bottom-0 left-0 right-0 p-3 bg-linear-to-t from-black/80 to-transparent text-white text-sm'>
														{screenshot.caption}
													</div>
												)}
											</div>
										))}
									</div>
								</motion.section>
							)}

							{/* Lessons Learned */}
							{project.lessons && project.lessons.length > 0 && (
								<motion.section
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}>
									<h2 className='text-2xl font-semibold mb-6 flex items-center gap-3'>
										<FaRobot className='text-primary' />
										<span>Lessons Learned</span>
									</h2>
									<div className='grid md:grid-cols-2 gap-4'>
										{project.lessons.map((lesson, index) => (
											<div
												key={index}
												className='flex items-start gap-3 p-4 rounded-xl bg-muted/30 border border-default'>
												<span className='text-2xl text-primary'>
													{index + 1}
												</span>
												<span className='text-foreground'>{lesson}</span>
											</div>
										))}
									</div>
								</motion.section>
							)}
						</div>

						{/* Sidebar */}
						<div className='space-y-8'>
							{/* Tech Stack Details */}
							<motion.div
								initial={{ opacity: 0, x: 20 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								className='bg-muted/30 rounded-2xl border border-default p-6'>
								<h3 className='text-lg font-semibold mb-4 flex items-center gap-2'>
									<FaTools className='text-primary' />
									<span>Tech Stack Details</span>
								</h3>
								<div className='space-y-4'>
									{project.stack.map((tech, index) => (
										<div
											key={index}
											className='flex items-center justify-between'>
											<span className='text-foreground'>{tech}</span>
											<span className='text-xs text-muted-foreground bg-muted px-2 py-1 rounded'>
												{tech.includes('React') || tech.includes('Next')
													? 'Frontend'
													: tech.includes('Django') || tech.includes('Node')
													? 'Backend'
													: tech.includes('PostgreSQL') ||
													  tech.includes('MongoDB')
													? 'Database'
													: tech.includes('ESP32') || tech.includes('GPS')
													? 'Hardware'
													: 'Tool'}
											</span>
										</div>
									))}
								</div>
							</motion.div>

							{/* Project Metadata */}
							<motion.div
								initial={{ opacity: 0, x: 20 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								transition={{ delay: 0.1 }}
								className='bg-muted/30 rounded-2xl border border-default p-6'>
								<h3 className='text-lg font-semibold mb-4'>Project Details</h3>
								<div className='space-y-4'>
									<div>
										<h4 className='text-sm font-medium text-muted-foreground mb-1'>
											Status
										</h4>
										<div className='flex items-center gap-2'>
											<div className='w-2 h-2 rounded-full bg-green-500'></div>
											<span className='text-foreground'>Completed</span>
										</div>
									</div>
									<div>
										<h4 className='text-sm font-medium text-muted-foreground mb-1'>
											Type
										</h4>
										<p className='text-foreground'>{project.category.label}</p>
									</div>
									<div>
										<h4 className='text-sm font-medium text-muted-foreground mb-1'>
											Complexity
										</h4>
										<div className='flex items-center gap-1'>
											{[1, 2, 3, 4, 5].map((star) => (
												<span
													key={star}
													className={`text-lg ${
														star <=
														(project.stack.length > 8
															? 5
															: project.stack.length > 5
															? 4
															: 3)
															? 'text-yellow-500'
															: 'text-muted-foreground'
													}`}>
													★
												</span>
											))}
											<span className='text-sm text-muted-foreground ml-2'>
												{project.stack.length > 8
													? 'Advanced'
													: project.stack.length > 5
													? 'Intermediate'
													: 'Beginner'}
											</span>
										</div>
									</div>
								</div>
							</motion.div>

							{/* Acknowledgement */}
							{project.acknowledgement && (
								<motion.div
									initial={{ opacity: 0, x: 20 }}
									whileInView={{ opacity: 1, x: 0 }}
									viewport={{ once: true }}
									transition={{ delay: 0.2 }}
									className='bg-muted/30 rounded-2xl border border-default p-6'>
									<h3 className='text-lg font-semibold mb-4'>
										Acknowledgement
									</h3>
									<p className='text-sm text-muted-foreground'>
										{project.acknowledgement}
									</p>
								</motion.div>
							)}

							{/* Related Projects */}
							<RelatedProjects
								currentSlug={project.slug}
								category={project.category.key}
							/>
						</div>
					</div>
				</div>
			</section>

			{/* Lightbox */}
			<Lightbox
				images={screenshots}
				isOpen={lightboxOpen}
				onClose={() => setLightboxOpen(false)}
				initialIndex={lightboxIndex}
			/>
		</main>
	);
};

// Separate component for related projects to keep it clean
function RelatedProjects({
	currentSlug,
	category,
}: {
	currentSlug: string;
	category: string;
}) {
	const relatedProjects = projects
		.filter(
			(p: Project) => p.slug !== currentSlug && p.category.key === category,
		)
		.slice(0, 2);

	if (relatedProjects.length === 0) return null;

	return (
		<motion.div
			initial={{ opacity: 0, x: 20 }}
			whileInView={{ opacity: 1, x: 0 }}
			viewport={{ once: true }}
			transition={{ delay: 0.3 }}
			className='bg-muted/30 rounded-2xl border border-default p-6'>
			<h3 className='text-lg font-semibold mb-4'>Related Projects</h3>
			<div className='space-y-4'>
				{relatedProjects.map((relatedProject: Project) => (
					<Link
						key={relatedProject.slug}
						href={`/portfolio/${relatedProject.slug}`}
						className='block group'>
						<div className='flex items-center gap-3 p-3 rounded-lg border border-default hover:border-primary/50 transition-colors'>
							<div className='relative w-12 h-12 rounded-lg overflow-hidden shrink-0'>
								<Image
									src={relatedProject.coverImage}
									alt={relatedProject.title}
									fill
									className='object-cover group-hover:scale-105 transition-transform'
								/>
							</div>
							<div className='flex-1 min-w-0'>
								<h4 className='font-medium text-sm truncate group-hover:text-primary transition-colors'>
									{relatedProject.title}
								</h4>
								<p className='text-xs text-muted-foreground truncate'>
									{relatedProject.category.label}
								</p>
							</div>
						</div>
					</Link>
				))}
			</div>
			<Link
				href='/portfolio'
				className='inline-block mt-4 text-sm text-primary hover:text-primary/80 transition-colors'>
				View all projects →
			</Link>
		</motion.div>
	);
}

export default ProjectDetailsContent;
