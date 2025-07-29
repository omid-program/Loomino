import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

type TOrdAddresModal = {
	country: string;
	city: string;
	address: string;
	state: string;
};

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

export default function OrdAddresModal(props: TOrdAddresModal) {
	const { address, city, country, state } = props;
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<div>
			<Button onClick={handleOpen}>
				<span className='px-2 py-1 border-2 border-primary text-textMainMuted rounded-md text-md'>
				{country} - {city}
				</span>
				</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<div className=' text-center border-b-2 border-gray-800'>
					<Typography id="modal-modal-title" variant="h5" component="h2">
						آدرس دقیق
					</Typography>
					</div>
					<Box id="modal-modal-description" sx={{ mt: 2 }}>
                  <ul className=''>
                     <li className='p-2 border-b-2 border-dashed border-gray-600'>
                        <span className='font-bold text-lg'>کشور: </span><span>{country}</span>
                     </li>
                     <li className='p-2 border-b-2 border-dashed border-gray-600'>
                        <span className='font-bold text-lg'>ایالت: </span><span>{state}</span>
                     </li>
                     <li className='p-2 border-b-2 border-dashed border-gray-600'>
                        <span className='font-bold text-lg'>شهر: </span><span>{city}</span>
                     </li>
                     <li className='p-2 border-b-2 border-dashed border-gray-600'>
                        <span className='font-bold text-lg'>آدرس: </span><span>{address}</span>
                     </li>
                  </ul>
					</Box>
				</Box>
			</Modal>
		</div>
	);
}
