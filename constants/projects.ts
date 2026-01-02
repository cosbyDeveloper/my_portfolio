export type Project = {
	slug: string;
	title: string;

	category: {
		key: 'cosby' | 'freelance' | 'personal' | 'course';
		label: string;
	};

	summary: string;
	description: string;

	stack: string[];

	coverImage: string;
	images: string[];

	demoUrl?: string;
	repoUrl?: string;

	featured?: boolean;
	acknowledgement?: string;
};

export const projects: Project[] = [
	{
		slug: 'cosby-platform',
		title: 'Cosby Technologies Platform',

		category: {
			key: 'cosby',
			label: 'Cosby Technologies Project',
		},

		summary:
			'A modern company platform showcasing scalable architecture and clean UI.',
		description:
			'The Cosby Technologies platform serves as the public-facing and internal foundation for product development, documentation, and client engagement. It is designed with scalability in mind and acts as a base for future digital products and services.',

		stack: ['Next.js', 'Tailwind CSS', 'Django', 'PostgreSQL'],

		coverImage: '/images/products/cosby-platform/cover.png',
		images: [
			'/images/products/cosby-platform/dashboard.png',
			'/images/products/cosby-platform/landing.png',
			'/images/products/cosby-platform/admin.png',
		],

		demoUrl: 'https://cosbytechnologies.com',
		featured: true,
	},

	{
		slug: 'church-media-platform',
		title: 'Church Media & Community Platform',

		category: {
			key: 'freelance',
			label: 'Freelance Project',
		},

		summary:
			'A centralized web platform for church media, events, and community engagement.',
		description:
			'A full-stack platform developed to centralize photos, videos, announcements, and information about feast sites and local churches across Ghana. The system improves communication, engagement, and accessibility for church members nationwide.',

		stack: ['React', 'Node.js', 'Express', 'MongoDB'],

		coverImage: '/images/products/church-platform/cover.png',
		images: [
			'/images/products/church-platform/home.png',
			'/images/products/church-platform/media.png',
			'/images/products/church-platform/events.png',
		],
		demoUrl: 'https://churchproject.vercel.app',
		featured: false,
	},

	{
		slug: 'logistics-company-system',
		title: 'Logistics & Supply Chain Company System',

		category: {
			key: 'freelance',
			label: 'Freelance Project',
		},

		summary:
			'A web-based logistics platform for Zeph Impact Logistics to showcase managing supply chains and transportation workflows.',
		description:
			'A logistics and supply chain management website designed to showcase services, streamline operational workflows, and support future system expansion into dashboards and analytics.',

		stack: ['Next.js', 'Bootstrap', 'MongoDB'],

		coverImage: '/images/products/logistics-system/cover.png',
		images: [
			'/images/products/logistics-system/services.png',
			'/images/products/logistics-system/transport.png',
		],
		demoUrl: 'https://zephimpact.vercel.app',
		featured: true,
	},

	{
		slug: 'smart-waste-management',
		title: 'Smart Waste Management System',

		category: {
			key: 'course',
			label: 'Academic / Course Project',
		},

		summary:
			'An IoT-powered waste monitoring system integrating embedded systems and web dashboards.',
		description:
			'An academic project focused on real-time waste level monitoring using embedded sensors, GPS tracking, and a centralized web dashboard for visualization and monitoring.',

		stack: ['ESP32', 'NEO-6M GPS', 'Node.js', 'MongoDB', 'React'],

		coverImage: '/images/products/smart-waste/cover.png',
		images: [
			'/images/products/smart-waste/hardware.jpg',
			'/images/products/smart-waste/dashboard.png',
		],

		acknowledgement:
			'Developed as a final-year academic project at Ghana Communication Technology University.',

		demoUrl: 'https://neatcycle.vercel.app',
		featured: true,
	},

	{
		slug: 'personal-portfolio',
		title: 'Personal Portfolio Website',

		category: {
			key: 'personal',
			label: 'Personal Project',
		},

		summary:
			'A developer portfolio focused on clarity, structure, and technical direction.',
		description:
			'A personal portfolio built to present projects, skills, and technical growth with a strong emphasis on backend engineering, system design, and long-term career direction.',

		stack: ['Next.js', 'Tailwind CSS', 'TypeScript'],

		coverImage: '/images/products/portfolio/cover.png',
		images: [
			'/images/products/portfolio/home.png',
			'/images/products/portfolio/images/products.png',
		],
		demoUrl: 'https://cosbydeveloper.vercel.app',
		featured: false,
	},

	{
		slug: 'trading-system-research',
		title: 'Algorithmic Trading System (Research Phase)',

		category: {
			key: 'personal',
			label: 'Personal / Research',
		},

		summary:
			'Research and prototyping toward an automated, data-driven trading system.',
		description:
			'An ongoing personal research project exploring market data, trading logic, and system design for building automated trading tools, with long-term plans to integrate machine learning for decision support.',

		stack: ['Python', 'Pandas', 'APIs', 'Data Analysis'],

		coverImage: '/images/products/trading-system/cover.png',
		images: ['/images/products/trading-system/analysis.png'],
		demoUrl: 'https://tradingsytem.vercel.app',
		featured: false,
	},
];
