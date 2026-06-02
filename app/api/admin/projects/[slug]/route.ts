import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db/mongoose';
import { Project } from '@/lib/models';
import { authenticateRequest, createAuthResponse } from '@/lib/middleware/auth';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { user, error } = await authenticateRequest(request);
    if (!user || error) {
      return createAuthResponse(401, error || 'Unauthorized');
    }

    await connectDB();

    const body = await request.json();
    const { title, description, content, category, technologies, liveLink, githubLink, image, featured } = body;

    const project = await Project.findOne({ slug });
    if (!project) {
      return createAuthResponse(404, 'Project not found');
    }

    // Update fields
    if (title) project.title = title;
    if (description) project.description = description;
    if (content) project.content = content;
    if (category) project.category = category;
    if (technologies) project.technologies = technologies;
    if (liveLink) project.liveLink = liveLink;
    if (githubLink) project.githubLink = githubLink;
    if (image !== undefined) project.image = image;
    if (featured !== undefined) project.featured = featured;

    await project.save();

    return createAuthResponse(200, 'Project updated successfully', project);
  } catch (error: any) {
    console.error('Error updating project:', error);
    return createAuthResponse(500, error.message || 'Failed to update project');
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
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
  } catch (error: any) {
    console.error('Error deleting project:', error);
    return createAuthResponse(500, error.message || 'Failed to delete project');
  }
}
