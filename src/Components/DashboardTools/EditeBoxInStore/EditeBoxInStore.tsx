import { TEditeBoxInStoreProps } from '@/types';
import React from 'react';
// import ProductManagerEditInput from '../ProductManagerEditInput/ProductManagerEditInput';
import { AiOutlineDelete } from 'react-icons/ai';

function EditeBoxInStore(props: TEditeBoxInStoreProps) {
	const {
		colorCode,
		colorImg,
		colorName,
		qtys,
		changeInStoreItemHand,
		id,
		removeInStoreItemHand,
	} = props;
	console.log(props);



	return (
		<div className= "border-2 border-violet-400 px-2 py-4 shadow-md shadow-violet-200 rounded-md">
			<div className="my-4 col-span-1">
				<label className='mx-2'>نام رنگ</label>
				<input
				placeholder='نام رنگ ...'
					name="colorName"
					type="text"
					value={colorName}
					onChange={e => {
						if (id) {
							changeInStoreItemHand(id, e.target.name, e.target.value);
						}
					}}
					className="px-1 py-2 shadow-md shadow-violet-200 rounded-md"
				/>
			</div>
			<div className="my-4">
				<label className='mx-2'>کد رنگی</label>
				<input
					name="colorCode"
					type="color"
					value={colorCode}
					onChange={e => {
						if (id) {
							changeInStoreItemHand(id, e.target.name, e.target.value);
						}
					}}
					className="size-8 rounded-full shadow-md shadow-violet-300 p-1 "
				/>
			</div>
			<div className="my-4">
				<label className='mx-2'>موجودی انبار</label>
				<input
					name="qtys"
					type="number"
					value={Number(qtys)}
					onChange={e => {
						if (id) {
							changeInStoreItemHand(id, e.target.name, e.target.value);
						}
					}}
					className="px-1 py-2 shadow-md shadow-violet-200 rounded-md"
				/>
			</div>
			<div className="my-4">
				<label className='mx-2'>عکس محصول</label>
				<input
				placeholder='آدرس عکس محصول مورد نظر را وارد کنید ...'
					name="colorImg"
					type="text"
					value={colorImg}
					onChange={e => {
						if (id) {
							changeInStoreItemHand(id, e.target.name, e.target.value);
						}
					}}
					className="px-1 py-2 shadow-md shadow-violet-200 rounded-md w-full"
				/>
			</div>
			<button
				className=" border-2 border-gray-700 p-1 rounded-full "
				onClick={() => {
					if (id) {
						removeInStoreItemHand(id);
					}
				}}
			>
				<AiOutlineDelete className="size-7 text-red-600" />
			</button>
		</div>
	);
}

export default EditeBoxInStore;
