'use client';
import {
	TAllProductData,
	TEditProductComponent,
	TInStoreAllProduct,
} from '@/types';
import React, { useEffect, useState } from 'react';
import ProductManagerEditInput from '../ProductManagerEditInput/ProductManagerEditInput';
import EditeBoxInStore from '../EditeBoxInStore/EditeBoxInStore';

function EditProductComponent({ id }: TEditProductComponent) {
	const [fabricData, setFabricData] = useState<TAllProductData | null>(null);
	const [inStoreState, setInStoreState] = useState<TInStoreAllProduct[]>([]);

	useEffect(() => {
		async function getProduct() {
			try {
				const response = await fetch(`http://localhost:8000/fabrics/${id}`);
				const data = await response.json();
				setFabricData(data);
				// بررسی اینکه data.inStore یک آرایه است
				if (Array.isArray(data.inStore)) {
					setInStoreState(data.inStore);
				} else {
					setInStoreState([]);
				}
			} catch (error) {
				console.error('خطا در دریافت داده‌ها:', error);
			}
		}
		getProduct();
	}, [id]);
	useEffect(() => {
		console.log('inStoreState updated:', inStoreState);
	}, [inStoreState]);

	const changeStateHand = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log(e.target.value);
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
			setFabricData({
				...fabricData,
				inStore: inStoreState, // جایگزینی inStore با حالت آپدیت شده
			});
			// اینجا می‌تونی درخواست API برای ذخیره در بکند رو هم اضافه کنی
			console.log('داده‌های نهایی برای ارسال به بکند:', {
				...fabricData,
				inStore: inStoreState,
			});
		}
	};

	const sendEditedFabServer = async () => {
		if (fabricData) {
			const updatedData = { ...fabricData, inStore: inStoreState };
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
		console.log(newInStoreItems);
		setInStoreState(newInStoreItems)
	};
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
