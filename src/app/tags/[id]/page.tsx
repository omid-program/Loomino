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
	console.log(tagsProduct);

	return (
		<Container>
			<div>
				<PagesTitle title={`صفحه ی برچسب `} />
				<div className="grid grid-cols-4 gap-3">
					{tagsProduct.map(product => (
						<Link href={`/shop/${product.id}`}>
							<ProductBox {...product} />
						</Link>
					))}
				</div>
			</div>
		</Container>
	);
}

export default TagItemPage;
