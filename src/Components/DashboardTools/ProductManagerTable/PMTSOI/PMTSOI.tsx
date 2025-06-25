'use client';
import { TPMTSOI } from '@/types';
import React, { useEffect, useState } from 'react';

function PMTSOI(props: TPMTSOI) {
	const {
		addProToSpeOffer,
		defImg,
		perTitle,
		productId,
		removeProToSPeOffer,
		spetialOfferList,
	} = props;
	const [persentageSO, setPersentageSO] = useState<string>('');

	useEffect(() => {
		const existing = spetialOfferList.find(
			item => item.productId === productId
		);
		if (existing) {
			setPersentageSO(existing.persentage);
		}
	}, [spetialOfferList, productId]);

	return (
		<div className='flex flex-col gap-5 justify-center items-center'>
			<div>
				<label htmlFor=""> % درصد تخفیف %  </label>
				<input
					className=" py-1 px-1 text-center rounded-md w-11/12 border border-violet-600"
					value={persentageSO}
					onChange={e => {
						setPersentageSO(e.target.value);
					}}
					type="number"
				/>
			</div>
			<button
				className="border-2 border-green-600 shadow-md shadow-green-300 size-10 rounded-full flex justify-center items-center"
				onClick={() => {
					addProToSpeOffer(persentageSO, productId, perTitle, defImg);
				}}
			>
				✅
			</button>
			<button
			className='border-2 border-red-600 shadow-md shadow-red-300 size-10 rounded-full flex justify-center items-center'
				onClick={() => {
					removeProToSPeOffer(productId);
				}}
			>
				⛔
			</button>
		</div>
	);
}

export default PMTSOI;
