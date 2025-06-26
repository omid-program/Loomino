'use client';
import Container from '@/Components/Container/Container';
import EditeBoxInStore from '@/Components/DashboardTools/EditeBoxInStore/EditeBoxInStore';
import ProductManagerEditInput from '@/Components/DashboardTools/ProductManagerEditInput/ProductManagerEditInput';
import PagesTitle from '@/Components/PageTitle/PagesTitle';
import {
	TAllProductData,
	TCatDatas,
	TInStoreAllProduct,
	TProductCatData,
	TTagData,
} from '@/types';
import { randomUUID } from 'crypto';
import { format } from 'date-fns-jalali';
import jalaali from 'jalaali-js';

import React, { useEffect, useState } from 'react';
// import {} from 'date-fns-jalali'

function AddProduct() {
	const [fabricData, setFabricData] = useState<TAllProductData | null>({
		id: crypto.randomUUID(),
		perTitle: '',
		engTitle: '',
		defImg: '',
		perMiniDescription: '',
		engMiniDescription: '',
		perDescription: '',
		engDescription: '',
		rate: 5,
		width: '',
		tags: [],
		inStore: [
			// { id: '', colorCode: '', colorImg: '', colorName: '', qtys: '' },
		],
		cat: [],
		price: 0,
	});
	const [inStoreState, setInStoreState] = useState<TInStoreAllProduct[]>([
		{
			id: crypto.randomUUID(),
			colorName: '',
			colorCode: '',
			colorImg: '',
			qtys: '',
		},
	]);
	const [catSelectVal, setCatSelectVal] = useState<string>('forCloth');

	const [catData, setCatData] = useState<TCatDatas[]>();
	const [tagData, setTagData] = useState<TTagData[]>();
	const [selectedTag, setSelectedTag] = useState<string[]>([]);
	const [catObjetForSend, setCatObjetForSend] = useState<TProductCatData>();
	const [productTagList, setProductTagList] = useState<TTagData[]>([]);
	const [perCreatedAt, setPerCreatedAt] = useState({
		year: '',
		month: '',
		day: '',
	});

	const inputCommonItems = [
		{
			id: 1,
			label: 'عنوان محصول',
			type: 'text',
			name: 'perTitle',
			isLong: false,
			size: 'md',
			value: fabricData?.perTitle,
		},
		{
			id: 2,
			label: 'عنوان محصول انگلیسی',
			type: 'text',
			name: 'engTitle',
			isLong: false,
			size: 'md',
			value: fabricData?.engTitle,
		},
		{
			id: 3,
			label: 'عکس پیش‌فرض',
			type: 'text',
			name: 'defImg',
			isLong: false,
			size: 'lg',
			value: fabricData?.defImg,
		},
		{
			id: 8,
			label: 'امتیاز',
			type: 'number',
			name: 'rate',
			isLong: false,
			size: 'sm',
			value: fabricData?.rate,
		},
		{
			id: 9,
			label: 'عرض',
			type: 'number',
			name: 'width',
			isLong: false,
			size: 'sm',
			value: fabricData?.width,
		},
		{
			id: 10,
			label: 'قیمت',
			type: 'number',
			name: 'price',
			isLong: false,
			size: 'sm',
			value: fabricData?.price,
		},
		{
			id: 4,
			label: 'توضیحات کوتاه فارسی',
			type: 'text',
			name: 'perMiniDescription',
			isLong: true,
			size: 'xl',
			value: fabricData?.perMiniDescription,
		},
		{
			id: 5,
			label: 'توضیحات کوتاه انگلیسی',
			type: 'text',
			name: 'engMiniDescription',
			isLong: true,
			size: 'xl',
			value: fabricData?.engMiniDescription,
		},
		{
			id: 6,
			label: 'توضیحات کامل',
			type: 'text',
			name: 'perDescription',
			isLong: true,
			size: '2xl',
			value: fabricData?.perDescription,
		},
		{
			id: 7,
			label: 'توضیحات کامل انگلیسی',
			type: 'text',
			name: 'engDescription',
			isLong: true,
			size: '2xl',
			value: fabricData?.engDescription,
		},
	];

	const getCats = async () => {
		const catResponse = await fetch(`http://localhost:8000/cats`);
		const catFetched = (await catResponse.json()) as TCatDatas[];
		setCatData(catFetched);
		// console.log('CatData => ', catData);
	};
	const getTags = async () => {
		const tagResponse = await fetch(`http://localhost:8000/tags`);
		const tagFetched = (await tagResponse.json()) as TTagData[];
		setTagData(tagFetched);
		// console.log('tagFetched=> ', tagFetched);
	};

	const setDefaultPerCreatedAt = () => {
		const now = new Date().toISOString();
		const nowYear = format(now, 'yyyy');
		const nowMonth = format(now, 'MM');
		const nowDay = format(now, 'dd');
		setPerCreatedAt({
			year: nowYear,
			month: nowMonth,
			day: nowDay,
		});
		console.log('year=>', nowYear);
	};
	useEffect(() => {
		getCats();
		getTags();
		setDefaultPerCreatedAt();
	}, []);

	const changeStateHand = (
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement>
	) => {
		// console.log(e.target.value);
		const { name, value } = e.target;
		setFabricData(prevData =>
			prevData ? { ...prevData, [name]: value } : null
		);
	};
	const changeInStoreItemHand = (id: string, name: string, value: any) => {
		setInStoreState(prevState =>
			prevState.map(item =>
				item.id === id ? { ...item, [name]: value } : item
			)
		);
	};
	const removeInStoreItemHand = (id: string) => {
		let newInStoreItems = inStoreState.filter(item => item.id !== id);
		// console.log(newInStoreItems);
		setInStoreState(newInStoreItems);
	};
	const addInStoreItem = () => {
		const newInStoreItem = {
			id: crypto.randomUUID(),
			colorName: '',
			colorCode: '',
			qtys: '0',
			colorImg: '',
		};
		setInStoreState(prevInStore => [...prevInStore, newInStoreItem]);
	};

	const submiteSelectCatHand = () => {
		const catFiltred = catData?.find(cat => cat.nameTag === catSelectVal);
		const tagList = selectedTag.map(tagSel => {
			return tagData?.find(tagInfo => tagInfo.TagName === tagSel);
		});
		const matchTagDataSelTag = selectedTag;

		const newObgCategory = {
			id: catFiltred?.id,
			catName: catFiltred?.nameTag,
			engTitle: catFiltred?.engTitle,
			perTitle: catFiltred?.perTitle,
		};
		setCatObjetForSend(newObgCategory);
		setProductTagList(tagList.filter(Boolean) as TTagData[]);

		// console.log('catFiltred=>', catFiltred);
		// console.log('catData=>', catData);
		// console.log('newObgCategory=>', newObgCategory);
		// console.log('matchTagDataSelTag=> ', matchTagDataSelTag);
		// console.log('tagList=> ', tagList);
	};

	const handleSaveChanges = () => {
		if (fabricData) {
			const { day, year, month } = perCreatedAt;
			const { gy, gm, gd } = jalaali.toGregorian(
				Number(year),
				Number(month),
				Number(day)
			);
			const isoDateGenerate = new Date(gy, gm - 1, gd).toISOString();

			// const miniIsoDate = jalaaliToDate()
			setFabricData({
				...fabricData,
				cat: catObjetForSend,
				tags: productTagList,
				inStore: inStoreState, // جایگزینی inStore با حالت آپدیت شده
				createdAt: isoDateGenerate,
			});
			console.log('داده‌های نهایی برای ارسال به بکند:', {
				...fabricData,
				inStore: inStoreState,
				cat: catObjetForSend,
				tags: productTagList,
				createdAt: isoDateGenerate,
			});
		}
	};
	const sendEditedFabServer = async () => {
		if (fabricData) {
			// const updatedData = { ...fabricData, inStore: inStoreState };
			try {
				const response = await fetch(`http://localhost:8000/fabrics`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(fabricData),
				});
				if (response.ok) {
					alert('تغییرات با موفقیت اعمال شد');
					setFabricData({
						id: crypto.randomUUID(),
						perTitle: '',
						engTitle: '',
						defImg: '',
						perMiniDescription: '',
						engMiniDescription: '',
						perDescription: '',
						engDescription: '',
						rate: 5,
						width: '',
						tags: [],
						inStore: [
							// { id: '', colorCode: '', colorImg: '', colorName: '', qtys: '' },
						],
						cat: [],
						price: 0,
					});
				}
			} catch (error) {
				console.log(error);
			}
		}
	};
	const changeChackBoxHand = (tagName: string, checked: boolean) => {
		if (checked) {
			setSelectedTag(prev => [...prev, tagName]);
		} else {
			setSelectedTag(prev => prev.filter(tag => tag !== tagName));
		}
	};

	const monthInputInfo = [
		{
			value: '1',
			monthName: 'فروردین',
		},
		{
			value: '2',
			monthName: 'اردیبهشت',
		},
		{
			value: '3',
			monthName: 'خرداد',
		},
		{
			value: '4',
			monthName: 'تیر',
		},
		{
			value: '5',
			monthName: 'مرداد',
		},
		{
			value: '6',
			monthName: 'شهریور',
		},
		{
			value: '7',
			monthName: 'مهر',
		},
		{
			value: '8',
			monthName: 'آبان',
		},
		{
			value: '9',
			monthName: 'آذر',
		},
		{
			value: '10',
			monthName: 'دی',
		},
		{
			value: '11',
			monthName: 'بهمن',
		},
		{
			value: '12',
			monthName: 'اسفند',
		},
	];
	const changePreDateHand = (
		e:
			| React.ChangeEvent<HTMLSelectElement>
			| React.ChangeEvent<HTMLInputElement>
	) => {
		setPerCreatedAt(prev => {
			const { name, value } = e.target;
			console.log('changePreDateHand=> ', { ...prev, [name]: value });

			return { ...prev, [name]: value };
		});
	};

	return (
		<Container>
			<PagesTitle title="افزودن محصول" />
			<div className="px-4">
				<div className="grid grid-cols-12 gap-5">
					{inputCommonItems.map(item => (
						<ProductManagerEditInput
							key={item.id}
							label={item.label}
							name={item.name}
							type={item.type}
							value={item.value}
							size={item.size}
							isLong={item.isLong}
							changeInputHand={changeStateHand}
						/>
					))}
				</div>
				<div
					id="createAt-cat-select"
					className="grid grid-cols-3 my-8 gap-4"
				>
					<div
						id="ceateAt-select-option"
						className="border-2 border-violet-500 px-1 py-2 col-span-1 "
					>
						<div className="w-full py-2 text-center border-b-2 border-dashed">
							<h3 className="text-lg font-bold">تاریخ افرودن محصول</h3>
						</div>
						<div className="grid grid-cols-3 py-1 text-center border-b">
							<label className="border-x" htmlFor="">
								روز
							</label>
							<label className="border-x" htmlFor="">
								ماه
							</label>
							<label className="border-x" htmlFor="">
								سال
							</label>
						</div>

						<div className="grid grid-cols-3 text-center py-1 border-b">
							<select
								name="day"
								className="col-span-1 border-x px-1 text-center py-2"
								value={perCreatedAt.day}
								onChange={e => {
									changePreDateHand(e);
								}}
							>
								{Array.from({ length: 31 }, (_, i) => (
									<option
										key={i + 1}
										value={i + 1}
										className="p-1 bg-violet-300"
									>
										{i + 1}
									</option>
								))}
							</select>
							<select
								className="col-span-1 border-x px-1 py-2 text-center"
								name="month"
								onChange={e => {
									changePreDateHand(e);
								}}
								value={perCreatedAt.month}
							>
								{monthInputInfo.map(month => (
									<option value={month.value}>
										{month.monthName}
									</option>
								))}
							</select>
							<input
								name="year"
								onChange={e => {
									changePreDateHand(e);
								}}
								type="number"
								className="col-span-1 py-2 border-x px-1 text-center"
								value={perCreatedAt.year}
							/>
						</div>
						<span className="text-sm text-violet-600">
							<span></span>در صورت عدم تغییر تاریخ روز ثبت می‌شود
						</span>
					</div>
					{/* cat-select */}
					<div
						id="cat-select"
						className="col-span-1 grid grid-cols-1 border-2 border-violet-500 px-1 "
					>
						<div className="py-2 text-center border-b-2 border-dashed my-2">
							<h3 className="text-lg font-bold">انتخاب دسته بندی</h3>
						</div>

						{/* find cat */}
						<select
							className="text-center py-2 shadow-md shadow-violet-200  bg-gray-50"
							name=""
							id=""
							value={catSelectVal}
							onChange={e => {
								setCatSelectVal(e.target.value);
							}}
						>
							{catData?.map(category => (
								<option value={category.nameTag}>
									{category.perTitle}
								</option>
							))}
						</select>
						<button
							className="py-2 my-2 text-center border-2 border-violet-300 bg-violet-50 rounded-md"
							onClick={submiteSelectCatHand}
						>
							ثبت دسته بندی
						</button>
					</div>
				</div>
				{/* tag-import */}
				<div className=" w-3/4 grid grid-cols-3 px-2 py-4 border-2 max-h-64 overflow-y-scroll border-violet-500 rounded-md">
					<div className=" col-span-3 text-center py-2 border-b-2 border-dashed">
						<h3 className=" font-bold text-lg">انتخاب برچسب ها</h3>
					</div>
					{tagData?.map(tag => (
						<div className="flex gap-1  py-2 px-1 ">
							<input
								className="size-5 "
								type="checkbox"
								value={tag.TagName}
								checked={selectedTag.includes(tag.TagName)}
								onChange={e => {
									changeChackBoxHand(tag.TagName, e.target.checked);
								}}
							/>
							<label>{tag.perTitle}</label>
						</div>
					))}
				</div>
				{/* color-product-add */}
				<div className="grid grid-cols-2 gap-5 my-5">
					{inStoreState.map(inStoreItem => (
						<EditeBoxInStore
							key={inStoreItem.id}
							id={inStoreItem.id}
							colorName={inStoreItem.colorName}
							colorCode={inStoreItem.colorCode}
							colorImg={inStoreItem.colorImg}
							qtys={inStoreItem.qtys}
							changeInStoreItemHand={changeInStoreItemHand}
							removeInStoreItemHand={removeInStoreItemHand}
						/>
					))}
				</div>
				{/* btns-add */}
				<div className="flex justify-between  py-2">
					<button
						className="w-1/4 mx-auto py-2 text-center border-2 border-double border-violet-500 rounded-md hover:bg-violet-50"
						onClick={addInStoreItem}
					>
						افزودن رنگبندی
					</button>
					<button
						className="w-1/4 mx-auto py-2 text-center border-2 border-double border-sky-500 rounded-md hover:bg-sky-50"
						onClick={handleSaveChanges}
					>
						ثبت اطلاعات
					</button>
					<button
						// className="w-1/4 mx-auto py-2 text-center bg-green-300 rounded-lg"
						className="w-1/4 mx-auto py-2 text-center border-2 border-double border-green-500 rounded-md hover:bg-green-50"
						onClick={sendEditedFabServer}
					>
						افزودن محصول به فروشگاه
					</button>
				</div>
			</div>
		</Container>
	);
}

export default AddProduct;
