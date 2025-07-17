'use client';
import { TAllProductData } from '@/types';
import React, { useEffect, useState } from 'react';
import PaginationBtns from '../PaginationBtns/PaginationBtns';
import ProductManager from '@/app/dashboard/product-manager/page';
import ProductManagerEditActions from '../ProductManagerEditActions/ProductManagerEditActions';
import ProductManagerRaportAction from '../ProductManagerRaportAction/ProductManagerRaportAction';
import { API_BASE_URL } from './../../../../config';

function ProductManagerTable() {
	const [allFabric, setAllFabric] = useState<TAllProductData[]>([]);
	useEffect(() => {
		async function getAllfubric() {
			const response = await fetch(`${API_BASE_URL}/fabrics`);
			const fabricData = (await response.json()) as TAllProductData[];
			setAllFabric(fabricData);
			console.log(fabricData);
			
		}
		getAllfubric();
	}, []);

	// console.log(fabricData);
	const itemPageCount = 2;
	const pageCount = Math.ceil(allFabric.length / itemPageCount);
	const [currentItem, setCurrentItem] = useState<TAllProductData[]>(allFabric.slice(0, 1));
	const [activeBtn , setActiveBtn] = useState<number>(0)

	const buttons = [];

	const paginatedHand = (startIndex: number, endIndex: number , i:number) => {
		setCurrentItem(allFabric.slice(startIndex, endIndex))
		setActiveBtn(i)
		console.log(currentItem);
		console.log(activeBtn);
		
	};

	
	for (let i = 0; i < pageCount; i++) {
		buttons.push(
			<PaginationBtns
				key={i}
				pageNumber={i}
				itemPageCount={itemPageCount}
				paginatedHand={paginatedHand}
				activeBtn={activeBtn}
			/>
		);
	}
	

	return(
		<div className="flex flex-col gap-2 w-full items-center">
			<div id='mainTable' className='min-h-96 w-8/12 bg-yellow-200 flex'>
					{/* can be a Component */}
					<div className='w-1/4 bg-red-400'>
						{
							currentItem.map(item=>(
								<div key={item?.id}>
									{item?.id}
								</div>
							))
						}
					</div>
					<div className='w-1/4 bg-blue-400'>
						{
							currentItem.map(item=>(
								<div key={item?.id}>
									{item?.perTitle}
								</div>
							))
						}
					</div>
					<div className='w-1/4 bg-purple-400'>
						{
							currentItem.map(item=>(
								<div key={item?.id}>
									{item?.defImg}
								</div>
							))
						}
					</div>
					<div className='w-1/4 bg-green-400'>
						{
							currentItem.map(item=>(
								<div  key={item?.id} className='flex justify-center items-center gap-5'>
									<ProductManagerEditActions id={item?.id}/>
									<ProductManagerRaportAction id={item?.id} />
									
								</div>
							))
						}
					</div>
			</div>
			<div id='btnsTable' className='flex'>
			{buttons}
			</div>
			</div>
	) ;
}

export default ProductManagerTable;
