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
import { API_BASE_URL } from './../../../../config';


async function ServerNavbar() {
	const response = await fetch(`${API_BASE_URL}/cats`);
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
			perTitle: 'درباره ما',
			engTitle: 'About us',
			link: '/aboutUs',
		},
		// {
		// 	id: 4,
		// 	perTitle: 'داشبورد',
		// 	engTitle: 'Dashboard',
		// 	link: '/dashboard',
		// },
	];
	return (
		<nav className="w-full max-h-16 relative mx-auto py-4 px-3 flex justify-between items-center">
			<div className="flex justify-between items-center">
				<ul className="flex gap-2">
					{navLinks.map((navLinksItem: TLinksData) => (
						<li key={navLinksItem.id}>
							<NavItem key={navLinksItem.id} navLinksItem={navLinksItem}>
								{navLinksItem.subItems && (
									<div className="px-2 py-4 shadow-md shadow-textMainMuted border-2 border-textMain bg-bg relative z-40  ">
										{navLinksItem.subItems?.map(subItem => (
											<ul
												key={subItem?.id}
												className="text-md border-r-4 border-textMain bg-gray-700 mt-1 px-1 py-2 rounded-l-md relative z-50"
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
						src="logo/omid-program-logo-L-07.png"
						alt=""
					/>
				</div>
				<span className="text-lg font-bold">omid-program</span>
			</div>
		</nav>
	);
}

export default ServerNavbar;
