'use client';
import React, { useEffect, useState } from 'react';
import QtyManager from '../../QtyManager/QtyManager';
import {
	TAllProductData,
	TCartItemProps,
	TInStoreAllProduct,
	TSpetialOfferData,
	TspetialOfferList,
} from '@/types';
import axios from 'axios';
import Link from '@/next/link';

function CartItem(props: TCartItemProps) {
	const { id, colorId, colorCode, price } = props;
	const [productDatas, setProductDatas] = useState<TAllProductData | null>(
		null
	);
	const [imageCartItem, setImageCartItem] = useState<
		TInStoreAllProduct | undefined
	>();
	const [spOfferDataState, setSpOfferDataState] =
		useState<TSpetialOfferData>();
	const [finalPrice2, setFinalPrice2] = useState<number>(price || 0);

	// finalPrice geting Function

	const getSpetialOffer = async () => {
		const spOfferRes = await fetch(`http://localhost:8000/spetialOffer`);
		const spOfferData = (await spOfferRes.json()) as TSpetialOfferData;
		setSpOfferDataState(spOfferData);
	};

	const finalPriceMaker = async () => {
		if (spOfferDataState?.spetialOfferList) {
			const item = spOfferDataState.spetialOfferList.find(
				(i: TspetialOfferList) => i.productId === id
			);
			if (item && productDatas?.price) {
				console.log('item=>', item);

				setFinalPrice2(
					productDatas.price -
						productDatas.price * (Number(item?.persentage) / 100)
				);
			}
		}
	};

	// گرفتن اطلاعات محصول از API
	useEffect(() => {
		axios(`http://localhost:8000/fabrics/${id}`).then(result => {
			setProductDatas(result.data);
		});
		getSpetialOffer();
	}, [id]); // فقط وقتی id تغییر کنه دوباره fetch بشه

	// تنظیم تصویر محصول بر اساس رنگ انتخاب شده
	useEffect(() => {
		if (productDatas?.inStore) {
			const imageItem = productDatas.inStore.find(
				item => item?.colorCode === colorCode
			);
			setImageCartItem(imageItem);
		}
	}, [productDatas, colorCode]); // وابستگی روی productDatas و colorCode

	useEffect(() => {
		console.log('CartItemProps=> ', props);
		console.log('spOfferDataState=> ', spOfferDataState);

		finalPriceMaker();
	}, [spOfferDataState, productDatas]);

	useEffect(() => {
		console.log('finalPrice2=>', finalPrice2);
	}, [finalPrice2]);

	// let finalPrice = Number(productDatas?.price);
	// if (spOfferDataState?.spetialOfferList) {
	// 	const item = spOfferDataState.spetialOfferList.find(
	// 		(i: TspetialOfferList) => i.productId === id
	// 	);
	// 	if (item && productDatas?.price) {
	// 		finalPrice =
	// 			productDatas.price -
	// 			productDatas.price * (Number(item?.persentage) / 100);
	// 	}
	// } else {
	// 	finalPrice = Number(productDatas?.price);
	// }

	return (
		<div className="grid col-span-1 grid-cols-2 shadow-lg shadow-violet-200 my-2 rounded-md p-2 gap-2">
			<div className="col-span-1 rounded-sm bg-cover overflow-hidden">
				{imageCartItem && (
					<Link href={`http://localhost:3000/shop/${id}`}>
						<img
							src={imageCartItem.colorImg}
							alt="Product Image"
							className=" rounded-sm"
						/>
					</Link>
				)}
			</div>
			<div className=" grid col-span-1 justify-between ">
				<h3 className="text-2xl font-bold">{productDatas?.perTitle}</h3>
				{finalPrice2 && (
					<QtyManager
						perTitle={productDatas?.perTitle}
						id={id}
						colorId={colorId}
						colorCode={colorCode}
						price={finalPrice2}
					/>
				)}
			</div>
			{/* <div className="grid col-span-4 "> */}
			{/* <p>{productDatas?.perMiniDescription}</p> */}
			{/* </div> */}
		</div>
	);
}

export default CartItem;
