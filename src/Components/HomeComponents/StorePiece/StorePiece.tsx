import ProductBox from '@/Components/ProductBox/ProductBox';
import { TProductBoxData, TSpetialOfferData } from '@/types';
import Link from 'next/link';
import React from 'react';
import TitleSectionHome from '../TitleSectionHome/TitleSectionHome';
import CatItemBox from '@/Components/CatItemBox/CatItemBox';

async function StorePiece(props: {
	title: string;
	api: string;
	kind: 'shop' | 'cats';
}) {
	const { api, title, kind } = props;
	const res = await fetch(api);
	const data = (await res.json()) as TProductBoxData[];

	// spetial-Offer / پیشنهاد ویژه
	const spOfferRes = await fetch(`http://localhost:8000/spetialOffer`);
	const spOfferData = (await spOfferRes.json()) as TSpetialOfferData;

	return (
		<div className="">
			<TitleSectionHome title={title} />
			<div className="grid grid-cols-4 gap-3 my-5">
				{data.map(product => {
					const item = spOfferData.spetialOfferList?.find(
						offer => offer.productId === product.id
					);
					if (kind === 'shop') {
						return (
							<Link
								href={`http://localhost:3000/${kind}/${product.id}`}
								className="col-span-1"
							>
								<ProductBox
									{...product}
									offerPersentage={item?.persentage}
								/>
							</Link>
						);
					} else {
						return (
							<Link
								href={`http://localhost:3000/${kind}/${product.id}`}
								className="col-span-1"
							>
								<div>
									<CatItemBox {...product} />
								</div>
							</Link>
						);
					}
				})}
				{/* {data.map(product => (
					<Link
					key={product.id}
						href={`http://localhost:3000/${kind}/${product.id}`}
						className="col-span-1"
					>
						{
						kind === 'shop' ? (
							<ProductBox {...product} />
						) : (
							<div>
								<CatItemBox {...product} />
							</div>
						)}
	
						
							
						
					</Link>
				))} */}
			</div>
		</div>
	);
}

export default StorePiece;
