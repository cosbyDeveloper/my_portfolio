// app/constants/about.ts
import {
	FaCode,
	FaGraduationCap,
	FaLightbulb,
	FaBrain,
	FaUserTie,
	FaSeedling,
	FaChartLine,
	FaRocket,
	FaBook,
	FaCogs,
	FaHandshake,
} from 'react-icons/fa';
import { FaPersonChalkboard } from 'react-icons/fa6';

export const aboutData = {
	hero: {
		title: 'About Me',
		subtitle:
			'Software Engineer, Founder, and Systems Thinker building scalable systems and intelligent software solutions.',
		description: [
			"I'm Godfred Awusi, founder of Cosby Technologies. I specialize in building reliable systems, scalable web platforms, and software designed to evolve gracefully as complexity grows.",
			'That curiosity gradually evolved into a focus on how systems behave beneath the surface — how they scale, fail, recover, and remain maintainable over time.',
		],
		atAGlance: {
			icon: FaUserTie,
			title: 'At a Glance',
			items: [
				{ icon: FaCode, text: 'Full-Stack Engineer' },
				{ icon: FaRocket, text: 'Founder, Cosby Technologies' },
				{ icon: FaGraduationCap, text: 'First Class BSc Computer Science' },
				{ icon: FaSeedling, text: 'Progressing toward AI/ML-driven systems' },
			],
		},
	},

	currentFocus: {
		title: 'Current Focus',
		subtitle: 'How my experience and interests are shaping my work today',
		items: [
			{
				icon: FaCode,
				title: 'Backend Systems',
				description:
					'MERN & Python/Django APIs, scalable architectures, and database design',
				color: 'text-blue-500',
				bg: 'bg-blue-500/10',
			},
			{
				icon: FaBrain,
				title: 'AI/ML Foundations',
				description: 'Building toward intelligent, data-informed applications',
				color: 'text-purple-500',
				bg: 'bg-purple-500/10',
			},
			{
				icon: FaChartLine,
				title: 'Scalable Platforms',
				description: 'Systems designed for growth and evolving complexity',
				color: 'text-green-500',
				bg: 'bg-green-500/10',
			},
			{
				icon: FaBook,
				title: 'Research Direction',
				description: 'MPhil preparation in software engineering & applied AI',
				color: 'text-orange-500',
				bg: 'bg-orange-500/10',
			},
		],
	},

	education: {
		title: 'Education & Background',
		items: [
			{
				degree: 'BSc Computer Science',
				honors: 'First Class Honors',
				institution: 'Ghana Communication Technology University (GCTU)',
				description:
					'A rigorous program emphasizing software engineering, data structures, algorithms, databases, and systems design — forming a strong analytical and engineering foundation.',
			},
			{
				degree: 'MPhil in Computer Science',
				honors: 'In Preparation',
				description:
					'Preparing for graduate research in software engineering and applied AI/ML, with a focus on how intelligent systems and modern backend engineering can be applied to real-world problems at scale.',
			},
		],
	},

	expertise: {
		title: 'Core Expertise',
		technicalStack: {
			icon: FaCogs,
			title: 'Technical Stack',
			skills: [
				'React',
				'Next.js',
				'Node.js',
				'Express',
				'Python',
				'Django',
				'PostgreSQL',
				'MongoDB',
				'REST APIs',
			],
		},
		workingStyle: {
			icon: FaPersonChalkboard,
			title: 'Working Style',
			items: [
				'Systematic problem-solving and clear communication',
				'Product-oriented thinking with long-term ownership',
				'Collaborative approach with a mentorship mindset',
			],
		},
	},

	philosophy: {
		title: 'Philosophy & Approach',
		items: [
			{
				icon: FaLightbulb,
				title: 'Build with Intention',
				description:
					'Clarity over cleverness. Structure over shortcuts. Systems should be understandable, resilient, and adaptable as requirements evolve.',
			},
			{
				icon: FaHandshake,
				title: 'Impact-Driven Work',
				description:
					'I aim to build work that is technically sound, genuinely useful, and built to deliver long-term value.',
			},
		],
	},

	cta: {
		title: "Let's Build Something Together",
		description:
			'Interested in collaborating on a project or discussing how we can bring meaningful ideas to life?',
		buttons: [
			{ text: 'View My Work', href: '/portfolio', variant: 'outline' },
			{ text: 'Get in Touch', href: '/contact', variant: 'primary' },
		],
	},
};
