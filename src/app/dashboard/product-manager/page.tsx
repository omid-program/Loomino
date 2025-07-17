'use client';
import AddSpetialOfferData from '@/Components/DashboardTools/AddSpetialOfferData/AddSpetialOfferData';
import ProductManagerTable from '@/Components/DashboardTools/ProductManagerTable/ProductManagerTable';
import ProductManagerTable2 from '@/Components/DashboardTools/ProductManagerTable/ProductManagerTable2';
import { TspetialOfferList, TSpetialOfferData, TOfferPackData } from '@/types';
import React, { useEffect, useState } from 'react';
import { getDay, getMonth, getYear, newDate } from '@/date-fns-jalali';
import { API_BASE_URL } from './../../../../config';

function ProductManager() {
	const [spetialOfferList, setSpetialOfferList] = useState<
		TspetialOfferList[]
	>([]);

	// --- spetialOfferData --- //

	//|________________________________________________________________________________|
	//| const [spetialOfferData, setSpetialOfferData] = useState<TSpetialOfferData>({  |
	//| 	id: '1',																							  |
	//| 	time: '',																						  |
	//| 	description: '',																				  |
	//| 	spetialOfferList,																				  |
	//| });																									  |
	//|________________________________________________________________________________|

	const [offerPackData, setOfferPackData] = useState<TOfferPackData>({
		monthExpier: '',
		dayExpier: '',
		spetialOfferText: '',
	});

	// const [persentageSO, setPersentageSO] = useState<string>('');

	const changeOfferPackData = (name: string, value: string) => {
		setOfferPackData(prev => {
			return { ...prev, [name]: value };
		});
	};

	const getSpetialOferData = async () => {
		const spdRes = await fetch(`${API_BASE_URL}/spetialOffer`);
		const data = (await spdRes.json()) as TSpetialOfferData;
		const perMonth = String(getMonth(data.time));
		const perDay = String(getDay(data.time));
		setOfferPackData({
			dayExpier: perDay,
			monthExpier: perMonth,
			spetialOfferText: data.description,
		});
		if (data.spetialOfferList?.length) {
			setSpetialOfferList(data.spetialOfferList);
		}
	};

	useEffect(() => {
		getSpetialOferData();
	}, []);

	const addProToSpeOffer = (
		persentage: string,
		productId: string,
		perTitle: string,
		defImg: string
	) => {
		const productExists = spetialOfferList.some(
			item => item.productId === productId
		);

		if (!productExists) {
			// اضافه کردن محصول جدید
			const newItem = { productId, persentage, perTitle, defImg };
			setSpetialOfferList(prev => [...(prev || []), newItem]);
		} else {
			// به‌روزرسانی درصد تخفیف محصول موجود
			setSpetialOfferList(prev =>
				prev.map(item =>
					item.productId === productId ? { ...item, persentage } : item
				)
			);
		}
	};

	const removeProToSPeOffer = async (productId: string) => {
		try {
			// مرحله 1: حذف از استیت لوکال
			const updatedList = spetialOfferList.filter(
				item => item.productId !== productId
			);
			setSpetialOfferList(updatedList);

			// مرحله 2: ساخت نسخه کامل برای PUT
			const jalaliYear = getYear(new Date());

			const time = newDate(
				jalaliYear,
				Number(offerPackData?.monthExpier),
				Number(offerPackData?.dayExpier)
			);

			const updatedOffer = {
				id: '1', // چون تو دیتابیس فقط یک آبجکت داری
				time,
				description: offerPackData?.spetialOfferText || '',
				spetialOfferList: updatedList,
			};

			// مرحله 3: ارسال به سرور
			const res = await fetch(`${API_BASE_URL}/spetialOffer`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(updatedOffer),
			});

			if (!res.ok) throw new Error('❌ خطا در حذف از دیتابیس');

			console.log('✅ محصول با موفقیت حذف شد از دیتابیس');
		} catch (error) {
			console.error('خطا در حذف محصول:', error);
		}
	};

	const sendSpetialOffer = async (
		description: string,
		month: string,
		day: string,
		spetialOfferList: TspetialOfferList[]
	) => {
		if (!spetialOfferList.length) {
			alert('❌ لیست فروش ویژه خالی است.');
			return;
		}

		const jalaliYear = getYear(new Date());
		const time = newDate(jalaliYear, Number(month), Number(day));

		const newSpetialOffer = {
			id: '1',
			time,
			description,
			spetialOfferList,
		};

		try {
			const res = await fetch(`${API_BASE_URL}/spetialOffer`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(newSpetialOffer),
			});

			if (!res.ok) {
				throw new Error('خطا در ارسال اطلاعات به سرور');
			}

			console.log('🎉 ارسال با موفقیت انجام شد');
		} catch (err) {
			console.error('❌ ارسال با خطا مواجه شد:', err);
		}
	};
	const clearSpetialOffer = async () => {
		// clear local state
		try {
			setSpetialOfferList([]);
			setOfferPackData({
				dayExpier: '',
				monthExpier: '',
				spetialOfferText: '',
			});
			const clearRes = await fetch(`${API_BASE_URL}/spetialOffer`, {
				method: 'PUT',
				headers: { 'Content-Type': 'applocation/json' },
				body: JSON.stringify({
					id: '1',
					time: '',
					description: '',
					spetialOfferList: [],
				}),
			});
			if (!clearRes.ok) throw new Error('❌ خطا در حذف از دیتابیس');

			console.log('✅ محصول با موفقیت حذف شد از دیتابیس');
		} catch (error) {
			console.log(error, 'خطا در پاکسازی فروش ویژه');
		}
	};
	// const changePersentageSO = (persentageInput: string) => {
	// 	setPersentageSO(persentageInput);
	// };
	return (
		<div
			id="AddSpetialOfferData"
			className="flex flex-col items-center w-full"
		>
			<AddSpetialOfferData
				changeOfferPackData={changeOfferPackData}
				offerPackData={offerPackData}
				spetialOfferList={spetialOfferList}
				sendSpetialOffer={sendSpetialOffer}
				removeProToSPeOffer={removeProToSPeOffer}
				clearSpetialOffer={clearSpetialOffer}
			/>
			<ProductManagerTable2
				// persentageSO={persentageSO}
				// setPersentageSO={setPersentageSO}
				addProToSpeOffer={addProToSpeOffer}
				removeProToSPeOffer={removeProToSPeOffer}
				spetialOfferList={spetialOfferList}
			/>
		</div>
	);
}

export default ProductManager;
