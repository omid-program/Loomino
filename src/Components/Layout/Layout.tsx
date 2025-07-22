import { ShappingCartContextProvider } from '@/context/ShappongCartContext';
// import Navbar from "../Navbar/ServerNavbar/ServerNavbar";
import ServerNavbar from '../Navbar/ServerNavbar/ServerNavbar';
import ClientNavbar from '../Navbar/ClientNavbar/ClientNavbar';
import MenueBtn from '../Navbar/MoboNav/MenueBtn/MenueBtn';
import NavbarMenue from '../Navbar/MoboNav/NavbarMenue/NavbarMenue';
import { AuthContextProvider } from '@/context/AuthContext';
import Footer from '../Footer/Footer';

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ShappingCartContextProvider>
			<div>
				{/* <ShappingCartContextProvider> */}
				{/* decstop */}
				<div className="hidden md:flex md:gap-0 md:justify-center   ">
					<ServerNavbar />
					<ClientNavbar />
				</div>
				{/* mobile */}
				<div className="grid grid-cols-4 items-center py-2 justify-between w-full md:hidden">
					<NavbarMenue />
					<div className="flex items-center flex-row-reverse col-span-3 gap-5 ">
						<div className="bg-cover w-20 flex items-center">
							<img
								className="max-w-8"
								src="/logo/omid-program-logo-L-07.png"
								alt=""
							/>
						</div>
						<span className="text-lg font-bold">omid-program</span>
					</div>
				</div>

				{children}
				{/* </ShappingCartContextProvider> */}
				<Footer/>
			</div>
		</ShappingCartContextProvider>
	);
}
