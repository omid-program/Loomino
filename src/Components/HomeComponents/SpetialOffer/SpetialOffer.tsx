import { TAllProductData, TProductBoxData, TSpetialOfferData } from '@/types';
import React from 'react';
import TitleSectionHome from '../TitleSectionHome/TitleSectionHome';
import Link from '@/next/link';
import ProductBox from '@/Components/ProductBox/ProductBox';
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import SpetialOfferTimer from '../SpetialOfferTimer/SpetialOfferTimer';
import ProductCard from '@/Components/Cards/ProductCard/ProductCard';
import { API_BASE_URL } from './../../../../config';


async function SpetialOffer() {
   dayjs.extend(duration)

	const proRes = await fetch(`${API_BASE_URL}/fabrics`);
	const proData = (await proRes.json()) as TAllProductData[];

	const offerRes = await fetch(`${API_BASE_URL}/spetialOffer`);
	const offerData = (await offerRes.json()) as TSpetialOfferData;
   
   console.log(offerData.time);


	const combineProductOffer = proData.reduce((acc, product) => {
		const matchOffer = offerData.spetialOfferList?.find(
			so => so.productId === product.id
		);
		if (matchOffer) {
			acc.push({
				...product,
				persentage: matchOffer.persentage,
			});
		}
		return acc;
	}, [] as (TAllProductData & { persentage: string })[]);

	return (
		<div className='bg-violet-100 p-1 my-8 rounded-lg'>
			<TitleSectionHome title={offerData.description} />
			<main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-screen-lg mx-auto p-4 font-yekan">
				{combineProductOffer.map(product => {
					// const item = spOfferData.spetialOfferList?.find(
					// 	offer => offer.productId === product.id
					// );
					return (
						<Link
							href={`http://localhost:3000/shop/${product.id}`}
							key={product.id}
						>
							<ProductCard
								{...product}
								offerPersentage={product.persentage}
							/>
						</Link>
					);
				})}
			</main>
         {/* <SpetialOfferTimer expierTime={offerData.time}/> */}
		</div>
	);
}

export default SpetialOffer;
