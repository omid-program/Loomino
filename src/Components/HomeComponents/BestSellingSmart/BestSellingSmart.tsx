import React from 'react';
import TitleSectionHome from '../TitleSectionHome/TitleSectionHome';
import { getTopSellingProductsAdvanced } from '@/utils/getTopSellingProductsAdvance';
import { TAllOrdData, TAllProductData, TSpetialOfferData } from '@/types';
import ProductCard from '@/Components/Cards/ProductCard/ProductCard';
import Link from '@/next/link';
import { API_BASE_URL, API_INSIDE_URL } from './../../../../config';

async function BestSellingSmart(props: { title: string; api: string }) {
	const { api, title } = props;

	const productRes = await fetch(`${API_BASE_URL}/fabrics`);
	const productData = (await productRes.json()) as TAllProductData[];

	const spOfferRes = await fetch(`${API_BASE_URL}/spetialOffer`);
	const spOfferData = (await spOfferRes.json()) as TSpetialOfferData;

	const ordRes = await fetch(api);
	const ordData = (await ordRes.json()) as TAllOrdData[];

	const validProductIds = new Set(productData.map(p => p.id));
	const filteredOrders = ordData.map(order => ({
		...order,
		orders: order.orders.map(subOrder => ({
			...subOrder,
			items: subOrder.items.filter(item => validProductIds.has(item.id)),
		})),
	}));

	const topSelling = getTopSellingProductsAdvanced(filteredOrders, {
		sortBy: 'quantity',
		limit: 4,
	});
	const mergeTopToAll = topSelling.map(p => {
		return productData.find(ts => ts.id === p.id);
	});
	// console.log('mergeTopToAll=> ', mergeTopToAll);

	return (
		<div className="border-2 border-primary shadow-sm shadow-accent rounded-lg p-1 my-8">
			<TitleSectionHome title={title} />
			<main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-screen-lg mx-auto p-4 font-yekan">
				{mergeTopToAll.map(product => {
					const spOfferItem = spOfferData.spetialOfferList?.find(
						item => item.productId === product?.id
					);
					return (
						<Link
							href={`/shop/${product?.id}`}
						>
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
