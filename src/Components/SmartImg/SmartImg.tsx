'use client';
import { TInStoreAllProduct, TSmartImgProps, TUserOrds } from '@/types';
import React, { useState } from 'react';
import QtyManager from '../QtyManager/QtyManager';

function SmartImg(props: TSmartImgProps) {
	console.log(props);
	const colorList = props?.colorList;
	const id = props.id;
	const price = Number(props.price);
	const perTitle = props.perTitle;

	console.log('colorList => ', colorList);

	const [colorImg, setColorImg] = useState<string>(colorList[0].colorImg);
	const [colorQtys, setColorQtys] = useState<string | undefined>(
		colorList[0].qtys
	);
	const [colorCode, setColorCode] = useState<string>(colorList[0].colorCode);
	const [colorName, setColorName] = useState(colorList[0].colorName);
	const [colorId, setColorId] = useState<string | undefined>(colorList[0].id);

	const [imgShadow, setImgShadow] = useState<string>(colorList[0].colorCode);

	const changeImgColor = (colorSelectImg: TInStoreAllProduct) => {
		if (colorSelectImg?.colorImg) {
			setColorImg(colorSelectImg.colorImg);
			colorSelectImg.colorCode && setImgShadow(colorSelectImg.colorCode);
		}
		let colorSelect = colorList?.find(item => {
			return item.colorImg === colorSelectImg?.colorImg;
		});
		setColorQtys(colorSelect?.qtys);
		colorSelectImg?.colorCode && setColorCode(colorSelectImg.colorCode);
		setColorId(colorSelect?.id);
		colorSelect?.colorName && setColorName(colorSelect?.colorName);
	};
	// console.log('SmartImg=>' , id);

	return (
		<div className="flex flex-col gap-4 justify-center items-center my-8 border-2 p-3 border-l-2 border-violet-400 rounded-sm ">
			<div style={{ boxShadow: `3px 5px 17px 1px ${imgShadow}` }}>
				<img id="smartImgId" src={colorImg} alt="" />
			</div>

			<div 
			className="flex gap-3">
				{colorList.map(colorItem => (
					<button
						key={colorItem.id}
						onClick={() => {
							changeImgColor({ ...colorItem });
						}}
						style={{ backgroundColor: colorItem.colorCode }}

						// className="size-10 rounded-full"
						className="p-1  rounded-md"
					>
						{colorItem.colorName}
						{/* . */}
					</button>
				))}
			</div>
			<div className="grid grid-cols-4 gap-1 ">
				<span className='grid col-span-3'>موجودی رنگ {colorName}: </span>
				<span className='grid col-span-1'>{colorQtys}متر</span>
			</div>
			<QtyManager
				id={id}
				colorCode={colorCode}
				price={price}
				colorId={colorId}
				perTitle={perTitle}
				colorQtys={Number(colorQtys)}
			/>
		</div>
	);
}
export default SmartImg;
