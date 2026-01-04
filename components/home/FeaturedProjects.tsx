// components/home/FeaturedProjects.tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { projects } from '@/constants/projects';
import { homeContent } from '@/constants/home';
import ProjectCard from '../portfolio/ProjectCard';

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
								<ProjectCard
									key={project.slug}
									project={project}
									index={index}
									layout='grid'
									showCategory={true}
									showSummary={true}
									showTechStack={true}
									showLinks={true}
								/>
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
