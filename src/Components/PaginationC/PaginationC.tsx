'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';

function PaginationC({ pageCount }: { pageCount: number }) {
	const router = useRouter();
	const [searchParams, setSearchParams] = useState('');

	const handlePageClick = (e: { selected: number }) => {
		console.log(e.selected);
		const page = e.selected + 1;
		const currentparams = new URLSearchParams(searchParams.toString());
		console.log(currentparams);

		currentparams.set('page', page.toString());
		currentparams.set('per_page', '5');

		router.push(`shop?${currentparams}`);
	};

	return (
			<ReactPaginate
         className='bg-violet-200 flex gap-5 border-2 border-violet-600 rounded-md p-2 my-5 mx-auto'
				breakLabel="..."
				nextLabel="next >"
				onPageChange={handlePageClick}
				pageRangeDisplayed={5}
				pageCount={pageCount}
				previousLabel="< previous"
				renderOnZeroPageCount={null}
			/>
	);
}

export default PaginationC;
