import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db/mongoose';
import { Message } from '@/lib/models';
import { calculateSpamScore } from '@/lib/spam-detector';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { name, email, subject, message, phone, formTimestamp } = body;

    // =====================================================
    // HONEYPOT CHECK
    // =====================================================

    if (body.website) {
      return Response.json(
        {
          success: false,
          error: 'Invalid submission',
        },
        { status: 400 }
      );
    }

    // =====================================================
    // TIMING CHECK
    // =====================================================

    if (formTimestamp) {
      const submissionTime = parseInt(formTimestamp as string, 10);

      if (isNaN(submissionTime)) {
        return Response.json(
          {
            success: false,
            error: 'Invalid submission',
          },
          { status: 400 }
        );
      }

      const elapsedSeconds = (Date.now() - submissionTime) / 1000;

      if (elapsedSeconds < 5) {
        return Response.json(
          {
            success: false,
            error: 'Please take your time to fill out the form',
          },
          { status: 429 }
        );
      }
    }

    // =====================================================
    // VALIDATION
    // =====================================================

    if (!name || !email || !subject || !message) {
      return Response.json(
        {
          success: false,
          error: 'Missing required fields',
        },
        { status: 400 }
      );
    }

    // =====================================================
    // SPAM DETECTION
    // =====================================================

    const spamAnalysis = calculateSpamScore(name, email, message);

    if (spamAnalysis.isSpam) {
      console.error(
        `[SPAM BLOCKED] IP: ${request.headers.get('x-forwarded-for') || 'unknown'}, Email: ${email}, Score: ${spamAnalysis.score}, Reasons: ${spamAnalysis.reasons.join('; ')}`
      );

      return Response.json(
        {
          success: false,
          error: 'Your submission could not be processed',
        },
        { status: 400 }
      );
    }

    // =====================================================
    // SPLIT NAME
    // =====================================================

    const nameParts = name.trim().split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || undefined;

    // =====================================================
    // SAVE TO DATABASE
    // =====================================================

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
