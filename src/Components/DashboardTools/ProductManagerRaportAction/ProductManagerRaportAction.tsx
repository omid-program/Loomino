'use client';
import { TEditProductParams, TProductManagerEditActionsProps } from '@/types';
import { FaChartPie } from 'react-icons/fa6';

import { useRouter } from 'next/navigation';
import React from 'react';

function ProductManagerRaportAction(props: TProductManagerEditActionsProps) {
	const id = props.id;
	const router = useRouter();
	const runProductRaportPage = () => {
		router.push(`product-manager/product-manager-raport/${id}`);
	};
	return (
		<button
			className=" shadow-md shadow-yellow-300 size-10 rounded-full border-2 border-yellow-600 flex justify-center items-center"
			onClick={runProductRaportPage}
		>
			<FaChartPie />
		</button>
	);
}

export default ProductManagerRaportAction;
