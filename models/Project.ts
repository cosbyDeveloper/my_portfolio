// models/Project.ts
import mongoose from 'mongoose';

export interface IProject extends mongoose.Document {
	slug: string;
	title: string;
	category: {
		key: 'cosby' | 'freelance' | 'personal' | 'course';
		label: string;
	};
	summary: string;
	description: string;
	stack: string[];
	coverImage: string;
	images: string[];
	demoUrl?: string;
	repoUrl?: string;
	featured: boolean;
	acknowledgement?: string;

	// Detail page properties
	challenges?: string[];
	solutions?: string[];
	lessons?: string[];
	keyFeatures?: string[];
	technicalDetails?: Array<{
		title: string;
		description: string;
	}>;
	role?: string;
	timeline?: string;
	status?: 'initial stage' | 'in progress' | 'completed' | 'on hold';
	complexity?: 'low' | 'medium' | 'high';
	createdAt: Date;
	updatedAt: Date;
}

const TechnicalDetailSchema = new mongoose.Schema({
	title: String,
	description: String,
});

const ProjectSchema = new mongoose.Schema<IProject>(
	{
		slug: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
		},
		title: {
			type: String,
			required: true,
		},
		category: {
			key: {
				type: String,
				enum: ['cosby', 'freelance', 'personal', 'course'],
				required: true,
			},
			label: {
				type: String,
				required: true,
			},
		},
		summary: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		stack: [String],
		coverImage: {
			type: String,
			required: true,
		},
		images: [String],
		demoUrl: String,
		repoUrl: String,
		featured: {
			type: Boolean,
			default: false,
		},
		acknowledgement: String,
		challenges: [String],
		solutions: [String],
		lessons: [String],
		keyFeatures: [String],
		technicalDetails: [TechnicalDetailSchema],
		role: String,
		timeline: String,
		status: {
			type: String,
			enum: ['initial stage', 'in progress', 'completed', 'on hold'],
		},
		complexity: {
			type: String,
			enum: ['low', 'medium', 'high'],
		},
	},
	{
		timestamps: true,
	},
);

// Indexes for faster queries
ProjectSchema.index({ slug: 1 });
ProjectSchema.index({ featured: 1 });
ProjectSchema.index({ 'category.key': 1 });
ProjectSchema.index({ status: 1 });

export const Project =
	mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
