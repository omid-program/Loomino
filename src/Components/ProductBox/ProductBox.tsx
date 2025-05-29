import { TAllProductData, TProductBoxData } from '@/types';
import { formatPrice } from '@/utils/price';
import React from 'react';
import { MdStarRate } from 'react-icons/md';

function ProductBox(props: TProductBoxData) {
	const {
		id,
		engMiniDescription,
		engTitle,
		defImg,
		perTitle,
		perMiniDescription,
		rate,
		width,
		price,
	} = props;
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
							<span>{formatPrice(Number(price))}</span>
							<span>تومان</span>
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
