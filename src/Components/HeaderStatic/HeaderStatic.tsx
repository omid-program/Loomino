import Link from 'next/link';
import React from 'react';

function HeaderStatic() {
	return (
		<header className="relative w-full h-[500px] mb-8">
			<img
				src="/Header-img/Black-violet-wavy-background-2.jpg"
				alt="header"
				className="absolute inset-0 w-full h-full object-cover z-0"
			/>
			<Link href="/cats">
				<div className="absolute bottom-5 left-5 text-white bg-black bg-opacity-50 px-4 py-2 rounded z-10">
					<h2 className="text-xl font-bold">انواع پارچه‌ها</h2>
					<span className="text-sm">برای هر کاربرد و سلیقه‌ای</span>
				</div>
			</Link>
		</header>
	);
}

export default HeaderStatic;
