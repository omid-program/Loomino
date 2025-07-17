'use client';
import { TCommentUserInfo, TCommetsData } from '@/types';
import React, { useEffect, useMemo, useState } from 'react';
import moment from 'moment-jalaali';
import UserInfoModal from '@/Components/Comments/CommentModal/UserInfoModal/UserInfoModal';
import CommentTextModal from '@/Components/Comments/CommentModal/CommentTextModal/CommentTextModal';
import CMTI from '@/Components/Comments/CMTI/CMTI';
import PagesTitle from '@/Components/PageTitle/PagesTitle';
import { API_BASE_URL } from './../../../../config';

type TShowUserInfoModal = (
	email: string,
	name: string,
	phoneNumber: string
) => void;
type FilterMode = 'all' | 'show' | 'hide';

function CommentManager() {
	const [allCommentDatas, setAllCommentDatas] = useState<
		TCommetsData[] | undefined
	>();
	const [isShowFlag, setIsShowFlag] = useState<boolean>(false);
	const [searchCommentText, setSearchCommentText] = useState<string>('');
	const [searchProductTitle, setSearchProductTitle] = useState<string>('');
	const [sortTime, setSortTime] = useState<'newest' | 'oldest'>('newest');
	const [peresentPage, setPeresentPage] = useState<number>(1);
	const [commentCountInPage, setCommentCountInPage] = useState<number>(12);
	// ///////////
	const [filterMode, setFilterMode] = useState<FilterMode>('all');

	const commentTabelHeader = [
		{
			id: '1',
			title: 'زمان',
		},
		{
			id: '2',
			title: 'نام محصول',
		},
		{
			id: '3',
			title: 'مشخصات کاربر',
		},
		{
			id: '4',
			title: 'متن کامنت',
		},
		{
			id: '5',
			title: 'وضعیت',
		},
	];
	const getAllComment = async () => {
		const res = await fetch(`${API_BASE_URL}/comments`);
		const data = (await res.json()) as TCommetsData[];
		setAllCommentDatas(data);
	};

	const filttredCommnets: TCommetsData[] = useMemo(() => {
		let result = [...(allCommentDatas ?? [])];

		// if (isShowFlag) {
		// 	result = result.filter(c => {
		// 		return c.isShow;
		// 	});
		// } else {
		// 	result = result.filter(c => {
		// 		return !c.isShow;
		// 	});
		// }
		if (filterMode === 'show') {
			result = result.filter(c => c.isShow);
		} else if (filterMode === 'hide') {
			result = result.filter(c => !c.isShow);
		}

		if (searchCommentText.trim() !== '') {
			result = result.filter(c => {
				return c.commentText.includes(searchCommentText.trim());
			});
		}
		if (searchProductTitle.trim() !== '') {
			result = result.filter(c => {
				return c.productTitle.includes(searchProductTitle.trim());
			});
		}
		if (sortTime === 'oldest') {
			result = result.sort((a, b) => {
				const aStock = Number(a.createdAt.slice(0, 10).split('-').join(''));
				const bStock = Number(b.createdAt.slice(0, 10).split('-').join(''));
				return aStock - bStock;
			});
		} else if (sortTime === 'newest') {
			result = result.sort((a, b) => {
				const aStock = Number(a.createdAt.slice(0, 10).split('-').join(''));
				const bStock = Number(b.createdAt.slice(0, 10).split('-').join(''));
				return bStock - aStock;
			});
		}
		return result;
	}, [allCommentDatas, isShowFlag, searchCommentText,searchProductTitle, sortTime, filterMode]);

	const paginatedComments = useMemo(() => {
		const pages: TCommetsData[][] = [];
		for (let i = 0; i < filttredCommnets.length; i += commentCountInPage) {
			pages.push(filttredCommnets.slice(i, i + commentCountInPage));
		}
		return pages;
	}, [filttredCommnets, commentCountInPage]);

	// console.log("paginatedComments=> " , paginatedComments);
	// console.log("paginatedComments[0] => " , paginatedComments[0]);

	useEffect(() => {
		getAllComment();
	}, []);

	const handleStatusChange = (id: string, newIsShow: boolean) => {
		setAllCommentDatas(
			prev =>
				prev &&
				prev.map(c => (c.id === id ? { ...c, isShow: newIsShow } : c))
		);
	};

	return (
		<div className="w-11/12 mx-auto">
			<PagesTitle title="مدیریت نظرات" />
			<div id="table">
				<div id="search-filter" className="grid grid-cols-4 my-8">
					<div id="search-comment" className="col-span-3 flex justify-center px-5 gap-5 my-3 ">
						{/* <div id="search-comment-text"> */}
							{/* <label htmlFor="">جست و جو در متن کامنت</label> */}
							<input
								placeholder="جست و جو در متن کامنت ..."
								className="py-2 px-1 rounded-md border-2 border-violet-400 shadow-md shadow-violet-200 w-full"
								type="text"
								onChange={e => {
									setSearchCommentText(e.target.value);
								}}
							/>
						{/* </div> */}
						{/* <div id="search-comment-product-title"> */}
							{/* <label htmlFor="">جست و جو در عنوان محصول:</label> */}
							<input
								className="py-2 px-1 rounded-md border-2 border-violet-400 shadow-md shadow-violet-300 w-full"
								type="text"
								placeholder="جست و جو در عنوان محصول ..."
								onChange={e => {
									setSearchProductTitle(e.target.value);
								}}
							/>
						{/* </div> */}
					</div>
					<div id="filtter-comments" className="col-span-1 flex justify-center items-center gap-5">
						<div id="sort-of-time">
							<select
							className='p-1 border-2 border-dashed border-violet-400 text-center'
								onChange={e => {
									setSortTime(e.target.value as any);
								}}
								value={sortTime}
							>
								<option value="">مرتب‌سازی</option>
								<option value="newest">جدید به قدیم</option>
								<option value="oldest">قدیم به جدید</option>
							</select>
						</div>
						<div id="sort-of-valid">
							{/* <button
								onClick={() => {
									setIsShowFlag(prev => !prev);
								}}
							>
								{isShowFlag ? 'تایید شده' : 'درحال انتظار'}
							</button> */}
							<select
							className='p-1 border-2 text-center border-dashed border-violet-400'
								value={filterMode}
								onChange={e => {
									setFilterMode(e.target.value as any);
								}}
							>
								<option value="all">همه</option>
								<option value="show">تایید شده</option>
								<option value="hide">در حال انتظار</option>
							</select>
						</div>
					</div>
				</div>
				<div id="headerTable" className="grid grid-cols-5">
					{commentTabelHeader.map(hI => (
						<div
							key={hI.id}
							className=" grid col-span-1 text-center border-2 border-gray-900  py-2 font-bold "
						>
							{hI.title}
						</div>
					))}
				</div>
				<div id="bodyTable">
					{paginatedComments.length > 0 &&
						paginatedComments[peresentPage - 1].map(comInfo => (
							<CMTI {...comInfo} onStatusChange={handleStatusChange} />
						))}
				</div>
			</div>
		</div>
	);
}

export default CommentManager;
