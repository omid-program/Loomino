'use client';
import {
	TAllProductData,
	TCatDatas,
	TEditProductComponent,
	TInStoreAllProduct,
	TProductCatData,
	TTagData,
} from '@/types';
import React, { useEffect, useState } from 'react';
import ProductManagerEditInput from '../ProductManagerEditInput/ProductManagerEditInput';
import EditeBoxInStore from '../EditeBoxInStore/EditeBoxInStore';
import { format } from '@/date-fns-jalali';
import jalaali from 'jalaali-js';
import Container from '@/Components/Container/Container';
import PagesTitle from '@/Components/PageTitle/PagesTitle';

interface TPerCreatedAt {
	year: string;
	month: string;
	day: string;
}

function EditProductComponent({ id }: TEditProductComponent) {
	const [fabricData, setFabricData] = useState<TAllProductData | null>(null);
	const [inStoreState, setInStoreState] = useState<TInStoreAllProduct[]>([]);

	const [catData, setCatData] = useState<TCatDatas[]>([]);

	///////////////////////////////////////////////////////////

	const [tagData, setTagData] = useState<TTagData[]>([]);
	const [productTag, setProductTag] = useState<TTagData[]>([]);

	////////////////////////////////////////////////////////////

	const [catSelectVal, setCatSelectVal] = useState<TProductCatData>();
	const [tempProductCat, setTempProductCat] = useState<TProductCatData>();

	////////////////////////////////////////////////////////////

	const [perCreatedAt, setPerCreatedAt] = useState<TPerCreatedAt>({
		year: '',
		month: '',
		day: '',
	});
	const [isoDateGenState, setIsoDateGenState] = useState<string>();

	const getCatHand = async () => {
		const catResponse = await fetch(`http://localhost:8000/cats`);
		const catFetched = (await catResponse.json()) as TCatDatas[];
		setCatData(catFetched);
		setCatData(catFetched);
		// console.log("catFetched => " , catFetched);
	};
	const getTagHand = async () => {
		const tagResponse = await fetch(`http://localhost:8000/tags`);
		const tagFetched = await tagResponse.json();
		setTagData(tagFetched);
	};

	useEffect(() => {
		async function getProduct() {
			try {
				const response = await fetch(`http://localhost:8000/fabrics/${id}`);
				const data = (await response.json()) as TAllProductData;
				setFabricData(data);
				setIsoDateGenState(data.createdAt);
				//////////////////////////////////////////////////
				const date = new Date(data.createdAt);
				const { jy, jm, jd } = jalaali.toJalaali(date);
				setPerCreatedAt({
					year: String(jy),
					month: String(jm).padStart(2, '0'),
					day: String(jd).padStart(2, '0'),
				});
				//////////////////////////////////////////////////
				// setCatSelectVal(data.cat);
				// بررسی اینکه data.inStore یک آرایه است
				if (Array.isArray(data.inStore)) {
					setInStoreState(data.inStore);
				} else {
					setInStoreState([]);
				}
				setTempProductCat(data.cat);
				setProductTag(data.tags);
			} catch (error) {
				console.error('خطا در دریافت داده‌ها:', error);
			}
		}

		getProduct();
		getCatHand();
		getTagHand();
		console.log('catSelectVal=>', catSelectVal);
	}, [id]);

	useEffect(() => {
		if (catData.length > 0 && tempProductCat) {
			setCatSelectVal(tempProductCat);
		}
	}, [catData, tempProductCat]);

	useEffect(() => {
		console.log('productTag=> ', productTag);
	}, [productTag]);

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
	const handleSaveChanges = () => {
		if (fabricData) {
			const { day, year, month } = perCreatedAt;
			const { gy, gm, gd } = jalaali.toGregorian(
				Number(year),
				Number(month),
				Number(day)
			);
			const isoDateGenerate = new Date(gy, gm - 1, gd).toISOString();
			setIsoDateGenState(isoDateGenerate);
			setFabricData({
				...fabricData,
				inStore: inStoreState, // جایگزینی inStore با حالت آپدیت شده
				cat: catSelectVal,
				tags: productTag,
				createdAt: isoDateGenerate,
			});
			alert(`✅تغییرات با موفقیت ثبت شد \n داده ها را ارسال نمایید`)
			// اینجا می‌تونی درخواست API برای ذخیره در بکند رو هم اضافه کنی
			console.log('داده‌های نهایی برای ارسال به بکند:', {
				...fabricData,
				inStore: inStoreState,
				cat: catSelectVal,
				tags: productTag,
				createdAt: isoDateGenerate,
			});
		}
	};

	const sendEditedFabServer = async () => {
		if (fabricData) {
			const updatedData = {
				...fabricData,
				inStore: inStoreState,
				cats: catSelectVal,
				tags: productTag,
				createdAt: isoDateGenState,
			};
			try {
				const response = await fetch(
					`http://localhost:8000/fabrics/${id}`,
					{
						method: 'PUT',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(updatedData),
					}
				);
				if (response.ok) {
					alert('تغییرات با موفقیت اعمال شد');
				}
			} catch (error) {
				console.log(error);
			}
		}
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
	const removeInStoreItemHand = (id: string) => {
		let newInStoreItems = inStoreState.filter(item => item.id !== id);
		// console.log(newInStoreItems);
		setInStoreState(newInStoreItems);
	};
	const changeSelectHand = (tagName: string) => {
		const findCatData = catData.find(cat => cat.nameTag === tagName);
		const newCat = {
			id: findCatData?.id,
			catName: findCatData?.nameTag,
			perTitle: findCatData?.perTitle,
			engTitle: findCatData?.engTitle,
		};
		setCatSelectVal(newCat);
	};
	const chechTag = (tagId: string) => {
		return productTag.some(tag => tag.id === tagId);
	};

	// //////////////////////////  im hear  ////////////////////////////////////

	const changeTagChackBox = (checked: boolean, tagId: string) => {
		const tagFinded = tagData.find(tag => tag.id === tagId);
		// const tagRemoveProduct =
		console.log('tagData=> ', tagData);

		if (checked) {
			if (tagFinded) {
				setProductTag(prev => [...prev, tagFinded]);
			}
		} else {
			setProductTag(prev => prev.filter(item => item.id !== tagId));
		}
	};

	///////////////////////////////////////////////////////

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

	// what the hell???
	const inputEditItems = fabricData
		? [
				{
					id: 1,
					label: 'عنوان محصول',
					type: 'text',
					name: 'perTitle',
					isLong: false,
					size: 'md',
					value: fabricData.perTitle,
				},
				{
					id: 2,
					label: 'عنوان محصول انگلیسی',
					type: 'text',
					name: 'engTitle',
					isLong: false,
					size: 'md',
					value: fabricData.engTitle,
				},
				{
					id: 3,
					label: 'عکس پیش‌فرض',
					type: 'text',
					name: 'defImg',
					isLong: false,
					size: 'lg',
					value: fabricData.defImg,
				},
				{
					id: 8,
					label: 'امتیاز',
					type: 'number',
					name: 'rate',
					isLong: false,
					size: 'sm',
					value: fabricData.rate,
				},
				{
					id: 9,
					label: 'عرض',
					type: 'number',
					name: 'width',
					isLong: false,
					size: 'sm',
					value: fabricData.width,
				},
				{
					id: 10,
					label: 'قیمت',
					type: 'number',
					name: 'price',
					isLong: false,
					size: 'sm',
					value: fabricData.price,
				},
				{
					id: 4,
					label: 'توضیحات کوتاه فارسی',
					type: 'text',
					name: 'perMiniDescription',
					isLong: true,
					size: 'xl',
					value: fabricData.perMiniDescription,
				},
				{
					id: 5,
					label: 'توضیحات کوتاه انگلیسی',
					type: 'text',
					name: 'engMiniDescription',
					isLong: true,
					size: 'xl',
					value: fabricData.engMiniDescription,
				},
				{
					id: 6,
					label: 'توضیحات کامل',
					type: 'text',
					name: 'perDescription',
					isLong: true,
					size: '2xl',
					value: fabricData.perDescription,
				},
				{
					id: 7,
					label: 'توضیحات کامل انگلیسی',
					type: 'text',
					name: 'engDescription',
					isLong: true,
					size: '2xl',
					value: fabricData.engDescription,
				},
		  ]
		: [];
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

	return (
		<Container>
			{/* <PagesTitle title="ویرایش محصول" /> */}
			<div className="px-4">
				<div className="grid grid-cols-12 gap-5">
					{inputEditItems.map(item => (
						<ProductManagerEditInput
							key={item.id}
							isLong={item.isLong}
							label={item.label}
							name={item.name}
							size={item.size}
							type={item.type}
							value={item.value}
							changeInputHand={changeStateHand}
						/>
					))}
				</div>
				<div
					id="createAt-cat-select"
					className="grid grid-cols-3 my-8 gap-4"
				>
					<div
						id="createdAt-select-option"
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
						<div className="grid grid-cols-3 text-center py-1 border-b ">
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
							در صورت عدم تغییر تارخ قبلی ثبت می‌شود
						</span>
					</div>
					{/* cat-edit */}
					<div
						id="cat-select"
						className="col-span-1 grid grid-cols-1 border-2 border-violet-500 px-1 "
					>
						<div className="py-1 text-center border-b-2 border-dashed my-2">
							<h3 className="text-lg font-bold">انتخاب دسته بندی</h3>
						</div>
						{/* find-cat */}
						{catSelectVal && (
							<select
								className="text-center py-1 my-2 shadow-md shadow-violet-200  bg-gray-50"
								value={catSelectVal?.catName}
								onChange={e => {
									changeSelectHand(e.target.value);
								}}
							>
								{catData.map(cat => (
									<option key={cat.id} value={cat.nameTag}>
										{cat.perTitle}
									</option>
								))}
							</select>
						)}
					</div>
				</div>
				{/* tag-edit */}
				<div className=" w-3/4 grid grid-cols-3 px-2 py-4 border-2 max-h-64 overflow-y-scroll border-violet-500 rounded-md">
					<div className=" col-span-3 text-center py-2 border-b-2 border-dashed">
						<h3 className="text-lg font-bold ">انتخاب برچسب ها</h3>
					</div>
					{tagData?.map(tag => (
						<div key={tag.id}>
							<input
								type="checkbox"
								checked={chechTag(tag.id)}
								onChange={e =>
									changeTagChackBox(e.target.checked, tag.id)
								}
							/>
							<label>{tag.perTitle}</label>
						</div>
					))}
				</div>
				{/* color-product-edit */}

				<div className="grid grid-cols-2 gap-5 my-5">
					{inStoreState?.map(inStoreItem => (
						<EditeBoxInStore
							id={inStoreItem.id}
							key={inStoreItem?.id}
							colorCode={inStoreItem?.colorCode}
							colorName={inStoreItem?.colorName}
							colorImg={inStoreItem?.colorImg}
							qtys={inStoreItem?.qtys}
							changeInStoreItemHand={changeInStoreItemHand}
							removeInStoreItemHand={removeInStoreItemHand}
						/>
					))}
				</div>
				{/* btns-edit */}
				<div className="flex justify-between  py-2">
					<button
						className="w-1/4 mx-auto py-2 text-center border-2 border-double border-sky-500 rounded-md hover:bg-sky-50"
						onClick={addInStoreItem}
					>
						افزودن رنگبندی
					</button>
					<button
						className="w-1/4 mx-auto py-2 text-center border-2 border-double border-sky-500 rounded-md hover:bg-sky-50"
						onClick={handleSaveChanges}
					>
						ثبت تغییرات
					</button>

					<button
						className="w-1/4 mx-auto py-2 text-center border-2 border-double border-green-500 rounded-md hover:bg-green-50"
						onClick={sendEditedFabServer}
					>
						ثبت نهایی محصول
					</button>
				</div>
			</div>
		</Container>
	);
}

export default EditProductComponent;
