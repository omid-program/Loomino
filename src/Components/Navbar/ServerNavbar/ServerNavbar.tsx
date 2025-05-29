// import { TNavbarPromps } from "@/types";
export const dynamic = 'force-dynamic';

import React from 'react';
import NavItem from './NavItem/NavItem';
import Link from 'next/link';
import { TCatDatas, TLinksData } from '@/types';
import NavSubItem from './NavSubItem/NavSubItem';
import { BsCart4 } from 'react-icons/bs';
import { TbChartArcs } from "react-icons/tb";

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
		<nav className="w-10/12 max-h-16 relative mx-auto py-3 px-1 flex justify-between items-center    ">
			<div>
				<ul className="flex gap-2">
					{navLinks.map((navLinksItem: TLinksData) => (
						<li key={navLinksItem.id}>
							<NavItem key={navLinksItem.id} navLinksItem={navLinksItem}>
								{navLinksItem.subItems?.map(subItem => (
									<ul
										key={subItem?.id}
										className="shadow-sky-700 shadow-md bg-sky-300 mt-1 px-2 py-3 rounded relative z-50"
									>
										<NavSubItem subItems={subItem} />
									</ul>
								))}
							</NavItem>
						</li>
					))}
				</ul>
			</div>
			
		</nav>
	);
}

export default ServerNavbar;
