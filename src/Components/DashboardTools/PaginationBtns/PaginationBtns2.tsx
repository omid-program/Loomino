import React from 'react';

interface IPaginationBtnsProps {
	i: number;
	paginationHand: (i: number) => void;
   presentPage: number
}

export default function PaginationBtns2(props: IPaginationBtnsProps) {
	const { i, paginationHand , presentPage } = props;
	return (
		<div
      className={` cursor-pointer size-9 rounded-full flex justify-center items-center shadow-md shadow-accent ${i==presentPage ? 'border-2 border-primary' : ''}`}
			onClick={() => {
				paginationHand(i);
			}}
		>
			<span>{i}</span>
		</div>
	);
}
