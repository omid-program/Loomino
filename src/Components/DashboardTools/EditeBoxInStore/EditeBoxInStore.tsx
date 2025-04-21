import { TEditeBoxInStoreProps } from '@/types';
import React from 'react';
import ProductManagerEditInput from '../ProductManagerEditInput/ProductManagerEditInput';

function EditeBoxInStore(props: TEditeBoxInStoreProps) {
	const { colorCode, colorImg, colorName, qtys, changeInStoreItemHand, id } =
		props;
	console.log(props);

	//مثل اینپوت های قبلی

	const inputEditItems = props
		? [
				{
					id: 1,
					label: 'نام رنگ: ',
					type: 'text',
					name: 'colorName',
					isLong: false,
					size: 'md',
					value: colorName,
				},
				{
					id: 2,
					label: 'کد رنگی: ',
					type: 'color',
					name: 'colorCode',
					isLong: false,
					size: 'md',
					value: colorCode,
				},
				{
					id: 3,
					label: 'عکس محصول: ',
					type: 'text',
					name: 'defImg',
					isLong: false,
					size: 'lg',
					value: colorImg,
				},
				{
					id: 4,
					label: 'موجودی انبار',
					type: 'number',
					name: 'qtys',
					isLong: true,
					size: 'sm',
					value: qtys,
				},
		  ]
		: [];

	return (
		<div className="border border-rose-600 rounded-md">
			{/* {
				inputEditItems.map(item=>(
					<ProductManagerEditInput
					label={item.label}
					type={item.type}
					name={item.name}
					value={item.value}
					changeInputHand={changeInStoreItemHand}
					size={item.size}
					isLong={item.isLong}

					/>
				))
			} */}

			<div className="my-4">
				<label>نام رنگ</label>
				<input
					name="colorName"
					type="text"
					value={colorName}
					onChange={e => {
						if(id){
							changeInStoreItemHand(id, e.target.name, e.target.value);
						}					}}
					className="px-1 py-2 bg-rose-400"
				/>
			</div>
			<div className="my-4">
				<label>کد رنگی</label>
				<input
					name="colorCode"
					type="color"
					value={colorCode}
					onChange={e => {
						if(id){
							changeInStoreItemHand(id, e.target.name, e.target.value);
						}
					}}
					className="px-1 py-2 bg-rose-400"
				/>
			</div>
			<div className="my-4">
				<label>موجودی انبار</label>
				<input
					name="qtys"
					type="number"
					value={qtys}
					onChange={e => {
						if(id){
							changeInStoreItemHand(id, e.target.name, e.target.value);
						}					}}
					className="px-1 py-2 bg-rose-400"
				/>
			</div>
			<div className="my-4">
				<label>عکس محصول</label>
				<input
					name="colorImg"
					type="text"
					value={colorImg}
					onChange={e => {
						if(id){
							changeInStoreItemHand(id, e.target.name, e.target.value);
						}					}}
					className="px-1 py-2 bg-rose-400"
				/>
			</div>
		</div>
	);
}

export default EditeBoxInStore;
