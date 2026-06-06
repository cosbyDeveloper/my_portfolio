// app/api/contact/route.ts
import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db/mongoose';
import { Message } from '@/lib/models';
import { calculateSpamScore } from '@/lib/spam-detector';

export async function POST(request: NextRequest) {
	try {
		await connectDB();

		const body = await request.json();
		const {
			firstName,
			lastName,
			email,
			subject,
			message,
			phone,
			formTimestamp,
			category,
		} = body;

		// =====================================================
		// HONEYPOT CHECK
		// =====================================================
		if (body.website) {
			return Response.json(
				{ success: false, error: 'Invalid submission' },
				{ status: 400 },
			);
		}

		// =====================================================
		// TIMING CHECK
		// =====================================================
		if (formTimestamp) {
			const submissionTime = parseInt(formTimestamp as string, 10);
			if (isNaN(submissionTime)) {
				return Response.json(
					{ success: false, error: 'Invalid submission' },
					{ status: 400 },
				);
			}

			const elapsedSeconds = (Date.now() - submissionTime) / 1000;
			if (elapsedSeconds < 5) {
				return Response.json(
					{
						success: false,
						error: 'Please take your time to fill out the form',
					},
					{ status: 429 },
				);
			}
		}

		// =====================================================
		// VALIDATION
		// =====================================================
		if (!firstName || !email || !subject || !message) {
			return Response.json(
				{
					success: false,
					error: 'Missing required fields: firstName, email, subject, message',
				},
				{ status: 400 },
			);
		}

		// =====================================================
		// DETECT CATEGORY FROM SUBJECT/MESSAGE
		// =====================================================
		const detectedCategory = detectCategory(subject, message);

		// =====================================================
		// DETECT PRIORITY
		// =====================================================
		const priority = detectPriority(subject, message);

		// =====================================================
		// SPAM DETECTION
		// =====================================================
		const fullName = lastName ? `${firstName} ${lastName}` : firstName;
		const spamAnalysis = calculateSpamScore(fullName, email, message);

		if (spamAnalysis.isSpam) {
			console.error(
				`[SPAM BLOCKED] IP: ${request.headers.get('x-forwarded-for') || 'unknown'}, Email: ${email}, Score: ${spamAnalysis.score}, Reasons: ${spamAnalysis.reasons.join('; ')}`,
			);

			return Response.json(
				{ success: false, error: 'Your submission could not be processed' },
				{ status: 400 },
			);
		}

		// =====================================================
		// GET IP AND USER AGENT
		// =====================================================
		const ipAddress =
			request.headers.get('x-forwarded-for')?.split(',')[0] ||
			request.headers.get('x-real-ip') ||
			undefined;
		const userAgent = request.headers.get('user-agent') || undefined;
		const referrer = request.headers.get('referer') || undefined;

		// =====================================================
		// SAVE TO DATABASE
		// =====================================================
		const newMessage = new Message({
			firstName,
			lastName: lastName || undefined,
			email,
			phone,
			subject,
			message,
			status: 'new',
			priority,
			category: category || detectedCategory,
			read: false,
			ipAddress,
			userAgent,
			referrer,
			replyCount: 0,
			replies: [],
		});

		await newMessage.save();

		return Response.json(
			{
				success: true,
				message: 'Message sent successfully',
				data: {
					id: newMessage._id,
					status: newMessage.status,
					priority: newMessage.priority,
					category: newMessage.category,
				},
			},
			{ status: 201 },
		);
	} catch (error: any) {
		console.error('Error saving message:', error);
		return Response.json(
			{ success: false, error: error.message || 'Failed to save message' },
			{ status: 500 },
		);
	}
}

// Helper functions remain the same...
function detectCategory(
	subject: string,
	message: string,
): 'general' | 'job' | 'collaboration' | 'question' | 'project' | 'other' {
	const content = `${subject} ${message}`.toLowerCase();

	if (
		content.includes('job') ||
		content.includes('hiring') ||
		content.includes('position') ||
		content.includes('career')
	) {
		return 'job';
	}
	if (
		content.includes('collaboration') ||
		content.includes('partner') ||
		content.includes('together')
	) {
		return 'collaboration';
	}
	if (
		content.includes('project') ||
		content.includes('build') ||
		content.includes('develop')
	) {
		return 'project';
	}
	if (
		content.includes('question') ||
		content.includes('how') ||
		content.includes('why') ||
		content.includes('what') ||
		content.includes('?')
	) {
		return 'question';
	}
	return 'general';
}

function detectPriority(
	subject: string,
	message: string,
): 'low' | 'normal' | 'high' {
	const content = `${subject} ${message}`.toLowerCase();

	if (
		content.includes('urgent') ||
		content.includes('asap') ||
		content.includes('emergency') ||
		content.includes('critical')
	) {
		return 'high';
	}
	if (
		content.includes('quick') ||
		content.includes('small') ||
		content.includes('simple')
	) {
		return 'low';
	}
	return 'normal';
}
