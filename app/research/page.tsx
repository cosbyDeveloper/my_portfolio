// // app/research/page.tsx
// 'use client';

// import { motion } from 'framer-motion';
// import Link from 'next/link';
// import { researchData } from '@/constants/research';
// import {
// 	FaExternalLinkAlt,
// 	FaGithub,
// 	FaChevronRight,
// 	FaCheckCircle,
// 	FaSpinner,
// 	FaRegClock,
// } from 'react-icons/fa';

// export default function ResearchPage() {
// 	const getStatusIcon = (status: string) => {
// 		switch (status) {
// 			case 'active':
// 				return <FaSpinner className='w-4 h-4 text-emerald-500 animate-spin' />;
// 			case 'in-progress':
// 				return <FaRegClock className='w-4 h-4 text-amber-500' />;
// 			case 'completed':
// 				return <FaCheckCircle className='w-4 h-4 text-emerald-500' />;
// 			default:
// 				return null;
// 		}
// 	};

// 	const getStatusText = (status: string) => {
// 		switch (status) {
// 			case 'active':
// 				return 'Active';
// 			case 'in-progress':
// 				return 'In Progress';
// 			case 'completed':
// 				return 'Completed';
// 			case 'proposed':
// 				return 'Proposed';
// 			default:
// 				return status;
// 		}
// 	};

// 	return (
// 		<main className='min-h-screen'>
// 			{/* =====================
//         HERO SECTION
//       ===================== */}
// 			<section className='relative pt-16 lg:pt-24 pb-12 lg:pb-16 px-6 lg:px-12 overflow-hidden'>
// 				<div className='max-w-6xl mx-auto'>
// 					<motion.div
// 						initial={{ opacity: 0, y: 20 }}
// 						animate={{ opacity: 1, y: 0 }}
// 						transition={{ duration: 0.6 }}
// 						className='text-center max-w-3xl mx-auto mb-12'>
// 						<h1 className='text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6'>
// 							{researchData.hero.title.split(' & ')[0]}{' '}
// 							<span className='text-primary'>
// 								{researchData.hero.title.split(' & ')[1]}
// 							</span>
// 						</h1>
// 						<p className='text-xl text-muted-foreground'>
// 							{researchData.hero.subtitle}
// 						</p>
// 					</motion.div>

// 					{/* Description */}
// 					<motion.div
// 						initial={{ opacity: 0, y: 20 }}
// 						animate={{ opacity: 1, y: 0 }}
// 						transition={{ delay: 0.2, duration: 0.6 }}
// 						className='max-w-3xl mx-auto mb-12'>
// 						{researchData.hero.description.map((paragraph, index) => (
// 							<p
// 								key={index}
// 								className='text-lg text-muted-foreground leading-relaxed mb-4'>
// 								{paragraph}
// 							</p>
// 						))}
// 					</motion.div>

// 					{/* Stats */}
// 					<motion.div
// 						initial={{ opacity: 0, y: 20 }}
// 						animate={{ opacity: 1, y: 0 }}
// 						transition={{ delay: 0.3, duration: 0.6 }}
// 						className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto'>
// 						{researchData.hero.stats.map((stat, index) => (
// 							<div
// 								key={index}
// 								className='text-center p-6 rounded-2xl border border-default bg-background/50 backdrop-blur-sm'>
// 								<stat.icon className='w-8 h-8 text-primary mx-auto mb-3' />
// 								<div className='text-2xl font-bold'>{stat.value}</div>
// 								<div className='text-sm text-muted-foreground'>
// 									{stat.label}
// 								</div>
// 							</div>
// 						))}
// 					</motion.div>
// 				</div>
// 			</section>

// 			{/* =====================
//         RESEARCH THEMES
//       ===================== */}
// 			<section className='py-16 lg:py-20 px-6 lg:px-12 bg-muted/30'>
// 				<div className='max-w-6xl mx-auto'>
// 					<motion.div
// 						initial={{ opacity: 0, y: 20 }}
// 						whileInView={{ opacity: 1, y: 0 }}
// 						viewport={{ once: true }}
// 						transition={{ duration: 0.6 }}
// 						className='text-center mb-12'>
// 						<h2 className='text-3xl md:text-4xl font-bold mb-4'>
// 							{researchData.researchThemes.title.split(' ')[0]}{' '}
// 							<span className='text-primary'>
// 								{researchData.researchThemes.title
// 									.split(' ')
// 									.slice(1)
// 									.join(' ')}
// 							</span>
// 						</h2>
// 						<p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
// 							{researchData.researchThemes.subtitle}
// 						</p>
// 					</motion.div>

// 					<div className='grid md:grid-cols-2 gap-6'>
// 						{researchData.researchThemes.items.map((theme, index) => (
// 							<motion.div
// 								key={index}
// 								initial={{ opacity: 0, y: 20 }}
// 								whileInView={{ opacity: 1, y: 0 }}
// 								viewport={{ once: true }}
// 								transition={{ delay: index * 0.1 }}
// 								className='group relative'>
// 								<div className='absolute -inset-0.5 bg-linear-to-r from-primary/30 to-secondary/30 rounded-2xl blur opacity-0 group-hover:opacity-70 transition duration-500' />
// 								<div className='relative bg-background/50 backdrop-blur-sm rounded-2xl border border-default p-6 h-full'>
// 									<div
// 										className={`inline-flex p-3 rounded-xl ${
// 											theme.color === 'primary'
// 												? 'bg-primary/10 text-primary'
// 												: 'bg-secondary/10 text-secondary'
// 										} mb-4`}>
// 										<theme.icon className='w-6 h-6' />
// 									</div>
// 									<h3 className='text-xl font-semibold mb-3'>{theme.title}</h3>
// 									<p className='text-muted-foreground mb-4'>
// 										{theme.description}
// 									</p>
// 									<div className='mt-4'>
// 										<h4 className='text-sm font-semibold mb-2'>Key Areas:</h4>
// 										<ul className='space-y-1'>
// 											{theme.keyAreas.map((area, idx) => (
// 												<li
// 													key={idx}
// 													className='text-sm text-muted-foreground flex items-center gap-2'>
// 													<FaChevronRight className='w-3 h-3 text-primary' />
// 													{area}
// 												</li>
// 											))}
// 										</ul>
// 									</div>
// 								</div>
// 							</motion.div>
// 						))}
// 					</div>
// 				</div>
// 			</section>

// 			{/* =====================
//         PUBLICATIONS
//       ===================== */}
// 			<section className='py-16 lg:py-20 px-6 lg:px-12'>
// 				<div className='max-w-5xl mx-auto'>
// 					<motion.div
// 						initial={{ opacity: 0, y: 20 }}
// 						whileInView={{ opacity: 1, y: 0 }}
// 						viewport={{ once: true }}
// 						transition={{ duration: 0.6 }}
// 						className='text-center mb-12'>
// 						<h2 className='text-3xl md:text-4xl font-bold mb-4'>
// 							<span className='text-primary'>
// 								{researchData.publications.title}
// 							</span>
// 						</h2>
// 						<p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
// 							{researchData.publications.subtitle}
// 						</p>
// 					</motion.div>

// 					<div className='space-y-6'>
// 						{researchData.publications.items.map((pub, index) => (
// 							<motion.div
// 								key={index}
// 								initial={{ opacity: 0, y: 20 }}
// 								whileInView={{ opacity: 1, y: 0 }}
// 								viewport={{ once: true }}
// 								transition={{ delay: index * 0.1 }}
// 								className='group relative'>
// 								<div className='relative bg-background/50 backdrop-blur-sm rounded-2xl border border-default p-6 hover:border-primary/30 transition-colors'>
// 									{/* Status Badge */}
// 									{pub.status && (
// 										<div className='inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-muted/50 mb-3'>
// 											{getStatusIcon(pub.status)}
// 											<span>{getStatusText(pub.status)}</span>
// 										</div>
// 									)}

// 									<h3 className='text-xl font-semibold mb-2'>{pub.title}</h3>
// 									<p className='text-sm text-muted-foreground mb-2'>
// 										{pub.authors}
// 									</p>
// 									<div className='flex flex-wrap gap-3 mb-3'>
// 										<span className='text-sm text-primary'>{pub.venue}</span>
// 										<span className='text-sm text-muted-foreground'>
// 											{pub.year}
// 										</span>
// 										<span className='text-sm text-muted-foreground'>
// 											{pub.type}
// 										</span>
// 									</div>
// 									<p className='text-muted-foreground mb-4'>{pub.abstract}</p>

// 									{/* Keywords */}
// 									{pub.keywords && pub.keywords.length > 0 && (
// 										<div className='flex flex-wrap gap-2 mb-4'>
// 											{pub.keywords.map((keyword, idx) => (
// 												<span
// 													key={idx}
// 													className='px-2 py-1 rounded-md bg-muted/30 text-xs border border-default'>
// 													{keyword}
// 												</span>
// 											))}
// 										</div>
// 									)}

// 									{/* Links */}
// 									{Object.keys(pub.links).length > 0 && (
// 										<div className='flex gap-4'>
// 											{pub.links.paper && (
// 												<Link
// 													href={pub.links.paper}
// 													target='_blank'
// 													className='inline-flex items-center gap-1 text-sm text-primary hover:underline'>
// 													Read Paper <FaExternalLinkAlt className='w-3 h-3' />
// 												</Link>
// 											)}
// 											{pub.links.code && (
// 												<Link
// 													href={pub.links.code}
// 													target='_blank'
// 													className='inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition'>
// 													<FaGithub className='w-3 h-3' /> Code
// 												</Link>
// 											)}
// 										</div>
// 									)}
// 								</div>
// 							</motion.div>
// 						))}
// 					</div>
// 				</div>
// 			</section>

// 			{/* =====================
//         ONGOING RESEARCH
//       ===================== */}
// 			<section className='py-16 lg:py-20 px-6 lg:px-12 bg-muted/30'>
// 				<div className='max-w-5xl mx-auto'>
// 					<motion.div
// 						initial={{ opacity: 0, y: 20 }}
// 						whileInView={{ opacity: 1, y: 0 }}
// 						viewport={{ once: true }}
// 						transition={{ duration: 0.6 }}
// 						className='text-center mb-12'>
// 						<h2 className='text-3xl md:text-4xl font-bold mb-4'>
// 							<span className='text-primary'>
// 								{researchData.ongoingResearch.title}
// 							</span>
// 						</h2>
// 						<p className='text-lg text-muted-foreground'>
// 							{researchData.ongoingResearch.subtitle}
// 						</p>
// 					</motion.div>

// 					<div className='space-y-8'>
// 						{researchData.ongoingResearch.projects.map((project, index) => (
// 							<motion.div
// 								key={index}
// 								initial={{ opacity: 0, y: 20 }}
// 								whileInView={{ opacity: 1, y: 0 }}
// 								viewport={{ once: true }}
// 								transition={{ delay: index * 0.1 }}
// 								className='bg-background rounded-2xl border border-default p-6'>
// 								<div className='flex flex-wrap justify-between items-start gap-4 mb-4'>
// 									<h3 className='text-xl font-semibold'>{project.title}</h3>
// 									<div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-medium'>
// 										{getStatusIcon(project.status)}
// 										<span>{getStatusText(project.status)}</span>
// 									</div>
// 								</div>
// 								<p className='text-muted-foreground mb-4'>
// 									{project.description}
// 								</p>
// 								<div className='flex items-center gap-2 text-sm text-muted-foreground mb-4'>
// 									<FaRegClock className='w-3 h-3' />
// 									<span>{project.timeline}</span>
// 								</div>

// 								{/* Milestones */}
// 								<div>
// 									<h4 className='text-sm font-semibold mb-2'>
// 										Key Milestones:
// 									</h4>
// 									<ul className='space-y-1'>
// 										{project.milestones.map((milestone, idx) => (
// 											<li
// 												key={idx}
// 												className='text-sm text-muted-foreground flex items-start gap-2'>
// 												<FaChevronRight className='w-3 h-3 text-primary mt-1 shrink-0' />
// 												{milestone}
// 											</li>
// 										))}
// 									</ul>
// 								</div>
// 							</motion.div>
// 						))}
// 					</div>
// 				</div>
// 			</section>

// 			{/* =====================
//         RESEARCH TOOLS
//       ===================== */}
// 			<section className='py-16 lg:py-20 px-6 lg:px-12'>
// 				<div className='max-w-6xl mx-auto'>
// 					<motion.div
// 						initial={{ opacity: 0, y: 20 }}
// 						whileInView={{ opacity: 1, y: 0 }}
// 						viewport={{ once: true }}
// 						transition={{ duration: 0.6 }}
// 						className='text-center mb-12'>
// 						<h2 className='text-3xl md:text-4xl font-bold mb-4'>
// 							{researchData.researchTools.title.split(' ')[0]}{' '}
// 							<span className='text-primary'>
// 								{researchData.researchTools.title.split(' ').slice(1).join(' ')}
// 							</span>
// 						</h2>
// 						<p className='text-lg text-muted-foreground'>
// 							{researchData.researchTools.subtitle}
// 						</p>
// 					</motion.div>

// 					<div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
// 						{researchData.researchTools.categories.map((category, index) => (
// 							<motion.div
// 								key={index}
// 								initial={{ opacity: 0, y: 20 }}
// 								whileInView={{ opacity: 1, y: 0 }}
// 								viewport={{ once: true }}
// 								transition={{ delay: index * 0.1 }}
// 								className='bg-background/50 backdrop-blur-sm rounded-2xl border border-default p-6'>
// 								<div className='inline-flex p-2 rounded-lg bg-primary/10 mb-3'>
// 									<category.icon className='w-5 h-5 text-primary' />
// 								</div>
// 								<h3 className='font-semibold mb-3'>{category.name}</h3>
// 								<div className='flex flex-wrap gap-2'>
// 									{category.items.map((item, idx) => (
// 										<span
// 											key={idx}
// 											className='px-2 py-1 rounded-md bg-muted/30 text-xs border border-default'>
// 											{item}
// 										</span>
// 									))}
// 								</div>
// 							</motion.div>
// 						))}
// 					</div>
// 				</div>
// 			</section>

// 			{/* =====================
//         COLLABORATION
//       ===================== */}
// 			<section className='py-16 lg:py-20 px-6 lg:px-12 bg-linear-to-br from-primary/5 to-secondary/5'>
// 				<div className='max-w-6xl mx-auto'>
// 					<motion.div
// 						initial={{ opacity: 0, y: 20 }}
// 						whileInView={{ opacity: 1, y: 0 }}
// 						viewport={{ once: true }}
// 						transition={{ duration: 0.6 }}
// 						className='text-center mb-12'>
// 						<h2 className='text-3xl md:text-4xl font-bold mb-4'>
// 							<span className='text-primary'>
// 								{researchData.collaboration.title}
// 							</span>
// 						</h2>
// 						<p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
// 							{researchData.collaboration.subtitle}
// 						</p>
// 					</motion.div>

// 					<div className='grid md:grid-cols-3 gap-6 mb-12'>
// 						{researchData.collaboration.offerings.map((offering, index) => (
// 							<motion.div
// 								key={index}
// 								initial={{ opacity: 0, y: 20 }}
// 								whileInView={{ opacity: 1, y: 0 }}
// 								viewport={{ once: true }}
// 								transition={{ delay: index * 0.1 }}
// 								className='bg-background rounded-2xl border border-default p-6 text-center'>
// 								<div className='inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-4'>
// 									<offering.icon className='w-6 h-6' />
// 								</div>
// 								<h3 className='text-lg font-semibold mb-2'>{offering.title}</h3>
// 								<p className='text-sm text-muted-foreground'>
// 									{offering.description}
// 								</p>
// 							</motion.div>
// 						))}
// 					</div>

// 					<motion.div
// 						initial={{ opacity: 0, y: 20 }}
// 						whileInView={{ opacity: 1, y: 0 }}
// 						viewport={{ once: true }}
// 						transition={{ delay: 0.3 }}
// 						className='text-center'>
// 						<p className='text-muted-foreground mb-4'>
// 							{researchData.collaboration.contactText}
// 						</p>
// 						<Link
// 							href={researchData.collaboration.contactCta.href}
// 							className='inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition'>
// 							{researchData.collaboration.contactCta.text}
// 						</Link>
// 					</motion.div>
// 				</div>
// 			</section>

// 			{/* =====================
//         CTA SECTION
//       ===================== */}
// 			<section className='py-16 lg:py-20 px-6 lg:px-12'>
// 				<div className='max-w-4xl mx-auto text-center'>
// 					<div className='rounded-2xl border border-default p-8 md:p-12'>
// 						<h2 className='text-3xl md:text-4xl font-bold mb-4'>
// 							{researchData.cta.title}
// 						</h2>
// 						<p className='text-lg text-muted-foreground mb-8'>
// 							{researchData.cta.description}
// 						</p>
// 						<div className='flex flex-col sm:flex-row gap-4 justify-center'>
// 							{researchData.cta.buttons.map((button, index) => (
// 								<Link
// 									key={index}
// 									href={button.href}
// 									target='_blank'
// 									className={`px-8 py-3 rounded-xl font-semibold transition ${
// 										button.variant === 'primary'
// 											? 'bg-primary text-primary-foreground hover:opacity-90'
// 											: 'border border-default hover:bg-muted/50'
// 									}`}>
// 									{button.text}
// 								</Link>
// 							))}
// 						</div>
// 					</div>
// 				</div>
// 			</section>
// 		</main>
// 	);
// }

import React from 'react';

const ResearchPage = () => {
	return <div className='text-3xl p-6 font-bold'>My Research</div>;
};

export default ResearchPage;
