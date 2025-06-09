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
		<div className="border border-violet-700 rounded flex">
			<div className="flex ">
				<div id="inputs-add-spetial-offer-data">
					<div id="expier-date-spetial-offer">
						<label> تاریخ انقضا:</label>
						<input
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
						<input
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
					<div id="text-spetial-offer">
						<label>متن</label>
						<input
							type="text"
							name="spetialOfferText"
							value={offerPackData.spetialOfferText}
							onChange={e => {
								changeOfferPackData(e.target.name, e.target.value);
							}}
						/>
					</div>
				</div>
				<div id="spetial-offer">
					<div>
						<SpetialOfferListModal
							spetialOfferList={spetialOfferList}
							removeProToSPeOffer={removeProToSPeOffer}
						/>
					</div>
					<div>
						<button
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
						<button
							className=""
							onClick={() => {
								clearSpetialOffer();
							}}
						>
							لغو
						</button>
					</div>
				</div>
			</div>
			{/* <div>
				{spetialOfferList &&
					spetialOfferList.map(item => <div>{item.productId}</div>)}
			</div> */}
		</div>
	);
}

export default AddSpetialOfferData;
