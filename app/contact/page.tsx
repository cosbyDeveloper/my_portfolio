// app/contact/page.tsx
import {
	FaClock,
	FaCalendarCheck,
	FaComments,
	FaLightbulb,
} from 'react-icons/fa';
import Link from 'next/link';
import { homeContent } from '@/constants/home';
import GetInTouch from '@/components/home/GetInTouch';
import FAQ from '@/components/home/FAQ';

export const metadata = {
	title: 'Contact | Godfred Awusi',
	description:
		'Get in touch for projects, collaborations, or just to say hello.',
};

export default function ContactPage() {
	const { contact } = homeContent;

	return (
		<main className='min-h-screen'>
			{/* Hero Section */}
			<section className='relative pt-16 lg:pt-24 pb-6 lg:pb-12 px-6 lg:px-12 overflow-hidden'>
				<div className='max-w-4xl mx-auto text-center'>
					<h1 className='text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6'>
						Let us Build Something{' '}
						<span className='text-primary'>Amazing Together</span>
					</h1>
					<p className='text-xl text-muted-foreground mb-8 max-w-2xl mx-auto'>
						Whether you have a project in mind, need technical advice, or want
						to discuss potential collaborations, I&apos;d love to hear from you.
					</p>
					<div className='flex flex-wrap gap-4 justify-center'>
						<Link
							href={`mailto:${contact.email}`}
							className='px-8 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all hover:scale-105'>
							Send an Email
						</Link>
						<Link
							href={
								contact.socials.find((s) => s.label === 'LinkedIn')?.href || '#'
							}
							target='_blank'
							rel='noopener noreferrer'
							className='px-8 py-3 rounded-xl border border-default hover:bg-muted/50 transition-all hover:scale-105'>
							Connect on LinkedIn
						</Link>
					</div>
				</div>
			</section>

			{/* What I Can Help With */}
			<section className='py-16 lg:py-20 px-6 lg:px-12'>
				<div className='max-w-6xl mx-auto'>
					<div className='text-center mb-12'>
						<h2 className='text-3xl md:text-4xl font-bold mb-4'>
							How I Can Help You
						</h2>
						<p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
							I specialize in backend systems, full-stack development, and
							turning complex ideas into scalable solutions.
						</p>
					</div>

					<div className='grid gap-8 md:grid-cols-2 lg:grid-cols-4'>
						<div className='text-center p-6 rounded-2xl border border-default hover:border-primary/50 transition-colors'>
							<div className='inline-flex p-3 rounded-xl bg-primary/10 mb-4'>
								<FaLightbulb className='w-6 h-6 text-primary' />
							</div>
							<h3 className='text-xl font-semibold mb-2'>Project Consulting</h3>
							<p className='text-muted-foreground'>
								Technical advice and architecture planning for your next
								project.
							</p>
						</div>

						<div className='text-center p-6 rounded-2xl border border-default hover:border-primary/50 transition-colors'>
							<div className='inline-flex p-3 rounded-xl bg-secondary/10 mb-4'>
								<FaComments className='w-6 h-6 text-secondary' />
							</div>
							<h3 className='text-xl font-semibold mb-2'>Code Review</h3>
							<p className='text-muted-foreground'>
								Review your codebase and provide actionable improvements.
							</p>
						</div>

						<div className='text-center p-6 rounded-2xl border border-default hover:border-primary/50 transition-colors'>
							<div className='inline-flex p-3 rounded-xl bg-primary/10 mb-4'>
								<FaCalendarCheck className='w-6 h-6 text-primary' />
							</div>
							<h3 className='text-xl font-semibold mb-2'>Part-Time Work</h3>
							<p className='text-muted-foreground'>
								Available for part-time roles or contract development work.
							</p>
						</div>

						<div className='text-center p-6 rounded-2xl border border-default hover:border-primary/50 transition-colors'>
							<div className='inline-flex p-3 rounded-xl bg-secondary/10 mb-4'>
								<FaClock className='w-6 h-6 text-secondary' />
							</div>
							<h3 className='text-xl font-semibold mb-2'>Mentorship</h3>
							<p className='text-muted-foreground'>
								Guidance for junior developers and career advice.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Your GetInTouch Component */}
			<GetInTouch showMore={false} />

			{/* Process Section */}
			<section className='py-16 lg:py-20 px-6 lg:px-12 bg-muted/30'>
				<div className='max-w-4xl mx-auto'>
					<div className='text-center mb-12'>
						<h2 className='text-3xl md:text-4xl font-bold mb-4'>
							What Happens Next?
						</h2>
						<p className='text-lg text-muted-foreground'>
							Here is my typical process when you reach out
						</p>
					</div>

					<div className='relative'>
						{/* Timeline line */}
						<div className='absolute left-8 top-0 bottom-0 w-0.5 bg-default md:left-1/2 md:-translate-x-1/2' />

						<div className='space-y-12'>
							{/* Step 1 */}
							<div className='relative flex flex-col md:flex-row items-center'>
								<div className='flex-1 md:text-right md:pr-12 order-2 md:order-1'>
									<h3 className='text-xl font-semibold mb-2'>
										Initial Response
									</h3>
									<p className='text-muted-foreground'>
										I will get back to you within 24 hours to acknowledge your
										message and schedule a brief introductory call.
									</p>
								</div>
								<div className='w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 md:mb-0 md:order-2'>
									<span className='text-primary font-bold text-xl'>1</span>
								</div>
								<div className='flex-1 md:pl-12 order-3 md:order-3'>
									{/* Empty on left for desktop */}
								</div>
							</div>

							{/* Step 2 */}
							<div className='relative flex flex-col md:flex-row items-center'>
								<div className='flex-1 md:pr-12 order-2 md:order-3'>
									<h3 className='text-xl font-semibold mb-2'>Discovery Call</h3>
									<p className='text-muted-foreground'>
										A 30-minute video call to understand your needs, discuss
										scope, and explore how I can help.
									</p>
								</div>
								<div className='w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mb-4 md:mb-0 md:order-2'>
									<span className='text-secondary font-bold text-xl'>2</span>
								</div>
								<div className='flex-1 md:text-right md:pl-12 order-1 md:order-1'>
									{/* Empty on left for desktop */}
								</div>
							</div>

							{/* Step 3 */}
							<div className='relative flex flex-col md:flex-row items-center'>
								<div className='flex-1 md:text-right md:pr-12 order-2 md:order-1'>
									<h3 className='text-xl font-semibold mb-2'>
										Proposal & Planning
									</h3>
									<p className='text-muted-foreground'>
										I will prepare a detailed proposal with timeline,
										deliverables, and investment for your review.
									</p>
								</div>
								<div className='w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 md:mb-0 md:order-2'>
									<span className='text-primary font-bold text-xl'>3</span>
								</div>
								<div className='flex-1 md:pl-12 order-3 md:order-3'>
									{/* Empty on left for desktop */}
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* FAQ Section */}
			<FAQ
				title='Questions About Collaboration'
				description='Get answers about how we can work together'
			/>

			{/* Final CTA */}
			<section className='py-16 lg:py-20 px-6 lg:px-12 bg-primary/5'>
				<div className='max-w-4xl mx-auto text-center'>
					<h2 className='text-3xl md:text-4xl font-bold mb-6'>
						Ready to Start Your Project?
					</h2>
					<p className='text-xl text-muted-foreground mb-8 max-w-2xl mx-auto'>
						Let us discuss how I can help bring your ideas to life with robust,
						scalable technology solutions.
					</p>
					<div className='flex flex-wrap gap-4 justify-center'>
						<Link
							href={`mailto:${contact.email}`}
							className='px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all hover:scale-105 text-lg'>
							Start a Conversation
						</Link>
						<Link
							href='/portfolio'
							className='px-8 py-4 rounded-xl border border-default hover:bg-muted/50 transition-all hover:scale-105 text-lg'>
							View My Work
						</Link>
					</div>
				</div>
			</section>
		</main>
	);
}
