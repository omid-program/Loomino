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
      className={`rounded-full size-8 justify-center items-center p-2 ${i==presentPage ? 'bg-rose-600' : 'bg-rose-300'}`}
			onClick={() => {
				paginationHand(i);
			}}
		>
			<span>{i}</span>
		</div>
	);
}
