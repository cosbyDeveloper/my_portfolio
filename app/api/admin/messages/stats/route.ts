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

		const [total, unread, highPriority, byStatus] = await Promise.all([
			Message.countDocuments(),
			Message.countDocuments({ read: false }),
			Message.countDocuments({ priority: 'high', read: false }),
			Message.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
		]);

		const statusCounts: Record<string, number> = {};
		byStatus.forEach((item: { _id: string; count: number }) => {
			statusCounts[item._id] = item.count;
		});

		return createAuthResponse(200, 'Stats fetched successfully', {
			total,
			unread,
			highPriority,
			read: total - unread,
			byStatus: statusCounts,
		});
	} catch (error: any) {
		console.error('Messages stats error:', error);
		return createAuthResponse(
			500,
			error.message || 'Failed to fetch message stats',
		);
	}
}
