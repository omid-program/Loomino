'use client';
import Container from '@/Components/Container/Container';
import AddCatModal from '@/Components/DashboardTools/AddCatModal/AddCatModal';
import AddTagModal from '@/Components/DashboardTools/AddTagModal/AddTagModal';
import RemoveModal from '@/Components/DashboardTools/RemoveModal/RemoveModal';
import PagesTitle from '@/Components/PageTitle/PagesTitle';
import { TCatDatas, TTagData } from '@/types';
import React, { useEffect, useState } from 'react';

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
		const catResponse = await fetch(`http://localhost:8000/cats`);
		const catFetched = (await catResponse.json()) as TCatDatas[];
		setCatDatas(catFetched);
	};
	const getTag = async () => {
		const tagResponse = await fetch(`http://localhost:8000/tags`);
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
	const handelCloseAddCatModal = ()=>{
		setOpenAddCatModal(false)
	} 
	useEffect(() => {
		getCats();
		getTag();
	}, []);
	// const
	return (
		<Container>
			<div>
				<PagesTitle title="مدیریت آیتم ها" />
				<div className="grid grid-cols-2 gap-4">
					<div className="col-span-1">
						<h2>برچسب ها</h2>
						<div>
							<button onClick={() => setOpenAddTagModal(true)}>
								برچسب جدید
							</button>
							<AddTagModal
								open={openAddTagModal}
								onClose={handelCloseAddTagModal}
							/>
						</div>
						<div>
							{tagData?.map(tag => (
								<div
									key={tag.id}
									className="border-r-4  px-1 py-2 my-1 border-sky-500 bg-sky-200 cursor-pointer"
									onClick={() => {
										setOpenRemoveModal(true);
										setSelectedItem({
											id: tag.id,
											perTitle: tag.TagName,
										});
										setRemoveUrl('http://localhost:8000/tags');
									}}
								>
									{tag.perTitle}
								</div>
							))}
						</div>
					</div>
					<div className="col-span-1 justify-center">
						<h2>دسته بندی ها</h2>
						<button
							onClick={() => {
								setOpenAddCatModal(true);
							}}
						>
							دسته بندی جدید
						</button>
						<div>
							<AddCatModal
								openCatModal={openAddCatModal}
								onCloseCatModal={handelCloseAddCatModal}
							/>
						</div>
						<div>
							{catDatas?.map(cat => (
								<div
									key={cat.id}
									className="border-r-4  px-1 py-2 my-1 border-rose-500 bg-rose-200 cursor-pointer"
									onClick={() => {
										setOpenRemoveModal(true);
										setSelectedItem({
											id: cat.id,
											perTitle: cat.perTitle,
										});
										setRemoveUrl(`http://localhost:8000/cats`);
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
		</Container>
	);
}

export default AddItemPage;
