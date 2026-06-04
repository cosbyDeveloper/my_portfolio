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

// // ─────────────────────────────────────────────────────────────────────────────
// // FUTURE SELF VERSION — September 2028
// // Reflects the completed state of the Academic Mastery Plan (2026–2028).
// // I use this as a north star — to see where I'm going,
// // and to feel the weight of what I'm building toward.
// // ─────────────────────────────────────────────────────────────────────────────
// import {
// 	FaCode,
// 	FaGraduationCap,
// 	FaLightbulb,
// 	FaBrain,
// 	FaUserTie,
// 	FaChartLine,
// 	FaRocket,
// 	FaBook,
// 	FaCogs,
// 	FaHandshake,
// 	FaFlask,
// 	FaNetworkWired,
// 	FaAward,
// 	FaGlobe,
// } from 'react-icons/fa';
// import { FaPersonChalkboard } from 'react-icons/fa6';
// import { SiHuggingface, SiKaggle } from 'react-icons/si';
// import { MdScience, MdOutlineAutoGraph } from 'react-icons/md';

// export const aboutData = {
// 	hero: {
// 		title: 'About Me',
// 		subtitle:
// 			'Applied AI/ML Engineer, Researcher, and Founder. I build intelligent systems that work at scale — and I publish the research behind them.',
// 		description: [
// 			"I'm Godfred Awusi — founder of Cosby Technologies, MPhil graduate in Computer Science, and applied AI/ML engineer specializing in intelligent systems that operate reliably in production. My work sits at the intersection of machine learning research, full-stack engineering, and real-world deployment.",
// 			'What started as a curiosity about how systems behave beneath the surface evolved into a two-year research programme, three cloud certifications, and a body of work spanning production ML pipelines, fine-tuned language models, and intelligent applications built for real users at scale.',
// 			"I don't just train models — I engineer the systems around them: the pipelines that feed them, the infrastructure that serves them, the monitoring that keeps them honest, and the interfaces that make them useful.",
// 		],
// 		atAGlance: {
// 			icon: FaUserTie,
// 			title: 'At a Glance',
// 			items: [
// 				{ icon: FaBrain, text: 'Applied AI/ML Engineer & Researcher' },
// 				{ icon: FaRocket, text: 'Founder, Cosby Technologies' },
// 				{ icon: FaGraduationCap, text: 'MPhil Computer Science — GCTU' },
// 				{ icon: FaGraduationCap, text: 'First Class BSc Computer Science' },
// 				{ icon: FaAward, text: 'Google Professional ML Engineer' },
// 				{ icon: FaAward, text: 'AWS Certified ML Specialty' },
// 				{ icon: FaAward, text: 'TensorFlow Developer Certificate' },
// 				{ icon: SiKaggle, text: 'Kaggle Expert' },
// 			],
// 		},
// 	},

// 	currentFocus: {
// 		title: 'What I Work On',
// 		subtitle:
// 			'My work spans the full lifecycle of intelligent systems — from research and training to deployment and monitoring in production.',
// 		items: [
// 			{
// 				icon: FaBrain,
// 				title: 'Applied AI/ML Research',
// 				description:
// 					'Designing and evaluating intelligent systems for real-world problems — with a focus on reliability, fairness, and production readiness, not just benchmark performance.',
// 				color: 'text-purple-500',
// 				bg: 'bg-purple-500/10',
// 			},
// 			{
// 				icon: MdOutlineAutoGraph,
// 				title: 'ML Engineering & MLOps',
// 				description:
// 					'Building the infrastructure that makes ML systems reliable at scale — training pipelines, model registries, drift monitoring, distributed serving, and continuous retraining.',
// 				color: 'text-teal-500',
// 				bg: 'bg-teal-500/10',
// 			},
// 			{
// 				icon: FaNetworkWired,
// 				title: 'Intelligent Systems at Scale',
// 				description:
// 					'Architecting end-to-end systems where intelligence is a first-class concern — from feature engineering and model design to API serving and observability.',
// 				color: 'text-blue-500',
// 				bg: 'bg-blue-500/10',
// 			},
// 			{
// 				icon: FaCode,
// 				title: 'Full-Stack Engineering',
// 				description:
// 					'Building the product layer around AI — React/Next.js frontends, FastAPI/Django backends, and the integrations that make intelligent features feel seamless to users.',
// 				color: 'text-green-500',
// 				bg: 'bg-green-500/10',
// 			},
// 			{
// 				icon: MdScience,
// 				title: 'Research & Publication',
// 				description:
// 					'Contributing to the academic AI/ML community through peer-reviewed research, conference participation, and public writing on ML engineering and applied AI.',
// 				color: 'text-orange-500',
// 				bg: 'bg-orange-500/10',
// 			},
// 			{
// 				icon: FaGlobe,
// 				title: 'Open Source & Community',
// 				description:
// 					'Publishing models on Hugging Face, contributing to the PyTorch and FastAPI ecosystems, and writing technical content that helps others build better ML systems.',
// 				color: 'text-rose-500',
// 				bg: 'bg-rose-500/10',
// 			},
// 		],
// 	},

// 	education: {
// 		title: 'Education & Credentials',
// 		items: [
// 			{
// 				degree: 'MPhil Computer Science',
// 				honors: 'Completed 2028',
// 				institution: 'Ghana Communication Technology University (GCTU)',
// 				description:
// 					'Graduate research specializing in applied AI/ML — focused on how intelligent systems can be engineered to work reliably in the real world at scale. Thesis contributed original findings in [domain]. TA role throughout the programme.',
// 			},
// 			{
// 				degree: 'BSc Computer Science',
// 				honors: 'First Class Honours',
// 				institution: 'Ghana Communication Technology University (GCTU)',
// 				description:
// 					'Rigorous foundation in algorithms, data structures, software engineering, databases, and systems design. Graduated top of cohort.',
// 			},
// 			{
// 				degree: 'Google Professional Machine Learning Engineer',
// 				honors: 'Certification — 2028',
// 				institution: 'Google Cloud',
// 				description:
// 					'Production ML on GCP — training pipeline design, Vertex AI, model deployment, monitoring, and scalable infrastructure for intelligent systems.',
// 			},
// 			{
// 				degree: 'AWS Certified Machine Learning — Specialty',
// 				honors: 'Certification — 2028',
// 				institution: 'Amazon Web Services',
// 				description:
// 					'ML on AWS — SageMaker, Kinesis, Glue, model deployment at scale. Multi-cloud intelligent system architecture.',
// 			},
// 			{
// 				degree: 'TensorFlow Developer Certificate',
// 				honors: 'Certification — 2027',
// 				institution: 'Google',
// 				description:
// 					'Hands-on deep learning competence — CNNs, NLP, time series, and image classification using TensorFlow and Keras.',
// 			},
// 			{
// 				degree: 'Deep Learning Specialization',
// 				honors: 'Certification — 2027',
// 				institution: 'DeepLearning.AI (Coursera)',
// 				description:
// 					'5-course program taught by Andrew Ng — neural network foundations, optimization, CNNs, sequence models, and transformer architectures.',
// 			},
// 		],
// 	},

// 	expertise: {
// 		title: 'Core Expertise',
// 		technicalStack: {
// 			icon: FaCogs,
// 			title: 'Technical Stack',
// 			skills: [
// 				'Python',
// 				'TensorFlow',
// 				'PyTorch',
// 				'Transformers',
// 				'FastAPI',
// 				'Django',
// 				'React',
// 				'Next.js',
// 				'TypeScript',
// 				'PostgreSQL',
// 				'MongoDB',
// 				'Docker',
// 				'GCP Vertex AI',
// 				'AWS SageMaker',
// 				'Ray',
// 				'MLflow',
// 				'Weights & Biases',
// 			],
// 		},
// 		workingStyle: {
// 			icon: FaPersonChalkboard,
// 			title: 'Working Style',
// 			items: [
// 				'Research-backed engineering — I understand why the models work, not just how to use them',
// 				'Systems thinking — every model is part of a larger system that must be designed, monitored, and maintained',
// 				'Product-oriented — I build AI features that users can actually use, not just impressive demos',
// 				'Collaborative and transparent, with a mentorship instinct developed through two years of TA work',
// 				'Long-term ownership: I care about what happens after deployment',
// 			],
// 		},
// 		researchAreas: {
// 			icon: FaBook,
// 			title: 'Research Areas',
// 			items: [
// 				'Applied Machine Learning Systems',
// 				'Intelligent Systems at Scale',
// 				'MLOps & Production AI Reliability',
// 				'Natural Language Processing',
// 				'Real-World AI Deployment',
// 			],
// 		},
// 		community: {
// 			icon: SiHuggingface,
// 			title: 'Community & Open Source',
// 			items: [
// 				{
// 					label: 'Kaggle',
// 					detail: 'Expert rank — tabular, NLP, and vision challenges',
// 				},
// 				{
// 					label: 'Hugging Face',
// 					detail: 'Published models and fine-tuned transformers',
// 				},
// 				{
// 					label: 'GitHub',
// 					detail: '8+ AI/ML and full-stack repositories, documented and tested',
// 				},
// 				{
// 					label: 'Technical Blog',
// 					detail: '10+ in-depth posts on ML engineering and AI systems',
// 				},
// 				{
// 					label: 'Open Source',
// 					detail: 'Contributor to PyTorch, HuggingFace, and FastAPI ecosystems',
// 				},
// 			],
// 		},
// 	},

// 	philosophy: {
// 		title: 'Philosophy & Approach',
// 		items: [
// 			{
// 				icon: FaLightbulb,
// 				title: 'Build with Intention',
// 				description:
// 					'Clarity over cleverness. Structure over shortcuts. A model that cannot be monitored, updated, or explained is not a production system — it is a liability. Every system I build is designed to be understood, maintained, and improved.',
// 			},
// 			{
// 				icon: FaBrain,
// 				title: 'Intelligence Belongs in the Real World',
// 				description:
// 					'The most important question about an AI system is not its benchmark score — it is whether it works for real users, with real data, under real-world conditions. That is the problem I am most interested in solving.',
// 			},
// 			{
// 				icon: FaHandshake,
// 				title: 'Impact-Driven Work',
// 				description:
// 					'Technology is not an end in itself. Every system I build — whether a web platform, an ML pipeline, or a research prototype — is measured by the real value it creates for the people it serves.',
// 			},
// 			{
// 				icon: FaFlask,
// 				title: 'Research Informs Practice',
// 				description:
// 					'Two years of graduate research changed how I build. Reading papers, understanding failure modes, and engaging with the academic community made me a better engineer. Theory and practice reinforce each other — I refuse to separate them.',
// 			},
// 		],
// 	},

// 	research: {
// 		title: 'Research',
// 		intro:
// 			'Graduate research in applied AI/ML — focused on building intelligent systems that are not just accurate, but engineered to be reliable at scale.',
// 		publications: [
// 			{
// 				title: '[Thesis Publication — to be updated with actual title]',
// 				venue: 'International AI/ML Conference or Journal',
// 				year: '2028',
// 				type: 'Conference / Journal Paper',
// 				abstract:
// 					'Original contribution from MPhil research investigating [specific problem domain] in the context of real-world intelligent systems. Evaluation demonstrates [key findings] on [datasets/benchmarks].',
// 			},
// 		],
// 		areas: [
// 			'Applied Machine Learning Systems',
// 			'Intelligent Systems at Scale',
// 			'ML Engineering & Production AI',
// 			'Natural Language Processing',
// 			'AI Reliability & Real-World Deployment',
// 		],
// 		cta: {
// 			label: 'View full research profile',
// 			href: '/research',
// 		},
// 	},

// 	cta: {
// 		title: "Let's Build Something That Matters",
// 		description:
// 			"Whether it's a research collaboration, an ML engineering challenge, a product that needs intelligence baked in, or a conversation about where AI is actually going — I'm interested.",
// 		buttons: [
// 			{ text: 'View My Work', href: '/portfolio', variant: 'outline' },
// 			{ text: 'Read My Research', href: '/research', variant: 'outline' },
// 			{ text: 'Get in Touch', href: '/contact', variant: 'primary' },
// 		],
// 	},
// };

// // ─────────────────────────────────────────────────────────────────────────────
// // STRUCTURAL CHANGES vs CURRENT about.ts — what I need to build/update
// // ─────────────────────────────────────────────────────────────────────────────
// //
// //  1. hero.atAGlance — now has 8 items instead of 4.
// //     Your current UI likely maps over this array, so it should handle more
// //     items fine. If it's a fixed grid, adjust the layout.
// //
// //  2. hero.description — expanded from 2 to 3 paragraphs.
// //     The third paragraph is the key differentiator: "I don't just train models..."
// //     Make sure your About hero component renders all items in the array.
// //
// //  3. currentFocus — expanded from 4 items to 6.
// //     Two new items: Research & Publication, Open Source & Community.
// //     If your grid is fixed at 2x2, you'll need to make it 2x3 or 3x2.
// //
// //  4. education — expanded from 2 to 6 items (includes certifications inline).
// //     Alternative: keep education and certifications as separate sections
// //     (matching the home.future.ts structure) — your call on the design.
// //
// //  5. expertise — two new subsections added:
// //     - researchAreas: list of research focus areas
// //     - community: Kaggle, HuggingFace, GitHub, blog, open source
// //     Your current expertise section only has technicalStack and workingStyle.
// //     You'll need to add UI components for these two new blocks.
// //
// //  6. philosophy — expanded from 2 to 4 items.
// //     Two new entries: 'Intelligence Belongs in the Real World' and
// //     'Research Informs Practice'. These are the most important ones for
// //     positioning — they show you think at a level above most engineers.
// //
// //  7. research — new top-level section (does not exist in current about.ts).
// //     Will need a new component and likely a dedicated /research page.
// //
// //  8. cta.buttons — expanded from 2 to 3 buttons.
// //     Added 'Read My Research' as a middle option. Check your CTA component
// //     handles variable button counts.
// //
// //  9. New icons imported: FaFlask, FaNetworkWired, FaAward, FaGlobe,
// //     SiHuggingface, SiKaggle, MdScience, MdOutlineAutoGraph.
// //     Make sure react-icons and the si/md packages are installed.
// //     npm install react-icons  (covers all of these)
// //
// // 10. Fill in the [bracketed placeholders] with actual data once earned:
// //     - research.publications[0].title
// //     - research.publications[0].abstract
// //     - education[0].description (thesis domain and findings)
// //
// // ─────────────────────────────────────────────────────────────────────────────
