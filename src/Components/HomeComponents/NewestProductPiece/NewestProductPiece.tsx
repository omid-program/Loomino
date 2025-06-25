import React from 'react';
import TitleSectionHome from '../TitleSectionHome/TitleSectionHome';
import { TAllProductData, TSpetialOfferData } from '@/types';
import ProductBox from '@/Components/ProductBox/ProductBox';
import Link from '@/next/link';
import ProductCard from '@/Components/Cards/ProductCard/ProductCard';

async function NewestProductPiece() {
	const res = await fetch(`http://localhost:8000/fabrics`);
	const datas = (await res.json()) as TAllProductData[];

	const spOfferRes = await fetch(`http://localhost:8000/spetialOffer`);
	const spOfferData = (await spOfferRes.json()) as TSpetialOfferData;

	const newestProducts = datas
		.sort((a, b) => {
			const astok = Number(a.createdAt.slice(0, 10).replace(/-/g, ''));
			const bstok = Number(b.createdAt.slice(0, 10).replace(/-/g, ''));
			return bstok - astok;
		})
		.slice(0, 4);
	// console.log("newestProducts=> " , newestProducts);

	return (
		<div className='bg-violet-100 p-1 rounded-lg my-8'>
			<TitleSectionHome title="جدیدترین پارچه ها" />
			<main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-screen-lg mx-auto p-4 font-yekan">
				{newestProducts.map(product => {
					const item = spOfferData.spetialOfferList?.find(
						offer => offer.productId === product.id
					);
					return (
						<Link
							href={`http://localhost:3000/shop/${product.id}`}
							key={product.id}
						>
							<ProductCard
								{...product}
								offerPersentage={item?.persentage}
							/>
						</Link>
					);
				})}
			</main>
		</div>
	);
}

export default NewestProductPiece;
