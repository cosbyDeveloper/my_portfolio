import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db/mongoose';
import { Project } from '@/lib/models';
import { authenticateRequest, createAuthResponse } from '@/lib/middleware/auth';

export async function POST(request: NextRequest) {
  try {
    const { user, error } = await authenticateRequest(request);
    if (!user || error) {
      return createAuthResponse(401, error || 'Unauthorized');
    }

    await connectDB();

    const body = await request.json();
    const { title, slug, description, content, category, technologies, liveLink, githubLink, image, featured } =
      body;

    if (!title || !slug || !description || !content || !category) {
      return createAuthResponse(400, 'Missing required fields');
    }

    // Check if slug already exists
    const existingProject = await Project.findOne({ slug });
    if (existingProject) {
      return createAuthResponse(409, 'Project with this slug already exists');
    }

    const project = new Project({
      title,
      slug,
      description,
      content,
      category,
      technologies: technologies || [],
      liveLink,
      githubLink,
      image,
      featured: featured || false,
    });

    await project.save();

    return createAuthResponse(201, 'Project created successfully', project);
  } catch (error: any) {
    console.error('Error creating project:', error);
    return createAuthResponse(500, error.message || 'Failed to create project');
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
  } catch (error: any) {
    console.error('Error fetching projects:', error);
    return createAuthResponse(500, error.message || 'Failed to fetch projects');
  }
}
