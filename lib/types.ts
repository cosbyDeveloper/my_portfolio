/**
 * Unified Type Definitions
 * Single source of truth for all data types used across the frontend.
 * These match the original constants and Mongoose models.
 */

import { IMessageReply } from '@/lib/models/Message';

/**
 * Project type - represents a portfolio project
 */
export interface Project {
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
	featured?: boolean;
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
	createdAt?: Date;
	updatedAt?: Date;
}

/**
 * BlogPost type - represents a blog article
 */
export interface BlogPost {
	slug: string;
	title: string;
	excerpt: string;
	content: string; // Full content for detail page
	htmlContent?: string; // For rich text HTML
	jsonContent?: unknown; // For structured content from rich text editor
	date: string;
	tags: string[];
	featured?: boolean;
	image?: string;
	author: string;
	readTime: string;
	metaDescription?: string;
	category?: string;
	published?: boolean;
	seoTitle?: string;
	seoDescription?: string;
	updatedAt?: string;
	createdAt?: Date;
}

/**
 * Message type - represents a contact form submission
 */
export interface Message {
	_id?: string;
	firstName: string;
	lastName?: string;
	name: string;
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

	createdAt: Date;
	updatedAt: Date;
}

/**
 * User type - for future admin/authentication features
 */
export interface User {
	_id?: string;
	email: string;
	password?: string;
	name: string;
	createdAt?: Date;
	updatedAt?: Date;
}

/**
 * Filter/Category option for UI
 */
export interface FilterOption {
	key: string;
	label: string;
}

/**
 * Pagination state for lists
 */
export interface PaginationState {
	currentPage: number;
	totalPages: number;
	itemsPerPage: number;
	totalItems: number;
}
