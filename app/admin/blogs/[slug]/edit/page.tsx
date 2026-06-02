'use client';

import { useEffect, useState } from 'react';
import BlogForm from '../../_components/BlogForm';
import { BlogPost } from '@/lib/types';

export default function EditBlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const [slug, setSlug] = useState<string>('');
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { slug: resolvedSlug } = await params;
      setSlug(resolvedSlug);
      
      try {
        const response = await fetch(`/api/admin/blogs/${resolvedSlug}`, {
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          setBlog(data.data);
        }
      } catch (err) {
        console.error('Failed to load blog:', err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [params]);

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (!blog) {
    return <div className="text-red-600">Blog not found</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Blog Post</h1>
      <BlogForm initialData={blog} isEditing />
    </div>
  );
}
