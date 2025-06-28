'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { IoSearch } from 'react-icons/io5';

function Search() {
	const searchParams = useSearchParams();
	const [search, setSearch] = useState(searchParams.get('title') || '');
	const router = useRouter();
	const pathname = usePathname();

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		const trimmedSearch = search.trim();

		const params = new URLSearchParams(searchParams);
		if (trimmedSearch) {
			params.set('title', trimmedSearch);
			params.delete('q'); // اگر از q استفاده می‌کنید
		} else {
			params.delete('title');
			params.delete('q');
		}
		params.set('page', '1'); // بازگشت به صفحه اول پس از جستجو

		router.push(`${pathname}?${params.toString()}`);
	};

	return (
		<form
			onSubmit={handleSearch}
			className="flex gap-2 w-full mx-auto items-center justify-center my-8"
		>
			<input
				type="text"
				className="w-3/5 shadow-md shadow-violet-200 rounded-md rtl px-2 py-3"
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
		</form>
	);
}

export default Search;
