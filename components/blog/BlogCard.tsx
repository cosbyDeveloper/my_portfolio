// components/blog/BlogCard.tsx
'use client';

import Card from '@/components/shared/Card';
import { FaCalendarAlt, FaClock, FaUser } from 'react-icons/fa';

interface BlogCardProps {
	post: {
		slug: string;
		title: string;
		excerpt: string;
		image?: string;
		date: string;
		author?: string;
		readTime?: string;
		tags: string[];
	};
	index?: number;
	layout?: 'grid' | 'list';
	showMeta?: boolean;
	showTags?: boolean;
	className?: string;
}

const BlogCard = ({
	post,
	index = 0,
	layout = 'grid',
	showMeta = true,
	showTags = true,
	className = '',
}: BlogCardProps) => {
	// Format date
	const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	});

	// Meta items
	const metaItems = [];
	if (showMeta) {
		metaItems.push({
			icon: <FaCalendarAlt className='w-3 h-3' />,
			text: formattedDate,
		});

		if (post.readTime) {
			metaItems.push({
				icon: <FaClock className='w-3 h-3' />,
				text: post.readTime,
			});
		}

		if (post.author) {
			metaItems.push({
				icon: <FaUser className='w-3 h-3' />,
				text: post.author,
			});
		}
	}

	return (
		<Card
			title={post.title}
			description={post.excerpt}
			imageUrl={post.image || '/images/blog/default-blog.jpg'}
			imageAlt={post.title}
			href={`/blog/${post.slug}`}
			layout={layout}
			orientation={layout === 'list' ? 'horizontal' : 'vertical'}
			date={showMeta ? formattedDate : undefined}
			tags={showTags ? post.tags : []}
			metaItems={metaItems}
			className={className}
			index={index}
			hoverEffect={true}
			gradientBorder={true}
			imageHeight={layout === 'list' ? 'h-auto' : 'h-48'}
		/>
	);
};

export default BlogCard;
