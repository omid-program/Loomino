'use client';
import Container from '@/Components/Container/Container';
import AddCatModal from '@/Components/DashboardTools/AddCatModal/AddCatModal';
import AddTagModal from '@/Components/DashboardTools/AddTagModal/AddTagModal';
import RemoveModal from '@/Components/DashboardTools/RemoveModal/RemoveModal';
import PagesTitle from '@/Components/PageTitle/PagesTitle';
import { TCatDatas, TTagData } from '@/types';
import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from './../../../../config';

function AddItemPage() {
	const [catDatas, setCatDatas] = useState<TCatDatas[]>();
	const [tagData, setTagData] = useState<TTagData[]>();
	// const [selectedTag, setSelectedTag] = useState<string[]>([]);

	const [openRemoveModal, setOpenRemoveModal] = useState<boolean>(false);
	const [openAddTagModal, setOpenAddTagModal] = useState<boolean>(false);
	const [openAddCatModal, setOpenAddCatModal] = useState<boolean>(false);
	const [selectedItem, setSelectedItem] = useState<
		| {
				id: string;
				perTitle: string;
		  }
		| undefined
	>();

	const [removeUrl, setRemoveUrl] = useState<string>();

	const getCats = async () => {
		const catResponse = await fetch(`${API_BASE_URL}/cats`);
		const catFetched = (await catResponse.json()) as TCatDatas[];
		setCatDatas(catFetched);
	};
	const getTag = async () => {
		const tagResponse = await fetch(`${API_BASE_URL}/tags`);
		const tagsFetched = (await tagResponse.json()) as TTagData[];
		setTagData(tagsFetched);
	};
	const removeCatHandler = async () => {
		if (!removeUrl || !selectedItem) return;
		// const currentItem = removeUrl.includes('cats') ? catDatas : tagData;
		// const removedInArray = currentItem?.filter(
		// 	cat => cat.id !== selectedItem?.id
		// );

		// console.log('removedCatInArray=>', removedInArray);
		const response = await fetch(`${removeUrl}/${selectedItem.id}`, {
			method: 'DELETE',
			// headers: { 'Content-Type': 'application/json' },
			// body: JSON.stringify(removedInArray),
		});
		if ((await response).ok) {
			alert('حذف با موفقیت انجام شد');
			if (removeUrl.includes('cats')) {
				setCatDatas(prevCat =>
					prevCat?.filter(catItem => catItem.id !== selectedItem.id)
				);
			} else {
				setTagData(prevTag =>
					prevTag?.filter(tagItem => tagItem.id !== selectedItem.id)
				);
			}
			setOpenRemoveModal(false);
		}
	};
	const handleCloseModal = () => {
		setOpenRemoveModal(false);
		setSelectedItem(undefined);
		setRemoveUrl(undefined);
	};

	const handelCloseAddTagModal = () => {
		setOpenAddTagModal(false);
	};
	const handelCloseAddCatModal = () => {
		setOpenAddCatModal(false);
	};
	useEffect(() => {
		getCats();
		getTag();
	}, []);
	// const
	return (
		<>
			<div className="w-11/12 mx-auto">
				<PagesTitle title="مدیریت آیتم ها" />
				<div className="grid grid-cols-2 gap-4">
					<div className="col-span-1">
						<div>
							<div className="flex justify-between px-8 items-center">
								<h2 className="text-xl font-bold">برچسب ها</h2>
								<button
									className="text-3xl text-blue-600  shadow-md shadow-blue-300 size-10 rounded-full flex justify-center items-center font-bold"
									onClick={() => setOpenAddTagModal(true)}
								>
									+
								</button>
							</div>
							<AddTagModal
								open={openAddTagModal}
								onClose={handelCloseAddTagModal}
							/>
						</div>
						<div className="shadow-md shadow-blue-200 rounded-md py-4 px-2 max-h-96 overflow-y-scroll grid grid-cols-2 gap-5">
							{tagData?.map(tag => (
								<div
									key={tag.id}
									className="border-r-4 rounded-l-md  px-1 py-2 border-blue-500 bg-blue-200 cursor-pointer"
									onClick={() => {
										setOpenRemoveModal(true);
										setSelectedItem({
											id: tag.id,
											perTitle: tag.TagName,
										});
										setRemoveUrl(`${API_BASE_URL}/tags`);
									}}
								>
									{tag.perTitle}
								</div>
							))}
						</div>
					</div>
					<div className="col-span-1">
						<div>
							<div className="flex justify-between px-8 items-center">
								<h2 className="text-xl font-bold">دسته بندی ها</h2>
								<button
									className="text-3xl text-rose-600  shadow-md shadow-rose-300 size-10 rounded-full flex justify-center items-center font-bold"
									onClick={() => {
										setOpenAddCatModal(true);
									}}
								>
									+
								</button>
							</div>
							<div>
								<AddCatModal
									openCatModal={openAddCatModal}
									onCloseCatModal={handelCloseAddCatModal}
								/>
							</div>
						</div>
						<div className="shadow-md shadow-rose-200 rounded-md py-4 px-2 max-h-96 overflow-y-scroll grid grid-cols-2 gap-5">
							{catDatas?.map(cat => (
								<div
									key={cat.id}
									className="border-r-4 rounded-l-md  px-1 py-2 my-1 border-rose-500 bg-rose-200 cursor-pointer"
									onClick={() => {
										setOpenRemoveModal(true);
										setSelectedItem({
											id: cat.id,
											perTitle: cat.perTitle,
										});
										setRemoveUrl(`${API_BASE_URL}/cats`);
									}}
								>
									{/* onClick for go to remove cat modal */}
									{cat.perTitle}
								</div>
							))}
						</div>
						<RemoveModal
							onClose={handleCloseModal}
							open={openRemoveModal}
							itemTitle={selectedItem?.perTitle}
							onRemove={removeCatHandler}
							confirmText="حذف آیتم"
							cancelText="لغو"
							loadingText="در حال حذف آیتم ..."
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export default AddItemPage;
