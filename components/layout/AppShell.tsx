import Sidebar from '@/components/dashboard/Sidebar';

export default function AppShell({ children }: { children: React.ReactNode }) {
	return (
		<div className='min-h-screen flex'>
			{/* Sidebar */}
			<Sidebar />

			{/* Main Content */}
			<main className='flex-1'>{children}</main>
		</div>
	);
}
