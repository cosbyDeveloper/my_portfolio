// constants/projects.ts
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

	// Detail page properties
	challenges?: string[];
	solutions?: string[];
	lessons?: string[];
	keyFeatures?: string[];
	technicalDetails?: {
		title: string;
		description: string;
	}[];
	role?: string;
	timeline?: string;
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
			'The Cosby Technologies platform serves as the public-facing and internal foundation for product development, documentation, and client engagement. Built with a focus on scalability and maintainability, it provides a comprehensive solution for showcasing services, managing projects, and facilitating client communication.',
		stack: [
			'Next.js',
			'TypeScript',
			'Tailwind CSS',
			'Django',
			'PostgreSQL',
			'Docker',
			'AWS',
		],
		coverImage: '/images/products/cosby-platform/cover.png',
		images: [
			'/images/products/cosby-platform/dashboard.png',
			'/images/products/cosby-platform/landing.png',
			'/images/products/cosby-platform/admin.png',
			'/images/products/cosby-platform/projects.png',
		],
		demoUrl: 'https://cosbytechnologies.vercel.app',
		featured: true,
		role: 'Full-Stack Developer & Founder',
		timeline: 'Ongoing since 2021',

		challenges: [
			'Creating a scalable architecture that could evolve with the company',
			'Implementing a unified design system across multiple product lines',
			'Balancing feature development with technical debt management',
			'Ensuring optimal performance across diverse user scenarios',
		],

		solutions: [
			'Adopted microservices architecture with clear separation of concerns',
			'Developed a custom design system using Tailwind CSS and component libraries',
			'Implemented CI/CD pipelines for automated testing and deployment',
			'Used server-side rendering and image optimization for performance',
		],

		lessons: [
			'Importance of documentation from the earliest stages',
			'Value of automated testing for long-term maintainability',
			'Benefits of containerization for consistent development environments',
			'Need for regular technical debt assessment and refactoring',
		],

		keyFeatures: [
			'Responsive design optimized for all devices',
			'Comprehensive admin dashboard for content management',
			'Secure user authentication and role-based access control',
			'API integration with third-party services',
			'Real-time notifications and updates',
			'SEO optimization and social sharing capabilities',
		],

		technicalDetails: [
			{
				title: 'Frontend Architecture',
				description:
					'Built with Next.js 14 using App Router, TypeScript for type safety, and Tailwind CSS for styling. Implemented server components for improved performance and SEO.',
			},
			{
				title: 'Backend Services',
				description:
					'Django REST Framework provides robust API endpoints with JWT authentication. PostgreSQL handles complex relational data with optimized queries.',
			},
			{
				title: 'Deployment & DevOps',
				description:
					'Containerized with Docker and deployed on AWS with auto-scaling. CI/CD pipelines handle automated testing, building, and deployment.',
			},
		],
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
			'A comprehensive logistics and supply chain management website designed to showcase services, streamline operational workflows, and support future system expansion into dashboards and analytics. The platform provides a modern interface for client engagement while laying the foundation for future operational tools.',
		stack: [
			'Next.js',
			'TypeScript',
			'Bootstrap',
			'Node.js',
			'MongoDB',
			'Express',
			'JWT',
		],
		coverImage: '/images/products/logistics-system/cover.png',
		images: [
			'/images/products/logistics-system/services.png',
			'/images/products/logistics-system/transport.png',
			'/images/products/logistics-system/dashboard.png',
			'/images/products/logistics-system/contact.png',
		],
		demoUrl: 'https://zephimpact.vercel.app',
		featured: true,
		role: 'Full-Stack Developer',
		timeline: '3 months (2024)',

		challenges: [
			'Creating an intuitive interface for complex logistics operations',
			'Implementing secure client data handling and privacy measures',
			'Designing for scalability as the company expands services',
			'Integrating with potential third-party logistics APIs',
		],

		solutions: [
			'Developed a clean, intuitive UI with Bootstrap for rapid prototyping',
			'Implemented robust authentication and data encryption protocols',
			'Designed modular architecture for easy feature addition',
			'Created API-first approach for future third-party integrations',
		],

		lessons: [
			'Importance of understanding domain-specific requirements',
			'Value of client feedback loops during development',
			'Benefits of using established UI frameworks for business applications',
			'Need for clear documentation when handing off projects',
		],

		keyFeatures: [
			'Service showcase with detailed descriptions and pricing',
			'Interactive transport route visualization',
			'Client dashboard for shipment tracking',
			'Contact management system',
			'Responsive design for mobile field workers',
			'Multilingual support for international clients',
		],

		technicalDetails: [
			{
				title: 'Frontend Implementation',
				description:
					'Built with Next.js for server-side rendering and SEO benefits. Bootstrap provides consistent styling across components with custom theming.',
			},
			{
				title: 'Data Management',
				description:
					'MongoDB offers flexible document storage for diverse logistics data. Express.js handles API routes with JWT-based authentication.',
			},
			{
				title: 'Future Scalability',
				description:
					'Modular architecture allows for adding features like real-time tracking, analytics dashboards, and API integrations.',
			},
		],
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
			'An academic project focused on real-time waste level monitoring using embedded sensors, GPS tracking, and a centralized web dashboard for visualization and monitoring. The system helps optimize waste collection routes, reduce operational costs, and improve urban cleanliness through data-driven decision making.',
		stack: [
			'ESP32',
			'NEO-6M GPS',
			'Ultrasonic Sensors',
			'Node.js',
			'MongoDB',
			'React',
			'Socket.io',
		],
		coverImage: '/images/products/smart-waste/cover.png',
		images: [
			'/images/products/smart-waste/hardware.jpg',
			'/images/products/smart-waste/dashboard.png',
			'/images/products/smart-waste/mobile-app.png',
			'/images/products/smart-waste/data-analytics.png',
		],
		acknowledgement:
			'Developed as a final-year academic project at Ghana Communication Technology University.',
		demoUrl: 'https://neatcycle.vercel.app',
		featured: true,
		role: 'Lead Developer & Hardware Engineer',
		timeline: '6 months (2024)',

		challenges: [
			'Integrating multiple hardware components reliably',
			'Ensuring real-time data transmission from remote locations',
			'Creating intuitive visualizations for complex sensor data',
			'Managing power consumption for battery-operated devices',
		],

		solutions: [
			'Used ESP32 with deep sleep mode for power efficiency',
			'Implemented WebSocket connections for real-time updates',
			'Developed interactive charts with Chart.js for data visualization',
			'Created modular hardware design for easy maintenance',
		],

		lessons: [
			'Importance of prototyping hardware before full implementation',
			'Value of real-time data processing in IoT applications',
			'Benefits of modular design for both hardware and software',
			'Need for robust error handling in distributed systems',
		],

		keyFeatures: [
			'Real-time waste level monitoring with ultrasonic sensors',
			'GPS tracking for bin locations and collection routes',
			'Predictive analytics for waste collection scheduling',
			'Mobile app for field workers',
			'Admin dashboard with comprehensive analytics',
			'Alert system for overflow bins',
		],

		technicalDetails: [
			{
				title: 'Hardware Architecture',
				description:
					'ESP32 microcontroller with GPS module and ultrasonic sensors. Data transmitted via Wi-Fi/GSM with power optimization features.',
			},
			{
				title: 'Software Stack',
				description:
					'Node.js backend with MongoDB for sensor data storage. React frontend with Socket.io for real-time updates. Mobile app built with React Native.',
			},
			{
				title: 'Data Processing',
				description:
					'Real-time data aggregation and analysis. Machine learning models for predictive collection scheduling. Automated report generation.',
			},
		],
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
			'A personal portfolio built to present projects, skills, and technical growth with a strong emphasis on backend engineering, system design, and long-term career direction. The site showcases professional experience while demonstrating modern web development practices and clean, accessible design.',
		stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
		coverImage: '/images/products/portfolio/cover.png',
		images: [
			'/images/products/portfolio/home.png',
			'/images/products/portfolio/projects.png',
			'/images/products/portfolio/blog.png',
			'/images/products/portfolio/contact.png',
		],
		demoUrl: 'https://cosbydeveloper.vercel.app',
		featured: false,
		role: 'Designer & Developer',
		timeline: '2 months (2024)',

		challenges: [
			'Creating a unique design that stands out while remaining professional',
			'Organizing diverse project types into cohesive categories',
			'Implementing smooth animations without performance issues',
			'Ensuring accessibility and SEO best practices',
		],

		solutions: [
			'Developed a custom design system with consistent typography and spacing',
			'Created project categorization based on type and technical stack',
			'Used Framer Motion for performant, hardware-accelerated animations',
			'Implemented semantic HTML and proper meta tags throughout',
		],

		lessons: [
			'Importance of consistent design systems for brand identity',
			'Value of performance optimization from the start',
			'Benefits of TypeScript for catching errors early',
			'Need for regular accessibility testing',
		],

		keyFeatures: [
			'Responsive design with mobile-first approach',
			'Project showcase with detailed case studies',
			'Technical skills visualization',
			'Blog integration with markdown support',
			'Contact form with spam protection',
			'Dark/light mode toggle',
			'Performance optimized (90+ Lighthouse scores)',
		],

		technicalDetails: [
			{
				title: 'Development Approach',
				description:
					'Built with Next.js 14 using the App Router for improved performance. TypeScript ensures type safety and better developer experience.',
			},
			{
				title: 'Design System',
				description:
					'Custom Tailwind CSS configuration with design tokens. Consistent spacing, typography, and color system across all pages.',
			},
			{
				title: 'Performance Optimization',
				description:
					'Image optimization, code splitting, and lazy loading. Static generation for pages where possible. Edge deployment for global performance.',
			},
		],
	},

	// {
	// 	slug: 'trading-system-research',
	// 	title: 'Algorithmic Trading System (Research Phase)',
	// 	category: {
	// 		key: 'personal',
	// 		label: 'Personal / Research',
	// 	},
	// 	summary:
	// 		'Research and prototyping toward an automated, data-driven trading system.',
	// 	description:
	// 		'An ongoing personal research project exploring market data, trading logic, and system design for building automated trading tools, with long-term plans to integrate machine learning for decision support. The project focuses on understanding financial markets while developing robust technical infrastructure for data processing and analysis.',
	// 	stack: [
	// 		'Python',
	// 		'Pandas',
	// 		'NumPy',
	// 		'FastAPI',
	// 		'PostgreSQL',
	// 		'Docker',
	// 		'AWS',
	// 	],
	// 	coverImage: '/images/products/trading-system/cover.png',
	// 	images: [
	// 		'/images/products/trading-system/analysis.png',
	// 		'/images/products/trading-system/data-pipeline.png',
	// 		'/images/products/trading-system/backtesting.png',
	// 		'/images/products/trading-system/dashboard.png',
	// 	],
	// 	demoUrl: 'https://tradingsystem.vercel.app',
	// 	featured: false,
	// 	role: 'Researcher & Developer',
	// 	timeline: 'Ongoing since 2023',

	// 	challenges: [
	// 		'Processing and analyzing large volumes of financial data',
	// 		'Developing reliable backtesting frameworks',
	// 		'Implementing risk management strategies',
	// 		'Ensuring system security and data integrity',
	// 	],

	// 	solutions: [
	// 		'Used Pandas and NumPy for efficient data manipulation',
	// 		'Created modular backtesting engine with customizable strategies',
	// 		'Implemented position sizing and stop-loss algorithms',
	// 		'Developed secure API architecture with rate limiting',
	// 	],

	// 	lessons: [
	// 		'Importance of data quality in quantitative analysis',
	// 		'Value of extensive backtesting before live deployment',
	// 		'Benefits of modular system design for strategy iteration',
	// 		'Need for comprehensive risk management from the start',
	// 	],

	// 	keyFeatures: [
	// 		'Real-time market data ingestion and processing',
	// 		'Technical indicator library with 50+ indicators',
	// 		'Backtesting engine with customizable parameters',
	// 		'Risk management module with position sizing',
	// 		'Performance analytics and reporting',
	// 		'API for strategy integration',
	// 	],

	// 	technicalDetails: [
	// 		{
	// 			title: 'Data Infrastructure',
	// 			description:
	// 				'Market data pipeline with cleaning, normalization, and storage. PostgreSQL with TimescaleDB for time-series data. Redis for caching frequently accessed data.',
	// 		},
	// 		{
	// 			title: 'Analysis Engine',
	// 			description:
	// 				'Python-based analysis with Pandas and NumPy. Technical indicators implemented from first principles. Statistical analysis for strategy validation.',
	// 		},
	// 		{
	// 			title: 'System Architecture',
	// 			description:
	// 				'Microservices architecture with FastAPI. Containerized deployment with Docker. Cloud infrastructure on AWS with auto-scaling.',
	// 		},
	// 	],
	// },
];
