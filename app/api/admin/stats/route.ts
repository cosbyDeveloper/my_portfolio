import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db/mongoose';
import { authenticateRequest } from '@/lib/middleware/auth';
import Project from '@/lib/models/Project';
import Blog from '@/lib/models/Blog';
import { Message } from '@/lib/models';

export async function GET(request: NextRequest) {
	try {
		const auth = await authenticateRequest(request);
		if (!auth.user) {
			return new Response(JSON.stringify({ error: 'Unauthorized' }), {
				status: 401,
				headers: { 'Content-Type': 'application/json' },
			});
		}

		await connectDB();

		const [projectsCount, blogsCount, msgStats] = await Promise.all([
			Project.countDocuments(),
			Blog.countDocuments(),
			Message.getStats(), // replaces the two separate Message.countDocuments calls
		]);

		return new Response(
			JSON.stringify({
				projects: projectsCount,
				blogs: blogsCount,
				messages: msgStats.total,
				unread: msgStats.unread,
				highPriority: msgStats.highPriority,
				byStatus: msgStats.byStatus,
				byCategory: msgStats.byCategory,
			}),
			{ status: 200, headers: { 'Content-Type': 'application/json' } },
		);
	} catch (error) {
		console.error('Stats error:', error);
		return new Response(JSON.stringify({ error: 'Failed to fetch stats' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		});
	}
}
