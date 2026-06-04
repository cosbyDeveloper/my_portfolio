import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db/mongoose';
import { Project } from '@/lib/models';
import { authenticateRequest, createAuthResponse } from '@/lib/middleware/auth';

type ProjectRequestBody = {
	slug?: string;
	title?: string;
	summary?: string;
	description?: string;
	content?: string;
	category?: {
		key?: string;
		label?: string;
	};
	stack?: string[] | string;
	technologies?: string[] | string;
	coverImage?: string;
	image?: string;
	images?: string[];
	demoUrl?: string;
	liveLink?: string;
	repoUrl?: string;
	githubLink?: string;
	featured?: boolean;
	acknowledgement?: string;
	challenges?: string[] | string;
	solutions?: string[] | string;
	lessons?: string[] | string;
	keyFeatures?: string[] | string;
	technicalDetails?:
		| Array<{ title?: string; description?: string } | string>
		| string;
	role?: string;
	timeline?: string;
	status?: 'initial stage' | 'in progress' | 'completed' | 'on hold';
	complexity?: 'low' | 'medium' | 'high';
};

function cleanString(value: unknown) {
	return typeof value === 'string' ? value.trim() : '';
}

function normalizeStringArray(value: unknown) {
	if (Array.isArray(value)) {
		return value.map((item) => cleanString(item)).filter(Boolean);
	}

	if (typeof value === 'string') {
		return value
			.split(/\r?\n|,/)
			.map((item) => item.trim())
			.filter(Boolean);
	}

	return [];
}

function normalizeTechnicalDetails(
	value: ProjectRequestBody['technicalDetails'],
) {
	const rawDetails = Array.isArray(value)
		? value
		: typeof value === 'string'
		? value
				.split(/\r?\n/)
				.map((item) => item.trim())
				.filter(Boolean)
		: [];

	return rawDetails
		.map((detail, index) => {
			if (typeof detail === 'string') {
				const separatorIndex = detail.indexOf(':');
				if (separatorIndex === -1) {
					return {
						title: `Detail ${index + 1}`,
						description: detail,
					};
				}

				return {
					title:
						detail.slice(0, separatorIndex).trim() || `Detail ${index + 1}`,
					description: detail.slice(separatorIndex + 1).trim(),
				};
			}

			return {
				title: cleanString(detail?.title) || `Detail ${index + 1}`,
				description: cleanString(detail?.description),
			};
		})
		.filter((detail) => detail.title || detail.description);
}

function normalizeProjectUpdates(body: ProjectRequestBody) {
	const updates: Partial<ProjectRequestBody> = {};

	if (body.title !== undefined) updates.title = cleanString(body.title);
	if (body.summary !== undefined) updates.summary = cleanString(body.summary);
	if (body.description !== undefined || body.content !== undefined) {
		updates.description =
			cleanString(body.description) || cleanString(body.content);
	}
	if (body.category !== undefined) updates.category = body.category;
	if (body.stack !== undefined || body.technologies !== undefined) {
		updates.stack = normalizeStringArray(body.stack ?? body.technologies);
	}
	if (body.coverImage !== undefined || body.image !== undefined) {
		updates.coverImage =
			cleanString(body.coverImage) || cleanString(body.image);
	}
	if (body.images !== undefined) updates.images = normalizeStringArray(body.images);
	if (body.demoUrl !== undefined || body.liveLink !== undefined) {
		updates.demoUrl = cleanString(body.demoUrl) || cleanString(body.liveLink);
	}
	if (body.repoUrl !== undefined || body.githubLink !== undefined) {
		updates.repoUrl = cleanString(body.repoUrl) || cleanString(body.githubLink);
	}
	if (body.featured !== undefined) updates.featured = body.featured;
	if (body.role !== undefined) updates.role = cleanString(body.role);
	if (body.timeline !== undefined) updates.timeline = cleanString(body.timeline);
	if (body.acknowledgement !== undefined) {
		updates.acknowledgement = cleanString(body.acknowledgement);
	}
	if (body.challenges !== undefined) {
		updates.challenges = normalizeStringArray(body.challenges);
	}
	if (body.solutions !== undefined) {
		updates.solutions = normalizeStringArray(body.solutions);
	}
	if (body.lessons !== undefined) {
		updates.lessons = normalizeStringArray(body.lessons);
	}
	if (body.keyFeatures !== undefined) {
		updates.keyFeatures = normalizeStringArray(body.keyFeatures);
	}
	if (body.technicalDetails !== undefined) {
		updates.technicalDetails = normalizeTechnicalDetails(body.technicalDetails);
	}
	if (body.status !== undefined) updates.status = body.status;
	if (body.complexity !== undefined) updates.complexity = body.complexity;

	return updates;
}

// GET - Fetch a single project by slug
export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ slug: string }> },
) {
	try {
		const { slug } = await params;
		const { user, error } = await authenticateRequest(request);
		if (!user || error) {
			return createAuthResponse(401, error || 'Unauthorized');
		}

		await connectDB();

		const project = await Project.findOne({ slug });
		if (!project) {
			return createAuthResponse(404, 'Project not found');
		}

		return createAuthResponse(200, 'Project fetched successfully', project);
	} catch (error: unknown) {
		console.error('Error fetching project:', error);
		const message =
			error instanceof Error ? error.message : 'Failed to fetch project';
		return createAuthResponse(500, message);
	}
}

// PUT - Update a project
export async function PUT(
	request: NextRequest,
	{ params }: { params: Promise<{ slug: string }> },
) {
	try {
		const { slug } = await params;
		const { user, error } = await authenticateRequest(request);
		if (!user || error) {
			return createAuthResponse(401, error || 'Unauthorized');
		}

		await connectDB();

		const updates = normalizeProjectUpdates(
			(await request.json()) as ProjectRequestBody,
		);

		// Find the project
		const project = await Project.findOne({ slug });
		if (!project) {
			return createAuthResponse(404, 'Project not found');
		}

		Object.assign(project, updates);

		await project.save();

		return createAuthResponse(200, 'Project updated successfully', project);
	} catch (error: unknown) {
		console.error('Error updating project:', error);
		const message =
			error instanceof Error ? error.message : 'Failed to update project';
		return createAuthResponse(500, message);
	}
}

// DELETE - Delete a project
export async function DELETE(
	request: NextRequest,
	{ params }: { params: Promise<{ slug: string }> },
) {
	try {
		const { slug } = await params;
		const { user, error } = await authenticateRequest(request);
		if (!user || error) {
			return createAuthResponse(401, error || 'Unauthorized');
		}

		await connectDB();

		const project = await Project.findOneAndDelete({ slug });
		if (!project) {
			return createAuthResponse(404, 'Project not found');
		}

		return createAuthResponse(200, 'Project deleted successfully');
	} catch (error: unknown) {
		console.error('Error deleting project:', error);
		const message =
			error instanceof Error ? error.message : 'Failed to delete project';
		return createAuthResponse(500, message);
	}
}
