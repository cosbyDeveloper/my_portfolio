// components/home/FeaturedProjects.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { projects } from '@/constants/projects';
import { homeContent } from '@/constants/home';

const FeaturedProjects = () => {
	const { featuredProjects } = homeContent;
	const featuredProjectsData = projects
		.filter((project) => project.featured)
		.slice(0, featuredProjects.limit);

	return (
		<section
			id='portfolio'
			className='relative pt-16 lg:pt-24 pb-6 lg:pb-12 px-6 lg:px-12 overflow-hidden'>
			<div className='relative mx-auto max-w-6xl'>
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: '-100px' }}
					transition={{ duration: 0.6 }}
					className='mb-16 lg:text-center max-w-3xl mx-auto'>
					<h2 className='text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight'>
						Featured <span className='text-primary'>Projects</span>
					</h2>
					<p className='mt-4 text-lg text-muted-foreground'>
						A selection of products and systems I have built across Cosby
						Technologies, freelance work, and experimental engineering.
					</p>
				</motion.div>

				{/* Projects Grid */}
				{featuredProjectsData.length === 0 ? (
					<div className='rounded-2xl border border-default p-8 text-center'>
						<p className='text-muted-foreground text-lg mb-2'>
							No featured projects yet
						</p>
						<p className='text-sm text-muted-foreground/60'>
							I&apos;m currently working on some great projects. Stay tuned!
						</p>
						<Link
							href='/contact'
							className='inline-block mt-4 text-sm text-primary hover:text-primary/80 transition-colors'>
							Have a project idea? →
						</Link>
					</div>
				) : (
					<>
						<div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
							{featuredProjectsData.map((project, index) => (
								<motion.div
									key={project.slug}
									initial={{ opacity: 0, y: 30, scale: 0.95 }}
									whileInView={{ opacity: 1, y: 0, scale: 1 }}
									viewport={{ once: true, margin: '-50px' }}
									transition={{
										delay: index * 0.1,
										duration: 0.5,
										type: 'spring',
										stiffness: 100,
									}}
									whileHover={{
										y: -8,
										scale: 1.02,
										transition: { duration: 0.2 },
									}}
									className='group relative'>
									{/* Gradient border */}
									<div className='absolute -inset-0.5 bg-linear-to-r from-primary/30 to-secondary/30 rounded-2xl blur opacity-0 group-hover:opacity-70 transition duration-500' />

									<div className='relative bg-background/50 backdrop-blur-sm rounded-2xl border border-default overflow-hidden h-full flex flex-col'>
										{/* Project Image */}
										<div className='relative h-48 overflow-hidden'>
											<Image
												src={
													project.coverImage ||
													'/images/project-placeholder.jpg'
												}
												alt={project.title}
												fill
												className='object-cover group-hover:scale-105 transition-transform duration-300'
											/>
											{/* Category badge */}
											<div className='absolute top-4 left-4'>
												<span
													className={`px-3 py-1 rounded-full text-xs font-medium ${
														project.category.key === 'cosby'
															? 'bg-primary/70 text-white'
															: project.category.key === 'freelance'
															? 'bg-orange-500/70 text-white'
															: project.category.key === 'personal'
															? 'bg-green-500/70 text-white'
															: 'bg-purple-500/70 text-white'
													}`}>
													{project.category.label}
												</span>
											</div>
										</div>

										{/* Project Content */}
										<div className='p-6 flex-1 flex flex-col'>
											<h3 className='text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-200'>
												{project.title}
											</h3>

											<p className='text-muted-foreground mb-4 flex-1 line-clamp-3'>
												{project.summary}
											</p>

											{/* Tech Stack */}
											<div className='mt-4 flex flex-wrap gap-2'>
												{project.stack.slice(0, 3).map((tech) => (
													<span
														key={tech}
														className='px-3 py-1 rounded-full bg-muted/30 text-xs border border-default text-muted-foreground'>
														{tech}
													</span>
												))}
												{project.stack.length > 3 && (
													<span className='px-3 py-1 rounded-full bg-muted/30 text-xs border border-default text-muted-foreground'>
														+{project.stack.length - 3} more
													</span>
												)}
											</div>

											{/* Links */}
											<div className='mt-6 pt-4 border-t border-subtle flex items-center justify-between'>
												<Link
													href={`/portfolio/${project.slug}`}
													className='text-sm font-medium text-primary hover:text-primary/80 transition-colors'>
													View details
												</Link>
												<div className='flex items-center gap-3'>
													{project.demoUrl && (
														<Link
															href={project.demoUrl}
															target='_blank'
															rel='noopener noreferrer'
															className='text-xs text-muted-foreground hover:text-foreground transition-colors'>
															Live Demo
														</Link>
													)}
													{project.repoUrl && (
														<Link
															href={project.repoUrl}
															target='_blank'
															rel='noopener noreferrer'
															className='text-xs text-muted-foreground hover:text-foreground transition-colors'>
															Code
														</Link>
													)}
												</div>
											</div>
										</div>
									</div>
								</motion.div>
							))}
						</div>

						{/* CTA */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.4 }}
							className='mt-16 text-center'>
							<Link
								href={featuredProjects.cta.href}
								className='inline-flex items-center gap-2 px-8 py-3 rounded-xl border border-default bg-background/50 backdrop-blur-sm hover:bg-muted/50 transition-all hover:gap-3 group'>
								<span className='font-medium'>
									{featuredProjects.cta.label}
								</span>
								<svg
									className='w-4 h-4 transition-transform group-hover:translate-x-1'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M14 5l7 7m0 0l-7 7m7-7H3'
									/>
								</svg>
							</Link>
						</motion.div>
					</>
				)}
			</div>
		</section>
	);
};

export default FeaturedProjects;
