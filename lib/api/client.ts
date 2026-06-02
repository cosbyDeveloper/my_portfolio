/**
 * API Client Layer
 * Abstraction layer for all data fetching operations.
 * Now connected to backend API endpoints.
 * 
 * Benefits:
 * - Single place to manage all data operations
 * - Consistent error handling
 * - Easy to add caching, retry logic, authentication
 * - Components don't care where data comes from
 */

import { Project, BlogPost, Message } from '@/lib/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

/**
 * Generic fetch wrapper with error handling
 */
async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  try {
    const url = endpoint.startsWith('http') ? endpoint : `${API_URL}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error || `API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.data || data;
  } catch (error) {
    console.error(`API call failed: ${endpoint}`, error);
    throw error;
  }
}

/**
 * Projects API
 * Methods for fetching project data from backend
 */
export const projectsApi = {
  /**
   * Get all projects
   * @returns Array of all projects
   */
  async listAll(): Promise<Project[]> {
    try {
      const response = await fetchAPI<{ success: boolean; data: any[] }>('/api/projects');
      return response.data || [];
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      return [];
    }
  },

  /**
   * Get featured projects
   * @returns Array of featured projects
   */
  async listFeatured(): Promise<Project[]> {
    try {
      const response = await fetchAPI<{ success: boolean; data: any[] }>('/api/projects?featured=true');
      return response.data || [];
    } catch (error) {
      console.error('Failed to fetch featured projects:', error);
      return [];
    }
  },

  /**
   * Get project by slug
   * @param slug - The project slug
   * @returns Single project or null if not found
   */
  async getBySlug(slug: string): Promise<Project | null> {
    try {
      const response = await fetchAPI<{ success: boolean; data: any }>(`/api/projects/${slug}`);
      return response.data || null;
    } catch (error) {
      console.error(`Failed to fetch project ${slug}:`, error);
      return null;
    }
  },

  /**
   * Get unique categories from all projects
   * @returns Array of category options
   */
  async getCategories() {
    try {
      const projects = await this.listAll();
      const uniqueCategories = new Map<string, string>();
      
      projects.forEach((p) => {
        if (!uniqueCategories.has(p.category.key)) {
          uniqueCategories.set(p.category.key, p.category.label);
        }
      });

      return [
        { key: 'all', label: 'All Projects' },
        ...Array.from(uniqueCategories.entries()).map(([key, label]) => ({
          key,
          label,
        })),
      ];
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      return [{ key: 'all', label: 'All Projects' }];
    }
  },
};

/**
 * Blogs API
 * Methods for fetching blog data from backend
 */
export const blogsApi = {
  /**
   * Get all blogs
   * @returns Array of all blog posts
   */
  async listAll(): Promise<BlogPost[]> {
    try {
      const response = await fetchAPI<{ success: boolean; data: any[] }>('/api/blogs');
      return response.data || [];
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
      return [];
    }
  },

  /**
   * Get featured blogs
   * @returns Array of featured blog posts
   */
  async listFeatured(): Promise<BlogPost[]> {
    try {
      const response = await fetchAPI<{ success: boolean; data: any[] }>('/api/blogs?featured=true');
      return response.data || [];
    } catch (error) {
      console.error('Failed to fetch featured blogs:', error);
      return [];
    }
  },

  /**
   * Get blog by slug
   * @param slug - The blog slug
   * @returns Single blog post or null if not found
   */
  async getBySlug(slug: string): Promise<BlogPost | null> {
    try {
      const response = await fetchAPI<{ success: boolean; data: any }>(`/api/blogs/${slug}`);
      return response.data || null;
    } catch (error) {
      console.error(`Failed to fetch blog ${slug}:`, error);
      return null;
    }
  },

  /**
   * Get all unique tags from blogs
   * @returns Array of tag options
   */
  async getTags() {
    try {
      const blogs = await this.listAll();
      const uniqueTags = Array.from(
        new Set(blogs.flatMap((b) => b.tags)),
      ).sort();
      return [
        { key: 'all', label: 'All Posts' },
        ...uniqueTags.map((tag) => ({
          key: tag,
          label: tag,
        })),
      ];
    } catch (error) {
      console.error('Failed to fetch tags:', error);
      return [{ key: 'all', label: 'All Posts' }];
    }
  },
};

/**
 * Contact API
 * Methods for handling contact form submissions
 */
export const contactApi = {
  /**
   * Submit a contact form
   * @param message - The contact message data
   * @returns Confirmation or error
   */
  async submitMessage(message: Message): Promise<{ success: boolean; id?: string }> {
    try {
      const response = await fetchAPI<{ success: boolean; data: any }>('/api/contact', {
        method: 'POST',
        body: JSON.stringify(message),
      });
      return { success: response.success, id: response.data?._id };
    } catch (error) {
      console.error('Failed to submit contact message:', error);
      return { success: false };
    }
  },
};

/**
 * Unified API export for convenience
 * Usage: import api from '@/lib/api/client'
 * Then: api.projects.listAll(), api.blogs.getBySlug(slug), etc.
 */
export const api = {
  projects: projectsApi,
  blogs: blogsApi,
  contact: contactApi,
};

export default api;
