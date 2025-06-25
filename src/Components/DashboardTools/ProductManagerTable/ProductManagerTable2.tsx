'use client';
import {
	TAllProductData,
	TBoxItemPaginated,
	TCatDatas,
	TProductManagerTable2Props,
} from '@/types';
import React, { useEffect, useMemo, useState } from 'react';
import ProductManagerEditActions from '../ProductManagerEditActions/ProductManagerEditActions';
import ProductManagerRaportAction from '../ProductManagerRaportAction/ProductManagerRaportAction';
import PaginationBtns2 from '../PaginationBtns/PaginationBtns2';
import { TiDeleteOutline } from 'react-icons/ti';
import RemoveModal from '../RemoveModal/RemoveModal';
import PMTSOI from './PMTSOI/PMTSOI';
import { formatPrice } from '@/utils/price';

// | products paginated and Filtred

function ProductManagerTable2(props: TProductManagerTable2Props) {
	const { addProToSpeOffer, removeProToSPeOffer, spetialOfferList } = props;
	// const {persentageSO , setPersentageSO} = props

	const [allProductDatas, setAllProductDatas] = useState<TAllProductData[]>();
	const [catData, setCatData] = useState<TCatDatas[] | undefined>();
	const [catSelectedTable, setCatSelectedTable] = useState<string>('');

	const [isShowTitleSearch, setIsShowTitleSearch] = useState<boolean>(false);
	const [titleSearchInput, setTitleSearchInput] = useState<string>('');
	const [productCountInPage, setProductCountInPage] = useState<number>(4);
	const [splicedData, setSplicedData] = useState<
		TBoxItemPaginated[] | undefined
	>();
	const [presentPage, setPresentPage] = useState<number>(1);
	const [isShowRemoveModal, setIsShowRemoveModal] = useState<boolean>(false);
	const [seletedItem, setSeletedItem] = useState<{
		id: string;
		perTitle: string;
	}>();
	const [sortOption, setSortOption] = useState<
		'priceAsc' | 'priceDesc' | 'stockAsc' | 'stockDesc' | ''
	>('');

	// const [isFilttering , setIsFilttering] = useState<boolean>(false)

	const buttons = [];

	const getAllProducts = async () => {
		const response = await fetch(`http://localhost:8000/fabrics`);
		const productsData = (await response.json()) as TAllProductData[];
		setAllProductDatas(productsData);
		// setFiltredProductData(productsData);
	};
	const getAllCats = async () => {
		const response = await fetch(`http://localhost:8000/cats`);
		const catDataFetched = await response.json();
		setCatData(catDataFetched);
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

	const filteredProducts: TAllProductData[] = useMemo(() => {
		let result = [...(allProductDatas ?? [])];

		// فیلتر بر اساس عنوان
		if (titleSearchInput.trim() !== '') {
			result = result.filter(p =>
				p.perTitle.includes(titleSearchInput.trim())
			);
		}

		// فیلتر بر اساس دسته بندی
		if (catSelectedTable?.trim() !== '') {
			result = result.filter(p => p.cat?.catName === catSelectedTable);
		}

		// // مرتب‌سازی
		if (sortOption === 'priceAsc') {
			result.sort((a, b) => a.price - b.price);
		} else if (sortOption === 'priceDesc') {
			result.sort((a, b) => b.price - a.price);
		} else if (sortOption === 'stockAsc') {
			result.sort((a, b) => {
				const aStock = a.inStore.reduce(
					(sum, item) => sum + Number(item.qtys),
					0
				);
				const bStock = b.inStore.reduce(
					(sum, item) => sum + Number(item.qtys),
					0
				);
				return aStock - bStock;
			});
		} else if (sortOption === 'stockDesc') {
			result.sort((a, b) => {
				const aStock = a.inStore.reduce(
					(sum, item) => sum + Number(item.qtys),
					0
				);
				const bStock = b.inStore.reduce(
					(sum, item) => sum + Number(item.qtys),
					0
				);
				return bStock - aStock;
			});
		}

		return result;
	}, [allProductDatas, titleSearchInput, catSelectedTable, sortOption]);

	const paginatedProducts = useMemo(() => {
		const pages: TAllProductData[][] = [];
		for (let i = 0; i < filteredProducts.length; i += productCountInPage) {
			pages.push(filteredProducts.slice(i, i + productCountInPage));
		}
		return pages;
	}, [filteredProducts, productCountInPage]);

	useEffect(() => {
		getAllProducts();
		getAllCats();
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

	const removeProductHandeler = async () => {
		if (!seletedItem) return;
		const response = await fetch(
			`http://localhost:8000/fabrics/${seletedItem.id}`,
			{
				method: 'DELETE',
			}
		);
		if (response.ok) {
			alert('حذف با موفقیت انجام شد');
			getAllProducts();
		} else {
			console.log('عمیات نا موفق');
		}
		setIsShowRemoveModal(false);
		setPresentPage(1);
	};

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
		<div className="border-2 border-violet-400 shadow-md shadow-violet-200 rounded-md w-10/12 my-8">
			{/* Filttering Elements */}
			{isShowTitleSearch && (
				<div className="col-span-6 flex justify-center gap-12 border-b-2 border-violet-500">
						<input
							className="	px-1 py-2 my-1 shadow-md shadow-violet-200 border-2 border-violet-400  rounded-md "
							type="text"
							placeholder="جست و جو در عنوان"
							onChange={e => setTitleSearchInput(e.target.value)}
						/>
					<select onChange={e => setSortOption(e.target.value as any)}
						className='shadow-md shadow-violet-200 px-2 rounded-md my-1'
						>
						<option className='py-0.5 text-center ' value="">مرتب‌سازی</option>
						<option className='py-0.5 text-center ' value="priceAsc">قیمت ↑</option>
						<option className='py-0.5 text-center ' value="priceDesc">قیمت ↓</option>
						<option className='py-0.5 text-center ' value="stockAsc">موجودی ↑</option>
						<option className='py-0.5 text-center ' value="stockDesc">موجودی ↓</option>
					</select>
				</div>
			)}
			{/* Header Table */}
			<div className="grid grid-cols-12 w-full py-2 px-1 m-0 border-b-2 border-violet-500">
				<div
					className="col-span-2 w-full text-center py-1 font-bold border-x"
					onClick={() => setIsShowTitleSearch(prev => !prev)} 
				> 
					عنوان 
				</div>
				<div className="col-span-2 w-full text-center py-1 font-bold border-x">عکس</div>
				<div className="col-span-2 w-full text-center py-1 font-bold border-x">قیمت</div>
				<div className="col-span-1 w-full text-center py-1 font-bold border-x">موجودی</div>
				<div className="col-span-2 w-full text-center py-1 font-bold border-x">
					{/* Category FiltterHeadeer */}
					<select
					className='text-center py-1 font-bold'
						onChange={e => {
							setCatSelectedTable(e.target.value);
							setPresentPage(1);
						}}
					>
						<option className='text-center py-1 font-bold border-x' value={''}>دسته بندی</option>
						{catData?.map(cat => (
							<option value={cat.nameTag}>{cat.perTitle}</option>
						))}
					</select>
				</div>
				<div className="col-span-1 border-x w-full text-center py-1 font-bold">عملگرها</div>
				<div className="col-span-2 border-x w-full text-center py-1 font-bold">فروش ویژه</div>
			</div>
			{/* Table Body */}
			{paginatedProducts.length > 0 &&
				paginatedProducts[presentPage - 1].map(item => (
					<div className="grid grid-cols-12 w-full px-1 text-center border-b-2 border-violet-500">
						<div className="col-span-2  border-x flex items-center justify-center">
							{item.perTitle}
						</div>
						<div className="col-span-2  border-x">
							<img src={item.defImg} alt="" />
						</div>
						<div className="col-span-2  border-x flex items-center justify-center">{formatPrice(item.price)} تومان</div>

						<div className="col-span-1  border-x flex items-center justify-center">
							{item.inStore.reduce((total, item) => {
								return total + Number(item.qtys);
							}, 0)} متر
						</div>
						<div className="col-span-2  border-x flex items-center justify-center">
							{item.cat?.perTitle}
						</div>
						<div 
						className="col-span-1 border-x flex flex-col justify-center items-center gap-4"
						>
							<ProductManagerEditActions id={item.id} />
							<ProductManagerRaportAction id={item.id} />
							{/* remove-Product-Btn */}
							<button
							className='shadow-md shadow-red-300 size-10 rounded-full border-2 border-red-600 flex justify-center items-center'
								onClick={() => {
									setIsShowRemoveModal(true);
									setSeletedItem({
										id: item.id,
										perTitle: item.perTitle,
									});
								}}
							>
								<TiDeleteOutline className='size-7 text-red-500' />
							</button>
						</div>
						<div className="col-span-2  border-x">
							{/* product-manager-table-spetioal-offer-input */}
							<PMTSOI
								defImg={item.defImg}
								perTitle={item.perTitle}
								productId={item.id}
								addProToSpeOffer={addProToSpeOffer}
								removeProToSPeOffer={removeProToSPeOffer}
								spetialOfferList={spetialOfferList}
							/>
						</div>
					</div>
				))}
				{/* Pagination-BTN */}
			<div className="flex gap-3 justify-center items-center my-2">{buttons}</div>
			<RemoveModal
				cancelText="لغو"
				confirmText="حذف"
				itemTitle={seletedItem?.perTitle}
				loadingText="در حال حذف"
				onClose={() => {
					setIsShowRemoveModal(false);
				}}
				onRemove={removeProductHandeler}
				open={isShowRemoveModal}
			/>
		</div>
	);
}

export default ProductManagerTable2;
