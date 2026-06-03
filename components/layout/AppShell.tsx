// components/layout/AppShell.tsx
'use client';

import { usePathname } from 'next/navigation';
import Sidebar from '@/components/dashboard/Sidebar';
import ScrollHandler from './ScrollHandler';
import Footer from '@/components/layout/Footer';
import ThemeToggler from '../ui/ThemeToggler';

const AppShell = ({ children }: { children: React.ReactNode }) => {
	const pathname = usePathname();

	// Check if current route is an admin page but exclude /admin/login
	const isAdminPage =
		pathname?.startsWith('/admin') && pathname !== '/admin/login';

	return (
		<>
			<ScrollHandler />
			<div className='min-h-screen flex'>
				{/* Sidebar - Only show on non-admin pages */}
				{!isAdminPage && <Sidebar />}

				{/* Theme Toggler - Always show */}
				<ThemeToggler
					showText={false}
					className='fixed top-0 right-6 z-50'
					fullWidth={false}
				/>

				{/* Main Content - Full width when sidebar is hidden */}
				<main className={`flex-1 ${isAdminPage ? 'w-full' : ''}`}>
					{children}
					<Footer />
				</main>
			</div>
		</>
	);
};

export default AppShell;
