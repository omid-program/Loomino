import React from 'react';
import TitleSectionHome from '../TitleSectionHome/TitleSectionHome';
import { getTopSellingProductsAdvanced } from '@/utils/getTopSellingProductsAdvance';
import { TAllOrdData, TAllProductData, TSpetialOfferData } from '@/types';
import ProductCard from '@/Components/Cards/ProductCard/ProductCard';
import { log } from 'console';
import Link from '@/next/link';

async function BestSellingSmart(props: { title: string; api: string }) {
	const { api, title } = props;

	const productRes = await fetch(`http://localhost:8000/fabrics`);
	const productData = (await productRes.json()) as TAllProductData[];

	const spOfferRes = await fetch(`http://localhost:8000/spetialOffer`);
	const spOfferData = (await spOfferRes.json()) as TSpetialOfferData;

	const ordRes = await fetch(api);
	const ordData = (await ordRes.json()) as TAllOrdData[];

	const topSelling = getTopSellingProductsAdvanced(ordData, {
		sortBy: 'quantity',
		limit: 4,
	});
	const mergeTopToAll = topSelling.map(p => {
		return productData.find(ts => ts.id === p.id);
	});
	console.log('mergeTopToAll=> ', mergeTopToAll);

	return (
		<div className="bg-violet-100 rounded-lg p-1 my-8">
			<TitleSectionHome title={title} />
			<main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-screen-lg mx-auto p-4 font-yekan">
				{mergeTopToAll.map(product => {
					const spOfferItem = spOfferData.spetialOfferList?.find(
						item => item.productId === product?.id
					);
					return (
						<Link href={`http://localhost:3000/shop/${product?.id}`}>
							<ProductCard
								key={product?.id}
								offerPersentage={spOfferItem?.persentage}
								{...product}
							/>
						</Link>
					);
				})}
			</main>
		</div>
	);
}

export default BestSellingSmart;

// we can give more info in ords for getTopSellingProductsAdvanced function
// ords => orders => items => + defImg + minDescription,
// chcange-type: allOrdData
//       	engTitle:string
//          perMiniDescription: string
//          engMiniDescription : string
//          defImg: string
// change-ordManager
// submit-ord <= Cart <= UserOrd <= Context
