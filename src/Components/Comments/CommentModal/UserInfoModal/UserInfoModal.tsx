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

export default function UserInfoModal(props:TCommentUserInfo) {
	const {email,name,phoneNumber} = props
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<div>
			<Button onClick={handleOpen}><span className='text-xl '>نمایش مشخصات</span></Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Typography id="modal-modal-title" variant="h6" component="h2">
						<h3>لیست مشخصات کاربر</h3>
					</Typography>
					<Typography id="modal-modal-description" sx={{ mt: 2 }}>
						<div>
							<span>نام کاربر: </span><span>{name}</span>
						</div>
						<div>
							<span>شماره تماس:  </span><span>{phoneNumber}</span>

						</div>
							<span>ایمیل: </span><span>{email}</span>
					</Typography>
				</Box>
			</Modal>
		</div>
	);
}
