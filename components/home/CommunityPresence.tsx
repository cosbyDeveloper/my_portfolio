// // components/home/CommunityPresence.tsx
// 'use client';

// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import { homeContent } from '@/constants/home';
// import { FaGithub, FaKaggle, FaLinkedin, FaTwitter } from 'react-icons/fa';
// import { SiHuggingface, SiGooglescholar } from 'react-icons/si';

// // Icon mapping
// const getPlatformIcon = (platform: string) => {
// 	const platformLower = platform.toLowerCase();
// 	if (platformLower.includes('github')) return FaGithub;
// 	if (platformLower.includes('kaggle')) return FaKaggle;
// 	if (platformLower.includes('hugging')) return SiHuggingface;
// 	if (platformLower.includes('linkedin')) return FaLinkedin;
// 	if (platformLower.includes('twitter') || platformLower.includes('x'))
// 		return FaTwitter;
// 	if (platformLower.includes('scholar')) return SiGooglescholar;
// 	return FaGithub;
// };

// const CommunityPresence = () => {
// 	const { communityPresence } = homeContent;

// 	if (!communityPresence) return null;

// 	return (
// 		<section
// 			id='community'
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
// 						Community & <span className='text-primary'>Open Source</span>
// 					</h2>
// 					<p className='mt-4 text-lg text-muted-foreground'>
// 						{communityPresence.intro}
// 					</p>
// 				</motion.div>

// 				{/* Community Grid */}
// 				<div className='grid gap-6 md:grid-cols-2'>
// 					{communityPresence.items.map((item, idx) => {
// 						const PlatformIcon = getPlatformIcon(item.platform);

// 						return (
// 							<motion.div
// 								key={item.platform}
// 								initial={{ opacity: 0, y: 30, scale: 0.95 }}
// 								whileInView={{ opacity: 1, y: 0, scale: 1 }}
// 								viewport={{ once: true, margin: '-50px' }}
// 								transition={{
// 									delay: idx * 0.1,
// 									duration: 0.5,
// 									type: 'spring',
// 									stiffness: 100,
// 								}}
// 								whileHover={{
// 									y: -8,
// 									scale: 1.02,
// 									transition: { duration: 0.2 },
// 								}}
// 								className='group relative'>
// 								{/* Gradient border */}
// 								<div className='absolute -inset-0.5 bg-linear-to-r from-primary/30 to-secondary/30 rounded-2xl blur opacity-0 group-hover:opacity-70 transition duration-500' />

// 								<div className='relative bg-background/50 backdrop-blur-sm rounded-2xl border border-default p-6 h-full'>
// 									<div className='flex items-start justify-between mb-4'>
// 										<div className='flex items-center gap-3'>
// 											<div className='p-2 rounded-lg bg-primary/10'>
// 												<PlatformIcon className='w-6 h-6 text-primary' />
// 											</div>
// 											<div>
// 												<h3 className='text-xl font-semibold'>
// 													{item.platform}
// 												</h3>
// 												{item.handle && (
// 													<p className='text-sm text-muted-foreground'>
// 														@{item.handle}
// 													</p>
// 												)}
// 											</div>
// 										</div>
// 										{item.status && (
// 											<span className='px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-medium border border-emerald-500/30'>
// 												{item.status}
// 											</span>
// 										)}
// 									</div>

// 									<p className='text-muted-foreground mt-3'>
// 										{item.description}
// 									</p>

// 									{item.href && (
// 										<Link
// 											href={item.href}
// 											target='_blank'
// 											rel='noopener noreferrer'
// 											className='inline-flex items-center gap-2 mt-4 text-sm text-primary hover:underline'>
// 											View Profile →
// 										</Link>
// 									)}
// 								</div>
// 							</motion.div>
// 						);
// 					})}
// 				</div>

// 				{/* GitHub Stats or additional info can go here */}
// 				<motion.div
// 					initial={{ opacity: 0, y: 20 }}
// 					whileInView={{ opacity: 1, y: 0 }}
// 					viewport={{ once: true }}
// 					transition={{ delay: 0.4 }}
// 					className='mt-12 text-center'>
// 					<p className='text-sm text-muted-foreground'>
// 						All code is open source and available for collaboration. PRs and
// 						issues are always welcome!
// 					</p>
// 				</motion.div>
// 			</div>
// 		</section>
// 	);
// };

// export default CommunityPresence;
