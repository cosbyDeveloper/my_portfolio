// app/not-found.tsx (Creative Version)
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaHome, FaArrowLeft, FaLightbulb, FaCode } from 'react-icons/fa';

export default function NotFound() {
	return (
		<main className='min-h-screen flex items-center justify-center px-6 py-24'>
			<div className='max-w-2xl mx-auto text-center'>
				{/* Floating elements animation */}
				<div className='relative mb-8'>
					<motion.div
						animate={{ y: [0, -20, 0] }}
						transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
						className='absolute -top-8 -left-8 opacity-50'>
						<FaCode className='w-8 h-8 text-primary' />
					</motion.div>
					<motion.div
						animate={{ y: [0, 20, 0] }}
						transition={{
							repeat: Infinity,
							duration: 4,
							ease: 'easeInOut',
							delay: 1,
						}}
						className='absolute -bottom-8 -right-8 opacity-50'>
						<FaLightbulb className='w-8 h-8 text-secondary' />
					</motion.div>

					{/* Main 404 */}
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.6 }}>
						<div className='text-8xl md:text-9xl font-bold tracking-tighter font-mono'>
							<span className='text-primary'>4</span>
							<span className='text-muted-foreground relative'>
								0
								<motion.span
									animate={{ opacity: [0, 1, 0] }}
									transition={{ repeat: Infinity, duration: 2 }}
									className='absolute -top-1 -right-1 text-xs text-primary'>
									*
								</motion.span>
							</span>
							<span className='text-primary'>4</span>
						</div>
					</motion.div>
				</div>

				{/* Message */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.1, duration: 0.6 }}
					className='mb-8'>
					<h2 className='text-2xl md:text-3xl font-semibold mb-4'>
						Lost in the Matrix?
					</h2>
					<p className='text-muted-foreground text-lg'>
						The page you&rsquo;re looking for seems to have wandered off into
						the digital void.
					</p>
				</motion.div>

				{/* Glitch effect box */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.2, duration: 0.6 }}
					className='mb-12'>
					<div className='relative bg-background/50 backdrop-blur-sm rounded-2xl border border-default p-6 font-mono text-sm'>
						<p className='text-muted-foreground'>
							<span className='text-primary'>$</span> find /page --path=&quot;
							<span className='text-secondary'>unknown</span>&quot;
						</p>
						<motion.p
							animate={{ opacity: [0.5, 1, 0.5] }}
							transition={{ repeat: Infinity, duration: 1.5 }}
							className='text-red-500 mt-2'>
							Error: 404 — Resource not found in the known universe.
						</motion.p>
					</div>
				</motion.div>

				{/* Buttons */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3, duration: 0.6 }}
					className='flex flex-col sm:flex-row gap-4 justify-center'>
					<Link
						href='/'
						className='inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-all hover:scale-105 active:scale-95'>
						<FaHome className='w-4 h-4' />
						Return Home
					</Link>
					<button
						onClick={() => window.history.back()}
						className='inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-default bg-background/50 font-medium hover:bg-muted/50 transition-all hover:scale-105 active:scale-95'>
						<FaArrowLeft className='w-4 h-4' />
						Go Back
					</button>
				</motion.div>
			</div>
		</main>
	);
}
