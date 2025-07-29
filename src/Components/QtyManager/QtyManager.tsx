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
	const { id, colorCode, price, colorId, perTitle, colorQtys } = props;
	const [userProductPrice, setUserProductPrice] = useState<number>(0);
	const [maxMeterValue ,setMaxMeterValue ] = useState<number | null>(null )
	const { addOrdToCart, removeProductFromCart, userOrd } =
		useShappingCartContext();
		useEffect(()=>{
			colorQtys &&
			setMaxMeterValue(Math.floor(colorQtys))
		},[])

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
			if (
				ord.colorId === colorId
				// && ord.colorCode === colorCode
			) {
				console.log('userOrd => ', userOrd);

				setMeterVal(Math.floor(ord.qty));
				setCentiMeterVal(Math.floor((ord.qty - Math.floor(ord.qty)) * 100));
			}
		});
		console.log('price=>', price);
	}, [colorCode, id, colorId]);
	// console.log('qtyManager=> ',id);


	return (
		<div className='flex flex-col justify-between'>
			<div className="grid grid-cols-5 gap-2 px-1 py-2 border">
				<div className="grid col-span-2 grid-cols-2 border-l-2 border-textMainMuted items-center px-1">
					<label className="col-span-1 text-textMainMuted" htmlFor="meterInputId">
						متر:
					</label>
					<input
						min={0}
						max={maxMeterValue || 100}
						className=" bg-bg text-center col-span-1 border-b-2 border-dashed border-textMainMuted "
						id="meterInputId"
						type="number"
						placeholder="متر"
						value={meterVal}
						onChange={e => setMeterVal(Number(e.target.value))}
					/>
				</div>
				<div className="grid col-span-3 grid-cols-3 text-textMainMuted">
					<label className="col-span-2" htmlFor="centiMeterInputId">
						سانتی متر
					</label>
					<input
						min={0}
						max={100}
						id="centiMeterInputId"
						className=" bg-bg text-center col-span-1 border-b-2 border-dashed border-textMainMuted "
						type="number"
						placeholder="سانتی متر"
						value={centiMeterVal}
						onChange={e => setCentiMeterVal(Number(e.target.value))}
					/>
				</div>
				{/* Part of Price Show */}
			</div>
			<div className="grid grid-rows-2 ">
				<div id="price-of-one-meter" className="grid grid-cols-2 border ">
					<div className="grid col-span-1 text-center border border-textMainMuted py-2 bg-inherit rounded-tr-md">
						قیمت یک متر:
					</div>
					{price && (
						<div className="grid col-span-1 text-center border border-textMainMuted py-2 bg-inherit rounded-tl-md">
							{formatPrice(Number(price))}
						</div>
					)}
				</div>
				<div
					id="price-of-one-meter"
					className="grid grid-cols-2 border rounded-md "
				>
					<div className="grid col-span-1 text-center border border-textMainMuted py-2 bg-inherit rounded-br-md">
						قیمت {baskeFormatMeter(meterVal, centiMeterVal)} متر:
					</div>
					{price && (
						<div className="grid col-span-1 text-center border border-textMainMuted py-2 bg-inherit rounded-bl-md">
							{formatPrice(Math.floor(userProductPrice))}
						</div>
					)}
				</div>
			</div>

			{/* btns for contril cart */}
			{/* دکمه های کنترل محصول برا سبد خرید */}
			<div id="qty-manager-btns" className="grid grid-cols-5 gap-2 my-2">
				{/* add BTN */}
				<div className="col-span-4">
					<button
						className=" w-full mx-auto px-1 py-2 rounded-md shadow-md shadow-textMainMuted border-2 border-textMain"
						onClick={() => {
							// addOrdToCart(id, meterVal, centiMeterVal, colorCode , Number(price));
							if (colorId && perTitle) {
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
							if (colorId) {
								removeProductFromCart(id, colorId);
							}
						}}
						className=" grid col-span-1 size-11 shadow-md shadow-rose-400 rounded-full p-1 text-rose-600 items-center justify-center "
					>
						<RiDeleteBinLine className="text-rose-600" />
					</button>
				</div>
			</div>
		</div>
	);
}

export default QtyManager;
