import '@/styles/globals.css';
import type { Metadata } from 'next';
import AppShell from '@/components/layout/AppShell';
import ThemeProvider from '@/components/layout/ThemeProvider';

export const metadata: Metadata = {
	title: 'Godfred Awusi | Software Engineer',
	description:
		'Personal portfolio of Godfred Awusi – software engineer, founder, and problem solver.',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body>
				<ThemeProvider>
					<AppShell>{children}</AppShell>
				</ThemeProvider>
			</body>
		</html>
	);
}
