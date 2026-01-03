// app/about/page.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { aboutData } from '@/constants/about';

export default function AboutPage() {
	return (
		<main className='min-h-screen'>
			{/* =====================
        HERO
      ===================== */}
			<section className='relative pt-16 lg:pt-24 pb-12 lg:pb-16 px-6 lg:px-12 overflow-hidden'>
				<div className='max-w-6xl mx-auto'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className='text-center max-w-3xl mx-auto mb-12'>
						<h1 className='text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6'>
							{aboutData.hero.title.split(' ')[0]}{' '}
							<span className='text-primary'>
								{aboutData.hero.title.split(' ')[1]}
							</span>
						</h1>
						<p className='text-xl text-muted-foreground'>
							{aboutData.hero.subtitle}
						</p>
					</motion.div>

					{/* Profile Summary */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2, duration: 0.6 }}
						className='grid md:grid-cols-2 gap-8 items-center'>
						<div className='space-y-6'>
							{aboutData.hero.description.map((paragraph, index) => (
								<p
									key={index}
									className={`${
										index === 0
											? 'text-lg leading-relaxed'
											: 'text-muted-foreground leading-relaxed'
									}`}>
									{index === 0 ? (
										<>
											{paragraph.split('Godfred Awusi')[0]}
											<span className='font-semibold'>Godfred Awusi</span>
											{
												paragraph
													.split('Godfred Awusi')[1]
													?.split('Cosby Technologies')[0]
											}
											<span className='text-primary font-semibold'>
												Cosby Technologies
											</span>
											{paragraph.split('Cosby Technologies')[1]}
										</>
									) : (
										paragraph
									)}
								</p>
							))}
						</div>

						<div className='bg-linear-to-br from-primary/5 to-secondary/5 rounded-2xl p-8 border border-default'>
							<h3 className='text-xl font-semibold mb-4 flex items-center gap-2'>
								<aboutData.hero.atAGlance.icon className='text-primary' />
								<span>{aboutData.hero.atAGlance.title}</span>
							</h3>
							<div className='space-y-3'>
								{aboutData.hero.atAGlance.items.map((item, index) => (
									<div key={index} className='flex items-center gap-3'>
										<item.icon className='w-4 h-4 text-primary' />
										<span className='text-sm'>{item.text}</span>
									</div>
								))}
							</div>
						</div>
					</motion.div>
				</div>
			</section>

			{/* =====================
        CURRENT FOCUS
      ===================== */}
			<section className='py-16 lg:py-20 px-6 lg:px-12 bg-muted/30'>
				<div className='max-w-6xl mx-auto'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className='text-center mb-12'>
						<h2 className='text-3xl md:text-4xl font-bold mb-4'>
							{aboutData.currentFocus.title.split(' ')[0]}{' '}
							<span className='text-primary'>
								{aboutData.currentFocus.title.split(' ')[1]}
							</span>
						</h2>
						<p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
							{aboutData.currentFocus.subtitle}
						</p>
					</motion.div>

					<div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
						{aboutData.currentFocus.items.map((item, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: index * 0.1 }}
								className='bg-background rounded-2xl border border-default p-6 hover:border-primary/50 transition-colors'>
								<div
									className={`inline-flex p-3 rounded-xl ${item.bg} ${item.color} mb-4`}>
									<item.icon className='w-6 h-6' />
								</div>
								<h3 className='text-xl font-semibold mb-2'>{item.title}</h3>
								<p className='text-muted-foreground text-sm'>
									{item.description}
								</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* =====================
        EDUCATION & EXPERTISE
      ===================== */}
			<section className='py-16 lg:py-20 px-6 lg:px-12'>
				<div className='max-w-6xl mx-auto'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className='grid md:grid-cols-2 gap-12 items-start'>
						{/* Education */}
						<div>
							<h2 className='text-3xl md:text-4xl font-bold mb-8'>
								{aboutData.education.title.split(' & ')[0]} &{' '}
								<span className='text-primary'>
									{aboutData.education.title.split(' & ')[1]}
								</span>
							</h2>

							<div className='space-y-8'>
								{aboutData.education.items.map((edu, index) => (
									<div key={index} className='relative pl-8'>
										<div className='absolute left-0 top-2 w-3 h-3 rounded-full bg-primary border-4 border-background' />
										<div className='absolute left-1 top-6 bottom-0 w-px bg-border' />
										<h3 className='text-xl font-semibold mb-2'>{edu.degree}</h3>
										<p
											className={`${
												index === 0 ? 'text-primary' : 'text-secondary'
											} font-medium mb-1`}>
											{edu.honors}
										</p>
										{edu.institution && (
											<p className='text-muted-foreground mb-2'>
												{edu.institution}
											</p>
										)}
										<p className='text-muted-foreground'>{edu.description}</p>
									</div>
								))}
							</div>
						</div>

						{/* Expertise */}
						<div className='space-y-8'>
							<h3 className='text-2xl font-semibold'>
								{aboutData.expertise.title}
							</h3>

							<div>
								<h4 className='text-lg font-semibold mb-3 flex items-center gap-2'>
									<aboutData.expertise.technicalStack.icon className='text-primary' />
									<span>{aboutData.expertise.technicalStack.title}</span>
								</h4>
								<div className='flex flex-wrap gap-2'>
									{aboutData.expertise.technicalStack.skills.map((skill) => (
										<span
											key={skill}
											className='px-3 py-1 rounded-full bg-muted/50 text-sm border border-default'>
											{skill}
										</span>
									))}
								</div>
							</div>

							<div>
								<h4 className='text-lg font-semibold mb-3 flex items-center gap-2'>
									<aboutData.expertise.workingStyle.icon className='text-secondary' />
									<span>{aboutData.expertise.workingStyle.title}</span>
								</h4>
								<ul className='space-y-2 text-muted-foreground'>
									{aboutData.expertise.workingStyle.items.map((item, index) => (
										<li key={index}>{item}</li>
									))}
								</ul>
							</div>
						</div>
					</motion.div>
				</div>
			</section>

			{/* =====================
        PHILOSOPHY
      ===================== */}
			<section className='py-16 lg:py-20 px-6 lg:px-12 bg-linear-to-br from-primary/5 to-secondary/5'>
				<div className='max-w-4xl mx-auto text-center space-y-12'>
					<h2 className='text-3xl md:text-4xl font-bold'>
						{aboutData.philosophy.title.split(' & ')[0]} &{' '}
						<span className='text-primary'>
							{aboutData.philosophy.title.split(' & ')[1]}
						</span>
					</h2>

					<div className='grid md:grid-cols-2 gap-8'>
						{aboutData.philosophy.items.map((item, index) => {
							const isFirst = index === 0;
							return (
								<div
									key={index}
									className='bg-background rounded-2xl border border-default p-8'>
									<div
										className={`inline-flex p-3 rounded-xl ${
											isFirst
												? 'bg-primary/10 text-primary'
												: 'bg-secondary/10 text-secondary'
										} mb-4`}>
										<item.icon className='w-6 h-6' />
									</div>
									<h3 className='text-xl font-semibold mb-3'>{item.title}</h3>
									<p className='text-muted-foreground'>{item.description}</p>
								</div>
							);
						})}
					</div>
				</div>
			</section>

			{/* =====================
        CTA
      ===================== */}
			<section className='py-16 lg:py-20 px-6 lg:px-12'>
				<div className='max-w-4xl mx-auto text-center'>
					<div className='rounded-2xl border border-default p-8 md:p-12'>
						<h2 className='text-3xl md:text-4xl font-bold mb-4'>
							{aboutData.cta.title}
						</h2>
						<p className='text-lg text-muted-foreground mb-8'>
							{aboutData.cta.description}
						</p>
						<div className='flex flex-col sm:flex-row gap-4 justify-center'>
							{aboutData.cta.buttons.map((button, index) => (
								<Link
									key={index}
									href={button.href}
									className={`px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition ${
										button.variant === 'primary'
											? 'bg-primary text-primary-foreground'
											: 'border border-default hover:bg-muted/50'
									}`}>
									{button.text}
								</Link>
							))}
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
