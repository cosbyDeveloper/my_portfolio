// models/Message.ts
import mongoose from 'mongoose';

export interface IMessageReply {
	content: string;
	sentBy: 'admin' | 'user';
	sentAt: Date;
	emailMessageId?: string;
}

export interface IMessage extends mongoose.Document {
	firstName: string;
	lastName?: string;
	email: string;
	phone?: string;
	subject: string;
	message: string;

	// Status & Management
	status: 'new' | 'read' | 'replied' | 'archived' | 'spam';
	priority: 'low' | 'normal' | 'high';
	category:
		| 'general'
		| 'job'
		| 'collaboration'
		| 'question'
		| 'project'
		| 'other';

	// Tracking
	read: boolean;
	readAt?: Date;
	repliedAt?: Date;
	archivedAt?: Date;

	// Communication tracking
	replies: IMessageReply[];
	lastAdminReplyAt?: Date;
	lastUserReplyAt?: Date;
	replyCount: number;

	// Metadata
	ipAddress?: string;
	userAgent?: string;
	referrer?: string;

	// Admin internal notes
	adminNotes?: string;
	assignedTo?: mongoose.Types.ObjectId;

	createdAt: Date;
	updatedAt: Date;
}

const MessageSchema = new mongoose.Schema<IMessage>(
	{
		firstName: {
			type: String,
			required: [true, 'First name is required'],
			trim: true,
		},
		lastName: {
			type: String,
			trim: true,
		},
		email: {
			type: String,
			required: [true, 'Email address is required'],
			lowercase: true,
			trim: true,
			validate: {
				validator: function (v: string) {
					return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
				},
				message: (props: { value: string }) =>
					`${props.value} is not a valid email address!`,
			},
		},
		phone: {
			type: String,
			trim: true,
		},
		subject: {
			type: String,
			required: [true, 'Subject is required'],
			trim: true,
			maxlength: 200,
		},
		message: {
			type: String,
			required: [true, 'Message content is required'],
			trim: true,
			minlength: 10,
			maxlength: 5000,
		},

		status: {
			type: String,
			enum: ['new', 'read', 'replied', 'archived', 'spam'],
			default: 'new',
		},
		priority: {
			type: String,
			enum: ['low', 'normal', 'high'],
			default: 'normal',
		},
		category: {
			type: String,
			enum: ['general', 'job', 'collaboration', 'question', 'project', 'other'],
			default: 'general',
		},

		read: {
			type: Boolean,
			default: false,
		},
		readAt: Date,
		repliedAt: Date,
		archivedAt: Date,

		replies: [
			{
				content: {
					type: String,
					required: true,
				},
				sentBy: {
					type: String,
					enum: ['admin', 'user'],
					required: true,
				},
				sentAt: {
					type: Date,
					default: Date.now,
				},
				emailMessageId: String,
			},
		],
		lastAdminReplyAt: Date,
		lastUserReplyAt: Date,
		replyCount: {
			type: Number,
			default: 0,
		},

		ipAddress: String,
		userAgent: String,
		referrer: String,

		adminNotes: {
			type: String,
			maxlength: 1000,
		},
		assignedTo: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{
		timestamps: true,
	},
);

// Virtual property for full name
MessageSchema.virtual('fullName').get(function () {
	return this.lastName ? `${this.firstName} ${this.lastName}` : this.firstName;
});

// Pre-save middleware
MessageSchema.pre('save', async function () {
	try {
		// Update replyCount and timestamps when replies change
		if (this.isModified('replies')) {
			this.replyCount = this.replies.length;

			// Set repliedAt when first reply is added
			if (this.replies.length > 0 && !this.repliedAt) {
				this.repliedAt = new Date();
			}

			// Update last reply timestamps
			const lastReply = this.replies[this.replies.length - 1];
			if (lastReply) {
				if (lastReply.sentBy === 'admin') {
					this.lastAdminReplyAt = lastReply.sentAt;
				} else {
					this.lastUserReplyAt = lastReply.sentAt;
				}
			}
		}

		// Update read status and timestamp
		if (this.isModified('read') && this.read && !this.readAt) {
			this.readAt = new Date();

			// Update status from new to read
			if (this.status === 'new') {
				this.status = 'read';
			}
		}

		// Update status to archived and set timestamp
		if (
			this.isModified('status') &&
			this.status === 'archived' &&
			!this.archivedAt
		) {
			this.archivedAt = new Date();
		}
	} catch (error) {
		console.error('Error in Message pre-save middleware:', error);
	}
});

// Post-save middleware
MessageSchema.post('save', async function (doc) {
	try {
		if (doc.isNew && doc.status === 'new') {
			console.log(
				`New message received from ${doc.firstName} ${doc.lastName || ''} (${doc.email})`,
			);
		}
	} catch (error) {
		console.error('Error in Message post-save middleware:', error);
	}
});

// Indexes for optimized queries
MessageSchema.index({ status: 1, createdAt: -1 });
MessageSchema.index({ priority: 1, createdAt: -1 });
MessageSchema.index({ email: 1 });
MessageSchema.index({ category: 1 });
MessageSchema.index({ read: 1 });
MessageSchema.index({ createdAt: -1 });
MessageSchema.index({ assignedTo: 1, status: 1 });

// Virtual property for convenience
MessageSchema.virtual('isUnread').get(function () {
	return !this.read;
});

// Static methods
MessageSchema.statics = {
	// Find unread messages
	async findUnread() {
		try {
			return await this.find({ read: false })
				.sort({ createdAt: -1 })
				.limit(100)
				.lean();
		} catch (error) {
			console.error('Error finding unread messages:', error);
			throw error;
		}
	},

	// Find messages by email
	async findByEmail(email: string) {
		try {
			return await this.find({ email: email.toLowerCase() })
				.sort({ createdAt: -1 })
				.lean();
		} catch (error) {
			console.error('Error finding messages by email:', error);
			throw error;
		}
	},

	// Get message statistics
	async getStats() {
		try {
			const [total, unread, statusCounts, categoryCounts] = await Promise.all([
				this.countDocuments(),
				this.countDocuments({ read: false }),
				this.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
				this.aggregate([{ $group: { _id: '$category', count: { $sum: 1 } } }]),
			]);

			const byStatus: Record<string, number> = {};
			const byCategory: Record<string, number> = {};

			statusCounts.forEach((item: { _id: string; count: number }) => {
				byStatus[item._id] = item.count;
			});

			categoryCounts.forEach((item: { _id: string; count: number }) => {
				byCategory[item._id] = item.count;
			});

			return {
				total,
				unread,
				byStatus,
				byCategory,
			};
		} catch (error) {
			console.error('Error getting message stats:', error);
			throw error;
		}
	},

	// Mark message as read
	async markAsRead(messageId: string) {
		try {
			return await this.findByIdAndUpdate(
				messageId,
				{
					read: true,
					readAt: new Date(),
					status: 'read',
				},
				{ new: true },
			).lean();
		} catch (error) {
			console.error('Error marking message as read:', error);
			throw error;
		}
	},

	// Add reply to message
	async addReply(messageId: string, reply: IMessageReply) {
		try {
			const message = await this.findById(messageId);
			if (!message) {
				throw new Error('Message not found');
			}

			message.replies.push(reply);

			if (reply.sentBy === 'admin' && message.status !== 'replied') {
				message.status = 'replied';
			}

			return await message.save();
		} catch (error) {
			console.error('Error adding reply to message:', error);
			throw error;
		}
	},
};

// Define the model interface
interface MessageModel extends mongoose.Model<IMessage> {
	findUnread(): Promise<IMessage[]>;
	findByEmail(email: string): Promise<IMessage[]>;
	getStats(): Promise<{
		total: number;
		unread: number;
		byStatus: Record<string, number>;
		byCategory: Record<string, number>;
	}>;
	markAsRead(messageId: string): Promise<IMessage | null>;
	addReply(messageId: string, reply: IMessageReply): Promise<IMessage>;
}

// Export the model
export const Message: MessageModel =
	(mongoose.models.Message as MessageModel) ||
	mongoose.model<IMessage, MessageModel>('Message', MessageSchema);
