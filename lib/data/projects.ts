import { connectDB } from '@/lib/db/mongoose';
import { Project as ProjectModel } from '@/lib/models';
import { FilterOption, Project } from '@/lib/types';

function serializeProjects(projects: unknown): Project[] {
	return JSON.parse(JSON.stringify(projects)) as Project[];
}

function serializeProject(project: unknown): Project | null {
	if (!project) return null;
	return JSON.parse(JSON.stringify(project)) as Project;
}

export async function getAllProjects(): Promise<Project[]> {
	await connectDB();
	const projects = await ProjectModel.find().sort({ createdAt: -1 }).lean();
	return serializeProjects(projects);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
	await connectDB();
	const project = await ProjectModel.findOne({ slug }).lean();
	return serializeProject(project);
}

export async function getProjectCategories(): Promise<FilterOption[]> {
	const projects = await getAllProjects();
	const uniqueCategories = new Map<string, string>();

	projects.forEach((project) => {
		if (!uniqueCategories.has(project.category.key)) {
			uniqueCategories.set(project.category.key, project.category.label);
		}
	});

	return [
		{ key: 'all', label: 'All Projects' },
		...Array.from(uniqueCategories.entries()).map(([key, label]) => ({
			key,
			label,
		})),
	];
}
