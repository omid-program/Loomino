'use client';

import { TItemsOfOrders, TShappingCartContext } from '@/types';
import { baskeFormatMeter } from '@/utils/inputMeter';
import { createContext, useContext, useEffect, useState } from 'react';

const shappingCartContext = createContext({} as TShappingCartContext);

export const useShappingCartContext = () => {
	return useContext(shappingCartContext);
};

export function ShappingCartContextProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	// بارگذاری اولیه از localStorage
	const [userOrd, setUserOrd] = useState<TItemsOfOrders[]>(() => {
		if (typeof window !== 'undefined') {
			const saved = localStorage.getItem('shopping-cart');
			return saved ? JSON.parse(saved) : [];
		}
		return [];
	});

	const [userOffCode, setUserOffCode] = useState<number>(0);

	// ذخیره در localStorage هنگام تغییر سبد خرید
	useEffect(() => {
		localStorage.setItem('shopping-cart', JSON.stringify(userOrd));
	}, [userOrd]);

	const addOrdToCart = (
		id: string,
		perTitle: string,
		colorId: string,
		meterCount: number,
		centiMeterCount: number,
		colorCode: string,
		price: number
	) => {
		let productCount = baskeFormatMeter(meterCount, centiMeterCount);
		let isHaveOrd = userOrd.find(ord => ord.colorId === colorId);

		if (productCount >= 0.2) {
			if (isHaveOrd) {
				setUserOrd(prev =>
					prev.map(ord =>
						ord.colorId === colorId && ord.colorCode === colorCode
							? { ...ord, qty: productCount }
							: ord
					)
				);
			} else {
				let newOrd: TItemsOfOrders = {
					id,
					perTitle,
					colorId,
					qty: productCount,
					colorCode,
					price: Number(price),
				};
				setUserOrd(prev => [...prev, newOrd]);
			}
		}
	};

	const removeProductFromCart = (productId: string, colorId: string) => {
		setUserOrd(prev => {
			const newCart = prev.filter(ord => {
				return ord.colorId !== colorId || ord.id !== productId;
			});
			return newCart;
		});
	};

	const addOffcode = (persentageOffCode: number) => {
		setUserOffCode(persentageOffCode);
	};

	return (
		<shappingCartContext.Provider
			value={{
				userOrd,
				addOffcode,
				addOrdToCart,
				removeProductFromCart,
				userOffCode,
			}}
		>
			{children}
		</shappingCartContext.Provider>
	);
}
