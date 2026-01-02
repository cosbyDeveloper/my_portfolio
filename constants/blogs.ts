export type BlogPost = {
	slug: string;
	title: string;
	excerpt: string;
	date: string;
	tags: string[];
	featured?: boolean;
	image?: string;
};

// constants/blogs.ts
export const blogs: BlogPost[] = [
	{
		slug: 'building-cosby-technologies',
		title: 'Lessons from Building Cosby Technologies',
		excerpt:
			'What I learned about product thinking, discipline, and engineering while building Cosby Technologies.',
		date: '2025-01-05',
		tags: ['Startups', 'Engineering'],
		featured: true,
		image: '/images/blog/default-blog.jpg', // Add this
	},
	{
		slug: 'backend-thinking',
		title: 'Thinking Like a Backend Engineer',
		excerpt:
			'How system design, data flow, and trade-offs shape robust backend systems.',
		date: '2024-12-20',
		tags: ['Backend', 'Architecture'],
		featured: true,
		image: '/images/blog/default-blog.jpg', // Add this
	},
	{
		slug: 'faith-and-career',
		title: 'Faith, Career, and Purpose in Tech',
		excerpt:
			'Balancing ambition, faith, and long-term impact as a software engineer.',
		date: '2024-11-10',
		tags: ['Career', 'Faith'],
		featured: true,
		image: '/images/blog/default-blog.jpg', // Add this
	},
];
