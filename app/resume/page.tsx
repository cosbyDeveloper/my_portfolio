// app/resume/page.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { resumeData } from '@/constants/resume';

// Import icons from react-icons/fa
import {
	FaBriefcase,
	FaGraduationCap,
	FaCertificate,
	FaLightbulb,
	FaCode,
	FaUserTie,
	FaPhone,
	FaEnvelope,
	FaMapMarkerAlt,
	FaTools,
	FaProjectDiagram,
	FaCalendarAlt,
	FaDownload,
	FaFilePdf,
	FaLinkedin,
	FaGlobe,
} from 'react-icons/fa';

const ResumePage = () => {
	const handleDownload = () => {
		const link = document.createElement('a');
		link.href = resumeData.personalInfo.resumePdf;
		link.download = resumeData.personalInfo.resumeFileName;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	return (
		<main className='min-h-screen'>
			{/* Resume Header - Like a resume heading */}
			<section className='relative pt-16 lg:pt-20 pb-8 lg:pb-12 px-6 lg:px-12'>
				<div className='max-w-5xl mx-auto'>
					<div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8'>
						<div>
							<h1 className='text-4xl md:text-5xl font-bold tracking-tight mb-2'>
								{resumeData.personalInfo.name.split(' ')[0]}{' '}
								<span className='text-primary'>
									{resumeData.personalInfo.name.split(' ')[1]}
								</span>
							</h1>
							<p className='text-xl text-muted-foreground mb-2'>
								{resumeData.personalInfo.title}
							</p>
							<div className='flex flex-wrap items-center gap-4 text-sm text-muted-foreground'>
								<div className='flex items-center gap-2'>
									<FaMapMarkerAlt className='w-3 h-3' />
									<span>{resumeData.personalInfo.location}</span>
								</div>
								<div className='flex items-center gap-2'>
									<FaPhone className='w-3 h-3' />
									<span>{resumeData.personalInfo.phone}</span>
								</div>
								<div className='flex items-center gap-2'>
									<FaEnvelope className='w-3 h-3' />
									<span>{resumeData.personalInfo.email}</span>
								</div>
							</div>
						</div>

						{/* Download Actions */}
						<div className='flex flex-col sm:flex-row gap-3'>
							<button
								onClick={handleDownload}
								className='flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-all hover:scale-105 active:scale-95 text-sm'>
								<FaDownload className='w-3.5 h-3.5' />
								<span>Download PDF</span>
							</button>
						</div>
					</div>

					{/* Quick Links */}
					<div className='flex flex-wrap gap-4 mb-6'>
						<Link
							href={resumeData.links.linkedin}
							target='_blank'
							className='flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors'>
							<FaLinkedin className='w-3 h-3' />
							<span>LinkedIn</span>
						</Link>
						<Link
							href={resumeData.links.portfolio}
							className='flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors'>
							<FaGlobe className='w-3 h-3' />
							<span>Portfolio</span>
						</Link>
						<Link
							href={resumeData.links.contact}
							className='flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors'>
							<FaPhone className='w-3 h-3' />
							<span>Contact</span>
						</Link>
					</div>
				</div>
			</section>

			{/* Resume Content - Single column flow */}
			<div className='max-w-5xl mx-auto px-6 lg:px-12 pb-16 lg:pb-24'>
				{/* Professional Summary */}
				<motion.section
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className='mb-12'>
					<div className='flex items-center gap-3 mb-4'>
						<div className='w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center'>
							<FaLightbulb className='w-4 h-4 text-primary' />
						</div>
						<h2 className='text-2xl md:text-3xl font-bold'>
							{resumeData.summary.title}
						</h2>
					</div>

					<div className='pl-11 space-y-4'>
						{resumeData.summary.content.map((paragraph, index) => (
							<p key={index} className='text-muted-foreground leading-relaxed'>
								{paragraph}
							</p>
						))}
					</div>
				</motion.section>

				{/* Skills - Divided in two columns but in same section */}
				<motion.section
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className='mb-12'>
					<div className='flex items-center gap-3 mb-6'>
						<div className='w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center'>
							<FaTools className='w-4 h-4 text-primary' />
						</div>
						<h2 className='text-2xl md:text-3xl font-bold'>
							{resumeData.skills.title}
						</h2>
					</div>

					<div className='pl-11'>
						<div className='grid md:grid-cols-2 gap-8'>
							{/* Technical Skills */}
							<div>
								<h3 className='text-lg font-semibold mb-4 flex items-center gap-2'>
									<FaCode className='w-4 h-4 text-primary' />
									<span>{resumeData.skills.technical.title}</span>
								</h3>
								<ul className='space-y-2'>
									{resumeData.skills.technical.items.map((skill, index) => (
										<li
											key={index}
											className='text-muted-foreground flex items-start gap-2'>
											<span className='text-primary mt-1.5'>•</span>
											<span>{skill}</span>
										</li>
									))}
								</ul>
							</div>

							{/* Professional Strengths */}
							<div>
								<h3 className='text-lg font-semibold mb-4 flex items-center gap-2'>
									<FaUserTie className='w-4 h-4 text-secondary' />
									<span>{resumeData.skills.professional.title}</span>
								</h3>
								<ul className='space-y-2'>
									{resumeData.skills.professional.items.map(
										(strength, index) => (
											<li
												key={index}
												className='text-muted-foreground flex items-start gap-2'>
												<span className='text-secondary mt-1.5'>•</span>
												<span>{strength}</span>
											</li>
										),
									)}
								</ul>
							</div>
						</div>
					</div>
				</motion.section>

				{/* Professional Experience - Standalone section */}
				<motion.section
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className='mb-12'>
					<div className='flex items-center gap-3 mb-6'>
						<div className='w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center'>
							<FaBriefcase className='w-4 h-4 text-primary' />
						</div>
						<h2 className='text-2xl md:text-3xl font-bold'>
							{resumeData.experience.title}
						</h2>
					</div>

					<div className='pl-11 space-y-8'>
						{resumeData.experience.items.map((exp, index) => (
							<div
								key={index}
								className={`${
									index < resumeData.experience.items.length - 1
										? 'pb-6 border-b border-default'
										: ''
								}`}>
								<div className='flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3'>
									<h3 className='text-xl font-semibold'>{exp.title}</h3>
									<div className='flex items-center gap-2 text-sm text-muted-foreground'>
										<FaCalendarAlt className='w-3 h-3' />
										<span>
											{exp.period} • {exp.location}
										</span>
									</div>
								</div>
								<ul className='space-y-2 text-muted-foreground'>
									{exp.responsibilities.map((item, itemIndex) => (
										<li key={itemIndex} className='flex items-start gap-2'>
											<span className='text-primary mt-1'>•</span>
											<span>{item}</span>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</motion.section>

				{/* Education - Standalone section */}
				<motion.section
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className='mb-12'>
					<div className='flex items-center gap-3 mb-6'>
						<div className='w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center'>
							<FaGraduationCap className='w-4 h-4 text-primary' />
						</div>
						<h2 className='text-2xl md:text-3xl font-bold'>
							{resumeData.education.title}
						</h2>
					</div>

					<div className='pl-11'>
						{resumeData.education.items.map((edu, index) => (
							<div
								key={index}
								className={`${
									index < resumeData.education.items.length - 1
										? 'pb-6 border-b border-default'
										: ''
								}`}>
								<div className='flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2'>
									<h3 className='text-xl font-semibold'>{edu.degree}</h3>
									<div className='flex items-center gap-2 text-sm text-muted-foreground'>
										<FaCalendarAlt className='w-3 h-3' />
										<span>Graduated {edu.graduationYear}</span>
									</div>
								</div>
								<div className='flex items-center gap-3 mb-3'>
									<span className='px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium'>
										{edu.honors}
									</span>
									<span className='text-muted-foreground'>•</span>
									<span className='text-muted-foreground'>{edu.cgpa}</span>
								</div>
							</div>
						))}
					</div>
				</motion.section>

				{/* Certifications & Continuous Learning - Standalone section */}
				<motion.section
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className='mb-12'>
					<div className='flex items-center gap-3 mb-6'>
						<div className='w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center'>
							<FaCertificate className='w-4 h-4 text-secondary' />
						</div>
						<h2 className='text-2xl md:text-3xl font-bold'>
							{resumeData.certifications.title}
						</h2>
					</div>

					<div className='pl-11'>
						<ul className='space-y-2'>
							{resumeData.certifications.items.map((cert, index) => (
								<li
									key={index}
									className='text-muted-foreground flex items-start gap-2'>
									<span className='text-secondary mt-1.5'>•</span>
									<span>{cert}</span>
								</li>
							))}
						</ul>
					</div>
				</motion.section>

				{/* Key Project - Standalone section */}
				<motion.section
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className='mb-12'>
					<div className='flex items-center gap-3 mb-6'>
						<div className='w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center'>
							<FaProjectDiagram className='w-4 h-4 text-primary' />
						</div>
						<h2 className='text-2xl md:text-3xl font-bold'>
							{resumeData.projects.title}
						</h2>
					</div>

					<div className='pl-11'>
						{resumeData.projects.items.map((project, index) => (
							<div key={index}>
								<h3 className='text-xl font-semibold mb-3'>{project.title}</h3>
								<p className='text-muted-foreground leading-relaxed'>
									{project.description}
								</p>
							</div>
						))}
					</div>
				</motion.section>

				{/* Bottom Action Section */}
				<motion.section
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className='mt-16 pt-8 border-t border-default'>
					<div className='flex flex-col sm:flex-row items-center justify-between gap-6'>
						<div>
							<h3 className='text-xl font-semibold mb-2'>
								{resumeData.footer.note}
							</h3>
							<p className='text-sm text-muted-foreground'>
								Updated: {resumeData.footer.updated}
							</p>
						</div>
						<div className='flex flex-col sm:flex-row gap-3'>
							<button
								onClick={handleDownload}
								className='flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-all hover:scale-105'>
								<FaFilePdf className='w-4 h-4' />
								<span>Download Resume PDF</span>
							</button>
							<Link
								href={resumeData.links.contact}
								className='flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-default hover:bg-muted/50 transition-all hover:scale-105'>
								<span>Contact for Opportunities</span>
							</Link>
						</div>
					</div>
				</motion.section>
			</div>
		</main>
	);
};

export default ResumePage;
