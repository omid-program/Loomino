import Container from '@/Components/Container/Container';
import SpetialOfferListModal from '@/Components/DashboardTools/AddSpetialOfferData/SpetialOfferListModal/SpetialOfferListModal';
import PagesTitle from '@/Components/PageTitle/PagesTitle';
import Pagination from '@/Components/Pagination/Pagination';
import PaginationC from '@/Components/PaginationC/PaginationC';
import ProductBox from '@/Components/ProductBox/ProductBox';
import Search from '@/Components/Search/Search';
import {
	IPaginateShop,
	TAllProductData,
	TShopParams,
	TSpetialOfferData,
} from '@/types';
import Link from 'next/link';
import React from 'react';
import { deserialize } from 'v8';

async function Shop({ searchParams }: TShopParams) {
	// const response = await fetch(`http://localhost:8000/fabrics`);
	const page = (await searchParams).page ?? '1';
	const per_page = (await searchParams).per_page ?? '6';
	const title = (await searchParams).title ?? '';

	let url = `http://localhost:8000/fabrics?_page=${page}&_per_page=${per_page}`;

	if (title.trim()) {
		url += `&q=${encodeURIComponent(title)}`;
	}

	const response = await fetch(url, { cache: 'no-cache' });
	const allProducts = (await response.json()) as IPaginateShop;
	console.log(allProducts);

	// spetial-Offer / پیشنهاد ویژه
	const spOfferRes = await fetch(`http://localhost:8000/spetialOffer`);
	const spOfferData = (await spOfferRes.json()) as TSpetialOfferData;

	if (new Date(spOfferData.time) < new Date()) {
		await fetch(`http://localhost:8000/spetialOffer`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				id: '1',
				time: '',
				description: '',
				spetialOfferList: [],
			}),
		});
	}

	return (
		<Container>
			<div>
				<div>
					<PagesTitle title={'فروشگاه'} />
				</div>
				<div>
					<Search />
				</div>
			</div>
			<div className="grid grid-cols-4 gap-3">
				{allProducts.data &&
					allProducts.data.map(product => {
						const item = spOfferData.spetialOfferList?.find(
							offerItem => offerItem.productId === product.id
						);
						return (
							<Link key={product?.id} href={`/shop/${product?.id}`}>
								<ProductBox
									{...product}
									offerPersentage={item?.persentage}
									// {...spOfferData}
								/>
							</Link>
						);
					})}
			</div>
			<div>{/* <Pagination pageCount={allProducts.pages}/> */}</div>
			<PaginationC pageCount={2} />
		</Container>
	);
}

export default Shop;
