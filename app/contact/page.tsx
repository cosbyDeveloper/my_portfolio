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

// // ─────────────────────────────────────────────────────────────────────────────
// // FUTURE SELF VERSION — September 2028
// // Reflects the completed state of the Academic Mastery Plan (2026–2028).
// // I use this as a north star — to see where I'm going,
// // and to feel the weight of what I'm building toward.
// // ─────────────────────────────────────────────────────────────────────────────
// import {
// 	FaBrain,
// 	FaFlask,
// 	FaCode,
// 	FaHandshake,
// 	FaPenNib,
// 	FaChalkboardTeacher,
// } from 'react-icons/fa';
// import Link from 'next/link';
// import { homeContent } from '@/constants/home';
// import GetInTouch from '@/components/home/GetInTouch';
// import FAQ from '@/components/home/FAQ';

// export const metadata = {
// 	title: 'Contact | Godfred Awusi — Applied AI/ML Engineer & Researcher',
// 	description:
// 		'Get in touch for ML engineering projects, research collaborations, consulting, or speaking opportunities.',
// };

// // ── Service cards ──────────────────────────────────────────────────────────
// const services = [
// 	{
// 		icon: FaBrain,
// 		iconColor: 'text-purple-500',
// 		iconBg: 'bg-purple-500/10',
// 		title: 'ML Engineering & AI Systems',
// 		description:
// 			'End-to-end intelligent system design — from data pipelines and model training to production deployment, monitoring, and retraining. Built to be reliable, not just impressive.',
// 	},
// 	{
// 		icon: FaFlask,
// 		iconColor: 'text-teal-500',
// 		iconBg: 'bg-teal-500/10',
// 		title: 'Research Collaboration',
// 		description:
// 			'Open to joint research in applied AI/ML, intelligent systems, and ML engineering. Particularly interested in problems where real-world deployment constraints shape the research questions.',
// 	},
// 	{
// 		icon: FaCode,
// 		iconColor: 'text-blue-500',
// 		iconBg: 'bg-blue-500/10',
// 		title: 'Full-Stack AI Product Development',
// 		description:
// 			'Building the complete product layer around an AI system — React/Next.js interfaces, FastAPI/Django backends, and the integrations that make intelligent features seamless to users.',
// 	},
// 	{
// 		icon: FaHandshake,
// 		iconColor: 'text-green-500',
// 		iconBg: 'bg-green-500/10',
// 		title: 'Technical Consulting',
// 		description:
// 			'Architecture review and strategic advice for teams integrating ML into existing products — covering model selection, system design, MLOps strategy, and production readiness assessment.',
// 	},
// 	{
// 		icon: FaChalkboardTeacher,
// 		iconColor: 'text-orange-500',
// 		iconBg: 'bg-orange-500/10',
// 		title: 'Mentorship & Teaching',
// 		description:
// 			'Mentoring engineers transitioning into ML, developers building their first production AI systems, and students preparing for graduate research in computer science and AI.',
// 	},
// 	{
// 		icon: FaPenNib,
// 		iconColor: 'text-rose-500',
// 		iconBg: 'bg-rose-500/10',
// 		title: 'Speaking & Writing',
// 		description:
// 			'Available for conference talks, technical workshops, and guest posts on ML engineering, production AI systems, and the realities of building and deploying intelligent software.',
// 	},
// ];

// // ── Process steps ──────────────────────────────────────────────────────────
// const steps = [
// 	{
// 		number: '1',
// 		colorClass: 'bg-primary/10',
// 		textColor: 'text-primary',
// 		title: 'Initial Response',
// 		description:
// 			"I'll get back to you within 24–48 hours with a brief acknowledgement and, if relevant, a few clarifying questions to make sure I understand the problem you're working on.",
// 	},
// 	{
// 		number: '2',
// 		colorClass: 'bg-secondary/10',
// 		textColor: 'text-secondary',
// 		title: 'Discovery Conversation',
// 		description:
// 			'A focused 30–45 minute call to understand your goals, constraints, and what success looks like. For research collaborations, this often turns into a longer technical conversation.',
// 	},
// 	{
// 		number: '3',
// 		colorClass: 'bg-primary/10',
// 		textColor: 'text-primary',
// 		title: 'Proposal or Next Steps',
// 		description:
// 			"Depending on the type of engagement, I'll follow up with a written proposal, a research outline, or a concrete recommended approach — with honest timelines and clear scope.",
// 	},
// ];

// export default function ContactPage() {
// 	const { contact } = homeContent;

// 	return (
// 		<main className='min-h-screen'>
// 			{/* ── Hero ──────────────────────────────────────────────────────── */}
// 			<section className='relative pt-16 lg:pt-24 pb-6 lg:pb-12 px-6 lg:px-12 overflow-hidden'>
// 				<div className='max-w-4xl mx-auto text-center'>
// 					<h1 className='text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6'>
// 						Let&apos;s Build Something{' '}
// 						<span className='text-primary'>That Matters</span>
// 					</h1>
// 					<p className='text-xl text-muted-foreground mb-4 max-w-2xl mx-auto'>
// 						Whether it&apos;s an ML engineering project, a research
// 						collaboration, a consulting engagement, or a conversation about
// 						where intelligent systems are actually going — I&apos;m interested.
// 					</p>
// 					<p className='text-base text-muted-foreground mb-8 max-w-xl mx-auto'>
// 						I work at the intersection of applied AI/ML research and production
// 						engineering. If your problem lives there too, we should talk.
// 					</p>
// 					<div className='flex flex-wrap gap-4 justify-center'>
// 						<Link
// 							href={`mailto:${contact.email}`}
// 							className='px-8 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all hover:scale-105'>
// 							Send an Email
// 						</Link>
// 						<Link
// 							href={
// 								contact.socials.find((s) => s.label === 'LinkedIn')?.href || '#'
// 							}
// 							target='_blank'
// 							rel='noopener noreferrer'
// 							className='px-8 py-3 rounded-xl border border-default hover:bg-muted/50 transition-all hover:scale-105'>
// 							Connect on LinkedIn
// 						</Link>
// 						<Link
// 							href='/research'
// 							className='px-8 py-3 rounded-xl border border-default hover:bg-muted/50 transition-all hover:scale-105'>
// 							View My Research
// 						</Link>
// 					</div>
// 				</div>
// 			</section>

// 			{/* ── How I Can Help ────────────────────────────────────────────── */}
// 			<section className='py-16 lg:py-20 px-6 lg:px-12'>
// 				<div className='max-w-6xl mx-auto'>
// 					<div className='text-center mb-12'>
// 						<h2 className='text-3xl md:text-4xl font-bold mb-4'>
// 							How I Can Help
// 						</h2>
// 						<p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
// 							My work spans the full spectrum from research to production. Here
// 							are the types of engagements I take on.
// 						</p>
// 					</div>

// 					<div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
// 						{services.map((service) => (
// 							<div
// 								key={service.title}
// 								className='p-6 rounded-2xl border border-default hover:border-primary/50 transition-colors'>
// 								<div
// 									className={`inline-flex p-3 rounded-xl ${service.iconBg} mb-4`}>
// 									<service.icon className={`w-6 h-6 ${service.iconColor}`} />
// 								</div>
// 								<h3 className='text-xl font-semibold mb-2'>{service.title}</h3>
// 								<p className='text-muted-foreground text-sm leading-relaxed'>
// 									{service.description}
// 								</p>
// 							</div>
// 						))}
// 					</div>
// 				</div>
// 			</section>

// 			{/* ── Good Fit Note ─────────────────────────────────────────────── */}
// 			<section className='py-8 px-6 lg:px-12'>
// 				<div className='max-w-3xl mx-auto'>
// 					<div className='rounded-2xl bg-muted/40 border border-default p-8'>
// 						<h3 className='text-xl font-semibold mb-3'>
// 							A note on what I find most interesting
// 						</h3>
// 						<p className='text-muted-foreground leading-relaxed mb-4'>
// 							The problems I am most drawn to are ones where the challenge is
// 							not just training an accurate model, but engineering a system that
// 							stays accurate, reliable, and useful after deployment — with real
// 							data, real users, and real constraints.
// 						</p>
// 						<p className='text-muted-foreground leading-relaxed'>
// 							If your project involves deploying ML in production, scaling
// 							intelligent systems, making models trustworthy, or applying AI to
// 							a domain where failure actually matters — that is where I do my
// 							best work.
// 						</p>
// 					</div>
// 				</div>
// 			</section>

// 			{/* ── GetInTouch Component ──────────────────────────────────────── */}
// 			<GetInTouch showMore={false} />

// 			{/* ── Process ───────────────────────────────────────────────────── */}
// 			<section className='py-16 lg:py-20 px-6 lg:px-12 bg-muted/30'>
// 				<div className='max-w-4xl mx-auto'>
// 					<div className='text-center mb-12'>
// 						<h2 className='text-3xl md:text-4xl font-bold mb-4'>
// 							What Happens Next
// 						</h2>
// 						<p className='text-lg text-muted-foreground'>
// 							My process when you reach out — straightforward and respectful of
// 							your time.
// 						</p>
// 					</div>

// 					<div className='relative'>
// 						<div className='absolute left-8 top-0 bottom-0 w-0.5 bg-default md:left-1/2 md:-translate-x-1/2' />

// 						<div className='space-y-12'>
// 							{steps.map((step, i) => {
// 								const isEven = i % 2 === 0;
// 								return (
// 									<div
// 										key={step.number}
// 										className='relative flex flex-col md:flex-row items-center'>
// 										{/* Left content */}
// 										<div
// 											className={`flex-1 md:pr-12 order-2 ${
// 												isEven ? 'md:text-right md:order-1' : 'md:order-3'
// 											}`}>
// 											{isEven && (
// 												<>
// 													<h3 className='text-xl font-semibold mb-2'>
// 														{step.title}
// 													</h3>
// 													<p className='text-muted-foreground'>
// 														{step.description}
// 													</p>
// 												</>
// 											)}
// 										</div>

// 										{/* Number bubble */}
// 										<div
// 											className={`w-16 h-16 rounded-full ${step.colorClass} flex items-center justify-center mb-4 md:mb-0 md:order-2 shrink-0`}>
// 											<span className={`${step.textColor} font-bold text-xl`}>
// 												{step.number}
// 											</span>
// 										</div>

// 										{/* Right content */}
// 										<div
// 											className={`flex-1 md:pl-12 order-2 ${
// 												!isEven ? 'md:order-3' : 'md:order-3'
// 											}`}>
// 											{!isEven && (
// 												<>
// 													<h3 className='text-xl font-semibold mb-2'>
// 														{step.title}
// 													</h3>
// 													<p className='text-muted-foreground'>
// 														{step.description}
// 													</p>
// 												</>
// 											)}
// 										</div>
// 									</div>
// 								);
// 							})}
// 						</div>
// 					</div>
// 				</div>
// 			</section>

// 			{/* ── FAQ ───────────────────────────────────────────────────────── */}
// 			<FAQ
// 				title='Questions About Working Together'
// 				description='Common questions about collaborations, research, and engagements'
// 			/>

// 			{/* ── Final CTA ─────────────────────────────────────────────────── */}
// 			<section className='py-16 lg:py-20 px-6 lg:px-12 bg-primary/5'>
// 				<div className='max-w-4xl mx-auto text-center'>
// 					<h2 className='text-3xl md:text-4xl font-bold mb-6'>
// 						Ready to Start the Conversation?
// 					</h2>
// 					<p className='text-xl text-muted-foreground mb-4 max-w-2xl mx-auto'>
// 						The best projects start with a clear problem. If you have one —
// 						whether it is a production ML system that needs to actually work, a
// 						research question that needs an engineering answer, or a product
// 						that needs intelligence built into it properly — let&apos;s talk.
// 					</p>
// 					<p className='text-base text-muted-foreground mb-8 max-w-xl mx-auto'>
// 						I respond to every message personally. No assistants, no templates.
// 					</p>
// 					<div className='flex flex-wrap gap-4 justify-center'>
// 						<Link
// 							href={`mailto:${contact.email}`}
// 							className='px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all hover:scale-105 text-lg'>
// 							Start a Conversation
// 						</Link>
// 						<Link
// 							href='/portfolio'
// 							className='px-8 py-4 rounded-xl border border-default hover:bg-muted/50 transition-all hover:scale-105 text-lg'>
// 							View My Work
// 						</Link>
// 						<Link
// 							href='/research'
// 							className='px-8 py-4 rounded-xl border border-default hover:bg-muted/50 transition-all hover:scale-105 text-lg'>
// 							Read My Research
// 						</Link>
// 					</div>
// 				</div>
// 			</section>
// 		</main>
// 	);
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // CHANGES vs CURRENT contact/page.tsx — what to update before deploying
// // ─────────────────────────────────────────────────────────────────────────────
// //
// //  1. metadata.title — updated to include 'Applied AI/ML Engineer & Researcher'.
// //     Update this to match your exact title at deployment time.
// //
// //  2. metadata.description — now mentions research collaborations and speaking,
// //     not just projects and collaborations.
// //
// //  3. Hero h1 — "Build Something Amazing Together" → "Build Something That Matters"
// //     Small but deliberate. "That Matters" signals work with stakes, not just output.
// //
// //  4. Hero description — two paragraphs instead of one. The second locates you
// //     precisely: "I work at the intersection of applied AI/ML research and
// //     production engineering." This is the sentence that filters the right people in.
// //
// //  5. Hero CTAs — three buttons instead of two. Added "View My Research" as a
// //     third option. This is important: a researcher's contact page should route
// //     curious visitors to the research page, not just push them to email.
// //
// //  6. Services section — completely rebuilt.
// //     Current: 4 generic cards (Project Consulting, Code Review, Part-Time Work,
// //     Mentorship) arranged in a 4-column grid.
// //     Future: 6 specific cards in a 2x3 grid:
// //       - ML Engineering & AI Systems  (new)
// //       - Research Collaboration        (new — does not exist in current version)
// //       - Full-Stack AI Product Dev     (evolved from generic "project consulting")
// //       - Technical Consulting          (evolved — now ML-specific)
// //       - Mentorship & Teaching         (kept — expanded to include ML mentorship)
// //       - Speaking & Writing            (new — does not exist in current version)
// //     "Code Review" is removed. It is a junior positioning signal. At this point
// //     you offer architectural review and MLOps strategy — not line-by-line critique.
// //     "Part-Time Work" is removed. By 2028 you are not looking for part-time work
// //     — you are sought for expert engagements. The framing matters.
// //
// //  7. New "A note on what I find most interesting" section — added between services
// //     and GetInTouch. This is a short honest paragraph that signals intellectual
// //     seriousness and filters for the right collaborators. It communicates:
// //     "I am not a generalist for hire. I am a specialist with a clear focus."
// //
// //  8. Process section — copy updated throughout.
// //     Step 1: "24 hours" → "24–48 hours" (more honest at this career stage).
// //     Step 2: "Discovery Call" → "Discovery Conversation" — the word "call"
// //     implies a sales process. "Conversation" implies peer-to-peer engagement.
// //     Step 3: "Proposal & Planning" — rewritten to mention research outlines
// //     alongside client proposals, because not all engagements are client work.
// //
// //  9. FAQ component — title updated from "Questions About Collaboration" to
// //     "Questions About Working Together". Subtle but more natural.
// //     You should also update the FAQ data itself (in the FAQ component or its
// //     constants) to include ML/research-specific questions. Suggested additions:
// //       - "Do you take on pure research collaborations?"
// //       - "What types of ML systems have you deployed?"
// //       - "Are you available for conference speaking?"
// //       - "Do you consult on ML systems that are already in production?"
// //
// // 10. Final CTA — rewritten entirely.
// //     Current: "Let us discuss how I can help bring your ideas to life with
// //     robust, scalable technology solutions." — generic.
// //     Future: "The best projects start with a clear problem..." — specific,
// //     confident, and directly positioned toward ML/research problems.
// //     Added the line: "I respond to every message personally. No assistants,
// //     no templates." — this is a trust signal at a level where people assume
// //     you might have a team or an EA managing inbound.
// //     Three CTA buttons (matching the hero): email, portfolio, research.
// //
// // 11. Services are extracted into a const array at the top of the file for
// //     cleanliness. Consider moving this to a constants file if your project
// //     structure prefers that pattern.
// //
// // 12. Process steps are also extracted into a const array. The rendering logic
// //     uses index-based alternation (isEven) to handle the zigzag layout,
// //     replacing the duplicated JSX blocks in the current version.
// //
// // ─────────────────────────────────────────────────────────────────────────────
