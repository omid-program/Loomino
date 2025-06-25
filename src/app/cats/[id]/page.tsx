import ProductCard from '@/Components/Cards/ProductCard/ProductCard';
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
				<div className="px-1 py-2 my-3 w-1/6 mx-auto text-center border-2 border-violet-200 rounded-sm shadow-md shadow-violet-200 font-bold">
					<h2 className="text-xl">دسته بندی : {catData.perTitle}</h2>
				</div>
				<div className="px-2 py-4 my-3 w-2/3 mx-auto text-right border-2 border-violet-200 rounded-sm shadow-md shadow-violet-200 ">
					<p>{catData.perDesc}</p>
				</div>
				<main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-screen-lg mx-auto p-4 font-yekan">
					{fabricSelCat.map(fabric => (
						<Link href={`/shop/${fabric.id}`}>
							<ProductCard {...fabric} />
						</Link>
					))}
				</main>
			</div>
		</Container>
	);
}

export default page;
