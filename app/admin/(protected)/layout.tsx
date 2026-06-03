// app/admin/layout.tsx

import { redirect } from 'next/navigation';
import { getAuthenticatedUser } from '@/lib/auth/server-auth';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default async function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const user = await getAuthenticatedUser();

	if (!user) {
		redirect('/admin/login');
	}

	return (
		<div className='min-h-screen bg-background'>
			<AdminSidebar user={user} />

			<div className='hidden lg:block ml-64'>
				<main className='min-h-screen'>
					<div className='p-4 md:p-6 lg:p-8'>{children}</div>
				</main>
			</div>

			<div className='lg:hidden'>
				<main className='pt-16 min-h-screen'>
					<div className='p-4 md:p-6'>{children}</div>
				</main>
			</div>
		</div>
	);
}
