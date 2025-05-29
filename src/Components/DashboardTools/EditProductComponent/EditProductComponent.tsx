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

	const changeStateHand = (e: React.ChangeEvent<HTMLInputElement>) => {
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
					id: 4,
					label: 'توضیحات کوتاه فارسی',
					type: 'text',
					name: 'perMiniDescription',
					isLong: true,
					size: 'lg',
					value: fabricData.perMiniDescription,
				},
				{
					id: 5,
					label: 'توضیحات کوتاه انگلیسی',
					type: 'text',
					name: 'engMiniDescription',
					isLong: true,
					size: 'lg',
					value: fabricData.engMiniDescription,
				},
				{
					id: 6,
					label: 'توضیحات کامل',
					type: 'text',
					name: 'perDescription',
					isLong: true,
					size: 'lg',
					value: fabricData.perDescription,
				},
				{
					id: 7,
					label: 'توضیحات کامل انگلیسی',
					type: 'text',
					name: 'engDescription',
					isLong: true,
					size: 'lg',
					value: fabricData.engDescription,
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
					name: '',
					isLong: false,
					size: 'sm',
					value: fabricData.rate,
				},
				{
					id: 10,
					label: 'قیمت',
					type: 'number',
					name: 'price',
					isLong: false,
					size: 'md',
					value: fabricData.price,
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
		<div className="border border-sky-600 p-2 w-10/12">
			<div className="gird grid-cols-2">
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
			<div>
				<select
					name="day"
					className="grid grid-cols-3"
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
					name="month"
					onChange={e => {
						changePreDateHand(e);
					}}
					value={perCreatedAt.month}
				>
					{monthInputInfo.map(month => (
						<option value={month.value}>{month.monthName}</option>
					))}
				</select>
				<input
					name="year"
					onChange={e => {
						changePreDateHand(e);
					}}
					type="number"
					className="w-full"
					value={perCreatedAt.year}
				/>
			</div>
			<div className="border-2 border-rose-700 grid grid-cols-4">
				<div className=" col-span-1">
					{catSelectVal && (
						<select
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
				<div className="col-span-3">
					{tagData?.map(tag => (
						<div key={tag.id}>
							<label>{tag.perTitle}</label>
							<input
								type="checkbox"
								checked={chechTag(tag.id)}
								onChange={e =>
									changeTagChackBox(e.target.checked, tag.id)
								}
							/>
						</div>
					))}
				</div>
			</div>
			<div className=" gap-7 bg-rose-200">
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
				<div>
					<button
						className="py-2 px-1 border border-rose-700 rounded-md w-1/6 mx-auto"
						onClick={handleSaveChanges}
					>
						ثبت تغییرات
					</button>
					<button
						className="py-2 px-1 border-2 border-sky-500"
						onClick={addInStoreItem}
					>
						افزودن رنگبندی
					</button>
				</div>
			</div>
			<button className="" onClick={sendEditedFabServer}>
				ثبت نهایی محصول
			</button>
		</div>
	);
}

export default EditProductComponent;
