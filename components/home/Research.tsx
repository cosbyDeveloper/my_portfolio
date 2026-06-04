// // components/home/Research.tsx
// 'use client';

// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import { homeContent } from '@/constants/home';
// import { FaMicroscope, FaBookOpen, FaExternalLinkAlt } from 'react-icons/fa';

// const Research = () => {
// 	const { research } = homeContent;

// 	if (!research) return null;

// 	return (
// 		<section
// 			id='research'
// 			className='relative pt-16 lg:pt-24 pb-6 lg:pb-12 px-6 lg:px-12 overflow-hidden'>
// 			<div className='relative mx-auto max-w-6xl'>
// 				{/* Header */}
// 				<motion.div
// 					initial={{ opacity: 0, y: 20 }}
// 					whileInView={{ opacity: 1, y: 0 }}
// 					viewport={{ once: true, margin: '-100px' }}
// 					transition={{ duration: 0.6 }}
// 					className='mb-16 lg:text-center max-w-3xl mx-auto'>
// 					<h2 className='text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight'>
// 						<span className='text-primary'>Research</span>
// 					</h2>
// 					<p className='mt-4 text-lg text-muted-foreground'>{research.intro}</p>
// 				</motion.div>

// 				{/* Research Areas */}
// 				<motion.div
// 					initial={{ opacity: 0, y: 20 }}
// 					whileInView={{ opacity: 1, y: 0 }}
// 					viewport={{ once: true }}
// 					transition={{ delay: 0.1 }}
// 					className='mb-12'>
// 					<h3 className='text-xl font-semibold mb-4 flex items-center gap-2'>
// 						<FaMicroscope className='w-5 h-5 text-primary' />
// 						Research Areas
// 					</h3>
// 					<div className='flex flex-wrap gap-3'>
// 						{research.areas.map((area, idx) => (
// 							<motion.span
// 								key={area}
// 								initial={{ opacity: 0, scale: 0 }}
// 								whileInView={{ opacity: 1, scale: 1 }}
// 								viewport={{ once: true }}
// 								transition={{ delay: idx * 0.05 }}
// 								className='px-4 py-2 rounded-full bg-primary/10 text-primary text-sm border border-primary/20'>
// 								{area}
// 							</motion.span>
// 						))}
// 					</div>
// 				</motion.div>

// 				{/* Publications */}
// 				{research.publications && research.publications.length > 0 && (
// 					<motion.div
// 						initial={{ opacity: 0, y: 20 }}
// 						whileInView={{ opacity: 1, y: 0 }}
// 						viewport={{ once: true }}
// 						transition={{ delay: 0.2 }}
// 						className='mb-12'>
// 						<h3 className='text-xl font-semibold mb-4 flex items-center gap-2'>
// 							<FaBookOpen className='w-5 h-5 text-secondary' />
// 							Publications
// 						</h3>
// 						<div className='space-y-4'>
// 							{research.publications.map((pub, idx) => (
// 								<motion.div
// 									key={pub.title}
// 									initial={{ opacity: 0, x: -20 }}
// 									whileInView={{ opacity: 1, x: 0 }}
// 									viewport={{ once: true }}
// 									transition={{ delay: idx * 0.1 }}
// 									className='group relative'>
// 									<div className='relative bg-background/50 backdrop-blur-sm rounded-2xl border border-default p-6'>
// 										<div className='flex flex-wrap justify-between items-start gap-4 mb-3'>
// 											<h4 className='text-lg font-semibold'>{pub.title}</h4>
// 											<span className='px-3 py-1 rounded-full bg-muted text-xs font-medium'>
// 												{pub.year}
// 											</span>
// 										</div>
// 										<p className='text-sm text-muted-foreground mb-2'>
// 											{pub.venue} • {pub.type}
// 										</p>
// 										<p className='text-muted-foreground'>{pub.abstract}</p>
// 										{pub.href && (
// 											<Link
// 												href={pub.href}
// 												target='_blank'
// 												className='inline-flex items-center gap-1 mt-4 text-sm text-primary hover:underline'>
// 												Read paper <FaExternalLinkAlt className='w-3 h-3' />
// 											</Link>
// 										)}
// 									</div>
// 								</motion.div>
// 							))}
// 						</div>
// 					</motion.div>
// 				)}

// 				{/* CTA */}
// 				<motion.div
// 					initial={{ opacity: 0, y: 20 }}
// 					whileInView={{ opacity: 1, y: 0 }}
// 					viewport={{ once: true }}
// 					transition={{ delay: 0.4 }}
// 					className='text-center'>
// 					<Link
// 						href={research.cta.href}
// 						className='inline-flex items-center gap-2 px-8 py-3 rounded-xl border border-default bg-background/50 backdrop-blur-sm hover:bg-muted/50 transition-all hover:gap-3 group'>
// 						<span className='font-medium'>{research.cta.label}</span>
// 						<svg
// 							className='w-4 h-4 transition-transform group-hover:translate-x-1'
// 							fill='none'
// 							stroke='currentColor'
// 							viewBox='0 0 24 24'>
// 							<path
// 								strokeLinecap='round'
// 								strokeLinejoin='round'
// 								strokeWidth={2}
// 								d='M14 5l7 7m0 0l-7 7m7-7H3'
// 							/>
// 						</svg>
// 					</Link>
// 				</motion.div>
// 			</div>
// 		</section>
// 	);
// };

// export default Research;
