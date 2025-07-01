import CatCard from '@/Components/Cards/CatCard/CatCard';
import Container from '@/Components/Container/Container';
import HeaderStatic from '@/Components/HeaderStatic/HeaderStatic';
import BestSellingSmart from '@/Components/HomeComponents/BestSellingSmart/BestSellingSmart';
import InThisSesson from '@/Components/HomeComponents/InThisSesson/InThisSesson';
import NewestProductPiece from '@/Components/HomeComponents/NewestProductPiece/NewestProductPiece';
import SpetialOffer from '@/Components/HomeComponents/SpetialOffer/SpetialOffer';
import StorePiece from '@/Components/HomeComponents/StorePiece/StorePiece';
import PagesTitle from '@/Components/PageTitle/PagesTitle';
import HeaderHomeSlider from '@/Components/Sliders/HeaderHomeSlider/HeaderHomeSlider';
import HeaderHomeSlider2 from '@/Components/Sliders/HeaderHomeSlider2/HeaderHomeSlider2';
import React from 'react';

function Home() {
	console.log(new Date().toISOString().slice(0, 10).split('-').join(''));
	return (
		<div>
			{<HeaderStatic />}
			<Container>
				<BestSellingSmart
					api="http://localhost:8000/ords"
					title="پر فروش‌ترین‌ها"
				/>


				{/* cat-pies */}
				<StorePiece
					kind="cats"
					api="http://localhost:8000/cats"
					title="دسته بندی ها"
				/>

				<NewestProductPiece />
				<InThisSesson />
				<SpetialOffer />
				{/* <HeaderHomeSlider/> */}
				{/* <HeaderHomeSlider2/> */}

				{/* <PagesTitle title="خانه" /> */}
			</Container>
		</div>
	);
}

export default Home;
