import { TAllProductData, TProductBoxData, TSpetialOfferData } from '@/types';
import React from 'react';
import TitleSectionHome from '../TitleSectionHome/TitleSectionHome';
import Link from '@/next/link';
import ProductBox from '@/Components/ProductBox/ProductBox';
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import SpetialOfferTimer from '../SpetialOfferTimer/SpetialOfferTimer';

async function SpetialOffer() {
   dayjs.extend(duration)

	const proRes = await fetch(`http://localhost:8000/fabrics`);
	const proData = (await proRes.json()) as TAllProductData[];

	const offerRes = await fetch(`http://localhost:8000/spetialOffer`);
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
		<div>
			<TitleSectionHome title="فروش ویژه" />
			<div className="grid grid-cols-4">
				{combineProductOffer.map(product => {
					// const item = spOfferData.spetialOfferList?.find(
					// 	offer => offer.productId === product.id
					// );
					return (
						<Link
							href={`http://localhost:3000/shop/${product.id}`}
							key={product.id}
						>
							<ProductBox
								{...product}
								offerPersentage={product.persentage}
							/>
						</Link>
					);
				})}
			</div>
         {/* <SpetialOfferTimer expierTime={offerData.time}/> */}
		</div>
	);
}

export default SpetialOffer;
