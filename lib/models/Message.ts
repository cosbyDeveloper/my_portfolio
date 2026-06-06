// lib/models/Message.ts
import mongoose from 'mongoose';

export interface IMessageReply {
	content: string;
	sentBy: 'admin' | 'user';
	sentAt: Date;
	emailMessageId?: string; // used when email integration is added
}

export interface IMessage extends mongoose.Document {
	firstName: string;
	lastName?: string;
	email: string;
	phone?: string;
	subject: string;
	message: string;
	status: 'new' | 'read' | 'replied' | 'archived' | 'spam';
	priority: 'low' | 'normal' | 'high';
	category:
		| 'general'
		| 'job'
		| 'collaboration'
		| 'question'
		| 'project'
		| 'other';
	read: boolean;
	readAt?: Date;
	repliedAt?: Date;
	archivedAt?: Date;
	replies: IMessageReply[];
	lastAdminReplyAt?: Date;
	lastUserReplyAt?: Date;
	replyCount: number;
	ipAddress?: string;
	userAgent?: string;
	referrer?: string;
	adminNotes?: string;
	assignedTo?: mongoose.Types.ObjectId;
	createdAt: Date;
	updatedAt: Date;
	// virtuals
	fullName: string;
	isUnread: boolean;
}

const MessageSchema = new mongoose.Schema<IMessage>(
	{
		firstName: {
			type: String,
			required: [true, 'First name is required'],
			trim: true,
		},
		lastName: { type: String, trim: true },
		email: {
			type: String,
			required: [true, 'Email address is required'],
			lowercase: true,
			trim: true,
			validate: {
				validator: (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
				message: (props: { value: string }) =>
					`${props.value} is not a valid email address!`,
			},
		},
		phone: { type: String, trim: true },
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
		read: { type: Boolean, default: false },
		readAt: Date,
		repliedAt: Date,
		archivedAt: Date,
		replies: [
			{
				content: { type: String, required: true },
				sentBy: { type: String, enum: ['admin', 'user'], required: true },
				sentAt: { type: Date, default: Date.now },
				emailMessageId: String, // reserved for future email threading
			},
		],
		lastAdminReplyAt: Date,
		lastUserReplyAt: Date,
		replyCount: { type: Number, default: 0 },
		ipAddress: String,
		userAgent: String,
		referrer: String,
		adminNotes: { type: String, maxlength: 1000 },
		assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	},
	{
		timestamps: true,
		toJSON: { virtuals: true }, // ← enables fullName + isUnread in .lean() responses
		toObject: { virtuals: true },
	},
);

// ─── Virtuals ────────────────────────────────────────────────────────────────

MessageSchema.virtual('fullName').get(function () {
	return this.lastName ? `${this.firstName} ${this.lastName}` : this.firstName;
});

MessageSchema.virtual('isUnread').get(function () {
	return !this.read;
});

// ─── Pre-save middleware ──────────────────────────────────────────────────────

MessageSchema.pre('save', async function () {
	try {
		if (this.isModified('replies')) {
			this.replyCount = this.replies.length;
			if (this.replies.length > 0 && !this.repliedAt) {
				this.repliedAt = new Date();
			}
			const lastReply = this.replies[this.replies.length - 1];
			if (lastReply) {
				if (lastReply.sentBy === 'admin') {
					this.lastAdminReplyAt = lastReply.sentAt;
				} else {
					this.lastUserReplyAt = lastReply.sentAt;
				}
			}
		}
		if (this.isModified('read') && this.read && !this.readAt) {
			this.readAt = new Date();
			if (this.status === 'new') this.status = 'read';
		}
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

MessageSchema.post('save', function (doc) {
	try {
		if (doc.isNew && doc.status === 'new') {
			console.log(`New message received from ${doc.fullName} (${doc.email})`);
		}
	} catch (error) {
		console.error('Error in Message post-save middleware:', error);
	}
});

// ─── Indexes ─────────────────────────────────────────────────────────────────

MessageSchema.index({ status: 1, createdAt: -1 });
MessageSchema.index({ priority: 1, createdAt: -1 });
MessageSchema.index({ email: 1 });
MessageSchema.index({ category: 1 });
MessageSchema.index({ read: 1 });
MessageSchema.index({ createdAt: -1 });
MessageSchema.index({ assignedTo: 1, status: 1 });

// ─── Static methods ───────────────────────────────────────────────────────────

MessageSchema.statics = {
	async findUnread() {
		return this.find({ read: false }).sort({ createdAt: -1 }).limit(100).lean();
	},

	async findByEmail(email: string) {
		return this.find({ email: email.toLowerCase() })
			.sort({ createdAt: -1 })
			.lean();
	},

	async getStats() {
		const [total, unread, highPriority, statusCounts, categoryCounts] =
			await Promise.all([
				this.countDocuments(),
				this.countDocuments({ read: false }),
				this.countDocuments({ priority: 'high', read: false }),
				this.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
				this.aggregate([{ $group: { _id: '$category', count: { $sum: 1 } } }]),
			]);

		const byStatus: Record<string, number> = {};
		const byCategory: Record<string, number> = {};
		statusCounts.forEach((i: { _id: string; count: number }) => {
			byStatus[i._id] = i.count;
		});
		categoryCounts.forEach((i: { _id: string; count: number }) => {
			byCategory[i._id] = i.count;
		});

		return {
			total,
			unread,
			highPriority,
			read: total - unread,
			byStatus,
			byCategory,
		};
	},

	async markAsRead(messageId: string) {
		return this.findByIdAndUpdate(
			messageId,
			{ read: true, readAt: new Date(), status: 'read' },
			{ new: true },
		).lean();
	},

	async addReply(messageId: string, reply: IMessageReply) {
		const message = await this.findById(messageId);
		if (!message) throw new Error('Message not found');
		message.replies.push(reply);
		if (reply.sentBy === 'admin') {
			message.status = 'replied';
		}
		// Let pre-save middleware handle replyCount, repliedAt, lastAdminReplyAt
		return message.save();
	},
};

// ─── Model interface ──────────────────────────────────────────────────────────

interface MessageModel extends mongoose.Model<IMessage> {
	findUnread(): Promise<IMessage[]>;
	findByEmail(email: string): Promise<IMessage[]>;
	getStats(): Promise<{
		total: number;
		unread: number;
		highPriority: number;
		read: number;
		byStatus: Record<string, number>;
		byCategory: Record<string, number>;
	}>;
	markAsRead(messageId: string): Promise<IMessage | null>;
	addReply(messageId: string, reply: IMessageReply): Promise<IMessage>;
}

export const Message: MessageModel =
	(mongoose.models.Message as MessageModel) ||
	mongoose.model<IMessage, MessageModel>('Message', MessageSchema);
