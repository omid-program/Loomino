import CatCard from '@/Components/Cards/CatCard/CatCard';
import Container from '@/Components/Container/Container';
import HeaderStatic from '@/Components/HeaderStatic/HeaderStatic';
import BestSellingSmart from '@/Components/HomeComponents/BestSellingSmart/BestSellingSmart';
import HomeDesignGapToImg from '@/Components/HomeComponents/homeDesign/HomeDesignGap/HomeDesignGapToImg-1';
import InThisSesson from '@/Components/HomeComponents/InThisSesson/InThisSesson';
import NewestProductPiece from '@/Components/HomeComponents/NewestProductPiece/NewestProductPiece';
import SpetialOffer from '@/Components/HomeComponents/SpetialOffer/SpetialOffer';
import StorePiece from '@/Components/HomeComponents/StorePiece/StorePiece';
import React from 'react';
import { API_BASE_URL } from './../../config';
function Home() {
	console.log(new Date().toISOString().slice(0, 10).split('-').join(''));
	return (
		<div>
			{<HeaderStatic />}
			<Container>
				<main>
					{/* categiry-section */}
					<section className="bg-bg">
						<StorePiece
							kind="cats"
							api={`${API_BASE_URL}/cats`}
							title="دسته بندی ها"
						/>
						<div>
							<img
								src="Home-page/cat-section-1.png"
								alt=""
								className="w-full rounded-tr-full rounded-bl-full"
							/>
						</div>
					</section>

					<BestSellingSmart
						api={`${API_BASE_URL}/ords`}
						title="پر فروش‌ترین‌ها"
					/>

					<NewestProductPiece />

					<HomeDesignGapToImg
					title='لومینو'
					description='مدرن‌ترین فروشگاه پارچه با امتیازات و ابزار های ویژه'
					secendDescription='محیطی ویژه برای خرید جدیدترین پارچه‌ها'
					/>

					<InThisSesson />
					<SpetialOffer />
					{/* <HeaderHomeSlider/> */}
					{/* <HeaderHomeSlider2/> */}

					{/* <PagesTitle title="خانه" /> */}
				</main>
			</Container>
		</div>
	);
}

export default Home;
