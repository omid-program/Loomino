'use client';
import { usePathname } from '@/next/navigation';
import Link from 'next/link';
import React from 'react';

function layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const sidebarItems = [
		{
			id: '0',
			perTitle: 'گزارشات',
			engTitle: 'Raports',
			href: '/dashboard',
		},
		{
			id: '1',
			perTitle: 'افرودن محصول',
			engTitle: 'Add Product',
			href: '/dashboard/add-product',
		},
		{
			id: '2',
			perTitle: 'مدیریت محصولات',
			engTitle: 'product Manager',
			href: '/dashboard/product-manager',
		},
		{
			id: '3',
			perTitle: 'مدیریت سفارشات',
			engTitle: 'Ord Manager',
			href: '/dashboard/ord-manager',
		},
		{
			id: '4',
			perTitle: 'مدیریت دسته بندی و برچست',
			engTitle: 'cat and Tag Manager',
			href: '/dashboard/manage-items',
		},
		{
			id: '5',
			perTitle: 'مدیریت نظرات',
			engTitle: 'Comment Manager',
			href: '/dashboard/comment-manager',
		},
	];
	const pathName = usePathname();
	return (
		<div className=" flex flex-col md:flex-row">
			{/* side-bar */}
			<div className=" mb-2 mt-5 w-full py-3 md:mr-0 md:ml-5 md:px-6 md:py-8  md:w-1/5 md:min-h-screen sticky  shadow-lg shadow-violet-500 rounded-tl-xl">
				{/* logo-name */}
				<div className=' hidden md:mb-7 md:flex md:flex-col md:justify-center md:items-center'>
					<div className=" mx-auto text-center size-24 rounded-full  shadow-md shadow-violet-200 flex justify-center items-center font-bold bg-cover">
						<img
							className="max-w-full"
							src="logo/omid-program-dark-logo-light-mode.png"
							alt=""
						/>
					</div>
					<span className="text-lg font-bold">omid-program</span>
				</div>
				{/* side-bar-items-container */}
				<>
					<div className="flex flex-row md:flex-col ">
						{sidebarItems.map(item => (
							// side-bar-item
							<Link
								href={item.href}
								key={item.id}
								// className={`py-5 px-3  ${pathName === item.href ? 'border-2 border-solid border-violet-500 rounded-lg':'border-b-2 border-dashed border-violet-400'}`}
								className={`py-3 px-3 border-2 my-3 border-violet-700 bg-violet-100 rounded-md  ${
									pathName === item.href
										? 'shadow-md shadow-violet-400'
										: ''
								}`}
								// className="  py-3 px-3 border-2 my-3 border-violet-700 bg-violet-100 rounded-md"
							>
								<div className="">{item.perTitle}</div>
							</Link>
						))}
					</div>
				</>
			</div>
			<div className="w-full">{children}</div>
		</div>
	);
}

export default layout;
