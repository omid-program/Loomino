'use client';
import moment from 'moment-jalaali';
import { TCommetsData } from '@/types';
import React, { useState } from 'react';
import UserInfoModal from '../CommentModal/UserInfoModal/UserInfoModal';
import CommentTextModal from '../CommentModal/CommentTextModal/CommentTextModal';
import { space } from '@/postcss/lib/list';
import { API_BASE_URL } from './../../../../config';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@/@mui/material/esm';

import axios from '@/axios';

function CMTI(props: TCommetsData) {
	const {
		commentText,
		createdAt,
		email,
		id,
		isShow,
		name,
		phoneNumber,
		productId,
		productImg,
		productTitle,
		onStatusChange,
	} = props;
	// const [isValid, setIsValid] = useState<boolean>(isShow);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const darkMode = createTheme({
		palette: { mode: 'dark' },
	});

	const changeStatusHand = async (newIsShow: boolean) => {
		if (isLoading) return;
		try {
			setIsLoading(true);
			await axios.patch(`${API_BASE_URL}/comments/${id}`, {
				isShow: newIsShow,
			});
			// setIsValid(newIsShow);
			onStatusChange(id, newIsShow);
		} catch (error) {
			console.log('خطا در ارتباط با سرور', error);
			alert('خطا در بروز رسانی وضعیت');
		} finally {
			setIsLoading(false);
		}
	};

	const changeCommentStatus = () => {
		changeStatusHand(!isShow);
	};

	return (
		<div>
			<div className="grid grid-cols-5">
				<div className="grid col-span-1 text-center py-2 border border-gray-300">
					{moment(createdAt).format('jYYYY/jMM/jDD')}
				</div>
				<div className="grid col-span-1 text-center py-2 border border-gray-300">
					{productTitle}
				</div>
				<div className="grid col-span-1 text-center py-2 border border-gray-300">
					<ThemeProvider theme={darkMode}>
						<UserInfoModal
							name={name}
							phoneNumber={phoneNumber}
							email={email}
						/>
					</ThemeProvider>
				</div>
				<div className="grid col-span-1 text-center py-2 border border-gray-300">
					<ThemeProvider theme={darkMode}>
						<CommentTextModal commentText={commentText} />
					</ThemeProvider>
				</div>
				<div className="  text-center py-2 border border-gray-300 ">
					<button
						onClick={() => {
							changeCommentStatus();
						}}
						style={
							isShow
								? {
										// backgroundColor: '#CBC0FF',
										// color: '#374151',
										boxShadow: ' 0 4px 6px -1px rgb(137 255 133 )',
										borderWidth: '2px',
										borderColor: '#23A100',
								  }
								: {
										// backgroundColor: '#374151',
										// color: '#CBC0FF',
										boxShadow: ' 0 4px 6px -1px rgb(255 102 35 )',
										borderWidth: '2px',
										borderColor: '#DE701F',
								  }
						}
						className={`rounded-md p-2`}
					>
						{isShow === true ? (
							<span>تایید شده</span>
						) : (
							<span>در انتظار</span>
						)}
					</button>
				</div>
			</div>
		</div>
	);
}

export default CMTI;
