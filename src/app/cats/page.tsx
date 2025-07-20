import CatCard from '@/Components/Cards/CatCard/CatCard';
import Container from '@/Components/Container/Container';
import PagesTitle from '@/Components/PageTitle/PagesTitle';
import Link from '@/next/link';
import { TCatDatas } from '@/types';
import React from 'react';
import { API_BASE_URL, API_INSIDE_URL } from './../../../config';

async function Cats() {
	const response = await fetch(`${API_BASE_URL}/cats`);
	const catDatas = (await response.json()) as TCatDatas[];
	// console.log(catDatas);

	return (
		<Container>
			<PagesTitle title="دسته بندی ها" />
			<div className='flex justify-center items-center'>
				<main className=" border-2 border-violet-400 py-6 px-4 my-8 rounded-md  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-screen-lg mx-auto p-4 font-yekan">
					{catDatas?.map(catItem => (
						<Link
							href={`${API_INSIDE_URL}/cats/${catItem.id}`}
							key={catItem.id}
						>
							<CatCard {...catItem} />
						</Link>
					))}
				</main>
			</div>
		</Container>
	);
}

export default Cats;
