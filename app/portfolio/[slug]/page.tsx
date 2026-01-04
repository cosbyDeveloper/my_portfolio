// app/portfolio/[slug]/page.tsx (Server Component)
import { notFound } from 'next/navigation';
import { projects } from '@/constants/projects';
import ProjectDetailsContent from '@/components/portfolio/ProjectDetailsContent';

interface PageProps {
	params: Promise<{
		slug: string;
	}>;
}

export default async function ProjectDetails({ params }: PageProps) {
	const { slug } = await params;
	const project = projects.find((p) => p.slug === slug);

	if (!project) {
		notFound();
	}

	// Create screenshots array from project images
	const screenshots = project.images.map((image, index) => ({
		src: image,
		alt: `${project.title} - Screenshot ${index + 1}`,
		caption: index === 0 ? 'Main interface' : `Feature ${index}`,
	}));

	// Add cover image as first screenshot if not already included
	if (
		project.coverImage &&
		!screenshots.some((s) => s.src === project.coverImage)
	) {
		screenshots.unshift({
			src: project.coverImage,
			alt: `${project.title} - Cover`,
			caption: 'Project overview',
		});
	}

	return <ProjectDetailsContent project={project} screenshots={screenshots} />;
}
