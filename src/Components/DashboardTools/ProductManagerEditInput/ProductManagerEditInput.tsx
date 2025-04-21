import { TAllProductData, TProductManagerEditInputProps } from '@/types';
import React from 'react';

function ProductManagerEditInput(props: TProductManagerEditInputProps) {
	// console.log(props);
	const { name, label, type, value, isLong, size ,changeInputHand} = props;

	return (
		<div className="flex gap-2">
			<label>{label} : </label>
			<input
				type={type}
				name={name}
				value={value}
        		onChange={(e)=>{changeInputHand(e)}}
				className={`px-1 py-2 rounded-md bg-sky-400 `}
			/>
		</div>
	);
}

export default ProductManagerEditInput;
