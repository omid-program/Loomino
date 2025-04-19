'use client';
import { TAllProductData, TEditProductComponent, TInStoreAllProduct } from '@/types';
import React, { useEffect, useState } from 'react';
import ProductManagerEditInput from '../ProductManagerEditInput/ProductManagerEditInput';

function EditProductComponent({ id }: TEditProductComponent) {
	const [fabricData, setFabricData] = useState<TAllProductData | null>(null);
	// const [inStoreState , setInStoreState]=useState<TInStoreAllProduct[] | null>()

	useEffect(() => {
		async function getProduct() {
			try {
				const response = await fetch(`http://localhost:8000/fabrics/${id}`);
				const data = await response.json();
				setFabricData(data);
				// setInStoreState(fabricData?.inStore)
			} catch (error) {
				console.error('خطا در دریافت داده‌ها:', error);
			}
		}
		getProduct();
	}, [id]);

	const changeStateHand = (e: React.ChangeEvent<HTMLInputElement>)=>{
		console.log(e.target.value);
		const { name, value } = e.target;
		setFabricData(prevData => prevData ? { ...prevData, [name]: value } : null)  
		
	}

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

		// const inputEditInStoreItems = fabricData ?
		// [
		// 	{
		// 		id: 10,
		// 		label: 'قیمت',
		// 		type: 'number',
		// 		name: 'price',
		// 		isLong: false,
		// 		size: 'md',
		// 		value: ,
		// 	},
		// ]:[]


	return (
		<div className='grid col-span-3'>
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
			{/* <div>
				{
					inStoreState?.map(inStoreItem=>(
						<ProductManagerEditInput
						isLong={false}
						label={inStoreItem.}
						
						/>
					))
				}
			</div> */}
		</div>
	);
}

export default EditProductComponent;
