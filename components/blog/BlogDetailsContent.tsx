// components/blog/BlogDetailsContent.tsx (Client Component)
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BlogPost, blogs } from '@/constants/blogs';
import TableOfContents from './TableOfContents';
import BlogContentRenderer from './BlogContentRenderer';
import {
	FaCalendarAlt,
	FaClock,
	FaUser,
	FaTag,
	FaArrowLeft,
	FaShareAlt,
	FaTwitter,
	FaLinkedin,
	FaRegComment,
	FaChevronDown,
	FaChevronUp,
} from 'react-icons/fa';
import '@/styles/blog.css';

interface BlogDetailsContentProps {
	blog: BlogPost;
}

const BlogDetailsContent = ({ blog }: BlogDetailsContentProps) => {
	const [headings, setHeadings] = useState<
		Array<{ id: string; text: string; level: number }>
	>([]);
	const [isTocOpen, setIsTocOpen] = useState(false);

	useEffect(() => {
		// Extract headings from content for table of contents
		const extractHeadings = () => {
			const articleElement = document.getElementById('blog-content');
			if (!articleElement) return [];

			const headingElements = articleElement.querySelectorAll('h2, h3');
			const extractedHeadings: Array<{
				id: string;
				text: string;
				level: number;
			}> = [];

			headingElements.forEach((heading) => {
				const id =
					heading.id ||
					heading.textContent?.toLowerCase().replace(/[^a-z0-9]+/g, '-') ||
					'';
				const text = heading.textContent || '';
				const level = parseInt(heading.tagName.charAt(1));

				extractedHeadings.push({ id, text, level });
			});

			setHeadings(extractedHeadings);
		};

		// Wait for content to be rendered
		setTimeout(extractHeadings, 100);
	}, []);

	const shareOnTwitter = () => {
		const text = encodeURIComponent(`"${blog.title}" by Godfred Awusi`);
		const url = encodeURIComponent(
			typeof window !== 'undefined' ? window.location.href : '',
		);
		window.open(
			`https://twitter.com/intent/tweet?text=${text}&url=${url}`,
			'_blank',
		);
	};

	const shareOnLinkedIn = () => {
		const url = encodeURIComponent(
			typeof window !== 'undefined' ? window.location.href : '',
		);
		window.open(
			`https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
			'_blank',
		);
	};

	return (
		<main className='min-h-screen blog-content'>
			{/* Back Navigation */}
			<div className='sticky top-4 z-20 flex justify-center'>
				<Link
					href='/blog'
					className='
            inline-flex items-center gap-2
            rounded-full border border-default
            bg-background/80 backdrop-blur-lg
            px-4 py-2
            text-sm text-muted-foreground
            hover:text-foreground
            transition-colors
            shadow-sm
          '>
					<FaArrowLeft className='w-3 h-3' />
					<span>Back to Blog</span>
				</Link>
			</div>

			{/* Hero Section */}
			<section className='pt-12 pb-8 px-6 lg:px-12'>
				<div className='max-w-4xl mx-auto'>
					{/* Meta Information */}
					<div className='mb-8'>
						<div className='flex flex-wrap items-center gap-4 mb-6'>
							<div className='flex items-center gap-2 text-sm text-muted-foreground'>
								<FaCalendarAlt className='w-3 h-3' />
								<span>
									{new Date(blog.date).toLocaleDateString('en-US', {
										month: 'long',
										day: 'numeric',
										year: 'numeric',
									})}
								</span>
							</div>
							<div className='flex items-center gap-2 text-sm text-muted-foreground'>
								<FaClock className='w-3 h-3' />
								<span>{blog.readTime}</span>
							</div>
							<div className='flex items-center gap-2 text-sm text-muted-foreground'>
								<FaUser className='w-3 h-3' />
								<span>By {blog.author}</span>
							</div>
						</div>

						{/* Title */}
						<h1 className='text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight'>
							{blog.title}
						</h1>

						{/* Excerpt */}
						<p className='text-xl text-muted-foreground mb-8 leading-relaxed'>
							{blog.excerpt}
						</p>

						{/* Tags */}
						<div className='flex flex-wrap gap-2 mb-8'>
							{blog.tags.map((tag) => (
								<Link
									key={tag}
									href={`/blog?tag=${tag}`}
									className='inline-flex items-center gap-1 px-4 py-2 rounded-full bg-muted/50 hover:bg-muted text-sm transition-colors'>
									<FaTag className='w-3 h-3' />
									<span>{tag}</span>
								</Link>
							))}
						</div>

						{/* Share Buttons */}
						<div className='flex items-center gap-4'>
							<span className='text-sm text-muted-foreground flex items-center gap-2'>
								<FaShareAlt className='w-4 h-4' />
								<span>Share:</span>
							</span>
							<button
								onClick={shareOnTwitter}
								className='p-2 rounded-lg hover:bg-blue-500/10 transition-colors cursor-pointer'
								aria-label='Share on Twitter'>
								<FaTwitter className='w-5 h-5 text-blue-500' />
							</button>
							<button
								onClick={shareOnLinkedIn}
								className='p-2 rounded-lg hover:bg-blue-700/10 transition-colors cursor-pointer'
								aria-label='Share on LinkedIn'>
								<FaLinkedin className='w-5 h-5 text-blue-700' />
							</button>
							<button
								onClick={() =>
									navigator.clipboard.writeText(
										typeof window !== 'undefined' ? window.location.href : '',
									)
								}
								className='px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm text-muted-foreground cursor-pointer'
								aria-label='Copy link'>
								Copy Link
							</button>
						</div>
					</div>
				</div>
			</section>

			{/* Content Grid */}
			<section className='pb-16 px-6 lg:px-12'>
				<div className='mx-auto max-w-7xl'>
					{/* Mobile: Collapsible Table of Contents */}
					<div className='lg:hidden mb-8'>
						<button
							onClick={() => setIsTocOpen(!isTocOpen)}
							className='w-full bg-muted/30 rounded-2xl border border-default p-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors'>
							<span className='flex items-center gap-2 text-lg font-semibold'>
								<span className='text-primary'>📚</span>
								<span>Table of Contents</span>
							</span>
							{isTocOpen ? (
								<FaChevronUp className='text-muted-foreground' />
							) : (
								<FaChevronDown className='text-muted-foreground' />
							)}
						</button>
						{isTocOpen && (
							<div className='mt-4'>
								<TableOfContents headings={headings} />
							</div>
						)}
					</div>

					<div className='flex flex-col lg:flex-row gap-12'>
						{/* Desktop: Sidebar with Table of Contents & Advertisement */}
						<aside className='lg:w-72 lg:flex-none hidden lg:block'>
							<div className='sticky top-4 space-y-6'>
								<TableOfContents headings={headings} />

								{/* Advertisement Container */}
								<div className='bg-linear-to-br from-primary/5 to-secondary/5 rounded-2xl border border-default p-6'>
									<h3 className='text-lg font-semibold mb-3 text-center'>
										<span className='text-primary'>✨</span> Build With Me
									</h3>
									<p className='text-sm text-muted-foreground mb-4 text-center'>
										Looking for a reliable developer for your next project?
									</p>
									<div className='space-y-3'>
										<div className='flex items-center gap-2 text-sm'>
											<span className='text-green-500'>✓</span>
											<span>Full-stack development</span>
										</div>
										<div className='flex items-center gap-2 text-sm'>
											<span className='text-green-500'>✓</span>
											<span>AI/ML integration</span>
										</div>
										<div className='flex items-center gap-2 text-sm'>
											<span className='text-green-500'>✓</span>
											<span>Scalable backend systems</span>
										</div>
									</div>
									<Link
										href='/contact'
										className='mt-4 block w-full text-center px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition'>
										Start a Project
									</Link>
								</div>
							</div>
						</aside>

						{/* Main Content */}
						<div className='flex-1 min-w-0'>
							{/* Mobile Advertisement - After TOC */}
							<div className='lg:hidden mb-8'>
								<div className='bg-linear-to-br from-primary/5 to-secondary/5 rounded-2xl border border-default p-6'>
									<h3 className='text-lg font-semibold mb-3 text-center'>
										<span className='text-primary'>✨</span> Build With Me
									</h3>
									<p className='text-sm text-muted-foreground mb-4 text-center'>
										Looking for a reliable developer for your next project?
									</p>
									<Link
										href='/contact'
										className='block w-full text-center px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition'>
										Start a Project
									</Link>
								</div>
							</div>

							{/* Article Content with Enhanced Typography */}
							<article className='relative blog-content!'>
								<div className='prose prose-lg max-w-none'>
									<BlogContentRenderer content={blog.content} />
								</div>
							</article>

							{/* Newsletter Signup (Mobile & Desktop) */}
							<div className='mt-12'>
								<div className='bg-linear-to-br from-primary/10 to-secondary/10 rounded-2xl border border-default p-6 lg:p-8'>
									<div className='text-center'>
										<h3 className='text-xl font-semibold mb-3'>
											Enjoyed this article?
										</h3>
										<p className='text-muted-foreground mb-6'>
											Subscribe to get notified when I publish new articles
											about software development, AI, and career growth.
										</p>
										<form className='flex flex-col sm:flex-row gap-3 max-w-md mx-auto'>
											<input
												type='email'
												placeholder='Your email address'
												className='flex-1 px-4 py-3 rounded-xl border border-default bg-background focus:outline-none focus:ring-2 focus:ring-primary/50'
											/>
											<button
												type='submit'
												className='px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition'>
												Subscribe
											</button>
										</form>
										<p className='mt-3 text-sm text-muted-foreground'>
											No spam, unsubscribe at any time.
										</p>
									</div>
								</div>
							</div>

							{/* Author Bio */}
							<div className='not-prose mt-12'>
								<section className='pt-8 border-t border-default'>
									<div className='flex flex-col sm:flex-row items-start gap-6'>
										<div className='p-4 rounded-xl bg-primary/10 text-primary shrink-0'>
											<FaUser className='w-8 h-8' />
										</div>
										<div>
											<h3 className='text-xl font-semibold mb-2'>
												Godfred Awusi
											</h3>
											<p className='text-muted-foreground mb-4 leading-relaxed'>
												Software Engineer and Founder of Cosby Technologies.
												Passionate about building scalable systems, AI/ML
												applications, and sharing knowledge through writing.
											</p>
											<div className='flex flex-wrap gap-4'>
												<a
													href='https://twitter.com/cosbydeveloper'
													target='_blank'
													rel='noopener noreferrer'
													className='text-sm text-primary hover:text-primary/80 transition-colors'>
													Follow on Twitter
												</a>
												<a
													href='https://linkedin.com/in/cosbydeveloper'
													target='_blank'
													rel='noopener noreferrer'
													className='text-sm text-primary hover:text-primary/80 transition-colors'>
													Connect on LinkedIn
												</a>
											</div>
										</div>
									</div>
								</section>
							</div>

							{/* Comments Section */}
							<div className='not-prose mt-12'>
								<section className='pt-8 border-t border-default'>
									<div className='flex items-center gap-3 mb-6'>
										<FaRegComment className='text-primary' />
										<h3 className='text-xl font-semibold'>Comments</h3>
									</div>
									<div className='bg-muted/30 rounded-2xl border border-default p-8 text-center'>
										<p className='text-muted-foreground mb-4'>
											Comments are not enabled yet. Feel free to reach out on
											social media or via email to share your thoughts!
										</p>
										<a
											href='mailto:awusigodfred225@gmail.com'
											className='inline-block text-sm text-primary hover:text-primary/80 transition-colors'>
											Send feedback via email →
										</a>
									</div>
								</section>
							</div>

							{/* Related Articles */}
							<div className='not-prose mt-12'>
								<RelatedArticles currentSlug={blog.slug} tags={blog.tags} />
							</div>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
};

// Separate component for related articles
function RelatedArticles({
	currentSlug,
	tags,
}: {
	currentSlug: string;
	tags: string[];
}) {
	const relatedArticles = blogs
		.filter(
			(b: BlogPost) =>
				b.slug !== currentSlug &&
				b.tags.some((tag: string) => tags.includes(tag)),
		)
		.slice(0, 2);

	if (relatedArticles.length === 0) return null;

	return (
		<section className='mt-12 pt-8 border-t border-default'>
			<h3 className='text-2xl font-semibold mb-6'>Related Articles</h3>
			<div className='grid md:grid-cols-2 gap-6'>
				{relatedArticles.map((relatedBlog: BlogPost) => (
					<Link
						key={relatedBlog.slug}
						href={`/blog/${relatedBlog.slug}`}
						className='group'>
						<div className='bg-muted/30 rounded-2xl border border-default p-6 hover:border-primary/50 transition-colors h-full'>
							<h4 className='text-lg font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2'>
								{relatedBlog.title}
							</h4>
							<p className='text-muted-foreground text-sm mb-4 line-clamp-3'>
								{relatedBlog.excerpt}
							</p>
							<div className='flex items-center justify-between mt-auto'>
								<span className='text-xs text-muted-foreground'>
									{new Date(relatedBlog.date).toLocaleDateString('en-US', {
										month: 'short',
										day: 'numeric',
									})}
								</span>
								<span className='text-sm text-primary group-hover:text-primary/80 transition-colors'>
									Read →
								</span>
							</div>
						</div>
					</Link>
				))}
			</div>
			<Link
				href='/blog'
				className='inline-block mt-6 text-sm text-primary hover:text-primary/80 transition-colors'>
				View all articles →
			</Link>
		</section>
	);
}

export default BlogDetailsContent;
