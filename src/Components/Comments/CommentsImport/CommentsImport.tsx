'use client';
import { TCommetsData, TCommetsInfo } from '@/types';
import React, { useState } from 'react';
import { API_BASE_URL } from './../../../../config';


interface ICommentImportProps {
	productId: string;
	productTitle: string;
	productImg: string;
}
// interface ICommentInfoState {
// 	name: string;
// 	phoneNumber: string;
// 	email: string;
// 	commentText: string;
// 	createdAt: string
// 	isShow: boolean;
// 	productId: string;
// }

function CommentsImport(props: ICommentImportProps) {
	const { productId, productImg, productTitle } = props;
	const now = new Date().toISOString();
	const [commentInfo, setComentInfo] = useState<TCommetsInfo>({
		id: crypto.randomUUID(),
		name: '',
		email: '',
		phoneNumber: '',
		commentText: '',
		createdAt: now,
		isShow: false,
		productId: productId,
		productTitle,
		productImg,
	});
	const changeInputHand = (
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setComentInfo(
			prev =>
				prev && {
					...prev,
					[name]: value,
				}
		);
	};
	const sendCommentHandler = () => {
		try {
			commentInfo &&
				fetch(`${API_BASE_URL}/comments`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(commentInfo),
					
				});
				alert('با تشکر؛ نظر شما با موفیت ثبت شد و در به زودی نمایش داده می‌شود⭐🙏🏽')
			} catch (error) {
			console.log(error);
			alert('با ارز پوزش مشکلی پیش آمده!!🔧')
		}
	};

	const commentInput = [
		{
			id: 1,
			label: 'نام',
			name: 'name',
			value: commentInfo?.name,
			changeHandel: changeInputHand,
		},
		{
			id: 2,
			label: 'شماره تماس',
			name: 'phoneNumber',
			value: commentInfo?.phoneNumber,
			changeHandel: changeInputHand,
		},
		{
			id: 3,
			label: 'ایمیل',
			name: 'email',
			value: commentInfo?.email,
			changeHandel: changeInputHand,
		},
	];

	return (
		<div className="mx-auto my-10 border border-violet-500 px-2 py-4">
			{commentInput.map(item => (
				<div key={item.id} className="my-2">
					<label className="text-xl  ">{item.label}:</label>
					<input
						name={item.name}
						value={item.value}
						onChange={e => changeInputHand(e)}
						type="text"
						className=" border-b-2 border-violet-600 border-dashed px-1 pt-3 pb-0 text-lg "
					/>
				</div>
			))}
			<div className="my-8 mx-3 flex items-center ">
				<label className="text-xl mx-1 "> متن نظر:</label>
				<textarea
					name="commentText"
					minLength={1}
					maxLength={100}
					onChange={e => {
						changeInputHand(e);
					}}
					className=" w-9/12 h-48 border-r-4 border-violet-600 bg-violet-100 rounded-md  px-1 py-2 text-lg "
				/>
			</div>
			<div className="flex justify-center">
				<button
					onClick={sendCommentHandler}
					// className=" border-2 border-violet-500 text-center rounded-md text-xl py-2 px-8 "
					className=" border-x-4 bg-violet-100 border-violet-500 text-center rounded-md text-xl py-2 px-8 "
				>
					ارسال
				</button>
			</div>
		</div>
	);
}

export default CommentsImport;
