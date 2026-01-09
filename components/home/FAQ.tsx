// components/home/FAQ.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Link from 'next/link';

type FAQItem = {
	question: string;
	answer: string;
};

type FAQProps = {
	faqs?: FAQItem[];
	title?: string;
	description?: string;
	showBtn?: boolean;
};

const defaultFAQs: FAQItem[] = [
	{
		question: 'What types of projects do you typically work on?',
		answer:
			'I mainly do full-stack web development, and now gearing towards AI/ML. My sweet spot which I have recently transitioned to is Python/Django backend development with React/Next.js frontend.',
	},
	{
		question: "What's your typical response time?",
		answer:
			'I respond to all inquiries within 24 hours on weekdays. For urgent matters, please indicate "URGENT" in your email subject line.',
	},
	{
		question: 'Do you work with international clients?',
		answer:
			'Absolutely! I work remotely with clients worldwide. Timezone differences are easily managed with clear communication protocols.',
	},
	{
		question: "What's your availability for new projects?",
		answer:
			"I typically have availability for 1-2 significant projects at a time. It's best to reach out for current availability and timeline estimates.",
	},
	{
		question: 'What is your pricing structure?',
		answer:
			'I offer project-based pricing for fixed-scope work and hourly rates for ongoing development. All pricing is tailored to the specific project requirements.',
	},
	{
		question: 'Do you provide ongoing maintenance and support?',
		answer:
			'Yes, I offer maintenance packages for projects I develop. This includes updates, bug fixes, and performance monitoring.',
	},
];

const FAQ = ({
	showBtn = true,
	faqs = defaultFAQs,
	title = 'Frequently Asked Questions',
	description = 'Common questions about working together',
}: FAQProps) => {
	const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

	const toggleFAQ = (index: number) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	return (
		<section id='faq' className='pt-16 lg:pt-24 pb-6 lg:pb-12 px-6 lg:px-12'>
			<div className='max-w-3xl mx-auto'>
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className='text-center mb-12'>
					<h2 className='text-3xl md:text-4xl font-bold mb-4'>{title}</h2>
					<p className='text-lg text-muted-foreground'>{description}</p>
				</motion.div>

				{/* FAQ Items */}
				<div className='space-y-4'>
					{faqs.map((faq, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.1 }}
							className='group'>
							{/* FAQ Card */}
							<div className='rounded-2xl border border-default overflow-hidden'>
								{/* Question - Clickable Header */}
								<button
									onClick={() => toggleFAQ(index)}
									className='w-full text-left p-6 hover:bg-muted/30 transition-colors duration-200 flex items-center justify-between gap-4'
									aria-expanded={openIndex === index}>
									<h3 className='text-lg font-semibold pr-8'>{faq.question}</h3>
									<div className='shrink-0'>
										{openIndex === index ? (
											<FaChevronUp className='w-5 h-5 text-primary transition-transform duration-300' />
										) : (
											<FaChevronDown className='w-5 h-5 text-muted-foreground group-hover:text-primary transition-all duration-300' />
										)}
									</div>
								</button>

								{/* Answer - Animated Content */}
								<AnimatePresence>
									{openIndex === index && (
										<motion.div
											initial={{ height: 0, opacity: 0 }}
											animate={{ height: 'auto', opacity: 1 }}
											exit={{ height: 0, opacity: 0 }}
											transition={{ duration: 0.3, ease: 'easeInOut' }}
											className='overflow-hidden'>
											<div className='px-6 pb-6 pt-2 border-t border-strong'>
												<p className='text-muted-foreground leading-relaxed'>
													{faq.answer}
												</p>
											</div>
										</motion.div>
									)}
								</AnimatePresence>
							</div>
						</motion.div>
					))}
				</div>

				{/* Still have questions? */}
				{showBtn && (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.5 }}
						className='mt-12 text-center'>
						<p className='text-muted-foreground mb-4'>Still have questions?</p>
						<Link
							href='/faq'
							className='inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-primary text-primary hover:bg-primary/10 transition-colors font-medium'>
							<span>More on FAQ</span>
							<svg
								className='w-4 h-4'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M14 5l7 7m0 0l-7 7m7-7H3'
								/>
							</svg>
						</Link>
					</motion.div>
				)}
			</div>
		</section>
	);
};

export default FAQ;
