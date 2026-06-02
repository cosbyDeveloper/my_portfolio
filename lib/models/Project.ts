import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
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

const ProjectSchema = new Schema<IProject>(
  {
    slug: {
      type: String,
      required: [true, 'Project slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
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
      required: [true, 'Project summary is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
    },
    stack: {
      type: [String],
      required: true,
      default: [],
    },
    coverImage: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
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
    technicalDetails: [
      {
        title: String,
        description: String,
      },
    ],
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
  { timestamps: true }
);

export default mongoose.models.Project ||
  mongoose.model<IProject>('Project', ProjectSchema);
