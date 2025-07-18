'use client';
import { TAddSpetialOfferDataProps } from '@/types';
import React from 'react';
import SpetialOfferListModal from './SpetialOfferListModal/SpetialOfferListModal';

function AddSpetialOfferData(props: TAddSpetialOfferDataProps) {
	const {
		changeOfferPackData,
		offerPackData,
		spetialOfferList,
		sendSpetialOffer,
		removeProToSPeOffer,
		clearSpetialOffer,
	} = props;
	return (
		<div className="border border-violet-700 rounded grid grid-cols-4 mb-8">
			{/* header */}
			<div className="col-span-4 py-2 border-b-2 ">
				<h3 className="text-center text-lg font-bold">تنظیمات فروش ویژه</h3>
			</div>
			{/* main date */}
			<div className="col-span-2">
				<div className=" text-center border-2 py-2">تاریخ انقضا</div>
			</div>
			{/* details product modal */}
			<div className="col-span-2 border-b-2 text-center">
				{/* <h4 className="text-center text-lg "> */}
				<SpetialOfferListModal
					spetialOfferList={spetialOfferList}
					removeProToSPeOffer={removeProToSPeOffer}
				/>
				{/* </h4> */}
			</div>
			{/* date header */}
			<div className="col-span-1 text-center border-2 py-1">روز</div>
			<div className="col-span-1 text-center border-2 py-1">ماه</div>
			{/* text spetialOffer */}
			<div className="col-span-2 py-1 border-2 flex gap-1 items-center">
				<label>متن:</label>
				<input
					className=" shadow-md shadow-violet-200 px-1 py-1 rounded-sm text-center"
					type="text"
					name="spetialOfferText"
					value={offerPackData.spetialOfferText}
					onChange={e => {
						changeOfferPackData(e.target.name, e.target.value);
					}}
				/>
			</div>
			{/* number date input */}
			<div className="col-span-1 text-center px-1 py-2 border-2">
				<input
				className='text-center'
					type="number"
					min={1}
					max={31}
					placeholder="روز"
					name="dayExpier"
					value={offerPackData.dayExpier}
					onChange={e => {
						changeOfferPackData(e.target.name, e.target.value);
					}}
				/>
			</div>
			<div className="col-span-1 text-center px-1 py-2 border-2">
				<input
				className='text-center'
					type="number"
					min={1}
					max={12}
					placeholder="ماه"
					name="monthExpier"
					value={offerPackData.monthExpier}
					onChange={e => {
						changeOfferPackData(e.target.name, e.target.value);
					}}
				/>
			</div>
			{/* btns */}
			<div className="col-span-1 text-center border-2 border-green-600 ">
				<button
				className='bg-green-200 w-full h-full'
					onClick={() =>
						sendSpetialOffer(
							offerPackData.spetialOfferText,
							offerPackData.monthExpier,
							offerPackData.dayExpier,
							spetialOfferList
						)
					}
				>
					ثبت
				</button>
			</div>
			<div className="col-span-1 text-center  border-2 border-gray-900">
				<button
					className="bg-gray-700 text-gray-100 w-full h-full"
					onClick={() => {
						clearSpetialOffer();
					}}
				>
					لغو
				</button>
			</div>
		</div>
	);
}

export default AddSpetialOfferData;
