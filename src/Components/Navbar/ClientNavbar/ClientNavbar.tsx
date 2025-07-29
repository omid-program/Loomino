'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import LogoutComponent from '../LogoutComponent/LogoutComponent';
import { TbChartArcs } from 'react-icons/tb';
import { useAuthStatus } from '@/hooks/useAuthStatus';
import { GrLogout } from 'react-icons/gr';
import { useShappingCartContext } from '@/context/ShappongCartContext';
import { formatPrice } from '@/utils/price';
import { BsCart4 } from 'react-icons/bs';

function ClientNavbar() {
	const isLogedIn = useAuthStatus();
	const [basketPrice, setBasketPrice] = useState<number>(0);
	const { userOrd } = useShappingCartContext();

	const deleteToken = () => {
		document.cookie = 'token=; Max-Age=0; path=/';
		window.location.reload(); // یا یه context trigger بزنی برای ری‌رندر
	};

	useEffect(() => {
		const basketItems = userOrd?.reduce((total, item) => {
			return total + Number(item.price) * Number(item.qty);
		}, 0);

		setBasketPrice(basketItems);
	}, [userOrd]);

	return (
		<nav className="w-4/6 max-h-16 mx-auto py-3 flex justify-end px-6 items-center    ">
			<div className="w-full flex items-center justify-end gap-2">
				<div className="">
					<Link href={'/cart'} className=" ">
						<div className="flex border border-textMain px-1 py-2 rounded-md hover:shadow-md hover:shadow-textMainMuted">
							<div>
								<BsCart4 />
							</div>
							<div>
								<span>قیمت:</span>
								<span>{formatPrice(Number(basketPrice))}</span>
							</div>
						</div>
					</Link>{' '}
				</div>
				{isLogedIn ? (
					<div className="flex justify-center items-center gap-2">
						<Link href={'/dashboard'}>
							<div className="flex justify-center items-center border border-textMain px-1 py-2 rounded-md hover:shadow-md  hover:shadow-textMainMuted ">
								<span>داشبورد</span>
								<span>
									<TbChartArcs />
								</span>
							</div>
						</Link>
						<div className=" p-2 rounded-md border border-slate-700 hover:bg-slate-700 hover:text-slate-100 ">
							<button onClick={deleteToken}>
								<GrLogout />
							</button>
						</div>
					</div>
				) : (
					<Link href={`login`}>
						<div className="border border-textMain px-1 py-2 rounded-md hover:shadow-md hover:shadow-textMainMuted ">
							ورود / عضویت
						</div>
					</Link>
				)}
			</div>
		</nav>
	);
}

export default ClientNavbar;
