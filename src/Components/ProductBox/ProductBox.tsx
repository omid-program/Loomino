import {
	TAllProductData,
	TProductBoxData,
	TSpetialOfferData,
	TspetialOfferList,
} from '@/types';
import { formatPrice } from '@/utils/price';
import React from 'react';
import { MdStarRate } from 'react-icons/md';

type TProductBoxProps = TProductBoxData & {
	offerPersentage?: string;
};

function ProductBox(
	props: TProductBoxProps
	// & TOfferPersentage
) {
	const {
		id,
		// engMiniDescription,
		// engTitle,
		defImg,
		perTitle,
		perMiniDescription,
		rate,
		width,
		price,
		offerPersentage,
	} = props;
	// console.log("spetialOfferList=>" , spetialOfferList);
	// console.log("id=>" , id);
	// console.log('props=>', props);

	let finalPrice = Number(price);

	if (offerPersentage !== undefined) {
		finalPrice =
			Number(price) - Number(price) * (Number(offerPersentage) / 100);
	}

	// console.log(perTitle , price , finalPrice);

	return (
		<div className="shadow-md shadow-sky-700 p-2">
			<div className="flex flex-col justify-center items-center">
				<div className="w-10/12 h-72">
					<img className="bg-cover" src={defImg} alt="" />
				</div>
				<div>
					<div className="flex flex-col items-center justify-center">
						<h3 className="xl">{perTitle}</h3>
					</div>
					<div className="h-16 overflow-hidden box-border">
						<p className="text-sm">{perMiniDescription}</p>
					</div>
					<div className="flex justify-between flex-row">
						<div className="flex flex-row">
							<span className="text-yellow-500">
								<MdStarRate />
							</span>
							<span>{rate}</span>
						</div>
						<div>
							{Number(finalPrice) !== Number(price) ? (
								<div>
									<div>
										<span className="line-through">
											{formatPrice(Number(price))}
										</span>
										<span>تومان</span>
									</div>
									<div>
										<span className="">
											{formatPrice(Number(finalPrice))}
										</span>
									</div>
								</div>
							) : (
								<div>
									<span className="">
										{formatPrice(Number(price))}
									</span>
									<span>تومان</span>
								</div>
							)}
						</div>
						<div className="bg-red-400">
							<span>عرض:{width}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProductBox;
