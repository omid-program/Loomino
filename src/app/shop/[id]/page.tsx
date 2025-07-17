import CommentsImport from '@/Components/Comments/CommentsImport/CommentsImport';
import CommentsShow from '@/Components/Comments/CommentsShow/CommentsShow';
import Container from '@/Components/Container/Container';
import SmartImg from '@/Components/SmartImg/SmartImg';
import {
	TAllProductData,
	TInStoreAllProduct,
	TProductPageParams,
	TSpetialOfferData,
	TspetialOfferList,
} from '@/types';
import Link from 'next/link';
import React from 'react';
import { API_BASE_URL } from './../../../../config';

async function ProductPage({ params }: TProductPageParams) {
	const { id } = await params;
	console.log('productPage=>', id);
	const response = await fetch(`${API_BASE_URL}/fabrics/${id}`);
	const productData = (await response.json()) as TAllProductData;

	const spOfferRes = await fetch(`${API_BASE_URL}/spetialOffer`);
	const spOfferData = (await spOfferRes.json()) as TSpetialOfferData;

	const colorList = productData?.inStore as TInStoreAllProduct[];
	//if(spetialOfferDtata.pspetialOfferDataList.filter(item)=>item.id ===id){
	// /...
	// }
	let finalPrice = Number(productData.price);
	if (spOfferData.spetialOfferList) {
		const item = spOfferData.spetialOfferList.find(
			(i: TspetialOfferList) => i.productId === id
		);
		if (item) {
			finalPrice =
				productData.price -
				productData.price * (Number(item?.persentage) / 100);
		}
	} else {
		finalPrice = Number(productData.price);
	}
	console.log('finalPrice', finalPrice);

	const productPrice = Number(productData?.price);
	console.log(colorList);

	return (
		<Container>
			<div className="grid grid-cols-10 gap-16 justify-center items-center md:items-start  ">
				<div className="col-span-10 justify-center w-10/12 mx-auto md:col-span-3 md:w-full ">
					<SmartImg
						id={id}
						colorList={colorList}
						price={finalPrice}
						perTitle={productData.perTitle}
					/>
				</div>
				<div className="col-span-10 flex flex-col items-center md:col-span-7 my-2 md:my-8  ">
					<div className="flex flex-col mb-16 border-2 border-violet-600 rounded-xl px-2 py-4 w-10/12 md:w-11/12 md:mx-auto ">
						<h1 className="text-3xl my-3">{productData?.perTitle}</h1>
						<div className="bg-violet-50 px-2 rounded-xl min-h-80 py-4">
							<p>{productData?.perDescription}</p>
						</div>
					</div>
					<div className="grid grid-cols-4 gap-5 w-10/12 md:grid-cols-3 md:w-11/12 mx-auto shadow-md shadow-violet-300 rounded px-2 py-4 min-h-52 max-h-56 overflow-y-scroll">
						<div className="col-span-4 text-center">
							<h2 className="text-xl ">
								شاید این نوع پارچه ها را هم بپسندید😉
							</h2>
						</div>
						{productData.tags.map(tag => (
							<Link key={tag.id} href={`/tags/${tag.id}`}>
								<div className='border-r-4 rounded-l-md p-1 border-violet-600 bg-violet-50'>{tag.perTitle}</div>
							</Link>
						))}
					</div>
				</div>
			</div>
			<div className="">
				<CommentsImport
					productId={id}
					productTitle={productData.perTitle}
					productImg={productData.defImg}
				/>
			</div>
			<CommentsShow id={id} />
		</Container>
	);
}

export default ProductPage;
