import { TAllProductData, TProductManagerEditInputProps } from '@/types';
import React from 'react';

function ProductManagerEditInput(props: TProductManagerEditInputProps) {
	// console.log(props);
	const { name, label, type, value, isLong, size, changeInputHand } = props;

	// const sizeTranslate = {sm:'span 4' , md:'span 6' , lg: 'span 12'}
	let sizeInput;
	if (size === 'sm') {
		sizeInput = 'col-span-4';
	} else if (size === 'md') {
		sizeInput = 'col-span-6';
	} else if (size === 'lg') {
		sizeInput = 'col-span-12';
	}

	if (size == 'xl' || size == '2xl') {
		return (
			<div
				className={`px-2 py-4 min-h-48 my-6  ${
					size === 'xl' ? 'col-span-6 h-8' : 'col-span-12 h-16'
				}`}
			>
				<label className="text-center"> {label}</label>
				<textarea
					className="w-full h-full  shadow-md shadow-violet-200 rounded-md my-3 px-1 py-2 text-violet-900"
					placeholder={`متن ${label} را وارد نمایید...`}
					name={name}
					value={value}
					onChange={e => {
						changeInputHand(e);
					}}
				></textarea>
			</div>
		);
	} else {
		return (
			<div
				className={`gap-2 my-2 ${sizeInput}`}
				// style={{gridColumn:}}
			>
				<label>{label} : </label>
				<input
					placeholder={`${label} مورد نظر را وارد نمایید`}
					type={type}
					name={name}
					value={value}
					onChange={e => {
						changeInputHand(e);
					}}
					className={`px-1 py-2 rounded-md w-full border-2 border-violet-300 shadow-md shadow-violet-200 mx-6 `}
				/>
			</div>
		);
	}
	// return (

	// 	<div className=" gap-2 col-span-1 my-2">
	// 		<label>{label} : </label>
	// 		<input
	// 			type={type}
	// 			name={name}
	// 			value={value}
	//      		onChange={(e)=>{changeInputHand(e)}}
	// 			className={`px-1 py-2 rounded-md bg-sky-400 `}
	// 		/>
	// 	</div>
	// );
}

export default ProductManagerEditInput;
