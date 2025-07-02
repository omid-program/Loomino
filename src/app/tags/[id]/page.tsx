import ProductCard from '@/Components/Cards/ProductCard/ProductCard';
import Container from '@/Components/Container/Container';
import PagesTitle from '@/Components/PageTitle/PagesTitle';
import ProductBox from '@/Components/ProductBox/ProductBox';
import { TAllProductData, TTagParams } from '@/types';
import Link from 'next/link';
import React from 'react';

async function TagItemPage({ params }: TTagParams) {
	const { id } = await params;
	const productResponse = await fetch(`http://localhost:8000/fabrics`);
	const productData = (await productResponse.json()) as TAllProductData[];
	const tagsResponse = await fetch(`http://localhost:8000/tags/${id}`);

	const tagsProduct = productData.filter(product => {
		return product.tags.find(tag => tag.id === id);
	});
	console.log('tagsProduct=> ' ,tagsProduct);

	return (
		<Container>
				<PagesTitle title={`صفحه ی برچسب `} />
			<main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-screen-lg mx-auto p-4 font-yekan">
					{tagsProduct.map(product => (
						<Link key={product.id} href={`/shop/${product.id}`} className='flex flex-col justify-center items-center md:block'>
							<ProductCard {...product} />
						</Link>
					))}
			</main>
		</Container>
	);
}

export default TagItemPage;
