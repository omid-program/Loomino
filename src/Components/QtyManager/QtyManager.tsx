'use client';
import { useShappingCartContext } from '@/context/ShappongCartContext';
import { TQtyManagerProps } from '@/types';
import { baskeFormatMeter } from '@/utils/inputMeter';
import { formatPrice } from '@/utils/price';
import React, { useEffect, useState } from 'react';

import { RiDeleteBinLine } from 'react-icons/ri';

function QtyManager(props: TQtyManagerProps) {
	const [meterVal, setMeterVal] = useState<number>(0);
	const [centiMeterVal, setCentiMeterVal] = useState<number>(0);
	const { id, colorCode, price, colorId , perTitle } = props;
	const [userProductPrice, setUserProductPrice] = useState<number>(0);
	const { addOrdToCart, removeProductFromCart, userOrd } =
		useShappingCartContext();
	useEffect(() => {
		// if(price){
		setUserProductPrice(
			baskeFormatMeter(meterVal, centiMeterVal) * Number(price)
		);

		// }
		// console.log('userProductPrice => ' , userProductPrice);
	}, [meterVal, centiMeterVal]);

	useEffect(() => {
		userOrd.map(ord => {
			if (ord.colorId === colorId 
				// && ord.colorCode === colorCode
			) {
				console.log('userOrd => ', userOrd);

				setMeterVal(Math.floor(ord.qty));
				setCentiMeterVal(Math.floor((ord.qty - Math.floor(ord.qty)) * 100));
			}
		});
		console.log("price=>" , price);
		
	}, [colorCode, id , colorId]);
	// console.log('qtyManager=> ',id);

	return (
		<div>
			<div className="grid grid-cols-2">
				<div className="grid col-span-1">
					<label htmlFor="meterInputId">متر:</label>
					<input
						className="w-2/5"
						id="meterInputId"
						type="number"
						placeholder="متر"
						value={meterVal}
						onChange={e => setMeterVal(Number(e.target.value))}
					/>
				</div>
				<div className="grid col-span-1">
					<label htmlFor="centiMeterInputId">سانتی متر</label>
					<input
						id="centiMeterInputId"
						className="w-2/5"
						type="number"
						placeholder="سانتی متر"
						value={centiMeterVal}
						onChange={e => setCentiMeterVal(Number(e.target.value))}
					/>
				</div>
				<div>
					{/* Part of Price Show */}
					<div>
						<span>قیمت هر متر: </span>
						{price && <span>{formatPrice(Number(price))}</span>}
					</div>
					<div>
						<span>قیمت متراژ انتخابی: </span>
						<span>{formatPrice(Math.floor(userProductPrice))}</span>
					</div>
				</div>
			</div>
			{/* btns for contril cart */}
			{/* دکمه های کنتارل محصول برا سبد خرید */}
			<div className="grid grid-cols-5 gap-1">
				{/* add BTN */}
				<div className="col-span-4">
					<button
						className=" w-full mx-auto px-1 py-2 rounded-md bg-sky-400"
						onClick={() => {
							// addOrdToCart(id, meterVal, centiMeterVal, colorCode , Number(price));
							if (colorId) {
								addOrdToCart(
									id,
									perTitle,
									colorId,
									meterVal,
									centiMeterVal,
									colorCode,
									Number(price)
								);
							}
						}}
					>
						افزودن به سبد خرید
					</button>
				</div>
				{/* Remove BTN */}
				<div>
					<button
						onClick={() => {
                     if(colorId){
                        removeProductFromCart(id, colorCode);
                     }
						}}
						className=" grid col-span-1 size-full bg-red-700 rounded-full p-2 text-white items-center justify-center text-center"
					>
						<RiDeleteBinLine className="text-white" />
					</button>
				</div>
			</div>
		</div>
	);
}

export default QtyManager;
