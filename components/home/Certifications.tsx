// // components/home/Certifications.tsx
// 'use client';

// import { motion } from 'framer-motion';
// import { homeContent } from '@/constants/home';
// import { FaCertificate, FaCalendarAlt, FaStar } from 'react-icons/fa';

// const Certifications = () => {
// 	const { certifications } = homeContent;

// 	if (!certifications) return null;

// 	return (
// 		<section
// 			id='certifications'
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
// 						Certifications & <span className='text-primary'>Credentials</span>
// 					</h2>
// 					<p className='mt-4 text-lg text-muted-foreground'>
// 						{certifications.intro}
// 					</p>
// 				</motion.div>

// 				{/* Certifications Grid */}
// 				<div className='grid gap-6 md:grid-cols-2'>
// 					{certifications.items.map((cert, idx) => (
// 						<motion.div
// 							key={cert.title}
// 							initial={{ opacity: 0, y: 30, scale: 0.95 }}
// 							whileInView={{ opacity: 1, y: 0, scale: 1 }}
// 							viewport={{ once: true, margin: '-50px' }}
// 							transition={{
// 								delay: idx * 0.05,
// 								duration: 0.5,
// 								type: 'spring',
// 								stiffness: 100,
// 							}}
// 							whileHover={{
// 								y: -8,
// 								scale: 1.02,
// 								transition: { duration: 0.2 },
// 							}}
// 							className='group relative'>
// 							{/* Gradient border */}
// 							<div className='absolute -inset-0.5 bg-linear-to-r from-primary/30 to-secondary/30 rounded-2xl blur opacity-0 group-hover:opacity-70 transition duration-500' />

// 							<div className='relative bg-background/50 backdrop-blur-sm rounded-2xl border border-default p-6 h-full'>
// 								{/* Card header */}
// 								<div className='flex items-start justify-between mb-4'>
// 									<div className='flex items-center gap-3'>
// 										<div className='p-2 rounded-lg bg-primary/10'>
// 											{cert.highlight ? (
// 												<FaStar className='w-5 h-5 text-yellow-500' />
// 											) : (
// 												<FaCertificate className='w-5 h-5 text-primary' />
// 											)}
// 										</div>
// 										<div>
// 											<h3 className='font-semibold text-lg leading-tight'>
// 												{cert.title}
// 											</h3>
// 											<p className='text-sm text-muted-foreground mt-1'>
// 												{cert.issuer}
// 											</p>
// 										</div>
// 									</div>
// 									<div className='flex items-center gap-1 text-sm text-muted-foreground shrink-0 ml-2'>
// 										<FaCalendarAlt className='w-3 h-3' />
// 										<span>{cert.year}</span>
// 									</div>
// 								</div>

// 								{/* Focus/Details */}
// 								<p className='text-sm text-muted-foreground mt-3'>
// 									{cert.focus}
// 								</p>

// 								{/* Highlight badge */}
// 								{cert.highlight && (
// 									<div className='mt-4 inline-flex items-center px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium'>
// 										🎓 Featured Credential
// 									</div>
// 								)}
// 							</div>
// 						</motion.div>
// 					))}
// 				</div>
// 			</div>
// 		</section>
// 	);
// };

// export default Certifications;
