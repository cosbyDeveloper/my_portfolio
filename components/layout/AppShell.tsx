// components/layout/AppShell.tsx
import Sidebar from '@/components/dashboard/Sidebar';
import ScrollHandler from './ScrollHandler';
import Footer from '@/components/layout/Footer';
import ThemeToggler from '../ui/ThemeToggler';

const AppShell = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<ScrollHandler />
			<div className='min-h-screen flex'>
				{/* Sidebar */}
				<Sidebar />

				{/* Theme Toggler */}
				<ThemeToggler
					showText={false}
					className='fixed top-0 right-6 z-50'
					fullWidth={false}
				/>

				{/* Main Content */}
				<main className='flex-1'>
					{children}
					<Footer />
				</main>
			</div>
		</>
	);
};

export default AppShell;
