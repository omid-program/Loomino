import { THomeHederSlideItem } from '@/types';
import { ClassNames } from '@emotion/react';
import Link from 'next/link';
import React from 'react';

function HeaderHomeSliderItem({
	children,
}: {
	children: React.ReactNode;
}) // props: THomeHederSlideItem
{
	return (
		<div className="relative w-full h-[480px]">
			{/* <img src={props.image} alt="" className="w-full h-full object-cover z-0" /> */}
			{/* نوشته‌ها روی تصویر */}
			{/* <Link href={props.link}>
				<div className="absolute top-10 left-8 z-40 bg-violet-800/50 backdrop-blur-md px-2 py-2 rounded-xl ">
					<h3 className="text-3xl font-bold text-black">{props.title}</h3>
					<p className="mt-2 text-lg text-gray-800">{props.subItem}</p>
				</div>
			</Link> */}
			{children}
		</div>
	);
}

export default HeaderHomeSliderItem;
