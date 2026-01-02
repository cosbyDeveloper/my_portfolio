// 'use client';

// import { useTheme } from 'next-themes';

// export default function HomePage() {
// 	const { theme, setTheme } = useTheme();

// 	return (
// 		<section className='p-8 space-y-4'>
// 			<h1 className='text-3xl font-bold'>HomePage</h1>

// 			<button
// 				onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
// 				className='px-4 py-2 rounded bg-primary'>
// 				Toggle Theme
// 			</button>
// 		</section>
// 	);
// }

import ExperienceEducation from '@/components/home/ExperienceEducation';
import FAQ from '@/components/home/FAQ';
import FeaturedBlogs from '@/components/home/FeaturedBlogs';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import GetInTouch from '@/components/home/GetInTouch';
import Hero from '@/components/home/Hero';
import Skills from '@/components/home/Skills';

const HomePage = () => {
	return (
		<>
			<Hero />
			<Skills />
			<ExperienceEducation />
			<FeaturedProjects />
			<FeaturedBlogs />
			<FAQ />
			<GetInTouch />
		</>
	);
};

export default HomePage;
