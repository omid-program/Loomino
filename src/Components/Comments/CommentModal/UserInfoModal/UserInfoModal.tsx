import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TCommentUserInfo } from '@/types';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

export default function UserInfoModal(props: TCommentUserInfo) {
	const { email, name, phoneNumber } = props;
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<div>
			<Button onClick={handleOpen}>
				<span className="text-xl text-hover px-2 py-2 border border-dashed rounded-3xl  ">نمایش مشخصات</span>
			</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<div className="p-1 text-center border-2 text-textMain">
						<Typography
							id="modal-modal-title"
							variant="h5"
							component="h2"
						>
							لیست مشخصات کاربر
						</Typography>
					</div>
					<div className="mt-4 text-textMainMuted">
						<div className=" p-1 border-b-2 border-dashed border-gray-800 flex gap-4 items-center">
							<span className="">
								<Typography variant="h6">نام کاربری: </Typography>
							</span>
							<span>
								<Typography>{name}</Typography>
							</span>
						</div>
						<div className=" p-1 border-b-2 border-dashed border-gray-800 flex gap-4 items-center">
							<span className="">
								<Typography variant="h6">شماره تماس: </Typography>
							</span>
							<span>
								<Typography>{phoneNumber}</Typography>
							</span>
						</div>
						<div className=" p-1 border-b-2 border-dashed border-gray-800 flex gap-4 items-center">
							<span className="">
								<Typography variant="h6"> ایمیل: </Typography>
							</span>
							<span>
								<Typography>{email}</Typography>
							</span>
						</div>
					</div>
				</Box>
			</Modal>
		</div>
	);
}
