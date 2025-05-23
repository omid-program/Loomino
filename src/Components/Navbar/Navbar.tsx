// import { TNavbarPromps } from "@/types";
import React from 'react';
import NavItem from './NavItem/NavItem';
import Link from 'next/link';
import { TCatDatas, TLinksData } from '@/types';
import NavSubItem from './NavSubItem/NavSubItem';
import { BsCart4 } from 'react-icons/bs';
import LogoutComponent from '../LogoutComponent/LogoutComponent';

async function Navbar() {
	const response = await fetch(`http://localhost:8000/cats`);
	const catData = (await response.json()) as TCatDatas[];
	const navLinks: TLinksData[] = [
		{
			id: 1,
			perTitle: 'خانه',
			engTitle: 'Home',
			link: '/',
		},
		{
			id: 2,
			perTitle: 'فروشگاه',
			engTitle: 'Shop',
			link: '/shop',
		},
		{
			id: 3,
			perTitle: 'دسته بندی',
			engTitle: 'Categoties',
			subItems: catData,
			link: '/cats',
		},
		{
			id: 4,
			perTitle: 'داشبورد',
			engTitle: 'Dashboard',
			link: '/dashboard',
		},
	];
	return (
		<nav className="w-10/12 max-h-12 relative mx-auto py-2 px-1 flex justify-between items-center border-b border-violet-400  ">
			<div>
				<ul className="flex gap-2">
					{navLinks.map((navLinksItem: TLinksData) => (
						<li key={navLinksItem.id}>
							<NavItem key={navLinksItem.id} navLinksItem={navLinksItem}>
								{navLinksItem.subItems?.map(subItem => (
									<ul
										key={subItem?.id}
										className="shadow-sky-700 shadow-md bg-sky-300 mt-1 px-2 py-3 rounded z-50"
									>
										<NavSubItem subItems={subItem} />
									</ul>
								))}
							</NavItem>
						</li>
					))}
				</ul>
			</div>
			<div className="flex items-center justify-center gap-2">
				<div className="size-6">
					<Link href={'/cart'} className="w-full">
						<BsCart4 />
					</Link>
				</div>
				<div className='flex'>
					{/* <div>
						<Link href={'/dashboard'}>داشبورد</Link>
					</div> */}
					<div className="size-6">
						<LogoutComponent />
					</div>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
