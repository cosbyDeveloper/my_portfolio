'use client';

import { useEffect, useState } from 'react';
import ProjectForm from '../../_components/ProjectForm';
import { Project } from '@/lib/types';

export default function EditProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const [slug, setSlug] = useState<string>('');
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { slug: resolvedSlug } = await params;
      setSlug(resolvedSlug);
      
      try {
        const response = await fetch(`/api/admin/projects/${resolvedSlug}`, {
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          setProject(data.data);
        }
      } catch (err) {
        console.error('Failed to load project:', err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [params]);

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (!project) {
    return <div className="text-red-600">Project not found</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Project</h1>
      <ProjectForm initialData={project} isEditing />
    </div>
  );
}
