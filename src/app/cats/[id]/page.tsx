import Container from '@/Components/Container/Container';
import ProductBox from '@/Components/ProductBox/ProductBox';
import {
	TAllProductData,
	TCartItemProps,
	TCatDatas,
	TCatItemParams,
} from '@/types';
import Link from 'next/link';
import React from 'react';

async function page({ params }: TCatItemParams) {
	const { id } = await params;
	const catResponse = await fetch(`http://localhost:8000/cats/${id}`);
	const catData = (await catResponse.json()) as TCatDatas;
	const fabricResponse = await fetch(`http://localhost:8000/fabrics`);
	const fabricData = (await fabricResponse.json()) as TAllProductData[];

	const fabricSelCat = fabricData.filter(fabric => {
		return fabric?.cat.id === id;
	});
	console.log(fabricSelCat);
	console.log(id);

	return (
		<Container>
			<div>
				{/* <h1 className="text-4xl">catItemPage</h1> */}
				<div className="px-1 py-2 my-3 w-1/6 mx-auto text-center border-2 border-red-600 rounded-md bg-rose-300">
					<h2 className="text-xl">دسته بندی : {catData.perTitle}</h2>
				</div>
				<div className="px-1 py-2 w-2/3 mx-auto border-2 border-sky-600 rounded-xl bg-sky-300">
					<p>{catData.perDesc}</p>
				</div>
				<div className="grid grid-cols-4 gap-3">
					{fabricSelCat.map(fabric => (
						<Link href={`/shop/${fabric.id}`}>
							<ProductBox {...fabric} />
						</Link>
					))}
				</div>
			</div>
		</Container>
	);
}

export default page;
