'use client';
import { TCommetsData } from '@/types';
import React, { useState } from 'react';

interface ICommentImportProps {
	productId: string;
	productTitle: string
	productImg: string
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
	const { productId ,productImg , productTitle } = props;
	const now = new Date().toISOString()
	const [commentInfo, setComentInfo] = useState<TCommetsData>({
		id: crypto.randomUUID(),
		name: '',
		email: '',
		phoneNumber: '',
		commentText: '',
		createdAt: now ,
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

				fetch(`http://localhost:8000/comments`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(commentInfo),
				});
		} catch (error) {
			console.log(error);
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
		<div className="mx-auto my-10 border border-violet-500">
			{commentInput.map(item => (
				<div key={item.id} className="my-3 mx-3">
					<label className="text-xl mx-1 ">{item.label}:</label>
					<input
						name={item.name}
						value={item.value}
						onChange={e => changeInputHand(e)}
						type="text"
						className=" border-b-2 border-violet-600 border-dashed px-1 py-2 text-lg "
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
			<button
				onClick={sendCommentHandler}
				className="w-24 border-violet-500 text-center"
			>
				ارسال
			</button>
		</div>
	);
}

export default CommentsImport;
