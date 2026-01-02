// components/layout/AppShell.tsx
import Sidebar from '@/components/dashboard/Sidebar';
import ScrollHandler from './ScrollHandler';
import Footer from '@/components/layout/Footer';

const AppShell = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<ScrollHandler />
			<div className='min-h-screen flex'>
				{/* Sidebar */}
				<Sidebar />

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
