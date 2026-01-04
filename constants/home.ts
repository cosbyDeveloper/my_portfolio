// constants/home.ts

export const homeContent = {
	hero: {
		name: 'Godfred Awusi',
		role: 'Software Engineer',
		greeting: "Hello, I'm",
		imageUrl: '/images/profile.jpg',
		tagline:
			'I build scalable backend systems, modern web applications, and intelligent, data-driven software solutions, with a growing focus on AI/ML-powered systems and real-world impact.',
		ctaPrimary: {
			label: 'View resume',
			href: '/resume',
		},
		ctaSecondary: {
			label: 'Contact Me',
			href: '/contact',
		},
	},

	skills: {
		intro:
			'I work primarily as a backend-focused software engineer, with strong full-stack experience and a solid foundation in modern JavaScript and system design.',
		groups: [
			{
				title: 'Backend & APIs',
				items: [
					'Python (Django)',
					'REST APIs',
					'PostgreSQL (Prisma)',
					'JWT Authentication',
					'System Design',
				],
			},
			{
				title: 'Frontend',
				items: [
					'React',
					'Next.js (App Router)',
					'Tailwind CSS',
					'Bootstrap / React Bootstrap',
					'Responsive UI Design',
				],
			},
			{
				title: 'JavaScript Stack (Prior & On-Demand)',
				items: ['MongoDB Atlas', 'Express.js', 'Node.js', 'Mongoose'],
			},
			{
				title: 'Tools & Infrastructure',
				items: [
					'Git & GitHub',
					'Linux',
					'Docker (Foundational)',
					'Vercel',
					'Railway / Render',
					'Cloud Deployment',
				],
			},
		],
		skillsCloud: [
			'React',
			'Next.js',
			'TypeScript',
			'Node.js',
			'Python',
			'Django',
			'PostgreSQL',
			'MongoDB',
			'Tailwind',
			'Docker',
		],
		cta: {
			label: 'Learn more about me',
			href: '/about',
		},
	},
	experienceEducation: {
		title: 'Experience & Education',
		intro:
			'A blend of academic foundation and hands-on experience building real products and solving real problems.',

		experience: [
			{
				role: 'Founder & Software Engineer',
				company: 'Cosby Technologies',
				period: '2021 – Present',
				highlights: [
					'Founded and led Cosby Technologies, delivering web solutions for clients and internal products.',
					'Designed and built scalable web systems using React, Nextjs, MERN, Django and other modern web technologies.',
					'Worked across product ideation, system architecture, development, and deployment.',
				],
			},
		],

		education: [
			{
				degree: 'BSc Computer Science - First Class',
				institution: 'Ghana Communication Technology University (GCTU)',
				period: '2022 – 2025 (4years)',
				details: [
					'Strong foundation in algorithms, data structures, databases, and software engineering.',
					'Completed academic and practical projects spanning web development, systems, and AI.',
				],
			},
		],

		cta: {
			label: 'View full resume',
			href: '/resume',
		},
	},

	featuredProjects: {
		title: 'Featured Projects',
		limit: 3,
		cta: {
			label: 'View All Projects',
			href: '/portfolio',
		},
	},
	featuredBlogs: {
		title: 'Featured Writing',
		limit: 3,
		cta: {
			label: 'View All Posts',
			href: '/blog',
		},
	},
	contact: {
		title: 'Get In Touch',
		intro:
			'Have an idea, a project, or just want to connect? I’m always open to meaningful conversations and collaborations.',
		email: 'cosby.developer@gmail.com',
		phone: '+233 24 123 4567', // Add phone if you want
		location: 'Accra, Ghana', // Add location if you want
		socials: [
			{
				label: 'LinkedIn',
				href: 'https://www.linkedin.com/in/godfred-awusi-dev/',
				icon: 'FaLinkedin',
			},
			{
				label: 'GitHub',
				href: 'https://github.com/cosbyDeveloper',
				icon: 'FaGithub',
			},
			{
				label: 'Twitter',
				href: 'https://twitter.com/cosby_Tech',
				icon: 'FaXTwitter',
			},
		],
	},
};
