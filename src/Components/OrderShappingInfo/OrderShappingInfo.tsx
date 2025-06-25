'use client';
import React, { useState } from 'react';
import OrderShappingInfoInput from './OrderShappingInfoInput/OrderSappingInfoInput';
import {
	TInputItem,
	TOrdDateState,
	TOrderShappingInfoInputProps,
} from '@/types';
import axios from 'axios';
import {
	ShappingCartContextProvider,
	useShappingCartContext,
} from '@/context/ShappongCartContext';
import { format, toDate } from 'date-fns-jalali';
import { LuNotebookPen } from 'react-icons/lu';

function OrderShappingInfo() {
	// ------------function for colected information---------------
	const [orderShappingInfo, setOrderShappingInfo] = useState({
		name: '',
		country: '',
		state: '',
		city: '',
		address: '',
		phoneNumber: '',
		emailAddres: '',
	});
	const [isShowEmpthyCartError, setIsShowEmpthyCartError] =
		useState<boolean>(false);
	const { userOrd, userOffCode } = useShappingCartContext();

	const sendNewOrdInfo = (name: string, value: string) => {
		setOrderShappingInfo({
			...orderShappingInfo,
			[name]: value,
		});
		console.log(orderShappingInfo);
	};

	// --------- make isodate => jalali------------------

	const convertToJalali = (isoDate: string) => {
		const dateObg = toDate(isoDate);
		return {
			year: format(dateObg, 'yyyy'),
			month: format(dateObg, 'MM'),
			day: format(dateObg, 'dd'),
			time: format(dateObg, 'HH:mm'),
		};
	};
	const submitedOrdHand = async () => {
		const now = new Date();
		const isoDate = now.toISOString();
		const formatDate = convertToJalali(isoDate);
		// console.log(formatDate);
		// ---------------totalPrice?------------------

		const basketPrice = userOrd.reduce((total, price) => {
			return total + price.price;
		}, 0);
		const finalPrice = basketPrice - basketPrice * (userOffCode / 100);

		// _________________________________________________________________________

		// const basketPrice = userOrd.flatMap(ord=>{
		// 	return ord.items
		// }).reduce((total , item)=>{
		// 	return Number(item.price) * Number(item.qty) + Number(total)
		// }, 0)
		// const finalPrice = basketPrice - (basketPrice * (userOffCode / 100))

		// const formatDate = {
		// 	year: now.toLocaleDateString('fa-IR', { year: 'numeric' }),
		// 	month: now.toLocaleDateString('fa-IR', { month: '2-digit' }),
		// 	day: now.toLocaleDateString('fa-IR', { day: '2-digit' }),
		// 	time: now.toLocaleTimeString('fa-IR', {
		// 		hour: '2-digit',
		// 		minute: '2-digit',
		// 	}),
		// };
		//  ---------send to database ----------
		try {
			await axios({
				method: 'POST',
				url: 'http://localhost:8000/ords',
				data: {
					id: crypto.randomUUID(),
					statusCode: 0,
					name: orderShappingInfo.name,
					country: orderShappingInfo.country,
					state: orderShappingInfo.state,
					city: orderShappingInfo.city,
					address: orderShappingInfo.address,
					phoneNumber: orderShappingInfo.phoneNumber,
					emailAddres: orderShappingInfo.emailAddres,
					orders: [
						{
							orderId: crypto.randomUUID(),
							date: isoDate,
							items: userOrd,
						},
					],
					// userOrd,
					finalPrice,
					userOffCode,
					date: {
						pertionDate: formatDate,
						isoDate: isoDate,
					},
				},
			});
			// setOrdDate(formatDate);
			// await axios({
			// 	method:'POST',
			// 	url:'http://localhost:8000/sailRaport',
			// 	data:{
			// 		date: formatDate,
			// 		basket: userOrd
			// 	}
			// })
			console.log('ارسال داده ها با موفقیت انجام شد');
		} catch (error) {
			console.log('خطا در ارسال داده ها', error);
		}
	};
	const submitedOrd = () => {
		if (userOrd.length > 0) {
			submitedOrdHand();
		} else {
			setIsShowEmpthyCartError(true);
		}
	};
	const ordInputItem: TInputItem[] = [
		{
			id: '8',
			name: 'name',
			label: 'نام و نام خانوادگی',
			type: 'text',
			isLong: false,
			size: 'md',
		},
		{
			id: '6',
			name: 'phoneNumber',
			label: 'شماره تماس',
			type: 'text',
			isLong: false,
			size: 'md',
		},
		{
			id: '7',
			name: 'emailAddres',
			label: 'آدرس ایمیل',
			type: 'text',
			isLong: false,
			size: 'md',
		},
		{
			id: '1',
			name: 'country',
			label: 'کشور',
			type: 'text',
			isLong: false,
			size: 'md',
		},
		{
			id: '2',
			name: 'state',
			label: 'شهر / ایالت',
			type: 'text',
			isLong: false,
			size: 'md',
		},
		{
			id: '3',
			name: 'city',
			label: 'شهر',
			type: 'text',
			isLong: false,
			size: 'md',
		},
		{
			id: '5',
			name: 'address',
			label: 'آدرس',
			type: '',
			isLong: true,
			size: 'lg',
		},
	];
	return (
		<div className=" my-8 px-4 py-6 shadow-lg shadow-violet-200 rounded-md">
			<div id="userInfoOrd" className='my-5 flex flex-row items-center'>
				<LuNotebookPen className='text-2xl font-bold ' />
				<h3 className="text-2xl font-bold">مشخصات جهت ارسال سفارش</h3>
			</div>
			<div className="flex flex-col gap-3 ">
				<div className="grid grid-cols-2 my-1 justify-between  items-center gap-4 w-full">
					{ordInputItem.map(inputItem => (
						<OrderShappingInfoInput
							key={inputItem.id}
							label={inputItem.label}
							name={inputItem.name}
							typeInput={inputItem.type}
							sendNewOrdInfo={sendNewOrdInfo}
							isLong={inputItem.isLong}
							size={inputItem.size}
						/>
					))}
				</div>
			</div>
			<div className="w-full mx-auto flex justify-center items-center">
				<p
					className={`text-red-600 ${
						isShowEmpthyCartError ? 'block' : 'hidden'
					}`}
				>
					سبد خرید شما نمیتواند خالی باشد
				</p>
				<button
					className="border-2 border-violet-500 rounded-md px-7 py-3 my-5 hover:bg-violet-200 hover:text-gray-700"
					onClick={submitedOrd}
				>
					ثبت سفارش
				</button>
			</div>
		</div>
	);
}

export default OrderShappingInfo;
