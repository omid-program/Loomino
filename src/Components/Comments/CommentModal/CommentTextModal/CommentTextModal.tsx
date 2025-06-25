import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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

export default function CommentTextModal(props:{commentText:string}) {
   const {commentText}=props
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<div>
			<Button onClick={handleOpen}><span className='text-xl'>متن کامل نظر</span></Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Box id="modal-modal-title"  component="h2">
						<div className='p-1 border-b-2 text-center'>
							<Typography variant='h5' >متن کامل نظر</Typography>
						</div>
					</Box>
					<Box id="modal-modal-description" sx={{ mt: 2 }}>
						<div className='overflow-y-scroll'>
                  <Typography>
                     {commentText}
                  </Typography>
						</div>
					</Box>
				</Box>
			</Modal>
		</div>
	)
}
