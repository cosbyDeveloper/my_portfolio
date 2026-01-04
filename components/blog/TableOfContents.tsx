// components/blog/TableOfContents.tsx
'use client';

import { useState } from 'react';
// import { motion } from 'framer-motion';

interface Heading {
	id: string;
	text: string;
	level: number;
}

interface TableOfContentsProps {
	headings: Heading[];
	className?: string;
}

const TableOfContents = ({
	headings,
	className = '',
}: TableOfContentsProps) => {
	const [activeId, setActiveId] = useState<string>('');

	const scrollToHeading = (id: string) => {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
			setActiveId(id);
		}
	};

	if (headings.length === 0) return null;

	return (
		<div
			className={`bg-muted/30 rounded-2xl border border-default p-6 ${className}`}>
			<h3 className='text-lg font-semibold mb-4 flex items-center gap-2'>
				<span className='text-primary'>📚</span>
				<span>Table of Contents</span>
			</h3>
			<nav>
				<ul className='space-y-2'>
					{headings.map((heading) => (
						<li key={heading.id}>
							<button
								onClick={() => scrollToHeading(heading.id)}
								className={`text-sm text-left w-full transition-colors ${
									activeId === heading.id
										? 'text-primary font-medium'
										: 'text-muted-foreground hover:text-foreground'
								}`}
								style={{ paddingLeft: `${(heading.level - 2) * 1}rem` }}>
								<span className='mr-2'>•</span>
								{heading.text}
							</button>
						</li>
					))}
				</ul>
			</nav>
		</div>
	);
};

export default TableOfContents;
