import CatItemBox from '@/Components/CatItemBox/CatItemBox';
import Container from '@/Components/Container/Container';
import { TCatDatas } from '@/types';
import React from 'react';

async function Cats() {
	const response = await fetch(`http://localhost:8000/cats`);
	const catDatas = (await response.json()) as TCatDatas[];
	// console.log(catDatas);

	return (
		<Container>
			<div>
				{catDatas?.map(catItem => (
						<CatItemBox {...catItem} key={catItem.id} />
				))}
			</div>
		</Container>
	);
}

export default Cats;
