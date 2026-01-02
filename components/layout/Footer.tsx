'use client';

// components/layout/Footer.tsx
import Link from 'next/link';
import {
	FaGithub,
	FaLinkedin,
	FaTwitter,
	FaChevronRight,
	FaArrowUp,
} from 'react-icons/fa';

const Footer = () => {
	const currentYear = new Date().getFullYear();

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	return (
		<footer className='border-t border-default py-12'>
			<div className='max-w-6xl mx-auto px-6 lg:px-12'>
				{/* Main Footer Content */}
				<div className='grid gap-8 md:grid-cols-3 mb-8'>
					{/* Brand & Identity */}
					<div className='space-y-4'>
						<h3 className='text-xl font-bold'>Godfred Awusi</h3>
						<p className='text-muted-foreground'>
							Software Engineer building scalable systems with a focus on
							backend & AI/ML.
						</p>
						<p className='text-sm text-muted-foreground'>
							Founder, Cosby Technologies
						</p>
					</div>

					{/* Quick Links */}
					<div className='space-y-4'>
						<h4 className='font-semibold'>Quick Links</h4>
						<ul className='space-y-2'>
							{['Home', 'About', 'Resume', 'Portfolio', 'Blog', 'Contact'].map(
								(item) => (
									<li key={item}>
										<Link
											href={`/${
												item.toLowerCase() === 'home' ? '' : item.toLowerCase()
											}`}
											className='text-muted-foreground hover:text-foreground transition-colors text-sm flex'>
											<FaChevronRight className='mt-0.5' /> {item}
										</Link>
									</li>
								),
							)}
						</ul>
					</div>

					{/* Connect */}
					<div className='space-y-4'>
						<h4 className='font-semibold'>Connect</h4>
						<div className='flex gap-4'>
							<Link
								href='https://github.com/cosbyDeveloper'
								target='_blank'
								rel='noopener noreferrer'
								className='p-2 rounded-lg border border-default hover:border-primary/50 hover:bg-primary/5 transition-colors'
								aria-label='GitHub'>
								<FaGithub className='w-5 h-5 text-muted-foreground hover:text-foreground transition-colors' />
							</Link>
							<Link
								href='https://linkedin.com/in/cosbydeveloper'
								target='_blank'
								rel='noopener noreferrer'
								className='p-2 rounded-lg border border-default hover:border-primary/50 hover:bg-primary/5 transition-colors'
								aria-label='LinkedIn'>
								<FaLinkedin className='w-5 h-5 text-muted-foreground hover:text-foreground transition-colors' />
							</Link>
							<Link
								href='https://twitter.com/cosbyDeveloper'
								target='_blank'
								rel='noopener noreferrer'
								className='p-2 rounded-lg border border-default hover:border-primary/50 hover:bg-primary/5 transition-colors'
								aria-label='Twitter'>
								<FaTwitter className='w-5 h-5 text-muted-foreground hover:text-foreground transition-colors' />
							</Link>
						</div>
						<Link
							href='mailto:cosby.developer@gmail.com'
							className='text-sm text-muted-foreground hover:text-foreground transition-colors block'>
							cosby.developer@gmail.com
						</Link>
					</div>
				</div>

				{/* Bottom Bar - with Back to Top in the middle */}
				<div className='pt-8 border-t border-default/50'>
					<div className='flex flex-col md:flex-row items-center justify-between gap-4'>
						{/* Copyright - Left */}
						<div className='text-center md:text-left order-2 md:order-1'>
							<p className='text-sm text-muted-foreground'>
								© {currentYear} Godfred Awusi. All rights reserved.
							</p>
						</div>

						{/* Back to Top - Center */}
						<button
							onClick={scrollToTop}
							className='order-1 md:order-2 flex items-center gap-2 px-4 py-2 rounded-lg  hover:bg-primary/5 transition-colors group'
							aria-label='Back to top'>
							<FaArrowUp className='w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors' />
							<span className='text-sm text-muted-foreground group-hover:text-foreground transition-colors'>
								Back to Top
							</span>
						</button>

						{/* Legal Links - Right */}
						<div className='flex items-center gap-6 order-3'>
							<Link
								href='/faq'
								className='text-sm text-muted-foreground hover:text-foreground transition-colors'>
								FAQs
							</Link>
							<Link
								href='/contact'
								className='text-sm text-primary hover:text-primary/80 transition-colors font-medium'>
								Get in Touch
							</Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
