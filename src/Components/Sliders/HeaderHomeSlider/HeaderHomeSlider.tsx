'use client';
import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './styles.css';

// import required modules
import { EffectFade, Navigation, Pagination } from 'swiper/modules';
import { THomeHeadrSliders, TSliders } from '@/types';
import HeaderHomeSliderItem from './HeaderHomeSliderItem/HeaderHomeSliderItem';
import Link from 'next/link';

export default function HeaderHomeSlider({
	// children,
// }: {
	// children: React.ReactNode;
}) {
	const [sliderInfo, setSliderInfo] = useState<THomeHeadrSliders>();

	const getHeaderSiderInfo = async () => {
		const response = await fetch(`http://localhost:8000/sliders`);
		const allSliderInfo = (await response.json()) as TSliders;
		setSliderInfo(allSliderInfo.homeHeadrSliders);
	};
	useEffect(() => {
		getHeaderSiderInfo();
	});
	return (
		<>
			<Swiper
				spaceBetween={30}
				effect={sliderInfo?.effect}
				navigation={true}
				pagination={{
					clickable: true,
				}}
				modules={[EffectFade, Navigation, Pagination]}
				className="mySwiper"
			>
				{sliderInfo?.items.map(item => (
					<SwiperSlide>
						<HeaderHomeSliderItem>
							<img
								src={item.image}
								alt=""
								className="w-full h-full object-cover z-0"
							/>
							{/* نوشته‌ها روی تصویر */}
							<Link href={item.link}>
								<div className="absolute top-10 left-8 z-40 bg-violet-800/50 backdrop-blur-md px-2 py-2 rounded-xl ">
									<h3 className="text-3xl font-bold text-black">
										{item.title}
									</h3>
									<p className="mt-2 text-lg text-gray-800">
										{item.subItem}
									</p>
								</div>
							</Link>
						</HeaderHomeSliderItem>
					</SwiperSlide>
				))}
			</Swiper>
		</>
	);
}
