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
    const read = searchParams.get('read');

    let query: any = {};
    if (read === 'true') {
      query.read = true;
    } else if (read === 'false') {
      query.read = false;
    }

    const messages = await Message.find(query).sort({ createdAt: -1 });

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
    const { messageId, read } = body;

    if (!messageId || read === undefined) {
      return createAuthResponse(400, 'Missing required fields');
    }

    const message = await Message.findByIdAndUpdate(
      messageId,
      { read },
      { new: true }
    );

    if (!message) {
      return createAuthResponse(404, 'Message not found');
    }

    return createAuthResponse(200, 'Message updated successfully', message);
  } catch (error: any) {
    console.error('Error updating message:', error);
    return createAuthResponse(500, error.message || 'Failed to update message');
  }
}
