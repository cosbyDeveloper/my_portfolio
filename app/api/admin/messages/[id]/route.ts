// app/api/admin/messages/[id]/route.ts
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
		if (!user || error) {
			return createAuthResponse(401, error || 'Unauthorized');
		}

		await connectDB();
		const { id } = await params;

		const message = await Message.findById(id).lean();

		if (!message) {
			return createAuthResponse(404, 'Message not found');
		}

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
		if (!user || error) {
			return createAuthResponse(401, error || 'Unauthorized');
		}

		await connectDB();
		const { id } = await params;
		const body = await request.json();
		const { read, status, priority, category, adminNotes } = body;

		const updateFields: any = {};

		if (read !== undefined) {
			updateFields.read = read;
			if (read === true) {
				updateFields.readAt = new Date();
				// Get current message to check status
				const currentMessage = await Message.findById(id);
				if (currentMessage && currentMessage.status === 'new') {
					updateFields.status = 'read';
				}
			}
		}
		if (status) updateFields.status = status;
		if (priority) updateFields.priority = priority;
		if (category) updateFields.category = category;
		if (adminNotes !== undefined) updateFields.adminNotes = adminNotes;

		const message = await Message.findByIdAndUpdate(id, updateFields, {
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

export async function POST(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { user, error } = await authenticateRequest(request);
		if (!user || error) {
			return createAuthResponse(401, error || 'Unauthorized');
		}

		await connectDB();
		const { id } = await params;
		const body = await request.json();
		const { replyContent } = body;

		if (!replyContent) {
			return createAuthResponse(400, 'Reply content is required');
		}

		const message = await Message.findById(id);
		if (!message) {
			return createAuthResponse(404, 'Message not found');
		}

		// Add reply
		message.replies.push({
			content: replyContent,
			sentBy: 'admin',
			sentAt: new Date(),
		});

		message.status = 'replied';
		message.repliedAt = new Date();
		message.lastAdminReplyAt = new Date();
		message.replyCount = message.replies.length;

		await message.save();

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
		if (!user || error) {
			return createAuthResponse(401, error || 'Unauthorized');
		}

		await connectDB();
		const { id } = await params;

		const message = await Message.findByIdAndDelete(id);
		if (!message) {
			return createAuthResponse(404, 'Message not found');
		}

		return createAuthResponse(200, 'Message deleted successfully');
	} catch (error: any) {
		console.error('Error deleting message:', error);
		return createAuthResponse(500, error.message || 'Failed to delete message');
	}
}
