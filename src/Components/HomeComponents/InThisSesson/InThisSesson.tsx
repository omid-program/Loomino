import ProductBox from '@/Components/ProductBox/ProductBox';
import { TAllProductData, TSpetialOfferData } from '@/types';
import React from 'react';
import TitleSectionHome from '../TitleSectionHome/TitleSectionHome';
import { AiFillProduct } from '@/react-icons/ai';
import Link from '@/next/link';
import ProductCard from '@/Components/Cards/ProductCard/ProductCard';
import { API_BASE_URL } from './../../../../config';


async function InThisSesson() {
	const now = new Date().getUTCMonth() + 1;
	// const now = 12
	const res = await fetch(`${API_BASE_URL}/fabrics`);
	const data = (await res.json()) as TAllProductData[];

	const spOfferRes = await fetch(`${API_BASE_URL}/spetialOffer`);
	const spOfferData = (await spOfferRes.json()) as TSpetialOfferData;

	let sessonTag = '';
	let sessonName = '';
	let sessonEmogy = '';

	if ((now > 0 && now < 3) || now === 12) {
		sessonTag = 'winterCloth';
		sessonName = 'زمستانی';
		sessonEmogy = '❄️';
	} else if (now >= 3 && now <= 5) {
		sessonTag = 'springCloth';
		sessonName = 'بهاری';
		sessonEmogy = '🌻';
	} else if (now >= 6 && now <= 8) {
		sessonTag = 'summerCloth';
		sessonName = 'تابستانی';
		sessonEmogy = '🔥';
	} else if (now >= 9 && now >= 11) {
		sessonTag = 'autumnCloth';
		sessonName = 'پاییزی';
		sessonEmogy = '🍂';
	}
	const seasonProducts = data
		.filter(product => product.tags.some(tag => tag.TagName === sessonTag))
		.slice(0, 4);

	// console.log('sessonProduct=> ', seasonProducts);
	return (
		<div className="my-8 bg-violet-100 rounded-lg p-1">
			<div className="flex gap-2 text-xl">
				<span>
					<AiFillProduct />
				</span>
				<h3 className="">
					پارچه های هوای {sessonName}
					{sessonEmogy}
				</h3>
			</div>{' '}
			<main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-screen-lg mx-auto p-4 font-yekan">
				{/* {seasonProducts.map(prod => (
					<Link
						href={`http://localhost:3000/shop/${prod.id}`}
						key={prod.id}
					>
						<ProductBox {...prod} />
					</Link>
				))} */}
				{seasonProducts.map(product => {
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

export default InThisSesson;
