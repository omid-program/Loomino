import React from 'react';
import TitleSectionHome from '../TitleSectionHome/TitleSectionHome';
import { TAllProductData, TSpetialOfferData } from '@/types';
import ProductBox from '@/Components/ProductBox/ProductBox';
import Link from '@/next/link';

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
		<div>
			<TitleSectionHome title="جدیدترین پارچه ها" />
			<div className="grid grid-cols-4">
				{newestProducts.map(product => {
					const item = spOfferData.spetialOfferList?.find(
						offer => offer.productId === product.id
					);
					return (
						<Link
							href={`http://localhost:3000/shop/${product.id}`}
							key={product.id}
						>
							<ProductBox
								{...product}
								offerPersentage={item?.persentage}
							/>
						</Link>
					);
				})}
			</div>
		</div>
	);
}

export default NewestProductPiece;
