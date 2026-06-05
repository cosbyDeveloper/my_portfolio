'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock, FaSignInAlt, FaUserShield } from 'react-icons/fa';

export default function LoginForm() {
	const router = useRouter();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		setError('');
		setIsLoading(true);

		try {
			const response = await fetch('/api/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email,
					password,
				}),
				credentials: 'include',
			});

			const data = await response.json();

			if (response.ok) {
				router.replace('/admin/dashboard');
				router.refresh();
				return;
			}

			setError(data.error || 'Login failed');
		} catch (error) {
			console.error(error);
			setError('An error occurred during login');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='min-h-screen flex items-center justify-center px-4 py-12 bg-background'>
			<div className='relative w-full max-w-md'>
				{/* Background Effects */}
				<div className='absolute -top-20 -right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl' />
				<div className='absolute -bottom-20 -left-20 w-72 h-72 bg-secondary/10 rounded-full blur-3xl' />

				{/* Card */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className='relative bg-background/50 backdrop-blur-sm rounded-2xl border border-default p-8 shadow-xl'>
					{/* Header */}
					<div className='text-center mb-8'>
						<div className='inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4'>
							<FaUserShield className='w-8 h-8 text-primary' />
						</div>

						<h1 className='text-2xl font-bold tracking-tight'>
							Admin <span className='text-primary'>Login</span>
						</h1>

						<p className='text-muted-foreground text-sm mt-2'>
							Access the admin dashboard
						</p>
					</div>

					{/* Error */}
					{error && (
						<motion.div
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							className='mb-6 rounded-xl bg-red-500/10 border border-red-500/20 p-4'>
							<p className='text-red-600 dark:text-red-400 text-sm text-center'>
								{error}
							</p>
						</motion.div>
					)}

					{/* Form */}
					<form onSubmit={handleSubmit} className='space-y-5'>
						{/* Email */}
						<div>
							<label className='block text-sm font-medium mb-2'>
								Email Address
							</label>

							<div className='relative'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
									<FaEnvelope className='h-5 w-5 text-muted-foreground' />
								</div>

								<input
									type='email'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
									autoComplete='email'
									className='w-full pl-10 pr-4 py-2.5 rounded-xl border border-default bg-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all'
									placeholder='admin@example.com'
								/>
							</div>
						</div>

						{/* Password */}
						<div>
							<label className='block text-sm font-medium mb-2'>Password</label>

							<div className='relative'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
									<FaLock className='h-5 w-5 text-muted-foreground' />
								</div>

								<input
									type='password'
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
									autoComplete='current-password'
									className='w-full pl-10 pr-4 py-2.5 rounded-xl border border-default bg-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all'
									placeholder='••••••••'
								/>
							</div>
						</div>

						{/* Submit */}
						<button
							type='submit'
							disabled={isLoading}
							className='w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100'>
							{isLoading ? (
								<>
									<div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin' />
									<span>Logging in...</span>
								</>
							) : (
								<>
									<FaSignInAlt className='w-4 h-4' />
									<span>Login</span>
								</>
							)}
						</button>
					</form>

					{/* Footer */}
					<p className='text-center text-xs text-muted-foreground mt-6'>
						This area is restricted to authorized personnel only
					</p>
				</motion.div>
			</div>
		</div>
	);
}
