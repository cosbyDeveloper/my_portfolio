// components/home/Hero.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { homeContent } from '@/constants/home';

const Hero = () => {
	const { hero } = homeContent;

	return (
		<section id='introduction' className='relative overflow-hidden'>
			<div className='relative container mx-auto px-6 lg:px-12 pt-16 lg:pt-24 pb-6 lg:pb-12'>
				<div className='flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-16'>
					{/* Image Section */}
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.4, duration: 0.6 }}
						className='flex-1 relative w-full max-w-md lg:max-w-lg mx-auto lg:mx-0'>
						{/* Image Container */}
						<div className='relative'>
							{/* Main Image */}
							<div className='relative rounded-2xl overflow-hidden border border-subtle bg-background/50 backdrop-blur-sm'>
								<Image
									src={hero.imageUrl || '/images/profile.jpg'}
									alt={hero.name}
									width={600}
									height={600}
									className='w-full h-auto object-cover aspect-square'
									priority
								/>
							</div>
						</div>

						{/* floating element */}
						<motion.div
							animate={{ y: [0, -10, 0] }}
							transition={{ repeat: Infinity, duration: 3 }}
							className='absolute -bottom-6 -left-6 lg:-left-6 bg-background border border-default rounded-2xl p-4 shadow-lg'>
							<div className='text-sm font-medium'>🚀 Available for work</div>
						</motion.div>
					</motion.div>

					{/* Text Content */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className='flex-1 text-left'>
						{/*  subtle badge */}
						<div className='inline-flex items-center rounded-full border border-default px-3 py-1 text-sm mb-6 '>
							<span className='mr-2'>👋</span>
							<span className='text-muted-foreground'>
								{hero.greeting || 'Hello, I&apos;m'}
							</span>
						</div>

						<h1 className='text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight'>
							{hero.name}
							{/* {hero.name.split(' ').map((word, index) => (
								<span key={index} className='block lg:inline'>
									{word}{' '}
								</span>
							))} */}
						</h1>

						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.1, duration: 0.6 }}
							className='mt-4 text-xl md:text-2xl text-muted-foreground'>
							{hero.role}
						</motion.p>

						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2, duration: 0.6 }}
							className='mt-6 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0'>
							{hero.tagline}
						</motion.p>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.3, duration: 0.6 }}
							className='mt-10 flex flex-nowrap gap-3 justify-center lg:justify-start'>
							<Link
								href={hero.ctaPrimary.href}
								className='rounded-xl bg-primary px-6 py-2.5 font-medium text-primary-foreground transition-all hover:opacity-90 hover:scale-105 active:scale-95 text-sm md:text-base md:px-8 md:py-3'>
								{hero.ctaPrimary.label}
							</Link>

							<Link
								href={hero.ctaSecondary.href}
								className='rounded-xl border border-default px-6 py-2.5 font-medium transition-all hover:bg-muted/50 hover:scale-105 active:scale-95 text-sm md:text-base md:px-8 md:py-3'>
								{hero.ctaSecondary.label}
							</Link>
						</motion.div>

						{/* Optional stats or social links */}
						{/* <motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.5 }}
							className='mt-12 flex flex-wrap gap-6 justify-center lg:justify-start text-sm text-muted-foreground'>
							
						</motion.div> */}
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
