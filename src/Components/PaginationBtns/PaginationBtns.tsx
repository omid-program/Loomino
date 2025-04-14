'use client'
import { TPaginationProps } from '@/types';
import React, { useEffect } from 'react';

function PaginationBtns(props: TPaginationProps) {
	const { pageNumber, itemPageCount, activeBtn, paginatedHand } = props;
	const startIndex = pageNumber * itemPageCount;
	const endIndex = startIndex + itemPageCount;

	// console.log('PaginationBtns props =>', props.pageNumber);
	// console.log('test');
  // useEffect(()=>{
  //   paginatedHand(startIndex , endIndex , 1)
  // },[])

	return (
		<div
			className={`rounded-full size-14 cursor-pointer bg-sky-200 hover:bg-sky-400 ${(activeBtn === pageNumber)? 'bg-sky-400': ''}`}
			onClick={()=>{paginatedHand(startIndex , endIndex , pageNumber)}}
		>
			{pageNumber + 1}
		</div>
	);
}

export default PaginationBtns;
