'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { IoSearch } from 'react-icons/io5';

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
			className="flex gap-2 w-full mx-auto items-center justify-center my-8"
		>
			{/* <div className='w-full mx-auto flex items-center'> */}
				<input
					type="text"
					className=" w-3/5 shadow-md shadow-violet-200 rounded-md rtl px-2 py-3 "
					placeholder="جست و جو ..."
					value={search}
					onChange={e => setSearch(e.target.value)}
				/>
				<button
					type="submit"
					className="px-2 py-2 border-2 border-violet-500 rounded-xl text-violet-500"
				>
					<IoSearch className="text-violet-500 text-xl" />
				</button>
			{/* </div> */}
		</form>
	);
}

export default Search;
