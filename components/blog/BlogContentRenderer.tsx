// components/blog/BlogContentRenderer.tsx
'use client';

import { useEffect } from 'react';
import createDOMPurify from 'dompurify';

interface BlogContentRendererProps {
	content: string;
}

const BlogContentRenderer = ({ content }: BlogContentRendererProps) => {
	useEffect(() => {
		// Add smooth scrolling for anchor links
		const handleAnchorClick = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			if (
				target.tagName === 'A' &&
				target.getAttribute('href')?.startsWith('#')
			) {
				e.preventDefault();
				const id = target.getAttribute('href')?.slice(1);
				const element = document.getElementById(id || '');
				if (element) {
					element.scrollIntoView({ behavior: 'smooth', block: 'start' });
				}
			}
		};

		// Add heading anchors
		const addHeadingAnchors = () => {
			const headings = document.querySelectorAll<HTMLElement>(
				'#blog-content h2, #blog-content h3, #blog-content h4',
			);
			headings.forEach((heading) => {
				const id =
					heading.id ||
					heading.textContent?.toLowerCase().replace(/[^a-z0-9]+/g, '-');
				heading.id = id || '';

				const anchor = document.createElement('a');
				anchor.href = `#${id}`;
				anchor.className = 'heading-anchor';
				anchor.innerHTML = '#';
				anchor.style.cssText = `
          position: absolute;
          left: -1.2em;
          opacity: 0;
          color: hsl(var(--primary));
          text-decoration: none;
          font-weight: normal;
          transition: opacity 0.2s;
        `;

				heading.style.position = 'relative';
				heading.appendChild(anchor);

				heading.addEventListener('mouseenter', () => {
					anchor.style.opacity = '1';
				});

				heading.addEventListener('mouseleave', () => {
					anchor.style.opacity = '0';
				});
			});
		};

		document.addEventListener('click', handleAnchorClick);
		setTimeout(addHeadingAnchors, 100);

		return () => {
			document.removeEventListener('click', handleAnchorClick);
		};
	}, []);

	// Sanitize HTML content
	const DOMPurify =
		typeof window !== 'undefined' ? createDOMPurify(window) : null;
	const sanitizedContent = DOMPurify
		? DOMPurify.sanitize(content, {
				ADD_TAGS: ['iframe'],
				ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling'],
				ALLOWED_TAGS: [
					'h1',
					'h2',
					'h3',
					'h4',
					'h5',
					'h6',
					'p',
					'br',
					'hr',
					'strong',
					'em',
					'b',
					'i',
					'u',
					's',
					'blockquote',
					'code',
					'pre',
					'ul',
					'ol',
					'li',
					'table',
					'thead',
					'tbody',
					'tr',
					'th',
					'td',
					'a',
					'img',
					'figure',
					'figcaption',
					'div',
					'span',
					'iframe',
					'video',
					'source',
					'audio',
				],
				ALLOWED_ATTR: [
					'href',
					'src',
					'alt',
					'title',
					'width',
					'height',
					'class',
					'id',
					'style',
					'target',
					'rel',
					'allowfullscreen',
					'frameborder',
					'scrolling',
					'controls',
					'autoplay',
					'loop',
					'muted',
					'poster',
					'preload',
				],
		  })
		: content;

	return (
		<div
			id='blog-content'
			dangerouslySetInnerHTML={{ __html: sanitizedContent }}
		/>
	);
};

export default BlogContentRenderer;
