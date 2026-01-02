'use client';

import Link from 'next/link';
import { FaGithub, FaLinkedin, FaMoon, FaSun } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { useTheme } from 'next-themes';

interface SidebarFooterProps {
	collapsed?: boolean;
}

// Add your social media URLs here
const SOCIAL_LINKS = {
	linkedin: 'https://www.linkedin.com/in/yourusername',
	github: 'https://github.com/yourusername',
	twitter: 'https://twitter.com/yourusername',
	// Add more if needed:
	// instagram: 'https://instagram.com/yourusername',
	// dribbble: 'https://dribbble.com/yourusername',
};

const SidebarFooter = ({ collapsed = false }: SidebarFooterProps) => {
	const { theme, setTheme } = useTheme();

	return (
		<div className='space-y-4'>
			{/* Social Links Title */}
			{!collapsed && (
				<p className='text-xs uppercase tracking-wide text-muted-foreground transition-all duration-300'>
					Social Links
				</p>
			)}

			{/* Social Icons */}
			<div
				className={`flex transition-all duration-300 ${
					collapsed
						? 'flex-col gap-3 items-center justify-center'
						: 'flex-row gap-3'
				}`}>
				<Link
					href={SOCIAL_LINKS.linkedin}
					target='_blank'
					rel='noopener noreferrer'
					className='hover:text-primary transition-all duration-300 hover:scale-110 hover:pl-1'
					aria-label='LinkedIn Profile'>
					<FaLinkedin className='text-2xl' />
				</Link>

				<Link
					href={SOCIAL_LINKS.github}
					target='_blank'
					rel='noopener noreferrer'
					className='hover:text-primary transition-all duration-300 hover:scale-110 hover:pl-1 '
					aria-label='GitHub Profile'>
					<FaGithub className='text-2xl' />
				</Link>

				<Link
					href={SOCIAL_LINKS.twitter}
					target='_blank'
					rel='noopener noreferrer'
					className='hover:text-primary transition-all duration-300 hover:scale-110 hover:pl-1'
					aria-label='Twitter Profile'>
					<FaXTwitter className='text-2xl' />
				</Link>
			</div>

			{/* Theme Toggle */}
			<button
				onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
				className={`mt-10 flex transition-all hover:pl-1 duration-300 hover:text-primary text-lg w-full ${
					collapsed ? 'justify-center' : 'justify-start'
				}`}
				aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
				<div
					className={`flex items-center transition-all duration-300 ${
						collapsed ? 'justify-center w-full' : ''
					}`}>
					<div className='transition-all duration-300 hover:scale-110'>
						{theme === 'dark' ? <FaSun /> : <FaMoon />}
					</div>
					<span
						className={`transition-all duration-300 ml-2 ${
							collapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto'
						}`}>
						{theme === 'dark' ? 'Light mode' : 'Dark mode'}
					</span>
				</div>
			</button>
		</div>
	);
};

export default SidebarFooter;
