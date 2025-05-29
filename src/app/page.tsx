import Container from '@/Components/Container/Container';
import HeaderStatic from '@/Components/HeaderStatic/HeaderStatic';
import InThisSesson from '@/Components/HomeComponents/InThisSesson/InThisSesson';
import NewestProductPiece from '@/Components/HomeComponents/NewestProductPiece/NewestProductPiece';
import StorePiece from '@/Components/HomeComponents/StorePiece/StorePiece';
import PagesTitle from '@/Components/PageTitle/PagesTitle';
import HeaderHomeSlider from '@/Components/Sliders/HeaderHomeSlider/HeaderHomeSlider';
import HeaderHomeSlider2 from '@/Components/Sliders/HeaderHomeSlider2/HeaderHomeSlider2';
import React from 'react';



function Home() {
	console.log(new Date().toISOString().slice(0 , 10).split('-').join(''));
	return (
		<div>
			{<HeaderStatic />}
			<Container>
				<StorePiece
					kind="shop"
					api="http://localhost:8000/bestSelles"
					title="پر فروش‌ترین‌ها"
				/>
				<StorePiece
					kind="cats"
					api="http://localhost:8000/cats"
					title="دسته بندی ها"
				/>
				<NewestProductPiece/>
				<InThisSesson/>
				{/* <HeaderHomeSlider/> */}
				{/* <HeaderHomeSlider2/> */}

				<PagesTitle title="خانه" />
			</Container>
		</div>
	);
}

export default Home;
