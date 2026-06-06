// components/home/GetInTouch.tsx
'use client';

import { motion } from 'framer-motion';
import { homeContent } from '@/constants/home';
import {
	FaEnvelope,
	FaMapMarkerAlt,
	FaLinkedin,
	FaHandshake,
	FaGithub,
	FaPaperPlane,
	FaSpinner,
	FaCheck,
	FaExclamationCircle,
	FaTag,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { SiHuggingface, SiKaggle, SiGooglescholar } from 'react-icons/si';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const CATEGORY_OPTIONS = [
	{ value: 'general', label: 'General Inquiry' },
	{ value: 'job', label: 'Job Opportunity' },
	{ value: 'collaboration', label: 'Collaboration' },
	{ value: 'question', label: 'Question' },
	{ value: 'project', label: 'Project Discussion' },
	{ value: 'other', label: 'Other' },
];

const GetInTouch = ({ showMore = true }) => {
	const { contact } = homeContent;
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		subject: '',
		message: '',
		website: '',
		category: 'general',
	});
	const [formTimestamp, setFormTimestamp] = useState<number | null>(null);
	const [loading, setLoading] = useState(false);
	const [feedback, setFeedback] = useState<{
		type: 'success' | 'error' | null;
		message: string;
	}>({ type: null, message: '' });

	// Set timestamp when form mounts
	useEffect(() => {
		setFormTimestamp(Date.now());
	}, []);

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>,
	) => {
		const { id, value } = e.target;
		setFormData((prev) => ({ ...prev, [id]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setFeedback({ type: null, message: '' });

		try {
			const subject = formData.subject || 'Portfolio Contact';

			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					firstName: formData.firstName,
					lastName: formData.lastName,
					email: formData.email,
					subject,
					message: formData.message,
					phone: formData.phone,
					website: formData.website,
					formTimestamp,
					category: formData.category,
				}),
			});

			const result = await response.json();

			if (response.ok) {
				setFeedback({
					type: 'success',
					message: 'Message sent successfully! I will get back to you soon.',
				});
				setFormData({
					firstName: '',
					lastName: '',
					email: '',
					phone: '',
					subject: '',
					message: '',
					website: '',
					category: 'general',
				});
				setFormTimestamp(Date.now());
			} else {
				setFeedback({
					type: 'error',
					message: result.error || 'Failed to send message. Please try again.',
				});
			}
		} catch (error) {
			setFeedback({
				type: 'error',
				message: 'An error occurred. Please try again later.',
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<section
			id='contact'
			className='relative pt-16 lg:pt-24 pb-6 lg:pb-12 px-6 lg:px-12 overflow-hidden'>
			<div className='relative mx-auto max-w-6xl'>
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: '-100px' }}
					transition={{ duration: 0.6 }}
					className='mb-16 lg:text-center max-w-3xl mx-auto'>
					<h2 className='text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight'>
						Get In <span className='text-primary'>Touch</span>
					</h2>
					<p className='mt-4 text-lg text-muted-foreground'>{contact.intro}</p>
				</motion.div>

				{/* Contact Content */}
				<div className='grid gap-8 md:gap-12 md:grid-cols-2'>
					{/* Contact Form */}
					<motion.div
						initial={{ opacity: 0, x: -30 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className='group relative'>
						{/* Gradient border */}
						<div className='absolute -inset-0.5 bg-linear-to-r from-primary/30 to-secondary/30 rounded-2xl blur opacity-0 group-hover:opacity-70 transition duration-500' />

						<div className='relative bg-background/50 backdrop-blur-sm rounded-2xl border border-default p-8'>
							<h3 className='text-2xl font-semibold mb-6'>Send a Message</h3>

							{/* Feedback Messages */}
							{feedback.type && (
								<motion.div
									initial={{ opacity: 0, y: -10 }}
									animate={{ opacity: 1, y: 0 }}
									className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
										feedback.type === 'success'
											? 'bg-green-500/10 border border-green-500/30 text-green-600'
											: 'bg-red-500/10 border border-red-500/30 text-red-600'
									}`}>
									{feedback.type === 'success' ? (
										<FaCheck className='w-5 h-5 shrink-0' />
									) : (
										<FaExclamationCircle className='w-5 h-5 shrink-0' />
									)}
									<p className='text-sm'>{feedback.message}</p>
								</motion.div>
							)}

							<form onSubmit={handleSubmit} className='space-y-6'>
								<input
									type='hidden'
									id='website'
									name='website'
									value={formData.website}
									onChange={handleChange}
									tabIndex={-1}
									autoComplete='off'
								/>

								<div className='grid gap-6 md:grid-cols-2'>
									{/* First Name */}
									<div className='space-y-2'>
										<label htmlFor='firstName' className='text-sm font-medium'>
											First Name <span className='text-red-500'>*</span>
										</label>
										<input
											type='text'
											id='firstName'
											required
											value={formData.firstName}
											onChange={handleChange}
											disabled={loading}
											className='w-full px-4 py-3 rounded-xl border border-default bg-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition disabled:opacity-50'
											placeholder='John'
										/>
									</div>

									{/* Last Name */}
									<div className='space-y-2'>
										<label htmlFor='lastName' className='text-sm font-medium'>
											Last Name
										</label>
										<input
											type='text'
											id='lastName'
											value={formData.lastName}
											onChange={handleChange}
											disabled={loading}
											className='w-full px-4 py-3 rounded-xl border border-default bg-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition disabled:opacity-50'
											placeholder='Doe'
										/>
									</div>
								</div>

								<div className='grid gap-6 md:grid-cols-2'>
									{/* Email */}
									<div className='space-y-2'>
										<label htmlFor='email' className='text-sm font-medium'>
											Email <span className='text-red-500'>*</span>
										</label>
										<input
											type='email'
											id='email'
											required
											value={formData.email}
											onChange={handleChange}
											disabled={loading}
											className='w-full px-4 py-3 rounded-xl border border-default bg-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition disabled:opacity-50'
											placeholder='john@example.com'
										/>
									</div>

									{/* Phone */}
									<div className='space-y-2'>
										<label htmlFor='phone' className='text-sm font-medium'>
											Phone (Optional)
										</label>
										<input
											type='tel'
											id='phone'
											value={formData.phone}
											onChange={handleChange}
											disabled={loading}
											className='w-full px-4 py-3 rounded-xl border border-default bg-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition disabled:opacity-50'
											placeholder='+233 XX XXX XXXX'
										/>
									</div>
								</div>

								{/* Category Selection */}
								<div className='space-y-2'>
									<label htmlFor='category' className='text-sm font-medium'>
										<FaTag className='inline w-4 h-4 mr-1' />
										Inquiry Type <span className='text-red-500'>*</span>
									</label>
									<select
										id='category'
										value={formData.category}
										onChange={handleChange}
										required
										disabled={loading}
										className='w-full px-4 py-3 rounded-xl border border-default bg-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition disabled:opacity-50'>
										{CATEGORY_OPTIONS.map((option) => (
											<option key={option.value} value={option.value}>
												{option.label}
											</option>
										))}
									</select>
									<p className='text-xs text-muted-foreground'>
										Selecting the right category helps me respond faster
									</p>
								</div>

								{/* Subject */}
								<div className='space-y-2'>
									<label htmlFor='subject' className='text-sm font-medium'>
										Subject <span className='text-red-500'>*</span>
									</label>
									<input
										type='text'
										id='subject'
										value={formData.subject}
										onChange={handleChange}
										disabled={loading}
										className='w-full px-4 py-3 rounded-xl border border-default bg-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition disabled:opacity-50'
										placeholder='What is this regarding?'
									/>
								</div>

								{/* Message */}
								<div className='space-y-2'>
									<label htmlFor='message' className='text-sm font-medium'>
										Message <span className='text-red-500'>*</span>
									</label>
									<textarea
										id='message'
										required
										rows={5}
										value={formData.message}
										onChange={handleChange}
										disabled={loading}
										className='w-full px-4 py-3 rounded-xl border border-default bg-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition resize-none disabled:opacity-50'
										placeholder='Tell me about your project, idea, or just say hello...'
									/>
								</div>

								{/* Submit Button */}
								<button
									type='submit'
									disabled={loading}
									className='w-full px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed'>
									{loading ? (
										<>
											<FaSpinner className='w-4 h-4 animate-spin' />
											<span>Sending...</span>
										</>
									) : (
										<>
											<span>Send Message</span>
											<FaPaperPlane className='w-4 h-4' />
										</>
									)}
								</button>
							</form>
						</div>
					</motion.div>

					{/* Contact Info */}
					<motion.div
						initial={{ opacity: 0, x: 30 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.1 }}
						className='group relative'>
						<div className='relative backdrop-blur-sm rounded-2xl p-8 h-full'>
							<h3 className='text-2xl font-semibold mb-6'>
								Contact Information
							</h3>

							{/* Info Box */}
							<div className='mb-8 p-6 rounded-xl bg-primary/5 border border-primary/10'>
								<p className='text-muted-foreground'>
									Fill up the form and I will get back to you within 24 hours.
								</p>
								<p className='text-sm text-muted-foreground mt-3'>
									💡 <span className='font-medium'>Pro tip:</span> Selecting the
									right category helps me prioritize and respond to your inquiry
									faster!
								</p>
							</div>

							{/* Contact Details */}
							<div className='space-y-8'>
								{/* Email */}
								<motion.div
									initial={{ opacity: 0, y: 10 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: 0.1 }}
									className='flex items-start gap-4'>
									<div className='p-3 rounded-xl bg-primary/10'>
										<FaEnvelope className='w-5 h-5 text-primary' />
									</div>
									<div>
										<h4 className='font-semibold mb-1'>Email</h4>
										<Link
											href={`mailto:${contact.email}`}
											className='text-muted-foreground hover:text-foreground transition-colors'>
											{contact.email}
										</Link>
									</div>
								</motion.div>

								{/* Social Links */}
								<motion.div
									initial={{ opacity: 0, y: 10 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: 0.2 }}
									className='flex items-start gap-4'>
									<div className='p-3 rounded-xl bg-secondary/10'>
										<FaHandshake className='w-5 h-5 text-secondary' />
									</div>
									<div>
										<h4 className='font-semibold mb-2'>Connect with me</h4>
										<div className='flex flex-wrap gap-3'>
											{contact.socials.map((social) => (
												<Link
													key={social.label}
													href={social.href}
													target='_blank'
													rel='noopener noreferrer'
													className='px-4 py-2 rounded-lg border border-default hover:bg-muted/50 transition-all duration-300 hover:scale-110 hover:text-primary flex items-center gap-2'>
													{social.label === 'LinkedIn' && (
														<FaLinkedin className='w-4 h-4' />
													)}
													{social.label === 'GitHub' && (
														<FaGithub className='w-4 h-4' />
													)}
													{social.label === 'Twitter / X' && (
														<FaXTwitter className='w-4 h-4' />
													)}
													{social.label === 'Hugging Face' && (
														<SiHuggingface className='w-4 h-4' />
													)}
													{social.label === 'Kaggle' && (
														<SiKaggle className='w-4 h-4' />
													)}
													{social.label === 'Google Scholar' && (
														<SiGooglescholar className='w-4 h-4' />
													)}
													<span className='text-sm'>{social.label}</span>
												</Link>
											))}
										</div>
									</div>
								</motion.div>

								{/* Additional Info */}
								<motion.div
									initial={{ opacity: 0, y: 10 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: 0.3 }}
									className='grid gap-4'>
									<div className='flex items-center gap-3 text-muted-foreground'>
										<FaMapMarkerAlt className='w-4 h-4' />
										<span>Based in Ghana, working remotely worldwide</span>
									</div>
								</motion.div>
							</div>

							{/* Response Time */}
							<motion.div
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								viewport={{ once: true }}
								transition={{ delay: 0.4 }}
								className='mt-12 pt-8 border-t border-strong'>
								<div className='flex items-center justify-between'>
									<div>
										<h4 className='font-semibold'>Response Time</h4>
										<p className='text-sm text-muted-foreground'>
											Typically within 24 hours
										</p>
									</div>
									<div className='px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium'>
										⚡ Fast
									</div>
								</div>
							</motion.div>
						</div>
					</motion.div>
				</div>

				{/* Want more info? */}
				{showMore && (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.5 }}
						className='mt-12 text-center'>
						<p className='text-muted-foreground mb-4'>
							Want more info and contact?
						</p>
						<Link
							href='/contact'
							className='inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-primary text-primary hover:bg-primary/10 transition-colors font-medium'>
							<span>More on contact</span>
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

export default GetInTouch;
