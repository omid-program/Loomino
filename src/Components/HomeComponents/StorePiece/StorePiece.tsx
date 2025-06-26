import ProductBox from '@/Components/ProductBox/ProductBox';
import { TProductBoxData, TSpetialOfferData } from '@/types';
import Link from 'next/link';
import React from 'react';
import TitleSectionHome from '../TitleSectionHome/TitleSectionHome';
import CatItemBox from '@/Components/CartTools/CatItemBox/CatItemBox';
import CatCard from '@/Components/Cards/CatCard/CatCard';
import ProductCard from '@/Components/Cards/ProductCard/ProductCard';

async function StorePiece(props: {
	title: string;
	api: string;
	kind: 'shop' | 'cats';
}) {
	const { api, title, kind } = props;
	const res = await fetch(api);
	const data = (await res.json()) as TProductBoxData[];

	// spetial-Offer / پیشنهاد ویژه
	const spOfferRes = await fetch(`http://localhost:8000/spetialOffer`);
	const spOfferData = (await spOfferRes.json()) as TSpetialOfferData;

	return (
		<div className="bg-violet-100 rounded-lg p-1 my-8">
			<TitleSectionHome title={title} />
			<main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-screen-lg mx-auto p-4 font-yekan">
				{data.map(product => {
					const item = spOfferData.spetialOfferList?.find(
						offer => offer.productId === product.id
					);
					if (kind === 'shop') {
						return (
							<Link
								href={`http://localhost:3000/${kind}/${product.id}`}
								className="col-span-1"
								key={product.id}
							>
								<ProductCard
									{...product}
									offerPersentage={item?.persentage}
								/>
							</Link>
						);
					} else {
						return (
							<Link
								href={`http://localhost:3000/${kind}/${product.id}`}
								className="col-span-1"
							>
								<div>
									<CatCard {...product} />
								</div>
							</Link>
						);
					}
				})}
			</main>
		</div>
	);
}

export default StorePiece;
