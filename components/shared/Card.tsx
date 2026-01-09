// components/shared/Card.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CardProps {
	// Content
	title: string;
	description?: string;
	imageUrl?: string;
	imageAlt?: string;
	href?: string;
	externalLink?: boolean;
	status?: string;

	// Layout
	layout?: 'grid' | 'list';
	orientation?: 'horizontal' | 'vertical';

	// Visual
	category?: {
		label: string;
		color?: string;
		bgColor?: string;
	};
	date?: string;
	tags?: string[];
	metaItems?: {
		icon?: ReactNode;
		text: string;
	}[];

	// Interactive
	hoverEffect?: boolean;
	gradientBorder?: boolean;

	// Customization
	className?: string;
	imageHeight?: string;
	children?: ReactNode;

	// Animation
	index?: number;
	animate?: boolean;
}

const Card = ({
	title,
	description,
	imageUrl,
	imageAlt = title,
	href,
	externalLink = false,
	layout = 'grid',
	orientation = 'vertical',
	category,
	status = '',
	date,
	tags = [],
	metaItems = [],
	hoverEffect = true,
	gradientBorder = true,
	className = '',
	imageHeight = 'h-48',
	children,
	index = 0,
	animate = true,
}: CardProps) => {
	// Animation variants
	const animationVariants = {
		hidden: { opacity: 0, y: 30, scale: 0.95 },
		visible: { opacity: 1, y: 0, scale: 1 },
		hover: hoverEffect ? { y: -8, scale: 1.02 } : {},
	};

	// Determine image container class based on layout and orientation
	const getImageContainerClass = () => {
		if (layout === 'list' && orientation === 'horizontal') {
			return 'relative md:w-48 h-48 md:h-auto overflow-hidden flex-shrink-0';
		}
		return `relative ${imageHeight} overflow-hidden`;
	};

	// Get category badge color
	const getCategoryColor = () => {
		if (category?.color && category?.bgColor) {
			return `${category.bgColor} ${category.color}`;
		}
		return 'bg-primary/10 text-primary';
	};

	// Status badge colors
	const getStatusColor = (status: string) => {
		// Matching your existing icon colors for consistency
		switch (status) {
			case 'completed':
				return {
					bgColor: 'bg-green-100',
					color: 'text-green-800',
					borderColor: 'border-green-200',
				}; // Matches text-green-500 icon
			case 'in progress':
				return {
					bgColor: 'bg-yellow-100',
					color: 'text-yellow-800',
					borderColor: 'border-yellow-200',
				}; // Matches text-yellow-500 icon
			case 'on hold':
				return {
					bgColor: 'bg-red-100',
					color: 'text-red-800',
					borderColor: 'border-red-200',
				}; // Matches text-red-500 icon
			case 'initial stage':
				return {
					bgColor: 'bg-blue-100',
					color: 'text-blue-800',
					borderColor: 'border-blue-200',
				}; // Matches text-blue-500 icon
			default:
				return {
					bgColor: 'bg-gray-100',
					color: 'text-gray-700',
					borderColor: 'border-gray-200',
				};
		}
	};

	// Content container
	const content = (
		<>
			{/* Gradient border */}
			{gradientBorder && hoverEffect && (
				<div className='absolute -inset-0.5 bg-linear-to-r from-primary/30 to-secondary/30 rounded-2xl blur opacity-0 group-hover:opacity-70 transition duration-500' />
			)}

			<div className='relative bg-background/50 backdrop-blur-sm rounded-2xl border border-default overflow-hidden h-full flex flex-col'>
				{/* Image */}
				{imageUrl && (
					<div className={getImageContainerClass()}>
						<Image
							src={imageUrl}
							alt={imageAlt}
							fill
							className='object-cover group-hover:scale-105 transition-transform duration-300'
							sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
						/>

						{/* Category badge */}
						{category && (
							<div className='absolute top-4 left-4'>
								<span
									className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor()}`}>
									{category.label}
								</span>
							</div>
						)}

						{/* Date overlay */}
						{date && (
							<div className='absolute top-4 right-4'>
								<span className='px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm text-xs font-medium'>
									{date}
								</span>
							</div>
						)}
					</div>
				)}

				{/* Content */}
				<div className='p-6 flex-1 flex flex-col'>
					<h3 className='text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-200 line-clamp-2'>
						{title}
					</h3>

					{/* Status badge */}
					{status && (
						<div className='mb-3'>
							<span
								className={`px-3 py-1 rounded-full text-xs font-medium ${
									getStatusColor(status).bgColor
								} ${getStatusColor(status).color}`}>
								{status}
							</span>
						</div>
					)}

					{description && (
						<p className='text-muted-foreground mb-4 flex-1 line-clamp-3'>
							{description}
						</p>
					)}

					{/* Tags */}
					{tags.length > 0 && (
						<div className='mt-4 flex flex-wrap gap-2'>
							{tags.slice(0, 3).map((tag) => (
								<span
									key={tag}
									className='px-3 py-1 rounded-full bg-muted/30 text-xs border border-default text-muted-foreground'>
									{tag}
								</span>
							))}
							{tags.length > 3 && (
								<span className='px-3 py-1 rounded-full bg-muted/30 text-xs border border-default text-muted-foreground'>
									+{tags.length - 3} more
								</span>
							)}
						</div>
					)}

					{/* Meta items */}
					{metaItems.length > 0 && (
						<div className='mt-4 space-y-2'>
							{metaItems.map((item, idx) => (
								<div
									key={idx}
									className='flex items-center gap-2 text-sm text-muted-foreground'>
									{item.icon}
									<span>{item.text}</span>
								</div>
							))}
						</div>
					)}

					{/* Custom children */}
					{children}

					{/* Default action link */}
					{href && !children && (
						<div className='mt-6 pt-4 border-t border-subtle'>
							<span className='text-sm font-medium text-primary group-hover:text-primary/80 transition-colors inline-flex items-center gap-1'>
								{externalLink ? 'Visit link' : 'View details'}
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
					)}
				</div>
			</div>
		</>
	);

	const motionProps = animate
		? {
				initial: 'hidden',
				whileInView: 'visible',
				viewport: { once: true, margin: '-50px' },
				transition: {
					delay: index * 0.1,
					duration: 0.5,
					type: 'spring' as const,
					stiffness: 100,
				},
				whileHover: 'hover',
		  }
		: {};

	const wrapperClass = `group relative ${
		hoverEffect ? 'cursor-pointer' : ''
	} ${className}`;

	// Render with or without link
	if (href) {
		if (externalLink) {
			return (
				<motion.a
					href={href}
					target='_blank'
					rel='noopener noreferrer'
					className={wrapperClass}
					variants={animationVariants}
					{...motionProps}>
					{content}
				</motion.a>
			);
		}

		return (
			<motion.div
				className={wrapperClass}
				variants={animationVariants}
				{...motionProps}>
				<Link href={href} className='block h-full'>
					{content}
				</Link>
			</motion.div>
		);
	}

	return (
		<motion.div
			className={wrapperClass}
			variants={animationVariants}
			{...motionProps}>
			{content}
		</motion.div>
	);
};

export default Card;
