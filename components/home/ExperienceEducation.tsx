'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { homeContent } from '@/constants/home';
import { FaBriefcase, FaGraduationCap, FaCalendarAlt } from 'react-icons/fa';

const ExperienceEducation = () => {
	const { experienceEducation } = homeContent;

	return (
		<section
			id='resume'
			className='relative pt-16 lg:pt-24 pb-6 lg:pb-12 px-6 lg:px-12 overflow-hidden scroll-mt-20'
			aria-labelledby='experience-heading'>
			<div className='relative mx-auto max-w-6xl'>
				{/* Header - Matches Skills section */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: '-100px' }}
					transition={{ duration: 0.6 }}
					className='mb-16 lg:text-center max-w-3xl mx-auto'>
					<h2
						id='experience-heading'
						className='text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight'>
						Experience & <span className='text-primary'>Education</span>
					</h2>
					<p className='mt-4 text-lg text-muted-foreground'>
						{experienceEducation.intro}
					</p>
				</motion.div>

				{/* Content Grid - Matches Skills grid styling */}
				<div className='grid gap-6 md:grid-cols-2'>
					{/* Experience Card */}
					<motion.div
						key='experience'
						initial={{ opacity: 0, y: 30, scale: 0.95 }}
						whileInView={{ opacity: 1, y: 0, scale: 1 }}
						viewport={{ once: true, margin: '-50px' }}
						transition={{
							delay: 0,
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
						{/* Gradient border - Same as Skills */}
						<div className='absolute -inset-0.5 bg-linear-to-r from-primary/30 to-secondary/30 rounded-2xl blur opacity-0 group-hover:opacity-70 transition duration-500' />

						<div className='relative bg-background/50 backdrop-blur-sm rounded-2xl border border-default p-6 h-full'>
							{/* Card header - Same icon styling as Skills */}
							<div className='flex items-center gap-3 mb-6'>
								<div className='p-2 rounded-lg bg-primary/10'>
									<FaBriefcase className='w-6 h-6 text-primary' />
								</div>
								<h3 className='text-xl font-semibold'>Experience</h3>
							</div>

							{/* Experience items */}
							{experienceEducation.experience.map((item, itemIdx) => (
								<div key={item.role} className='mb-6 last:mb-0'>
									{/* Role and company with icons */}
									<motion.div
										initial={{ opacity: 0, y: 10 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true }}
										transition={{ delay: itemIdx * 0.1 }}
										className='space-y-2'>
										<h4 className='text-lg font-semibold'>{item.role}</h4>
										<div className='flex flex-wrap items-center gap-4 text-muted-foreground'>
											<div className='flex items-center gap-1'>
												<FaBriefcase className='w-3 h-3' />
												<span className='text-sm'>{item.company}</span>
											</div>
											<div className='flex items-center gap-1'>
												<FaCalendarAlt className='w-3 h-3' />
												<span className='text-sm'>{item.period}</span>
											</div>
										</div>
									</motion.div>

									{/* Highlights - Same styling as Skills list */}
									<ul className='mt-4 space-y-2'>
										{item.highlights.map((point, pointIdx) => (
											<motion.li
												key={point}
												initial={{ opacity: 0, x: -10 }}
												whileInView={{ opacity: 1, x: 0 }}
												viewport={{ once: true }}
												transition={{ delay: itemIdx * 0.1 + pointIdx * 0.05 }}
												className='flex items-start gap-3 text-muted-foreground hover:text-foreground transition-colors duration-200'>
												<div className='w-2 h-2 rounded-full bg-primary shrink-0 mt-2' />
												<span className='text-sm md:text-base'>{point}</span>
											</motion.li>
										))}
									</ul>
								</div>
							))}
						</div>
					</motion.div>

					{/* Education Card */}
					<motion.div
						key='education'
						initial={{ opacity: 0, y: 30, scale: 0.95 }}
						whileInView={{ opacity: 1, y: 0, scale: 1 }}
						viewport={{ once: true, margin: '-50px' }}
						transition={{
							delay: 0.1,
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
						{/* Gradient border - Same as Skills */}
						<div className='absolute -inset-0.5 bg-linear-to-r from-secondary/30 to-primary/30 rounded-2xl blur opacity-0 group-hover:opacity-70 transition duration-500' />

						<div className='relative bg-background/50 backdrop-blur-sm rounded-2xl border border-default p-6 h-full'>
							{/* Card header - Same icon styling as Skills */}
							<div className='flex items-center gap-3 mb-6'>
								<div className='p-2 rounded-lg bg-secondary/10'>
									<FaGraduationCap className='w-6 h-6 text-secondary' />
								</div>
								<h3 className='text-xl font-semibold'>Education</h3>
							</div>

							{/* Education items */}
							{experienceEducation.education.map((edu, eduIdx) => (
								<div key={edu.degree} className='mb-6 last:mb-0'>
									{/* Degree and institution with icons */}
									<motion.div
										initial={{ opacity: 0, y: 10 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true }}
										transition={{ delay: eduIdx * 0.1 + 0.1 }}
										className='space-y-2'>
										<h4 className='text-lg font-semibold'>{edu.degree}</h4>
										<div className='flex flex-wrap items-center gap-4 text-muted-foreground'>
											<div className='flex items-center gap-1'>
												<FaGraduationCap className='w-3 h-3' />
												<span className='text-sm'>{edu.institution}</span>
											</div>
											<div className='flex items-center gap-1'>
												<FaCalendarAlt className='w-3 h-3' />
												<span className='text-sm'>{edu.period}</span>
											</div>
										</div>
									</motion.div>

									{/* Details - Same styling as Skills list */}
									<ul className='mt-4 space-y-2'>
										{edu.details.map((detail, detailIdx) => (
											<motion.li
												key={detail}
												initial={{ opacity: 0, x: -10 }}
												whileInView={{ opacity: 1, x: 0 }}
												viewport={{ once: true }}
												transition={{
													delay: eduIdx * 0.1 + detailIdx * 0.05 + 0.1,
												}}
												className='flex items-start gap-3 text-muted-foreground hover:text-foreground transition-colors duration-200'>
												<div className='w-2 h-2 rounded-full bg-secondary shrink-0 mt-2' />
												<span className='text-sm md:text-base'>{detail}</span>
											</motion.li>
										))}
									</ul>
								</div>
							))}
						</div>
					</motion.div>
				</div>

				{/* CTA - Exactly matches Skills CTA */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 0.4 }}
					className='mt-16 text-center'>
					<Link
						href={experienceEducation.cta.href}
						className='inline-flex items-center gap-2 px-8 py-3 rounded-xl border border-default bg-background/50 backdrop-blur-sm hover:bg-muted/50 transition-all hover:gap-3 group'>
						<span className='font-medium'>{experienceEducation.cta.label}</span>
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

export default ExperienceEducation;
