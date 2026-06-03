import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db/mongoose';
import { Message } from '@/lib/models';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { name, email, subject, message, phone } = body;

    // Validation
    if (!name || !email || !subject || !message) {
      return Response.json(
        {
          success: false,
          error: 'Missing required fields',
        },
        { status: 400 }
      );
    }

    // Split name into firstName and lastName
    const nameParts = name.trim().split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || undefined;

    const newMessage = new Message({
      firstName,
      lastName,
      email,
      phone,
      subject,
      message,
    });

    await newMessage.save();

    return Response.json(
      {
        success: true,
        message: 'Message sent successfully',
        data: newMessage,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error saving message:', error);
    return Response.json(
      {
        success: false,
        error: error.message || 'Failed to save message',
      },
      { status: 500 }
    );
  }
}
