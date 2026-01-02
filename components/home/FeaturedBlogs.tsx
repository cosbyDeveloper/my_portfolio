// components/home/FeaturedBlogs.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { blogs } from '@/constants/blogs';
import { homeContent } from '@/constants/home';

const FeaturedBlogs = () => {
	const { featuredBlogs } = homeContent;
	const featured = blogs
		.filter((b) => b.featured)
		.slice(0, featuredBlogs.limit);

	return (
		<section
			id='blog'
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
						Featured <span className='text-primary'>Writing</span>
					</h2>
					<p className='mt-4 text-lg text-muted-foreground'>
						Writing about Web Development, Software engineering, AI/ML, Emerging
						Technologies, career growth, and more.
					</p>
				</motion.div>

				{/* Blog Grid */}
				{featured.length === 0 ? (
					<div className='rounded-2xl border border-default p-8 text-center'>
						<p className='text-muted-foreground text-lg mb-2'>
							No blog posts published yet
						</p>
						<p className='text-sm text-muted-foreground/60'>
							I&apos;m currently working on some great content. Stay tuned!
						</p>
						<a
							href='/contact'
							className='inline-block mt-4 text-sm text-primary hover:text-primary/80 transition-colors'>
							Suggest a topic →
						</a>
					</div>
				) : (
					<>
						<div className='grid gap-6 md:grid-cols-3'>
							{featured.map((post, index) => {
								const blogImage = post.image || '/images/blog/default-blog.jpg';

								return (
									<motion.div
										key={post.slug}
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
										{/* Gradient border - Same as other sections */}
										<div className='absolute -inset-0.5 bg-linear-to-r from-primary/30 to-secondary/30 rounded-2xl blur opacity-0 group-hover:opacity-70 transition duration-500' />

										<Link
											href={`/blog/${post.slug}`}
											className='relative bg-background/50 backdrop-blur-sm rounded-2xl border border-default overflow-hidden h-full flex flex-col'>
											{/* Blog Image */}
											<div className='relative h-48 overflow-hidden'>
												<Image
													src={blogImage}
													alt={post.title}
													fill
													className='object-cover group-hover:scale-105 transition-transform duration-300'
													sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
												/>
												{/* Date overlay */}
												<div className='absolute top-4 left-4'>
													<span className='px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm text-xs font-medium'>
														{new Date(post.date).toLocaleDateString('en-US', {
															month: 'short',
															day: 'numeric',
															year: 'numeric',
														})}
													</span>
												</div>
											</div>

											{/* Blog Content */}
											<div className='p-6 flex-1 flex flex-col'>
												<h3 className='text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-200 line-clamp-2'>
													{post.title}
												</h3>

												<p className='text-muted-foreground mb-4 flex-1 line-clamp-3'>
													{post.excerpt}
												</p>

												{/* Tags - Similar to skills cloud */}
												<div className='mt-4 flex flex-wrap gap-2'>
													{post.tags.slice(0, 3).map((tag) => (
														<span
															key={tag}
															className='px-3 py-1 rounded-full bg-muted/30 text-xs border border-default text-muted-foreground'>
															{tag}
														</span>
													))}
												</div>

												{/* Read more link */}
												<div className='mt-6 pt-4 border-t border-subtle'>
													<span className='text-sm font-medium text-primary group-hover:text-primary/80 transition-colors inline-flex items-center gap-1'>
														Read article
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
													</span>
												</div>
											</div>
										</Link>
									</motion.div>
								);
							})}
						</div>
						{/* CTA */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.4 }}
							className='mt-16 text-center'>
							<Link
								href={featuredBlogs.cta.href}
								className='inline-flex items-center gap-2 px-8 py-3 rounded-xl border border-default bg-background/50 backdrop-blur-sm hover:bg-muted/50 transition-all hover:gap-3 group'>
								<span className='font-medium'>{featuredBlogs.cta.label}</span>
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

export default FeaturedBlogs;
