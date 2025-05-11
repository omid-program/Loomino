'use client';
import { TAllOrdData, TEditProductComponent } from '@/types';
import React, { useEffect, useState } from 'react';

function ProductRaportCahrt({ id }: TEditProductComponent) {
	const [allOrds, setAllOrds] = useState<TAllOrdData[] | undefined>();
	const getOrdData = async () => {
		const response = await fetch(`http://localhost:8000/ords`);
		const data = (await response.json()) as TAllOrdData[];
		console.log('data=> ', data);
		setAllOrds(data);
	};
	useEffect(() => {
		getOrdData();
	}, []);
	useEffect(() => {
		// console.log(allOrds);


		const goalProducts = allOrds
			?.flatMap(ordData => ordData.userOrd.filter(item => item.id === id))
			.filter(Boolean); // حذف آیتم‌های null/undefined اگر وجود داشته باشند


		console.log('goalProducts=> ', goalProducts);
	}, [allOrds]);
	return <div></div>;
}

export default ProductRaportCahrt;
