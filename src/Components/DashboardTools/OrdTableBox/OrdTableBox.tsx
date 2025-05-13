'use client';
import { TAllOrdData, TStatusRulles } from '@/types';
import React, { useEffect, useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { IoIosArrowBack } from 'react-icons/io';
import { statusRules } from '@/rules/statusRules/StatusRules';
import axios from 'axios';
import { patch } from '@mui/material';

function OrdTableBox(props: TAllOrdData) {
	const { id, date, orders, country, city, address, statusCode } = props;
	const [totalPrice, setTotalPrice] = useState<number>();
	const [statosRulleOrd, setStatosRulleOrd] = useState<TStatusRulles | null>(
		null
	);
	const [statusCodeState, setStatusCodeState] = useState(statusCode);
	const [isLoading, setIsLoadndg] = useState(false);


	useEffect(() => {
		if (!orders) return;

		const totalPriceReduse = orders
			.flatMap(ord => ord.items) // تبدیل همه items به یک آرایه تخت
			.reduce((total, item) => {
				return item.price * item.qty + total;
			}, 0);

		setTotalPrice(totalPriceReduse);
		console.log('totalPriceReduse => ', totalPriceReduse);
	}, [orders]);

	useEffect(() => {
		const selectStatus = statusRules.find(rulls => {
			return rulls.statusCode === statusCodeState;
		});
		console.log(selectStatus);

		setStatosRulleOrd(selectStatus || null);
	}, [statusCodeState]);

	const changeStatusHand = async (newStatusCode: number) => {
		if (isLoading) {
			return;
		}
		try {
			await axios.patch(`http://localhost:8000/ords/${id}`, {
				statusCode: newStatusCode,
			});
			setStatusCodeState(newStatusCode);
		} catch (error) {
			console.log('خطا در ارتباط با سرور', error);
			alert('خطا در بروز رسانی وضعیت');
		} finally {
			setIsLoadndg(false);
		}
	};

	const nextStatusHand = () => {
		if (statusCodeState < 4) {
			changeStatusHand(statusCodeState + 1);
		}
	};

	const prevStatusHand = () => {
		if (statusCodeState > -1) {
			changeStatusHand(statusCodeState - 1);
		}
	};

	return (
		<div className="grid grid-cols-5 border">
			<div className="grid col-span-1 text-center ">
				{date.pertionDate.year}/{date.pertionDate.month}/
				{date.pertionDate.day}-{date.pertionDate.time}
			</div>
			<div className="grid col-span-1 text-center">{orders.length}محصول</div>
			<div className="grid col-span-1 text-center">
				{country} - {city}
			</div>
			<div className="grid col-span-1 text-center">{totalPrice}</div>
			<div className="grid col-span-1 text-center grid-cols-5 px-3">
				<button
					onClick={nextStatusHand}
					disabled={statusCodeState >= 4 || isLoading}
					className={`col-span-1 text-center ${
						statusCodeState >= 4 && 'opacity-50 cursor-not-allowed'
					}`}
				>
					<IoIosArrowForward />
				</button>
				<span
					className={`text-center col-span-3 ${
						statosRulleOrd?.style || 'bg-gray-200'
					}`}
				>
					{isLoading ? 'درحال به روز رسانی' : statosRulleOrd?.label}
				</span>

				<button
					onClick={prevStatusHand}
					disabled={statusCodeState <= -1 || isLoading}
					className={`col-span-1 text-center ${
						statusCodeState <= -1 && 'opacity-50 cursor-not-allowed'
					}`}
				>
					<IoIosArrowBack />
				</button>
			</div>
		</div>
	);
}

export default OrdTableBox;
