// import { TNavbarPromps } from "@/types";
export const dynamic = 'force-dynamic';

import React from 'react';
import NavItem from './NavItem/NavItem';
import Link from 'next/link';
import { TCatDatas, TLinksData } from '@/types';
import NavSubItem from './NavSubItem/NavSubItem';
import { BsCart4 } from 'react-icons/bs';
import { TbChartArcs } from 'react-icons/tb';

import LogoutComponent from '../LogoutComponent/LogoutComponent';

async function ServerNavbar() {
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
		// {
		// 	id: 4,
		// 	perTitle: 'داشبورد',
		// 	engTitle: 'Dashboard',
		// 	link: '/dashboard',
		// },
	];
	return (
		<nav className="md:w-full max-h-16 relative mx-auto py-3 px-1 flex md:justify-between items-center col-span-3   ">
			<div className="flex justify-between items-center">
				<ul className="flex gap-2">
					{navLinks.map((navLinksItem: TLinksData) => (
						<li key={navLinksItem.id}>
							<NavItem key={navLinksItem.id} navLinksItem={navLinksItem}>
								{navLinksItem.subItems && (
									<div className="px-2 py-4 shadow-md shadow-violet-200 border-2 border-violet-400 relative z-40  ">
										{navLinksItem.subItems?.map(subItem => (
											<ul
												key={subItem?.id}
												className="text-md border-r-4 border-violet-600 bg-violet-200 mt-1 px-1 py-2 rounded-l-md relative z-50"
											>
												<NavSubItem subItems={subItem} />
											</ul>
										))}
									</div>
								)}
							</NavItem>
						</li>
					))}
				</ul>
			</div>
			<div className='flex items-center flex-row-reverse '>
				<div className="bg-cover w-20 flex items-center">
					<img
						className="max-w-full"
						src="logo/omid-program-dark-logo-light-mode.png"
						alt=""
					/>
				</div>
				<span className="text-lg font-bold">omid-program</span>
			</div>
		</nav>
	);
}

export default ServerNavbar;
