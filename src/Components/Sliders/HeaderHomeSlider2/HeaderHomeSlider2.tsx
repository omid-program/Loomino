import { TSliders } from '@/types';
import Link from 'next/link';
import React from 'react';

async function HeaderHomeSlider2() {
	const response = await fetch(`http://localhost:8000/sliders`);
	const data = (await response.json()) as TSliders;

	return (
		<div className="w-full relative h-[500px] overflow-hidden group">
			{data.homeHeadrSliders.items.map(slide => {
				const imgNum = Number(slide.imgNumber);
				const isFirst = imgNum === 1;
				const baseWidth = isFirst ? '100%' : '30%';
				const baseLeft = isFirst ? '0%' : `${imgNum * 10 + 10}%`;
				const zIndex = isFirst ? 1 : imgNum + 1;

				return (
					<div
						key={slide.id}
						className={`absolute top-0 h-full transition-all duration-500 ease-in-out group-hover:z-[999] hover:w-full`}
						style={{
							width: baseWidth,
							left: baseLeft,
							zIndex,
						}}
					>
						<img
							src={slide.image}
							alt={slide.title}
							className="w-full h-full object-cover transition-all duration-500"
						/>
						<Link href={slide.link}>
							<div className="absolute bottom-5 left-5 text-white bg-black bg-opacity-50 px-4 py-2 rounded">
								<h2 className="text-xl font-bold">{slide.title}</h2>
								<span className="text-sm">{slide.subItem}</span>
							</div>
						</Link>
					</div>
				);
			})}
		</div>
	);
}

export default HeaderHomeSlider2;
