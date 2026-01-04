'use client';

import Link from 'next/link';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import ThemeToggler from '../ui/ThemeToggler';
interface SidebarFooterProps {
	collapsed?: boolean;
}

// Add your social media URLs here
const SOCIAL_LINKS = {
	linkedin: 'https://www.linkedin.com/in/godfred-awusi-dev/',
	github: 'https://github.com/cosbyDeveloper',
	twitter: 'https://twitter.com/cosby_Tech',
};

const SidebarFooter = ({ collapsed = false }: SidebarFooterProps) => {
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
			<ThemeToggler collapsed={collapsed} showText={true} />
		</div>
	);
};

export default SidebarFooter;
