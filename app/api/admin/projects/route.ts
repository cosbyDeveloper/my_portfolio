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
  technicalDetails?: Array<{ title?: string; description?: string } | string> | string;
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

function normalizeTechnicalDetails(value: ProjectRequestBody['technicalDetails']) {
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
          title: detail.slice(0, separatorIndex).trim() || `Detail ${index + 1}`,
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

function normalizeProjectPayload(body: ProjectRequestBody) {
  return {
    title: cleanString(body.title),
    slug: cleanString(body.slug).toLowerCase(),
    description: cleanString(body.description) || cleanString(body.content),
    summary: cleanString(body.summary),
    category: body.category,
    stack: normalizeStringArray(body.stack ?? body.technologies),
    coverImage: cleanString(body.coverImage) || cleanString(body.image),
    images: normalizeStringArray(body.images),
    demoUrl: cleanString(body.demoUrl) || cleanString(body.liveLink),
    repoUrl: cleanString(body.repoUrl) || cleanString(body.githubLink),
    featured: body.featured ?? false,
    role: cleanString(body.role),
    timeline: cleanString(body.timeline),
    acknowledgement: cleanString(body.acknowledgement),
    challenges: normalizeStringArray(body.challenges),
    solutions: normalizeStringArray(body.solutions),
    lessons: normalizeStringArray(body.lessons),
    keyFeatures: normalizeStringArray(body.keyFeatures),
    technicalDetails: normalizeTechnicalDetails(body.technicalDetails),
    status: body.status,
    complexity: body.complexity,
  };
}

export async function POST(request: NextRequest) {
  try {
    const { user, error } = await authenticateRequest(request);
    if (!user || error) {
      return createAuthResponse(401, error || 'Unauthorized');
    }

    await connectDB();

    const payload = normalizeProjectPayload((await request.json()) as ProjectRequestBody);

    // Validate required fields
    const missingFields = ['title', 'slug', 'description', 'summary', 'category']
      .filter((field) => !payload[field as keyof typeof payload]);

    if (missingFields.length > 0) {
      return createAuthResponse(
        400,
        `Missing required fields: ${missingFields.join(', ')}`
      );
    }

    if (!payload.coverImage) {
      return createAuthResponse(400, 'Missing required field: coverImage');
    }

    // Check if slug already exists
    const existingProject = await Project.findOne({ slug: payload.slug });
    if (existingProject) {
      return createAuthResponse(409, 'Project with this slug already exists');
    }

    const project = new Project(payload);

    await project.save();

    return createAuthResponse(201, 'Project created successfully', project);
  } catch (error: unknown) {
    console.error('Error creating project:', error);
    const message = error instanceof Error ? error.message : 'Failed to create project';
    return createAuthResponse(500, message);
  }
}

export async function GET(request: NextRequest) {
  try {
    const { user, error } = await authenticateRequest(request);
    if (!user || error) {
      return createAuthResponse(401, error || 'Unauthorized');
    }

    await connectDB();

    const projects = await Project.find().sort({ createdAt: -1 });

    return createAuthResponse(200, 'Projects fetched successfully', projects);
  } catch (error: unknown) {
    console.error('Error fetching projects:', error);
    const message = error instanceof Error ? error.message : 'Failed to fetch projects';
    return createAuthResponse(500, message);
  }
}
