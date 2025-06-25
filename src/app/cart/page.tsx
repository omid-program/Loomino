'use client';
import CartItem from '@/Components/CartTools/CartItem/CartItem';
import Container from '@/Components/Container/Container';
import OrderShappingInfo from '@/Components/OrderShappingInfo/OrderShappingInfo';
import PagesTitle from '@/Components/PageTitle/PagesTitle';
import TotalPriceBox from '@/Components/TotalPriceBox/TotalPriceBox';
import { useShappingCartContext } from '@/context/ShappongCartContext';
// import { TAllProductData } from "@/types";
// import { useEffect, useState } from "react";

function Cart() {
	const { userOrd } = useShappingCartContext();
	// const [allData, setAllData] = useState<TAllProductData[]>();
	// const [ordData, setOrdData] = useState<TAllProductData[]>();
	// const [mergedOrderData, setMergedOrderData] = useState([]);

	return (
		<Container>
			<div>
				<PagesTitle title="سبد خرید" />
				<div className='grid grid-cols-2 gap-8 '>
					{userOrd?.map(item => (
						<CartItem
							key={item.colorId}
							id={item.id}
							colorId={item.colorId}
							colorCode={item.colorCode}
							price={item.price}
							qty={item.qty}
						/>
					))}
				</div>
				<div>
					<TotalPriceBox />
				</div>
				<div>
					<OrderShappingInfo />
				</div>
			</div>
		</Container>
	);
}

export default Cart;
