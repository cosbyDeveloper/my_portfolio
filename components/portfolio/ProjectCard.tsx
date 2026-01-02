import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/constants/projects';

const ProjectCard = ({ project }: { project: Project }) => {
	return (
		<Link
			href={`/portfolio/${project.slug}`}
			className='group glass rounded-xl overflow-hidden transition'>
			<div className='relative aspect-16/10 overflow-hidden'>
				<Image
					src={project.coverImage}
					alt={project.title}
					fill
					className='object-cover transition-transform duration-500 group-hover:scale-105'
				/>
			</div>

			<div className='p-5 space-y-3'>
				<div className='text-xs text-muted-foreground'>
					{project.category.label}
				</div>

				<h3 className='font-medium'>{project.title}</h3>

				<p className='text-sm text-muted-foreground line-clamp-2'>
					{project.summary}
				</p>

				<div className='flex flex-wrap gap-2 pt-2'>
					{project.stack.map((tech) => (
						<span key={tech} className='text-xs rounded-md bg-muted px-2 py-1'>
							{tech}
						</span>
					))}
				</div>
			</div>
		</Link>
	);
};

export default ProjectCard;
