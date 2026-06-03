// constants/research.ts
import {
	FaMicroscope,
	FaBrain,
	FaChartLine,
	FaLanguage,
	FaEye,
	FaRobot,
	FaNetworkWired,
	FaCloudUploadAlt,
	FaDatabase,
	FaChartBar,
	FaFileAlt,
	FaGithub,
	FaExternalLinkAlt,
} from 'react-icons/fa';

export const researchData = {
	hero: {
		title: 'Research & Publications',
		subtitle:
			'Advancing the frontiers of Applied AI/ML — from theory to production-scale intelligent systems',
		description: [
			'My research sits at the intersection of machine learning systems and real-world deployment. I focus on making intelligent systems reliable, scalable, and impactful beyond the lab — bridging the gap between academic research and production engineering.',
			'With a strong foundation in deep learning, probabilistic modeling, and distributed systems, I investigate how AI systems can be designed to work reliably at scale in real-world conditions.',
		],
		stats: [
			{ label: 'Research Areas', value: '5+', icon: FaMicroscope },
			{ label: 'Publications', value: 'In Progress', icon: FaFileAlt },
			{ label: 'Citation Impact', value: 'Growing', icon: FaChartBar },
		],
	},

	researchThemes: {
		title: 'Research Themes',
		subtitle: 'Core areas of investigation and contribution',
		items: [
			{
				title: 'Applied Machine Learning Systems',
				description:
					'Designing and building ML systems that work reliably in production — from data pipelines to model serving and monitoring.',
				icon: FaNetworkWired,
				color: 'primary',
				keyAreas: [
					'Production ML pipelines',
					'Model deployment at scale',
					'System reliability and monitoring',
					'Latency-optimized inference',
				],
			},
			{
				title: 'Natural Language Processing',
				description:
					'Advancing language understanding and generation for under-represented languages and domain-specific applications.',
				icon: FaLanguage,
				color: 'secondary',
				keyAreas: [
					'Low-resource NLP',
					'African language models',
					'Retrieval-Augmented Generation (RAG)',
					'Domain adaptation and fine-tuning',
				],
			},
			{
				title: 'Intelligent Systems at Scale',
				description:
					'Researching architectures and patterns for distributed intelligent systems that maintain performance under real-world constraints.',
				icon: FaCloudUploadAlt,
				color: 'primary',
				keyAreas: [
					'Distributed ML architectures',
					'Edge AI and optimization',
					'Real-time inference systems',
					'Scalable feature engineering',
				],
			},
			{
				title: 'Generative AI & LLMs',
				description:
					'Investigating efficient fine-tuning, alignment, and deployment strategies for large language models in production environments.',
				icon: FaRobot,
				color: 'secondary',
				keyAreas: [
					'Parameter-efficient fine-tuning',
					'LLM alignment and safety',
					'Cost-effective deployment',
					'Prompt engineering and optimization',
				],
			},
		],
	},

	publications: {
		title: 'Publications',
		subtitle: 'Peer-reviewed research and academic contributions',
		items: [
			{
				title: '[Thesis Publication Title — Under Review]',
				authors: 'Godfred Awusi, [Advisor Name]',
				venue:
					'International Conference on Machine Learning Systems or Applied AI Journal',
				year: '2028',
				type: 'Conference Paper / Journal Article',
				abstract:
					'This research investigates [specific problem in applied AI/ML at scale]. We propose a novel approach to [technical contribution] that demonstrates [key finding]. Evaluation on real-world datasets shows [quantitative result] with [qualitative benefit]. The system has been deployed in [production context] and has been operational for [timeframe].',
				keywords: [
					'ML Systems',
					'Production AI',
					'Scalability',
					'Real-world Deployment',
				],
				status: 'in-progress',
				links: {
					paper: '#',
					code: '#',
					dataset: '#',
				},
			},
			{
				title:
					'Efficient Fine-Tuning Strategies for Low-Resource African Languages',
				authors: 'Godfred Awusi, [Co-author Names]',
				venue: 'Workshop on NLP for African Languages, ACL or EMNLP',
				year: '2028',
				type: 'Workshop Paper',
				abstract:
					'Large language models perform poorly on African languages due to under-representation in training data. This paper investigates parameter-efficient fine-tuning methods (LoRA, QLoRA, adapter layers) to adapt existing LLMs to [specific African languages]. Results show [performance metrics] with [efficiency gains] compared to full fine-tuning.',
				keywords: [
					'NLP',
					'Low-Resource Languages',
					'Parameter-Efficient Fine-Tuning',
					'LLMs',
				],
				status: 'proposed',
				links: {
					paper: '#',
					code: '#',
					dataset: '#',
				},
			},
		],
	},

	ongoingResearch: {
		title: 'Ongoing Research',
		subtitle: 'Current investigations and work in progress',
		projects: [
			{
				title:
					'MPhil Thesis: Applied AI/ML for Real-World Intelligent Systems at Scale',
				description:
					'Original research contribution investigating how intelligent systems can be designed and deployed to operate reliably at scale in production environments. The thesis includes both theoretical contributions and a deployed system validated on real-world data.',
				timeline: '2026 – 2028',
				status: 'active',
				milestones: [
					'Literature review and problem formulation — Completed',
					'System architecture design — In Progress',
					'Implementation and experimentation — Planned',
					'Evaluation and thesis writing — Planned',
				],
			},
			{
				title: 'Production ML Observability Framework',
				description:
					'Developing an open-source framework for comprehensive monitoring and observability of ML systems in production — including data drift, concept drift, model performance degradation, and alerting.',
				timeline: '2027 – 2028',
				status: 'active',
				milestones: [
					'Requirements gathering and design — Completed',
					'Core monitoring implementation — In Progress',
					'Integration with existing ML stacks — Planned',
					'Open source release and documentation — Planned',
				],
			},
		],
	},

	researchTools: {
		title: 'Research Tools & Technologies',
		subtitle: 'The technical stack powering my research',
		categories: [
			{
				name: 'Deep Learning Frameworks',
				items: ['PyTorch', 'TensorFlow', 'JAX', 'Hugging Face Transformers'],
				icon: FaBrain,
			},
			{
				name: 'ML Engineering & MLOps',
				items: [
					'FastAPI',
					'Ray',
					'MLflow',
					'Weights & Biases',
					'Docker',
					'Kubernetes',
				],
				icon: FaCloudUploadAlt,
			},
			{
				name: 'Data & Experimentation',
				items: [
					'Pandas',
					'NumPy',
					'Jupyter',
					'Weights & Biases',
					'TensorBoard',
				],
				icon: FaChartLine,
			},
			{
				name: 'Cloud & Infrastructure',
				items: ['GCP (Vertex AI)', 'AWS (SageMaker)', 'Lambda Labs', 'RunPod'],
				icon: FaDatabase,
			},
		],
	},

	collaboration: {
		title: 'Collaboration & Open Science',
		subtitle: 'I believe in open, reproducible, and collaborative research',
		description:
			'I actively seek research collaborations, paper reviews, and open-source contributions in areas related to applied ML systems, NLP for low-resource languages, and production AI. All my research code is open-sourced when possible, and I am committed to reproducible research practices.',
		offerings: [
			{
				title: 'Research Collaboration',
				description:
					'Looking for collaborators on ML systems, NLP for African languages, or applied AI research.',
				icon: FaNetworkWired,
			},
			{
				title: 'Open Source Contributions',
				description:
					'Active contributor and maintainer of research-oriented ML tools and libraries.',
				icon: FaGithub,
			},
			{
				title: 'Peer Review & Mentorship',
				description:
					'Available for paper reviews, technical mentorship, and research methodology discussions.',
				icon: FaFileAlt,
			},
		],
		contactText: 'Interested in collaborating or discussing research?',
		contactCta: {
			text: 'Start a Conversation',
			href: '/contact',
		},
	},

	cta: {
		title: 'Stay Updated on My Research',
		description:
			'Follow my research journey — from conference publications to open-source releases and technical deep dives.',
		buttons: [
			{
				text: 'Follow on GitHub',
				href: 'https://github.com/cosbyDeveloper',
				variant: 'outline',
			},
			{
				text: 'Connect on LinkedIn',
				href: 'https://www.linkedin.com/in/godfred-awusi-dev/',
				variant: 'outline',
			},
		],
	},
};
