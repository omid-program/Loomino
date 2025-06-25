import { TCatItemBoxProps } from '@/types';
import React from 'react';

interface CardItem {
	title: string;
	description: string;
	image: string;
}

const cards: CardItem[] = [
	{
		title: 'منظره کوهستانی',
		description:
			'همه این سفرهای کوهستانی و زیبا را با منظره ای زیبا از کوه ها ، ببینید',
		image: '/assets/images/img1.jpg',
	},
	{
		title: 'به سمت ساحل',
		description:
			'سفر ساحلی بعدی خود را با این مقصدهای افسانه برنامه ریزی کنید',
		image: '/assets/images/img2.jpg',
	},
	{
		title: 'مقصد کویر',
		description: 'این صحرا است که شما همیشه آرزوی آن را داشتید',
		image: '/assets/images/img3.jpg',
	},
	{
		title: 'کهکشان را کاوش کنید',
		description:
			'همه این سفرهای کوهستانی و زیبا را با منظره ای زیبا از کوه ها ، ببینید',
		image: '/assets/images/img4.jpg',
	},
];

const CatCard = (props: TCatItemBoxProps) => {
	const { defImg, perTitle, perMiniDescription, id } = props;
	const finalperMinDesc = perMiniDescription.slice(0,96)
	return (
		<>
			{/* <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-screen-lg mx-auto p-4 font-yekan"> */}
				{/* {cards.map((card, index) => ( */}
					<div
						// key={index}
						className="relative group flex items-end text-center text-white shadow-lg overflow-hidden rounded-lg h-64 sm:h-80"
					>
						<img
							src={defImg}
							alt={perTitle}
							className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-all duration-700"></div>
						<div className="relative z-10 p-4 transform translate-y-20 group-hover:translate-y-0 transition-all duration-700 flex flex-col items-center">
							<h2 className="text-lg font-bold">{perTitle}</h2>
							<p className="italic text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
								{finalperMinDesc} ... 
							</p>
							{/* <button className="mt-4 px-4 py-2 text-xs font-bold uppercase bg-black hover:bg-neutral-900 text-white rounded focus:outline-dashed focus:outline-yellow-300">
								بیشتر
							</button> */}
						</div>
					</div>
				 {/* ) */}
				{/* )} */}

			{/* </main> */}
		</>
	);
};

export default CatCard;
