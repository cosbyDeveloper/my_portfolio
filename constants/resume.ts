// app/constants/resume.ts

export const resumeData = {
	personalInfo: {
		name: 'Godfred Awusi',
		title:
			'Software Engineer • Full-Stack Developer • Founder, Cosby Technologies',
		location: 'Accra, Ghana',
		phone: '+233 544 588 204',
		email: 'awusigodfred225@gmail.com',
		resumePdf: '/Godfred Awusi_Resume.pdf',
		resumeFileName: 'Godfred Awusi_Resume.pdf',
	},

	links: {
		linkedin: 'https://www.linkedin.com/in/godfred-awusi-dev/',
		portfolio: '/portfolio',
		contact: '/contact',
	},

	summary: {
		title: 'Professional Summary',
		content: [
			'High-performing Computer Science first-class graduate and software engineer with a strong full-stack experience in the MERN stack, experienced in building scalable, production-ready web systems. Currently transitioning toward a Python-focused backend, actively developing proficiency in Django for data-driven and AI-oriented applications. Founder of a personal software startup with hands-on experience integrating modern frontend technologies such as React and Next.js with well-structured backend architectures. Deeply motivated by problem-solving, applied machine learning, and long-term product thinking, and recognized for disciplined execution, continuous self-improvement, and the ability to translate ideas into reliable, real-world digital solutions.',
		],
	},

	skills: {
		title: 'Skills & Expertise',
		technical: {
			title: 'Technical Skills',
			items: [
				'Node.js, Express, RESTful API Design',
				'Python, Django, Django REST Framework',
				'React, Next.js, JavaScript (ES6+)',
				'PostgreSQL, MongoDB, Database Design',
				'Authentication & Authorization',
				'Algorithms, Data Structures, OOP',
				'Foundational Machine Learning & Applied AI',
				'Git, GitHub, Deployment & Environment Management',
			],
		},
		professional: {
			title: 'Professional Strengths',
			items: [
				'Analytical and systems-level problem solving',
				'Technical communication & documentation',
				'Independent learning & research discipline',
				'Leadership and ownership in execution',
				'Product thinking & user-centered awareness',
				'Time management under academic & production constraints',
			],
		},
	},

	experience: {
		title: 'Professional Experience',
		items: [
			{
				title: 'Founder & Software Engineer — Cosby Technologies',
				period: 'January 2021 – Present',
				location: 'Accra, Ghana',
				responsibilities: [
					'Founded and scaled a personal software startup focused on web solutions, digital products, and long-term platform development.',
					'Designed and built full-stack applications using Python-focused backends (Django) and modern React / Next.js frontend.',
					'Architected RESTful APIs, authentication systems, and database schemas optimized for scalability and maintainability.',
					'Delivered client-facing solutions while managing requirements, timelines, and technical execution.',
				],
			},
			{
				title: 'Digital Marketing Manager — Abew Special Enterprise',
				period: 'January 2020 – Present',
				location: 'Tema, Ghana',
				responsibilities: [
					'Managed and optimized digital presence across major platforms.',
					'Developed content strategies that improved customer engagement and brand visibility.',
					'Analyzed audience behavior to guide data-driven campaign adjustments.',
				],
			},
		],
	},

	education: {
		title: 'Education',
		items: [
			{
				degree:
					'BSc. Computer Science — Ghana Communication Technology University',
				graduationYear: '2025',
				honors: 'First Class Honours',
				cgpa: 'CGPA: 3.61',
			},
		],
	},

	certifications: {
		title: 'Certifications & Continuous Learning',
		items: [
			'Python & Django for Web Development (Self-Directed)',
			'MERN Stack From Scratch — Traversy Media',
			'Modern JavaScript From The Beginning — Udemy',
			'Modern HTML & CSS (Including Sass) — Udemy',
			'The Complete Cryptocurrency Course — Udemy',
			'Graphic Design Masterclass — Udemy',
		],
	},

	projects: {
		title: 'Key Project',
		items: [
			{
				title: 'IoT-Based Smart Waste Management System',
				description:
					'Designed and implemented an IoT-driven smart waste management system using sensor-enabled bins, real-time monitoring, and a centralized web dashboard. The system supports optimized waste collection planning and demonstrates practical application of embedded systems, backend engineering, and data-driven decision-making.',
			},
		],
	},

	footer: {
		note: 'References available upon request',
		updated: new Date().toLocaleDateString('en-US', {
			month: 'long',
			year: 'numeric',
		}),
	},
};

// export const icons = {
//   briefcase: FaBriefcase,
//   graduationCap: FaGraduationCap,
//   certificate: FaCertificate,
//   lightbulb: FaLightbulb,
//   code: FaCode,
//   userTie: FaUserTie,
//   phone: FaPhone,
//   envelope: FaEnvelope,
//   mapMarker: FaMapMarkerAlt,
//   tools: FaTools,
//   projectDiagram: FaProjectDiagram,
//   calendar: FaCalendarAlt,
//   download: FaDownload,
//   filePdf: FaFilePdf,
//   linkedin: FaLinkedin,
//   globe: FaGlobe
// };
