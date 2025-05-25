import { ShappingCartContextProvider } from '@/context/ShappongCartContext';
// import Navbar from "../Navbar/ServerNavbar/ServerNavbar";
import ServerNavbar from '../Navbar/ServerNavbar/ServerNavbar';
import ClientNavbar from '../Navbar/ClientNavbar/ClientNavbar';

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div>
			<ShappingCartContextProvider>
				<div className="flex gap-0 justify-center">
					<ServerNavbar />
					<ClientNavbar />
				</div>

				{children}
			</ShappingCartContextProvider>
		</div>
	);
}
