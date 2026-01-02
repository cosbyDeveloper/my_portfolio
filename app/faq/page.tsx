'use client';
// app/faq/page.tsx
import FAQ from '@/components/home/FAQ';
import Link from 'next/link';
import {
	FaSearch,
} from 'react-icons/fa';
import { useState, useMemo } from 'react';

const pageFAQs = [
	{
		question: 'What services do you offer as a software engineer?',
		answer:
			'I specialize in backend development with Python/Django, full-stack web applications with React/Next.js, API design and development, database architecture (PostgreSQL/MongoDB), system design, and technical consulting. I also offer code reviews and mentorship for developers.',
	},
	{
		question: 'How do you approach new projects?',
		answer:
			'My process typically involves: 1) Discovery call to understand your needs, 2) Requirements analysis and planning, 3) Technical proposal with timeline and investment, 4) Development with regular updates, 5) Deployment and handover. I emphasize clear communication and transparency throughout.',
	},
	{
		question: 'What is your typical project timeline?',
		answer:
			'Timelines vary based on project complexity. Small projects (landing pages, simple APIs) can take 2-4 weeks. Medium projects (web applications) typically take 4-12 weeks. Larger systems require 3-6+ months. I provide detailed timeline estimates during the proposal phase.',
	},
	{
		question: 'Do you work on an hourly or project basis?',
		answer:
			'I offer both models. For well-defined projects with clear scope, I prefer fixed-price project-based billing. For ongoing work, maintenance, or consulting, I work on an hourly basis. The best approach depends on your specific needs.',
	},
	{
		question: 'What technologies do you specialize in?',
		answer:
			'My core stack includes: Backend - Python, Django, Django REST Framework; Frontend - React, Next.js, TypeScript, Tailwind CSS; Databases - PostgreSQL, MongoDB; DevOps - Docker, AWS, Vercel; APIs - REST, GraphQL; Tools - Git, GitHub, Linux.',
	},
	{
		question: 'Can you help with existing projects or codebases?',
		answer:
			'Absolutely! I frequently work with existing codebases to add features, fix bugs, improve performance, or refactor code. I start with a thorough code review to understand the current architecture before making recommendations.',
	},
	{
		question: 'How do you handle communication during projects?',
		answer:
			'I maintain regular communication through weekly video calls, daily standups (if needed), and project management tools like Trello or Linear. I provide progress updates at least twice weekly and am always available for urgent matters.',
	},
	{
		question: 'What happens after project completion?',
		answer:
			'I provide comprehensive documentation, conduct training sessions if needed, offer post-launch support, and typically provide 30 days of free bug fixes. I also offer ongoing maintenance packages for long-term support.',
	},
	{
		question: 'Do you work with startups or established businesses?',
		answer:
			'I work with both! I enjoy helping startups build their MVPs and scale their technology. With established businesses, I focus on system improvements, feature development, and technical modernization.',
	},
	{
		question: 'What makes Cosby Technologies different?',
		answer:
			'As a founder-developer, I combine technical expertise with business understanding. I focus on building scalable solutions that grow with your business, not just meeting immediate requirements. My background in both engineering and entrepreneurship gives me unique insight into product development.',
	},
];

const FAQPage = () => {
	const [searchTerm, setSearchTerm] = useState('');

	const filteredFAQs = useMemo(() => {
		if (!searchTerm.trim()) return pageFAQs;

		const term = searchTerm.toLowerCase();
		return pageFAQs.filter(
			(faq) =>
				faq.question.toLowerCase().includes(term) ||
				faq.answer.toLowerCase().includes(term),
		);
	}, [searchTerm]);

	return (
		<main className='min-h-screen'>
			{/* Hero Section */}
			<section className='relative pt-16 lg:pt-24 px-6 lg:px-12 overflow-hidden'>
				<div className='max-w-4xl mx-auto text-center'>
					<div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6'>
						<FaSearch className='w-4 h-4' />
						<span>Frequently Asked Questions</span>
					</div>
					<h1 className='text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6'>
						Find Answers to{' '}
						<span className='text-primary'>Common Questions</span>
					</h1>
					<p className='text-xl text-muted-foreground mb-8 max-w-2xl mx-auto'>
						Everything you need to know about working with me, my services,
						process, and what to expect when we collaborate.
					</p>

					{/* Search Bar */}
					<div className='max-w-md mx-auto'>
						<div className='relative'>
							<input
								type='text'
								placeholder='Search questions...'
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className='w-full px-6 py-3 rounded-xl border border-default bg-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition pl-12'
							/>
							<FaSearch className='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground' />
						</div>
					</div>
				</div>
			</section>

			{/* Main FAQ Section */}
			<FAQ
				title={
					searchTerm
						? `Search results for "${searchTerm}"`
						: 'Most Common Questions'
				}
				description={
					searchTerm
						? `Found ${filteredFAQs.length} results`
						: 'Browse through answers to questions I get asked most frequently'
				}
				faqs={filteredFAQs}
        showBtn={false}
			/>

			{/* Additional Help Section */}
			<section className='py-16 lg:py-20 px-6 lg:px-12'>
				<div className='max-w-4xl mx-auto'>
					<div className='rounded-2xl border border-default p-8 md:p-12 bg-linear-to-br from-background to-primary/5'>
						<div className='grid md:grid-cols-2 gap-8 items-center'>
							<div>
								<h2 className='text-3xl md:text-4xl font-bold mb-4'>
									Still Have Questions?
								</h2>
								<p className='text-lg text-muted-foreground mb-6'>
									Can&apos;t find what you&apos;re looking for? I&apos;m happy
									to answer any other questions you might have about working
									together.
								</p>
								<div className='space-y-4'>
									<div className='flex items-center gap-3'>
										<div className='w-2 h-2 rounded-full bg-primary' />
										<span>Get a personalized response</span>
									</div>
									<div className='flex items-center gap-3'>
										<div className='w-2 h-2 rounded-full bg-primary' />
										<span>Discuss your specific project needs</span>
									</div>
									<div className='flex items-center gap-3'>
										<div className='w-2 h-2 rounded-full bg-primary' />
										<span>Receive a custom proposal</span>
									</div>
								</div>
							</div>
							<div className='space-y-4'>
								<a
									href='mailto:cosby.developer@gmail.com'
									className='block w-full px-6 py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all text-center'>
									Send an Email
								</a>
								<a
									href='/contact'
									className='block w-full px-6 py-4 rounded-xl border border-default hover:bg-muted/50 transition-all text-center'>
									Use Contact Form
								</a>
								<a
									href='https://linkedin.com/in/cosbydeveloper'
									target='_blank'
									rel='noopener noreferrer'
									className='block w-full px-6 py-4 rounded-xl border border-default hover:bg-muted/50 transition-all text-center'>
									Message on LinkedIn
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Related Pages */}
			<section className='py-12 lg:py-16 px-6 lg:px-12'>
				<div className='max-w-4xl mx-auto'>
					<h2 className='text-2xl md:text-3xl font-bold mb-8 text-center'>
						Related Pages You Might Like
					</h2>
					<div className='grid gap-6 md:grid-cols-3'>
						<a
							href='/about'
							className='p-6 rounded-2xl border border-default hover:border-primary/50 hover:bg-primary/5 transition-all group'>
							<h3 className='text-xl font-semibold mb-2 group-hover:text-primary transition-colors'>
								About Me
							</h3>
							<p className='text-muted-foreground'>
								Learn about my background, experience, and approach to software
								engineering.
							</p>
						</a>
						<Link
							href='/portfolio'
							className='p-6 rounded-2xl border border-default hover:border-primary/50 hover:bg-primary/5 transition-all group'>
							<h3 className='text-xl font-semibold mb-2 group-hover:text-primary transition-colors'>
								Portfolio
							</h3>
							<p className='text-muted-foreground'>
								See examples of my work and projects I&apos;ve built for clients
								and myself.
							</p>
						</Link>
						<a
							href='/contact'
							className='p-6 rounded-2xl border border-default hover:border-primary/50 hover:bg-primary/5 transition-all group'>
							<h3 className='text-xl font-semibold mb-2 group-hover:text-primary transition-colors'>
								Contact
							</h3>
							<p className='text-muted-foreground'>
								Get in touch directly to discuss your project or ask specific
								questions.
							</p>
						</a>
					</div>
				</div>
			</section>
		</main>
	);
};

export default FAQPage;
