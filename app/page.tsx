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

'use client';

export default function HomePage() {
	return (
		<section className='p-8 space-y-4'>
			<h1 className='text-3xl font-bold'>HomePage</h1>
		</section>
	);
}
