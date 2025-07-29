'use client';
import { TAllOrdData, TStatusRulles } from '@/types';
import React, { useEffect, useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { IoIosArrowBack } from 'react-icons/io';
import { statusRules } from '@/rules/statusRules/StatusRules';
import axios from 'axios';
import OrdDetailModal from './OrdDetailModal/OrdDetailModal';
import OrdAddresModal from './OrdAddresModal/OrdAddresModal';
import { formatPrice } from '@/utils/price';
import { API_BASE_URL } from './../../../../config';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@/@mui/material/esm';

function OrdTableBox(props: TAllOrdData) {
	const { id, date, orders, country, city, address, statusCode, state } =
		props;
	const [totalPrice, setTotalPrice] = useState<number>();
	const [statosRulleOrd, setStatosRulleOrd] = useState<TStatusRulles | null>(
		null
	);
	const [statusCodeState, setStatusCodeState] = useState(statusCode);
	const [isLoading, setIsLoadndg] = useState(false);
	const darkMode = createTheme({
		palette: { mode: 'dark' },
	});
	// console.log('OrdTableBox-props-orders=>', orders);
	console.log('OrdTableBox-props-date=>', date);

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
			await axios.patch(`${API_BASE_URL}/ords/${id}`, {
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
			{/* date */}
			<div className="grid col-span-1 text-center py-2 border-x ">
				{date.pertionDate.year}/{date.pertionDate.month}/
				{date.pertionDate.day}-{date.pertionDate.time}
			</div>
			<ThemeProvider theme={darkMode}>
				<CssBaseline/>
			{/* ord-list */}
				<div className="grid col-span-1 text-center py-2 border-x ">
					<OrdDetailModal ords={orders} />
				</div>
				{/* ord-addres */}
				<div className="grid col-span-1 text-center py-2 border-x">
					<OrdAddresModal
						address={address}
						city={city}
						country={country}
						state={state}
					/>
				</div>
			</ThemeProvider>
			{/* price */}
			<div className="grid col-span-1 text-center py-2 border-x">
				{formatPrice(Number(totalPrice))} تومان{' '}
			</div>
			{/* change-status */}
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
					className={`text-center col-span-3 flex items-center justify-center text-lg ${
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
