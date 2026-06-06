import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db/mongoose';
import { Message } from '@/lib/models';
import { authenticateRequest, createAuthResponse } from '@/lib/middleware/auth';

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { user, error } = await authenticateRequest(request);
		if (!user || error) return createAuthResponse(401, error || 'Unauthorized');

		await connectDB();
		const { id } = await params;

		const message = await Message.findById(id).lean();
		if (!message) return createAuthResponse(404, 'Message not found');

		return createAuthResponse(200, 'Message fetched successfully', message);
	} catch (error: any) {
		console.error('Error fetching message:', error);
		return createAuthResponse(500, error.message || 'Failed to fetch message');
	}
}

export async function PATCH(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { user, error } = await authenticateRequest(request);
		if (!user || error) return createAuthResponse(401, error || 'Unauthorized');

		await connectDB();
		const { id } = await params;
		const body = await request.json();
		const { read, status, priority, category, adminNotes } = body;

		// Use markAsRead static when that's the sole operation
		if (
			read === true &&
			!status &&
			!priority &&
			!category &&
			adminNotes === undefined
		) {
			const message = await Message.markAsRead(id);
			if (!message) return createAuthResponse(404, 'Message not found');
			return createAuthResponse(200, 'Message updated successfully', message);
		}

		const updateFields: Record<string, unknown> = {};
		if (read !== undefined) {
			updateFields.read = read;
			if (read === true) updateFields.readAt = new Date();
		}
		if (status) updateFields.status = status;
		if (priority) updateFields.priority = priority;
		if (category) updateFields.category = category;
		if (adminNotes !== undefined) updateFields.adminNotes = adminNotes;

		const message = await Message.findByIdAndUpdate(id, updateFields, {
			returnDocument: 'after',
		});
		if (!message) return createAuthResponse(404, 'Message not found');

		return createAuthResponse(200, 'Message updated successfully', message);
	} catch (error: any) {
		console.error('Error updating message:', error);
		return createAuthResponse(500, error.message || 'Failed to update message');
	}
}

export async function POST(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { user, error } = await authenticateRequest(request);
		if (!user || error) return createAuthResponse(401, error || 'Unauthorized');

		await connectDB();
		const { id } = await params;
		const body = await request.json();
		const { replyContent } = body;

		if (!replyContent)
			return createAuthResponse(400, 'Reply content is required');

		// Use addReply static — handles status, replyCount, timestamps via middleware
		const message = await Message.addReply(id, {
			content: replyContent,
			sentBy: 'admin',
			sentAt: new Date(),
			// emailMessageId will be set here once email integration is added
		});

		return createAuthResponse(200, 'Reply sent successfully', message);
	} catch (error: any) {
		console.error('Error adding reply:', error);
		return createAuthResponse(500, error.message || 'Failed to add reply');
	}
}

export async function DELETE(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { user, error } = await authenticateRequest(request);
		if (!user || error) return createAuthResponse(401, error || 'Unauthorized');

		await connectDB();
		const { id } = await params;

		const message = await Message.findByIdAndDelete(id);
		if (!message) return createAuthResponse(404, 'Message not found');

		return createAuthResponse(200, 'Message deleted successfully');
	} catch (error: any) {
		console.error('Error deleting message:', error);
		return createAuthResponse(500, error.message || 'Failed to delete message');
	}
}
