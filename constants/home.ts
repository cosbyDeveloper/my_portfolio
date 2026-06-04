// constants/home.ts

export const homeContent = {
	hero: {
		name: 'Godfred Awusi',
		role: 'Software Engineer',
		greeting: "Hello, I'm",
		imageUrl: '/images/profile.jpg',
		tagline:
			'I build scalable systems, modern web applications, and intelligent, data-driven software solutions, with a growing focus on AI/ML-powered systems and real-world impact.',
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
			'I work primarily as a full-stack developer with a solid foundation in modern JavaScript and system design.',
		groups: [
			{
				title: 'Backend & APIs (Python)',
				status: 'Current',
				statusLabel: 'Now Transitioned To & Mastering',
				items: [
					'Python (Django)',
					'Django REST Framework',
					'PostgreSQL',
					'JWT Authentication',
				],
			},
			{
				title: 'Backend & APIs (JavaScript)',
				status: 'Legacy',
				statusLabel: 'Prior / On-Demand',
				items: ['Node.js', 'Express.js', 'MongoDB (Atlas)', 'Mongoose'],
			},
			{
				title: 'Frontend',
				items: [
					'React (Router V7 & Tanstack)',
					'Next.js (App Router & Server Actions)',
					'Tailwind CSS',
					'Bootstrap / React Bootstrap',
					'Responsive UI Design',
				],
			},

			{
				title: 'Tools & Infrastructure',
				items: [
					'Git & GitHub',
					'Vercel',
					'Railway / Render',
					'Cloud Deployment',
					'Linux',
					'Docker (Foundational)',
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
	certifications: {
		title: 'Certifications & Credentials',
		intro:
			'Verified expertise across the AI/ML engineering stack — from foundational deep learning to production cloud deployment.',
		items: [],
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

	research: {
		title: 'Research',
		intro:
			'My research sits at the intersection of machine learning systems and real-world deployment — focused on making intelligent systems reliable, scalable, and impactful beyond the lab.',
		publications: [],
		areas: [],
		cta: {
			label: 'View all research',
			href: '/research',
		},
	},

	communityPresence: {
		title: 'Community & Open Source',
		intro:
			'Knowledge is not kept — it is shared. Active across the AI/ML community through writing, open source, and public work.',
		items: [],
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

// // ─────────────────────────────────────────────────────────────────────────────
// // FUTURE SELF VERSION — September 2028
// // This reflects the completed state of my Academic Mastery Plan (2026–2028).
// // I use this as a north star — to see where I'm going,
// // and to feel the weight of what I'm building toward.
// // ─────────────────────────────────────────────────────────────────────────────

// export const homeContent = {
// 	hero: {
// 		name: 'Godfred Awusi',
// 		role: 'Applied AI/ML Engineer & Researcher',
// 		greeting: "Hello, I'm",
// 		imageUrl: '/images/profile.jpg',
// 		tagline:
// 			'I design, build, and deploy intelligent systems that work at scale. My work sits at the intersection of applied AI/ML research, full-stack engineering, and real-world impact — from production-grade ML pipelines to language models deployed in the wild.',
// 		ctaPrimary: {
// 			label: 'View Resume',
// 			href: '/resume',
// 		},
// 		ctaSecondary: {
// 			label: 'Read My Research',
// 			href: '/research',
// 		},
// 	},

// 	skills: {
// 		intro:
// 			'I operate across the full spectrum — from mathematical foundations and ML research to production deployment and distributed systems. My specialization is applied AI/ML: building intelligent systems that are not just accurate, but engineered to be reliable, scalable, and maintainable in the real world.',

// 		groups: [
// 			{
// 				title: 'AI / Machine Learning',
// 				status: 'Core',
// 				statusLabel: 'Primary Specialization',
// 				items: [
// 					'Deep Learning (CNNs, RNNs, Transformers)',
// 					'Natural Language Processing (BERT, GPT, RAG)',
// 					'Computer Vision (Detection, Segmentation)',
// 					'Reinforcement Learning (MDPs, Policy Gradients)',
// 					'Generative AI & LLMs (Fine-tuning, LoRA/QLoRA)',
// 					'Classical ML (Ensemble Methods, SVMs, Clustering)',
// 					'Probabilistic ML & Bayesian Methods',
// 					'TensorFlow & PyTorch',
// 				],
// 			},
// 			{
// 				title: 'ML Engineering & MLOps',
// 				status: 'Core',
// 				statusLabel: 'Applied Specialization',
// 				items: [
// 					'ML System Design (Feature Stores, Model Registries)',
// 					'MLOps (Experiment Tracking, Drift Detection, Monitoring)',
// 					'Model Optimization (Quantization, Pruning, ONNX)',
// 					'Distributed Training (Data & Model Parallelism, Ray)',
// 					'FastAPI (Model Serving & Production APIs)',
// 					'Weights & Biases · MLflow',
// 					'GCP Vertex AI · AWS SageMaker',
// 					'Docker · CI/CD · GitHub Actions',
// 				],
// 			},
// 			{
// 				title: 'Backend & APIs',
// 				status: 'Current',
// 				statusLabel: 'Strong Foundation',
// 				items: [
// 					'Python (Advanced — Async, Type Hints, Packaging)',
// 					'Django & Django REST Framework',
// 					'FastAPI',
// 					'PostgreSQL · MongoDB',
// 					'Distributed Systems Design',
// 					'Node.js · Express.js',
// 				],
// 			},
// 			{
// 				title: 'Frontend & Full-Stack',
// 				status: 'Current',
// 				statusLabel: 'Production Capable',
// 				items: [
// 					'React (Router V7 & TanStack)',
// 					'Next.js (App Router & Server Actions)',
// 					'TypeScript',
// 					'Tailwind CSS · Bootstrap',
// 					'Responsive & Accessible UI Design',
// 				],
// 			},
// 			{
// 				title: 'Research & Mathematical Foundations',
// 				status: 'Academic',
// 				statusLabel: 'Research Depth',
// 				items: [
// 					'Linear Algebra · Multivariate Calculus',
// 					'Probability & Statistics',
// 					'Convex Optimization',
// 					'Information Theory',
// 					'Algorithm Design & Analysis (CLRS level)',
// 					'Academic Paper Writing (IEEE / ACM)',
// 					'Research Methodology & Experimental Design',
// 				],
// 			},
// 			{
// 				title: 'Infrastructure & Tools',
// 				items: [
// 					'Git & GitHub',
// 					'Docker & Containerization',
// 					'Vercel · Railway · Render',
// 					'GCP · AWS (Cloud AI Platforms)',
// 					'Ray (Distributed ML)',
// 					'Linux',
// 				],
// 			},
// 		],

// 		skillsCloud: [
// 			'Python',
// 			'TensorFlow',
// 			'PyTorch',
// 			'Transformers',
// 			'LLMs',
// 			'MLOps',
// 			'FastAPI',
// 			'React',
// 			'Next.js',
// 			'TypeScript',
// 			'Django',
// 			'PostgreSQL',
// 			'Docker',
// 			'GCP',
// 			'AWS',
// 			'Ray',
// 		],

// 		cta: {
// 			label: 'Learn more about me',
// 			href: '/about',
// 		},
// 	},

// 	certifications: {
// 		title: 'Certifications & Credentials',
// 		intro:
// 			'Verified expertise across the AI/ML engineering stack — from foundational deep learning to production cloud deployment.',
// 		items: [
// 			{
// 				title: 'MPhil Computer Science',
// 				issuer: 'Ghana Communication Technology University (GCTU)',
// 				year: '2028',
// 				focus: 'Thesis: Applied AI/ML on Real-World Intelligent Systems at Scale',
// 				highlight: true,
// 			},
// 			{
// 				title: 'Google Professional Machine Learning Engineer',
// 				issuer: 'Google Cloud',
// 				year: '2028',
// 				focus: 'Production ML on GCP — training pipelines, deployment, monitoring',
// 				highlight: true,
// 			},
// 			{
// 				title: 'AWS Certified Machine Learning — Specialty',
// 				issuer: 'Amazon Web Services',
// 				year: '2028',
// 				focus: 'ML on AWS — SageMaker, Kinesis, model deployment at scale',
// 				highlight: true,
// 			},
// 			{
// 				title: 'TensorFlow Developer Certificate',
// 				issuer: 'Google',
// 				year: '2027',
// 				focus: 'Hands-on deep learning competence — CNNs, NLP, time series',
// 				highlight: false,
// 			},
// 			{
// 				title: 'Deep Learning Specialization',
// 				issuer: 'DeepLearning.AI (Coursera)',
// 				year: '2027',
// 				focus: '5-course program — Neural networks, optimization, CNNs, sequence models',
// 				highlight: false,
// 			},
// 			{
// 				title: 'Machine Learning Engineering for Production (MLOps)',
// 				issuer: 'DeepLearning.AI (Coursera)',
// 				year: '2027',
// 				focus: 'Productionizing ML systems — pipelines, serving, monitoring',
// 				highlight: false,
// 			},
// 			{
// 				title: 'BSc Computer Science — First Class Honours',
// 				issuer: 'Ghana Communication Technology University (GCTU)',
// 				year: '2025',
// 				focus: 'Algorithms, data structures, software engineering, AI foundations',
// 				highlight: false,
// 			},
// 		],
// 	},

// 	experienceEducation: {
// 		title: 'Experience & Education',
// 		intro:
// 			'A track record built across research, academia, software engineering, and applied AI — from founding a technology company to publishing research and deploying intelligent systems in production.',

// 		experience: [
// 			{
// 				role: 'Applied AI/ML Researcher',
// 				company: 'MPhil Research — GCTU',
// 				period: '2026 – 2028',
// 				highlights: [
// 					'Conducted original research on applied AI/ML for real-world intelligent systems at scale.',
// 					'Designed and implemented a production-grade ML system as the core of the thesis contribution.',
// 					'Published research findings at an international AI/ML venue.',
// 					'Engaged with the global research community through conferences and paper reviews.',
// 				],
// 			},
// 			{
// 				role: 'Teaching Assistant — Computer Science',
// 				company: 'Ghana Communication Technology University (GCTU)',
// 				period: '2026 – 2028',
// 				highlights: [
// 					'Supported faculty in delivering CS coursework across algorithms, data structures, and programming.',
// 					'Mentored undergraduate students on projects spanning web development, AI/ML, and systems.',
// 					'Contributed to curriculum development aligned with emerging AI/ML industry needs.',
// 				],
// 			},
// 			{
// 				role: 'Software Engineer (Remote)',
// 				company: 'Remote Position',
// 				period: '2026 – 2028',
// 				highlights: [
// 					'Contributed to backend and frontend development on a 20h/week remote engagement.',
// 					'Delivered reliable, well-tested software features across the full stack.',
// 					'Maintained production systems and improved deployment processes using modern DevOps practices.',
// 				],
// 			},
// 			{
// 				role: 'Founder & Lead Engineer',
// 				company: 'Cosby Technologies',
// 				period: '2021 – Present',
// 				highlights: [
// 					'Founded and led Cosby Technologies — delivering web and AI-powered solutions for clients.',
// 					'Architected and built full-stack systems using React, Next.js, Django, FastAPI, and Python.',
// 					'Expanded the company\'s offering into AI-augmented products as ML expertise grew.',
// 					'Managed product strategy, client relationships, system architecture, and deployment end-to-end.',
// 				],
// 			},
// 		],

// 		education: [
// 			{
// 				degree: 'MPhil Computer Science',
// 				institution: 'Ghana Communication Technology University (GCTU)',
// 				period: '2026 – 2028',
// 				details: [
// 					'Specialization: Applied AI/ML — Intelligent Systems at Scale.',
// 					'Thesis contributed original findings in [domain] with real-world deployment validation.',
// 					'Coursework: Advanced algorithms, distributed systems, machine learning theory, research methods.',
// 					'Teaching Assistant alongside research throughout the programme.',
// 				],
// 			},
// 			{
// 				degree: 'BSc Computer Science — First Class Honours',
// 				institution: 'Ghana Communication Technology University (GCTU)',
// 				period: '2022 – 2025',
// 				details: [
// 					'Strong foundation in algorithms, data structures, databases, OS, and software engineering.',
// 					'Completed academic and practical projects across web development, systems, and AI/ML.',
// 					'Graduated with First Class — top of programme cohort.',
// 				],
// 			},
// 		],

// 		cta: {
// 			label: 'View full resume',
// 			href: '/resume',
// 		},
// 	},

// 	research: {
// 		title: 'Research',
// 		intro:
// 			'My research sits at the intersection of machine learning systems and real-world deployment — focused on making intelligent systems reliable, scalable, and impactful beyond the lab.',
// 		publications: [
// 			{
// 				title: '[Thesis Publication Title — to be determined]',
// 				venue: 'International AI/ML Conference or Journal',
// 				year: '2028',
// 				abstract:
// 					'Original contribution from MPhil thesis — investigating [specific problem] in applied AI/ML at scale. Results demonstrated [key finding] with evaluation on real-world datasets.',
// 				type: 'Conference / Journal Paper',
// 				href: 'https://scholar.google.com/',
// 			},
// 		],
// 		areas: [
// 			'Applied Machine Learning Systems',
// 			'Intelligent Systems at Scale',
// 			'ML Engineering & Production AI',
// 			'Natural Language Processing',
// 			'Real-World AI Deployment & Reliability',
// 		],
// 		cta: {
// 			label: 'View all research',
// 			href: '/research',
// 		},
// 	},

// 	communityPresence: {
// 		title: 'Community & Open Source',
// 		intro:
// 			'Knowledge is not kept — it is shared. Active across the AI/ML community through writing, open source, and public work.',
// 		items: [
// 			{
// 				platform: 'Kaggle',
// 				handle: 'godfredawusi',
// 				status: 'Expert',
// 				description:
// 					'Kaggle Expert rank — competitive ML across tabular, NLP, and computer vision challenges.',
// 				href: 'https://www.kaggle.com/godfredawusi',
// 			},
// 			{
// 				platform: 'Hugging Face',
// 				handle: 'godfredawusi',
// 				description:
// 					'Published models and datasets. Fine-tuned language models for African language NLP and domain-specific tasks.',
// 				href: 'https://huggingface.co/godfredawusi',
// 			},
// 			{
// 				platform: 'GitHub',
// 				handle: 'cosbyDeveloper',
// 				description:
// 					'8+ high-quality AI/ML and full-stack repositories — documented, tested, and production-ready.',
// 				href: 'https://github.com/cosbyDeveloper',
// 			},
// 			{
// 				platform: 'Technical Blog',
// 				description:
// 					'10+ in-depth posts on AI/ML engineering — from training transformers from scratch to designing ML systems for production.',
// 				href: '/blog',
// 			},
// 		],
// 	},

// 	featuredProjects: {
// 		title: 'Featured Projects',
// 		limit: 3,
// 		cta: {
// 			label: 'View All Projects',
// 			href: '/portfolio',
// 		},
// 		// Suggested featured project order for this future state:
// 		// 1. MPhil thesis project (intelligent system at scale — your best work)
// 		// 2. A deployed NLP or LLM project (RAG system, fine-tuned model with demo)
// 		// 3. A computer vision or production ML API project
// 		// Full portfolio includes: Cosby Tech, tarpaulin site, restaurant site,
// 		//   production ML deployments, Kaggle notebooks, open source contributions
// 	},

// 	featuredBlogs: {
// 		title: 'Featured Writing',
// 		limit: 3,
// 		cta: {
// 			label: 'View All Posts',
// 			href: '/blog',
// 		},
// 		// Suggested post topics for this future state:
// 		// 1. How I built and deployed [thesis project] — architecture deep dive
// 		// 2. Fine-tuning LLMs on limited hardware: what actually works
// 		// 3. Building production ML systems: what the courses don't teach you
// 	},

// 	contact: {
// 		title: 'Get In Touch',
// 		intro:
// 			'Whether it\'s a research collaboration, a consulting engagement, a speaking opportunity, or simply a conversation about AI/ML and intelligent systems — I\'m open to it.',
// 		email: 'cosby.developer@gmail.com',
// 		phone: '+233 24 123 4567',
// 		location: 'Accra, Ghana',
// 		socials: [
// 			{
// 				label: 'LinkedIn',
// 				href: 'https://www.linkedin.com/in/godfred-awusi-dev/',
// 				icon: 'FaLinkedin',
// 			},
// 			{
// 				label: 'GitHub',
// 				href: 'https://github.com/cosbyDeveloper',
// 				icon: 'FaGithub',
// 			},
// 			{
// 				label: 'Twitter / X',
// 				href: 'https://twitter.com/cosby_Tech',
// 				icon: 'FaXTwitter',
// 			},
// 			{
// 				label: 'Hugging Face',
// 				href: 'https://huggingface.co/godfredawusi',
// 				icon: 'SiHuggingface',
// 			},
// 			{
// 				label: 'Kaggle',
// 				href: 'https://www.kaggle.com/godfredawusi',
// 				icon: 'SiKaggle',
// 			},
// 			{
// 				label: 'Google Scholar',
// 				href: 'https://scholar.google.com/',
// 				icon: 'SiGooglescholar',
// 			},
// 		],
// 	},
// };

// // ─────────────────────────────────────────────────────────────────────────────
// // NOTES FOR WHEN WHEN I'M READY
// // ─────────────────────────────────────────────────────────────────────────────
// //
// // Before making this live, update the following:
// //
// //  1. hero.role — finalise the exact title at that point in time.
// //     Options: 'Applied AI/ML Engineer', 'ML Engineer & Researcher',
// //     'AI/ML Systems Engineer', 'Research Engineer'
// //
// //  2. hero.tagline — refine to reflect the specific thesis topic
// //     and the exact type of systems I've built.
// //
// //  3. certifications — fill in actual issue dates once earned.
// //
// //  4. research.publications[0].title — fill in actual thesis title
// //     and venue once published.
// //
// //  5. research.publications[0].abstract — write the real abstract.
// //
// //  6. experienceEducation.experience[0] (MPhil Research) — fill in
// //     the actual thesis domain and specific findings.
// //
// //  7. experienceEducation.experience[1] (Remote job) — replace with
// //     actual company name and real highlights.
// //
// //  8. communityPresence — update Kaggle rank, HuggingFace models,
// //     and blog post count to actual numbers.
// //
// //  9. Add a /research page to the site that lists publications,
// //     thesis abstract, research areas, and conference attendance.
// //
// // 10. Add a /certifications page or section that displays
// //     badge images for each certification with verify links.
// //
// // 11. Replace the skillsCloud array with your actual current tools
// //     at deployment time — priorities will likely have shifted.
// //
// // 12. Consider adding a 'speaking' section if you've presented
// //     at conferences or local AI/ML meetups by this point.
// //
// // ─────────────────────────────────────────────────────────────────────────────
