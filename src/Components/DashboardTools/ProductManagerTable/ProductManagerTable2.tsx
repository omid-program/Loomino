'use client';
import { TAllProductData, TBoxItemPaginated } from '@/types';
import React, { useEffect, useState } from 'react';
import ProductManagerEditActions from '../ProductManagerEditActions/ProductManagerEditActions';
import ProductManagerRaportAction from '../ProductManagerRaportAction/ProductManagerRaportAction';
import PaginationBtns2 from '../PaginationBtns/PaginationBtns2';
import { TiDeleteOutline } from "react-icons/ti";
import RemoveModal from '../RemoveModal/RemoveModal';



function ProductManagerTable2() {
	const [allProductDatas, setAllProductDatas] = useState<TAllProductData[]>();
	const [isShowTitleSearch, setIsShowTitleSearch] = useState<boolean>(false);
	const [titleSearchInput, setTitleSearchInput] = useState<string>('');
	const [productCountInPage, setProductCountInPage] = useState<number>(4);
	const [splicedData, setSplicedData] = useState<
		TBoxItemPaginated[] | undefined
	>();
	const [presentPage, setPresentPage] = useState<number>(1);
	const [isShowRemoveModal, setIsShowRemoveModal]=useState<boolean>(false)
	const [seletedItem , setSeletedItem] = useState<{id:string , perTitle:string}>()


	const buttons = [];

	const getAllProducts = async () => {
		const response = await fetch(`http://localhost:8000/fabrics`);
		const productsData = (await response.json()) as TAllProductData[];
		setAllProductDatas(productsData);
	};

	function splitToPages(
		productArray: TAllProductData[],
		itemsPerPage: number
	) {
		const result = [];

		for (let i = 0; i < productArray.length; i += itemsPerPage) {
			const page = productArray.slice(i, i + itemsPerPage);
			result.push(page);
		}

		return result;
	}

	const searchTitleHandler = () => {
		setAllProductDatas(prev=>prev?.filter(product=>product.perTitle.includes(titleSearchInput)))
		console.log('titleSearchInput=>', titleSearchInput);
	};

	useEffect(() => {
		getAllProducts();
	}, []);
	useEffect(() => {
		const spliceAllData =
			allProductDatas && splitToPages(allProductDatas, productCountInPage);
		setSplicedData(spliceAllData);
		console.log(spliceAllData);
	}, [allProductDatas]);

	const paginationHand = (i: number) => {
		setPresentPage(i);
	};

	const removeProductHandeler = async()=>{
		if(!seletedItem) return;
		const response = await fetch(`http://localhost:8000/fabrics/${seletedItem.id}` , {
			method:'DELETE'
		})
		if(response.ok){
			alert('حذف با موفقیت انجام شد')
			setAllProductDatas(prev=>prev?.filter(item=>item.id !== seletedItem.id))
		}else{
			console.log('عمیات نا موفق');
			
		}
		setIsShowRemoveModal(false)
		setPresentPage(1)
	}

	if (splicedData) {
		for (let i = 1; i <= splicedData.length; i++) {
			buttons.push(
				<PaginationBtns2
					presentPage={presentPage}
					key={i}
					i={i}
					paginationHand={paginationHand}
				/>
			);
		}
	}

	return (
		<div className="border-2 border-sky-600 rounded-md w-10/12">
			{isShowTitleSearch && (
				<div className="col-span-6">
					<input
						type="text"
						placeholder="جست و جو در عنوان"
						onChange={e => setTitleSearchInput(e.target.value)}
					/>
					<button onClick={searchTitleHandler}>جست و جو عنوان</button>
				</div>
			)}
			<div className="grid grid-cols-6 w-full py-2 px-1">
				<div
					className="col-span-1 border-y w-full"
					onClick={() => setIsShowTitleSearch(prev => !prev)}
				>
					عنوان
				</div>
				<div className="col-span-1 border-y w-full">عکس</div>
				<div className="col-span-1 border-y w-full">قیمت</div>
				<div className="col-span-1 border-y w-full">موجودی</div>
				<div className="col-span-1 border-y w-full">دسته بندی</div>
				<div className="col-span-1 border-y w-full">عملگرها</div>
			</div>
			{splicedData &&
				splicedData[presentPage - 1].map(item => (
					<div className="grid grid-cols-6 w-full py-2 px-1">
						<div className="col-span-1 border-y w-full">
							{item.perTitle}
						</div>
						<div className="col-span-1 border-y w-full">
							<img src={item.defImg} alt="" />
						</div>
						<div className="col-span-1 border-y w-full">{item.price}</div>

						<div className="col-span-1 border-y w-full">
							{item.inStore.reduce((total, item) => {
								return total + Number(item.qtys);
							}, 0)}
						</div>
						<div className="col-span-1 border-y w-full">
							{item.cat?.perTitle}
						</div>
						<div className="col-span-1 border-y w-full">
							<ProductManagerEditActions id={item.id} />
							<ProductManagerRaportAction id={item.id} />
							<button onClick={()=>{setIsShowRemoveModal(true)
								setSeletedItem({id: item.id , perTitle: item.perTitle})
							}}>
								<TiDeleteOutline/>
							</button>
						</div>
					</div>
				))}
			<div className='flex gap-3'>{buttons}</div>
			<RemoveModal
			cancelText='لغو'
			confirmText='حذف'
			itemTitle={seletedItem?.perTitle}
			loadingText='در حال حذف'
			onClose={()=>{setIsShowRemoveModal(false)}}
			onRemove={removeProductHandeler}
			open ={isShowRemoveModal} />
		</div>
	);
}

export default ProductManagerTable2;
