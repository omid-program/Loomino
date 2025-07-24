import type { Metadata } from 'next';
import './globals.css';
import Layout from '@/Components/Layout/Layout';
import { AuthContextProvider } from '@/context/AuthContext';

export const metadata: Metadata = {
	title: 'Loomino-shop',
	description: 'Smart Shop for fabric',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="fa" dir="rtl" className='bg-bg'>
			<body>
				<AuthContextProvider>
					<Layout>{children}</Layout>
				</AuthContextProvider>
			</body>
		</html>
	);
}
