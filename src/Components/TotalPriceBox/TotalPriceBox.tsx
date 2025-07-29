'use client';
import { useShappingCartContext } from '@/context/ShappongCartContext';
import { TOffCodes, TUserOrds } from '@/types';
import { formatPrice } from '@/utils/price';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from './../../../config';

function TotalPriceBox() {
	const { userOrd, addOffcode, userOffCode } = useShappingCartContext();
	const [totalPrice, setTotalPrice] = useState(0);
	const [qtyList, setQtyList] = useState<number[]>([]);
	const [offCodeInput, setOffCodeInput] = useState<string>('');
	const [finalPrise, setFinalPrise] = useState<number>(totalPrice);
	const [userBenefit, setUserBenefit] = useState<number>(0);
	const [isValidOffCode, setIsValidOffCode] = useState<boolean>(false);
	console.log(userOrd); // چک کردن مقدار بسکت
	useEffect(() => {
		const qtyListMap = userOrd.map(ord => {
			return ord.qty;
		});
		setQtyList(qtyListMap);
	}, [userOrd]);
	console.log(qtyList);
	////////////////////////////////////
	useEffect(() => {
		const totalPriceReduse = userOrd.reduce((total, item) => {
			return Number(item.price) * Number(item.qty) + Number(total);
		}, 0);
		setTotalPrice(totalPriceReduse);
	}, [qtyList]);

	const offCodeHan = () => {
		axios(`${API_BASE_URL}/offs/?offCode=${offCodeInput}`).then(
			result => {
				console.log('result=>', result);

				const data = result.data as TOffCodes[];
				//if else
				// if ==> data=valid
				if (data.length === 1) {
					console.log('data=> ', data);
					let finalPrice =
						totalPrice - totalPrice * (data[0].persentage / 100);
					setFinalPrise(finalPrice);
					setUserBenefit(totalPrice - finalPrice);
					addOffcode(data[0].persentage);
					setIsValidOffCode(true);
				} else {
					setIsValidOffCode(false);
				}
			}
		);
	};

	return (
		<div className=" w-10/12  mx-5 border-2 border-accent px-2 py-4 my-8 rounded-md md:w-1/3">
			<div className="border-b-2 border-dashed border-gray-500 my-3 p-1 ">
				<span>قیمت کل:</span>
				<span>{formatPrice(totalPrice)}</span>
			</div>
			<div className="border-b-2 border-dashed border-gray-500">
				<div className="flex gap-3">
					<input
					placeholder='کد تخفیف:'
						value={offCodeInput}
						className="shadow-md shadow-accent bg-bg p-1 rounded-md"
						type="text"
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setOffCodeInput(e.target.value);
						}}
					/>
					<button
						onClick={offCodeHan}
						className="border-2 border-double border-primary rounded-md  text-textMainMuted px-1 py-2"
					>
						اعمال کد تخفیف
					</button>
				</div>
				<span
					className={`text-red-800 my-2 mt-1 ${
						!isValidOffCode ? 'block' : 'hidden'
					}`}
				>
					مقدار کد تخفیف معتبر نمی‌باشد
				</span>
				<span
					className={`text-green-700 mt-1 mb-2 ${
						isValidOffCode ? 'block' : 'hidden'
					}`}
				>
					کد تخفیف {userOffCode}% برای شما اعمال شد
				</span>
			</div>
			<div className="py-1 px-1">
				<span>سود شما: </span>
				<span>{formatPrice(userBenefit)}</span>
			</div>
			<div className="px-1 py-1">
				<span>قیمت نهایی: </span>
				<span>{formatPrice(finalPrise)}</span>
			</div>
		</div>
	);
}

export default TotalPriceBox;
