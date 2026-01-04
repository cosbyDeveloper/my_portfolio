// components/home/FeaturedBlogs.tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { blogs } from '@/constants/blogs';
import { homeContent } from '@/constants/home';
import BlogCard from '@/components/blog/BlogCard';

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
							{featured.map((post, index) => (
								<BlogCard
									key={post.slug}
									post={post}
									index={index}
									layout='grid'
									showMeta={true}
									showTags={true}
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
