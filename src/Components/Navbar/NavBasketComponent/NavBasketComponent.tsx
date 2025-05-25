// 'use client';
// import { useShappingCartContext } from '@/context/ShappongCartContext';
// import { formatPrice } from '@/utils/price';
// import Link from 'next/link';
// import React from 'react';
// import { BsCart4 } from 'react-icons/bs';

// function NavBasketComponent() {
// 	const { userOrd } = useShappingCartContext();
// 	const basketItems = userOrd
// 		.find(items => items.items)
// 		?.items.reduce((total, price) => {
// 			return total + Number(price.price);
// 		}, 0);

// 	console.log('basketItems=> ', basketItems);

// 	return (
// 		<Link href={'/cart'} className="w-full ">
// 			<div className="flex border border-violet-600 px-1 py-2 rounded-md">
// 				<div>
// 					<BsCart4 />
// 				</div>
// 				<div>
// 					<span>قیمت:</span>
// 					<span>{formatPrice(Number(basketItems))}</span>
// 				</div>
// 			</div>
// 		</Link>
// 	);
// }

// export default NavBasketComponent;
