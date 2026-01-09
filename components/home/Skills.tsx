'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { homeContent } from '@/constants/home';
import {
	FaCode,
	FaPalette,
	FaNodeJs,
	FaTools,
	FaDatabase,
	FaPython,
	FaReact,
	FaDocker,
	FaAws,
	FaGitAlt,
	FaCloud,
	FaServer,
} from 'react-icons/fa';

// Icon mapping for skill groups
const getGroupIcon = (title: string, index: number) => {
	// Fallback to specific icons based on content
	if (
		title.includes('Backend') ||
		title.includes('APIs') ||
		title.includes('System Design')
	)
		return FaCode;
	if (title.includes('Frontend') || title.includes('UI Design'))
		return FaPalette;
	if (title.includes('JavaScript') || title.includes('Node.js'))
		return FaNodeJs;
	if (
		title.includes('Tools') ||
		title.includes('Infrastructure') ||
		title.includes('Git')
	)
		return FaTools;
	if (title.includes('Database') || title.includes('PostgreSQL'))
		return FaDatabase;

	// Default icons based on position
	const defaultIcons = [FaCode, FaPalette, FaNodeJs, FaTools];
	return defaultIcons[index % defaultIcons.length];
};

// Icon mapping for skills cloud
const getSkillIcon = (skill: string) => {
	const skillLower = skill.toLowerCase();
	if (skillLower.includes('react')) return FaReact;
	if (skillLower.includes('next')) return FaCode;
	if (skillLower.includes('typescript') || skillLower.includes('javascript'))
		return FaCode;
	if (skillLower.includes('node')) return FaNodeJs;
	if (skillLower.includes('python')) return FaPython;
	if (skillLower.includes('django')) return FaPython;
	if (skillLower.includes('aws')) return FaAws;
	if (skillLower.includes('docker')) return FaDocker;
	if (skillLower.includes('postgres')) return FaDatabase;
	if (skillLower.includes('mongodb')) return FaDatabase;
	if (skillLower.includes('git')) return FaGitAlt;
	if (skillLower.includes('tailwind') || skillLower.includes('css'))
		return FaPalette;
	if (skillLower.includes('cloud')) return FaCloud;
	return FaServer;
};

const Skills = () => {
	const { skills } = homeContent;

	return (
		<section
			id='about'
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
						Skills & <span className='text-primary'>Expertise</span>
					</h2>
					<p className='mt-4 text-lg text-muted-foreground'>{skills.intro}</p>
				</motion.div>

				{/* Skills Grid */}
				<div className='grid gap-6 md:grid-cols-2'>
					{skills.groups.map((group, groupIdx) => {
						const GroupIcon = getGroupIcon(group.title, groupIdx);

						return (
							<motion.div
								key={group.title}
								initial={{ opacity: 0, y: 30, scale: 0.95 }}
								whileInView={{ opacity: 1, y: 0, scale: 1 }}
								viewport={{ once: true, margin: '-50px' }}
								transition={{
									delay: groupIdx * 0.1,
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
								{/* Card background with gradient border */}
								<div className='absolute -inset-0.5 bg-linear-to-r from-primary/30 to-secondary/30 rounded-2xl blur opacity-0 group-hover:opacity-70 transition duration-500' />

								<div className='relative bg-background/50 backdrop-blur-sm rounded-2xl border border-default p-6 h-full'>
									{/* Card header with React Icon */}
									<div className='flex flex-col gap-3 mb-6'>
										<div className='flex items-center gap-3'>
											<div className='p-2 rounded-lg bg-primary/10'>
												<GroupIcon className='w-6 h-6 text-primary' />
											</div>

											<h3 className='text-xl font-semibold'>{group.title}</h3>
										</div>

										{/* Status Badge */}
										{group.status && (
											<div className='flex items-center gap-3'>
												<span className='text-sm font-medium text-muted-foreground'>
													{group.status}:
												</span>

												<span
													className={`px-3 py-1 rounded-full text-xs font-medium ${
														group.status === 'Current'
															? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
															: 'bg-muted text-muted-foreground border border-border'
													}`}>
													{group.statusLabel}
												</span>
											</div>
										)}
									</div>

									{/* Skills list */}
									<ul className='space-y-3'>
										{group.items.map((item, itemIdx) => (
											<motion.li
												key={item}
												initial={{ opacity: 0, x: -10 }}
												whileInView={{ opacity: 1, x: 0 }}
												viewport={{ once: true }}
												transition={{ delay: groupIdx * 0.1 + itemIdx * 0.05 }}
												className='flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors duration-200'>
												<div className='w-2 h-2 rounded-full bg-primary shrink-0' />
												<span className='text-sm md:text-base'>{item}</span>
											</motion.li>
										))}
									</ul>
								</div>
							</motion.div>
						);
					})}
				</div>

				{/* Skills cloud with icons */}
				{skills.skillsCloud && (
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						className='mt-10 flex flex-wrap gap-3 justify-center max-w-4xl mx-auto'>
						{skills.skillsCloud.map((skill, idx) => {
							const SkillIcon = getSkillIcon(skill);

							return (
								<motion.span
									key={skill}
									initial={{ opacity: 0, scale: 0 }}
									whileInView={{ opacity: 1, scale: 1 }}
									viewport={{ once: true }}
									transition={{ delay: idx * 0.03 }}
									whileHover={{ scale: 1.1 }}
									className='px-4 py-2 rounded-full bg-muted/30 text-sm border border-default hover:bg-muted/50 transition-colors cursor-default flex items-center gap-2'>
									<SkillIcon className='w-3 h-3' />
									{skill}
								</motion.span>
							);
						})}
					</motion.div>
				)}

				{/* Call to Action */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 0.4 }}
					className='mt-16 text-center'>
					<Link
						href={skills.cta.href}
						className='inline-flex items-center gap-2 px-8 py-3 rounded-xl border border-default bg-background/50 backdrop-blur-sm hover:bg-muted/50 transition-all hover:gap-3 group'>
						<span className='font-medium'>{skills.cta.label}</span>
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
			</div>
		</section>
	);
};

export default Skills;
