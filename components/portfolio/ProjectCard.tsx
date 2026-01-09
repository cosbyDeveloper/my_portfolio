// components/projects/ProjectCard.tsx
'use client';

import Card from '@/components/shared/Card';
import Link from 'next/link';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';

interface ProjectCardProps {
	project: {
		slug: string;
		title: string;
		summary: string;
		coverImage?: string;
		status?: string;
		category: {
			key: string;
			label: string;
		};
		stack: string[];
		demoUrl?: string;
		repoUrl?: string;
	};
	index?: number;
	layout?: 'grid' | 'list';
	showCategory?: boolean;
	showSummary?: boolean;
	showTechStack?: boolean;
	showLinks?: boolean;
	className?: string;
}

const ProjectCard = ({
	project,
	index = 0,
	layout = 'grid',
	showCategory = true,
	showSummary = true,
	showTechStack = true,
	showLinks = true,
	className = '',
}: ProjectCardProps) => {
	// Category badge colors
	const getCategoryColor = (categoryKey: string) => {
		switch (categoryKey) {
			case 'cosby':
				return { bgColor: 'bg-primary', color: 'text-white' };
			case 'freelance':
				return { bgColor: 'bg-orange-500/70', color: 'text-white' };
			case 'personal':
				return { bgColor: 'bg-green-500/70', color: 'text-white' };
			default:
				return { bgColor: 'bg-purple-500/70', color: 'text-white' };
		}
	};

	const categoryColor = getCategoryColor(project.category.key);

	return (
		<Card
			title={project.title}
			description={showSummary ? project.summary : undefined}
			status={project.status}
			imageUrl={project.coverImage || '/images/project-placeholder.jpg'}
			imageAlt={project.title}
			href={`/portfolio/${project.slug}`}
			layout={layout}
			orientation={layout === 'list' ? 'horizontal' : 'vertical'}
			category={
				showCategory
					? {
							label: project.category.label,
							bgColor: categoryColor.bgColor,
							color: categoryColor.color,
					  }
					: undefined
			}
			tags={showTechStack ? project.stack : []}
			className={className}
			index={index}
			hoverEffect={true}
			gradientBorder={true}
			imageHeight={layout === 'list' ? 'h-auto' : 'h-48'}>
			{/* Custom action links for projects */}
			{showLinks && (
				<div className='mt-6 pt-4 border-t border-subtle flex items-center justify-between'>
					<Link
						href={`/portfolio/${project.slug}`}
						className='text-sm font-medium text-primary hover:text-primary/80 transition-colors'>
						View details
					</Link>
					<div className='flex items-center gap-3'>
						{project.demoUrl && (
							<a
								href={project.demoUrl}
								target='_blank'
								rel='noopener noreferrer'
								className='text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1'
								onClick={(e) => e.stopPropagation()}>
								<FaExternalLinkAlt className='w-3 h-3' />
								Demo
							</a>
						)}
						{project.repoUrl && (
							<a
								href={project.repoUrl}
								target='_blank'
								rel='noopener noreferrer'
								className='text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1'
								onClick={(e) => e.stopPropagation()}>
								<FaGithub className='w-3 h-3' />
								Code
							</a>
						)}
					</div>
				</div>
			)}
		</Card>
	);
};

export default ProjectCard;
