// components/home/Contact.tsx
'use client';

import { motion } from 'framer-motion';
import { homeContent } from '@/constants/home';
import {
	// FaPhone,
	FaEnvelope,
	FaMapMarkerAlt,
	FaLinkedin,
	FaHandshake,
	FaGithub,
	FaPaperPlane,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import Link from 'next/link';

const GetInTouch = () => {
	const { contact } = homeContent;

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

							<form className='space-y-6'>
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
											className='w-full px-4 py-3 rounded-xl border border-default bg-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition'
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
											className='w-full px-4 py-3 rounded-xl border border-default bg-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition'
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
											className='w-full px-4 py-3 rounded-xl border border-default bg-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition'
											placeholder='john@example.com'
										/>
									</div>

									{/* Phone */}
									<div className='space-y-2'>
										<label htmlFor='phone' className='text-sm font-medium'>
											Phone
										</label>
										<input
											type='tel'
											id='phone'
											className='w-full px-4 py-3 rounded-xl border border-default bg-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition'
											placeholder='+233(0) 55 567 8900'
										/>
									</div>
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
										className='w-full px-4 py-3 rounded-xl border border-default bg-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition resize-none'
										placeholder='Tell me about your project, idea, or just say hello...'
									/>
								</div>

								{/* Submit Button */}
								<button
									type='submit'
									className='w-full px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3'>
									<span>Send Message</span>
									<FaPaperPlane className='w-4 h-4' />
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
													{social.label === 'Twitter' && (
														<FaXTwitter className='w-4 h-4' />
													)}
													<span className='text-sm'>{social.label}</span>
												</Link>
											))}
										</div>
									</div>
								</motion.div>

								{/* Additional Info - Optional */}
								<motion.div
									initial={{ opacity: 0, y: 10 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: 0.3 }}
									className='grid gap-4'>
									{/* <div className='flex items-center gap-3 text-muted-foreground'>
										<FaPhone className='w-4 h-4' />
										<span>Available for calls and meetings by appointment</span>
									</div> */}
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
			</div>
		</section>
	);
};

export default GetInTouch;
