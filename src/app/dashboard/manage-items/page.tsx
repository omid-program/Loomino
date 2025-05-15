'use client';
import Container from '@/Components/Container/Container';
import PagesTitle from '@/Components/PageTitle/PagesTitle';
import { TCatDatas, TTagData } from '@/types';
import React, { useEffect, useState } from 'react';

function AddItemPage() {
	const [catDatas, setCatDatas] = useState<TCatDatas[]>();
	const [tagData, setTagData] = useState<TTagData[]>();
	const [selectedTag, setSelectedTag] = useState<string[]>([]);

	const getCats = async () => {
		const catResponse = await fetch(`http://localhost:8000/cats`);
		const catFetched = (await catResponse.json()) as TCatDatas[];
		setCatDatas(catFetched);
	};
	const getTag = async () => {
		const tagResponse = await fetch(`http://localhost:8000/tags`);
		const tagsFetched = (await tagResponse.json()) as TTagData[];
		setTagData(tagsFetched);
	};
	useEffect(() => {
		getCats();
		getTag();
	}, []);
	const 
	return (
		<Container>
			<div>
				<PagesTitle title="مدیریت آیتم ها" />
				<div className="grid grid-cols-2 gap-4">
					<div className="col-span-1">
						<h2>برچسب ها</h2>
						<div>
							{tagData?.map(tag => (
								<div key={tag.id}>

								</div>
							))}
						</div>
					</div>
					<div className="col-span-1 justify-center">
						<h2>دسته بندی ها</h2>
						<div>
							{catDatas?.map(cat => (
								<div key={cat.id}>
									{/* onClick for go to remove cat modal */}
									{cat.perTitle}
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</Container>
	);
}

export default AddItemPage;
