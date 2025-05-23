'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

function Search() {
	const searchParams = useSearchParams();
	const [search, setSearch] = useState('');
	const router = useRouter();

	const handleSearch = () => {
		const trimmedSearch = search.trim();
		if (!trimmedSearch) return;

		const currentSearch = new URLSearchParams(searchParams.toString());
		currentSearch.set('title', trimmedSearch);

		router.push(`/shop?${currentSearch.toString()}`);
	};

	return (
		<form
			onSubmit={e => {
				e.preventDefault();
				handleSearch();
			}}
			className="flex gap-2"
		>
			<input
				type="text"
				className="w-3/5 bg-purple-200 rounded-full rtl px-2 py-3"
				placeholder="جست و جو ..."
				value={search}
				onChange={e => setSearch(e.target.value)}
			/>
			<button
				type="submit"
				className="px-2 py-3 bg-purple-950 rounded-xl text-white"
			>
				جستجو
			</button>
		</form>
	);
}

export default Search;
