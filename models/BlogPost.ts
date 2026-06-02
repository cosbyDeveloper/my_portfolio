// models/BlogPost.ts
import mongoose from 'mongoose';

export interface IBlogPost extends mongoose.Document {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  htmlContent?: string;
  jsonContent?: unknown;
  date: Date;
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
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema = new mongoose.Schema<IBlogPost>(
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
    excerpt: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    htmlContent: String,
    jsonContent: mongoose.Schema.Types.Mixed,
    date: {
      type: Date,
      required: true,
    },
    tags: [{
      type: String,
    }],
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
      default: false,
    },
    seoTitle: String,
    seoDescription: String,
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
BlogPostSchema.index({ slug: 1 });
BlogPostSchema.index({ published: 1, date: -1 });
BlogPostSchema.index({ tags: 1 });
BlogPostSchema.index({ featured: 1, published: 1 });

export const BlogPost = mongoose.models.BlogPost || mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);