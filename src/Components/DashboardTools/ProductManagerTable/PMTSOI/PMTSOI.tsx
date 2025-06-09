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
		<div>
			<div>
				<label htmlFor="">درصد تخفیف: </label>
				<input
					className="appearance-none w-full border border-violet-600"
					value={persentageSO}
					onChange={e => {
						setPersentageSO(e.target.value);
					}}
					type="number"
				/>
			</div>
			<button
				className="border placeholder-red-200 px-1 w-11/12 bg-violet-100"
				onClick={() => {
					addProToSpeOffer(persentageSO, productId, perTitle, defImg);
				}}
			>
				افزودن به فروش ویژه
			</button>
			<button
				onClick={() => {
					removeProToSPeOffer(productId);
				}}
			>
				حذف از فروش ویژه
			</button>
		</div>
	);
}

export default PMTSOI;
