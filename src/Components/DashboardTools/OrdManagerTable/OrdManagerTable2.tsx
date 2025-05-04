'use client'
import { TAllOrdData, TAllProductData } from '@/types';
import React, { useEffect, useState } from 'react';
import OrdTableBox from '../OrdTableBox/OrdTableBox';

function OrdManagerTable2() {
	const [ordsDataState , setOrdsDataState] = useState<TAllOrdData[]>()
	const getOrdsData = async ()=>{
		const response = await fetch(`http://localhost:8000/ords`);
		const ordsData = (await response.json()) as TAllOrdData[];
		setOrdsDataState(ordsData)
	}
	useEffect(()=>{
		getOrdsData()
		
	},[])
	console.log("ordsDataState=>" , ordsDataState);

	return (
		<div className='w-full'>
			<ul className="headers grid grid-cols-5 ">
				<li className='text-center'>تاریخ</li>
				<li className='text-center'>لیست محصولات</li>
				<li className='text-center'>آدرس</li>
				<li className='text-center'>قیمت کل</li>
				<li className='text-center'>وضعیت</li>
			</ul>
			<div className="body ">
				{/* {
					(ordsDataState) &&
					ordsDataState.map((ord)=>(
						
						<OrdTableBox {...ord} key={ord.id}/>
					))
				} */}
				{
					(ordsDataState) &&
					ordsDataState.map((ord)=>{
						if(ord.statusCode !== 4  && ord.statusCode !== -1){
							return (<OrdTableBox {...ord} key={ord.id}/>)
						}
					})
				}
				{
					(ordsDataState) &&
					ordsDataState.map((ord)=>{
						if(ord.statusCode == 4 || ord.statusCode == -1){
							return (<OrdTableBox {...ord} key={ord.id}/>)
						}
					})
				}
			</div>
		</div>
	);
}

export default OrdManagerTable2;
