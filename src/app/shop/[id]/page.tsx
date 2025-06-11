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

async function ProductPage({ params }: TProductPageParams) {
	const { id } = await params;
	console.log('productPage=>', id);
	const response = await fetch(`http://localhost:8000/fabrics/${id}`);
	const productData = (await response.json()) as TAllProductData;

	const spOfferRes = await fetch(`http://localhost:8000/spetialOffer`)
	const spOfferData = await spOfferRes.json() as TSpetialOfferData

	const colorList = productData?.inStore as TInStoreAllProduct[];
	//if(spetialOfferDtata.pspetialOfferDataList.filter(item)=>item.id ===id){
	// /...
	// }
	let finalPrice = Number(productData.price)
	if(spOfferData.spetialOfferList){
		const item = spOfferData.spetialOfferList.find((i:TspetialOfferList)=>i.productId === id)
		if(item){
			finalPrice = productData.price - (productData.price) * ((Number(item?.persentage) / 100))
		}
	}else{
		finalPrice = Number(productData.price)
	}
	console.log('finalPrice' , finalPrice);
	
	const productPrice = Number(productData?.price);
	console.log(colorList);
	
	return (
		<Container>
			<div className="grid grid-cols-4">
				<div className="col-span-1">
					<SmartImg id={id} colorList={colorList} price={finalPrice} perTitle={productData.perTitle} />
				</div>
				<div className="col-span-3 justify-center items-center gap-8">
					<div className="flex flex-col ">
						<h1 className="text-3xl">{productData?.perTitle}</h1>
						<div>
							<p>{productData?.perDescription}</p>
						</div>
						
					</div>
					<div className="flex gap-1 w-5/6 border-2 border-rose-600 rounded">
						{productData.tags.map(tag => (
							<Link key={tag.id} href={`/tags/${tag.id}`}>
								<div>{tag.perTitle}</div>
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
			<CommentsShow id={id}/>

		</Container>
	);
}

export default ProductPage;
