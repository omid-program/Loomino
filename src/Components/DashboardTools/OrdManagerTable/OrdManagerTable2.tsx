'use client';
import { TAllOrdData, TAllProductData } from '@/types';
import React, { useEffect, useState } from 'react';
import OrdTableBox from '../OrdTableBox/OrdTableBox';
import Container from '@/Components/Container/Container';
import { API_BASE_URL } from './../../../../config';


function OrdManagerTable2() {
	const [ordsDataState, setOrdsDataState] = useState<TAllOrdData[]>();
	const getOrdsData = async () => {
		const response = await fetch(`${API_BASE_URL}/ords`);
		const ordsData = (await response.json()) as TAllOrdData[];
		const sortedOrdsData = ordsData.sort((a, b) => {
			let aStock = Number(
				b.date.pertionDate.year +
					a.date.pertionDate.month +
					a.date.pertionDate.day +
					a.date.pertionDate.time.slice(0, 2) +
					a.date.pertionDate.time.slice(3, 4)
			);
			let bStock = Number(
				b.date.pertionDate.year +
					b.date.pertionDate.month +
					b.date.pertionDate.day +
					b.date.pertionDate.time.slice(0, 2) +
					b.date.pertionDate.time.slice(3, 4)
			);
			return bStock - aStock;
		});
		setOrdsDataState(sortedOrdsData);
	};
	useEffect(() => {
		getOrdsData();
	}, []);
	console.log('ordsDataState=>', ordsDataState);

	return (
		<div id="header-ord-manager-table" className="w-11/12 mx-auto">
			<ul className="headers grid grid-cols-5 border-2 font-bold  ">
				<li className="text-center h-full py-2 border-x">تاریخ</li>
				<li className="text-center h-full py-2 border-x">لیست محصولات</li>
				<li className="text-center h-full py-2 border-x">آدرس</li>
				<li className="text-center h-full py-2 border-x">قیمت کل</li>
				<li className="text-center h-full py-2 border-x">وضعیت</li>
			</ul>
			<div id="body-ord-manager-table " className="">
				{ordsDataState &&
					ordsDataState.map(ord => {
						if (ord.statusCode !== 4 && ord.statusCode !== -1) {
							return <OrdTableBox {...ord} key={ord.id} />;
						}
					})}
				{ordsDataState &&
					ordsDataState.map(ord => {
						if (ord.statusCode == 4 || ord.statusCode == -1) {
							return <OrdTableBox {...ord} key={ord.id} />;
						}
					})}
			</div>
		</div>
	);
}

export default OrdManagerTable2;
