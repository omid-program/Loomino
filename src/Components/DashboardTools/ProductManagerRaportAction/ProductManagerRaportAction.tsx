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
			className="bg-yellow-700 text-white size-10 rounded-full"
			onClick={runProductRaportPage}
		>
			<FaChartPie />
		</button>
	);
}

export default ProductManagerRaportAction;
