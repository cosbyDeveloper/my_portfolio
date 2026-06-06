import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db/mongoose';
import { Message } from '@/lib/models';
import { authenticateRequest, createAuthResponse } from '@/lib/middleware/auth';

export async function GET(request: NextRequest) {
	try {
		const { user, error } = await authenticateRequest(request);
		if (!user || error) {
			return createAuthResponse(401, error || 'Unauthorized');
		}

		await connectDB();

		const searchParams = request.nextUrl.searchParams;
		const status = searchParams.get('status');
		const priority = searchParams.get('priority');
		const category = searchParams.get('category');
		const read = searchParams.get('read');

		let query: any = {};

		if (read === 'true') {
			query.read = true;
		} else if (read === 'false') {
			query.read = false;
		}

		if (status) query.status = status;
		if (priority) query.priority = priority;
		if (category) query.category = category;

		const messages = await Message.find(query)
			.sort({ priority: -1, createdAt: -1 })
			.lean();

		return createAuthResponse(200, 'Messages fetched successfully', messages);
	} catch (error: any) {
		console.error('Error fetching messages:', error);
		return createAuthResponse(500, error.message || 'Failed to fetch messages');
	}
}

export async function PATCH(request: NextRequest) {
	try {
		const { user, error } = await authenticateRequest(request);
		if (!user || error) {
			return createAuthResponse(401, error || 'Unauthorized');
		}

		await connectDB();

		const body = await request.json();
		const { messageId, read, status, priority, category, adminNotes } = body;

		if (!messageId) {
			return createAuthResponse(400, 'Missing messageId');
		}

		const updateFields: any = {};

		// Handle read status specially
		if (read !== undefined) {
			updateFields.read = read;
			if (read === true) {
				updateFields.readAt = new Date();
			}
		}

		if (status) updateFields.status = status;
		if (priority) updateFields.priority = priority;
		if (category) updateFields.category = category;
		if (adminNotes !== undefined) updateFields.adminNotes = adminNotes;

		const message = await Message.findByIdAndUpdate(messageId, updateFields, {
			new: true,
		});

		if (!message) {
			return createAuthResponse(404, 'Message not found');
		}

		return createAuthResponse(200, 'Message updated successfully', message);
	} catch (error: any) {
		console.error('Error updating message:', error);
		return createAuthResponse(500, error.message || 'Failed to update message');
	}
}
