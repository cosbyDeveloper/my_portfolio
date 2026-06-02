import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  htmlContent?: string;
  jsonContent?: unknown;
  date: string;
  tags: string[];
  featured: boolean;
  image?: string;
  author: string;
  readTime: string;
  metaDescription?: string;
  category?: string;
  published: boolean;
  seoTitle?: string;
  seoDescription?: string;
  updatedAt?: string;
  createdAt: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    slug: {
      type: String,
      required: [true, 'Blog slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    title: {
      type: String,
      required: [true, 'Blog title is required'],
      trim: true,
    },
    excerpt: {
      type: String,
      required: [true, 'Blog excerpt is required'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Blog content is required'],
    },
    htmlContent: String,
    jsonContent: Schema.Types.Mixed,
    date: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
      default: [],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    image: String,
    author: {
      type: String,
      required: true,
    },
    readTime: {
      type: String,
      required: true,
    },
    metaDescription: String,
    category: String,
    published: {
      type: Boolean,
      default: true,
    },
    seoTitle: String,
    seoDescription: String,
    updatedAt: String,
  },
  { timestamps: true }
);

export default mongoose.models.Blog ||
  mongoose.model<IBlog>('Blog', BlogSchema);
