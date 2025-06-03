import ProductBox from '@/Components/ProductBox/ProductBox';
import { TAllProductData } from '@/types';
import React from 'react';
import TitleSectionHome from '../TitleSectionHome/TitleSectionHome';
import { AiFillProduct } from '@/react-icons/ai';
import Link from '@/next/link';

async function InThisSesson() {
	const now = new Date().getUTCMonth() + 1;
	// const now = 12
	const res = await fetch(`http://localhost:8000/fabrics`);
	const data = (await res.json()) as TAllProductData[];

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

	console.log('sessonProduct=> ', seasonProducts);
	return (
		<div className="my-8">
			<div className="flex gap-2 text-xl">
				<span>
					<AiFillProduct />
				</span>
				<h3 className="">
					پارچه های هوای {sessonName}
					{sessonEmogy}
				</h3>
			</div>{' '}
			<div className="grid grid-cols-4">
				{seasonProducts.map(prod => (
					<Link
						href={`http://localhost:3000/shop/${prod.id}`}
						key={prod.id}
					>
						<ProductBox {...prod} />
					</Link>
				))}
			</div>
		</div>
	);
}

export default InThisSesson;
