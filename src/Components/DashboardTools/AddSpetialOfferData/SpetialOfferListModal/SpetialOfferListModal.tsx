import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TSpetialOfferListModalProps } from '@/types';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 800,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

export default function SpetialOfferListModal(props:TSpetialOfferListModalProps) {
   const {removeProToSPeOffer , spetialOfferList} = props
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<div>
			<Button
			style={{fontSize:'1.1rem', color:'black'}}
			className='text-lg shadow-md shadow-violet-200'
			onClick={handleOpen}>لیست محصولات</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<div className='text-center border-b-2 border-gray-700'>
					<Typography id="modal-modal-title" variant="h5" component="h2">
						محصولات فروش ویژه
					</Typography>
					</div>
					<Box id="modal-modal-description" sx={{ mt: 2 }}>
						<div className='grid grid-cols-5 gap-3 overflow-y-scroll '>
							{
								spetialOfferList.map(item=>(
									<div
									onClick={()=>removeProToSPeOffer(item.productId) }
									className='border-2 border-gray-800 rounded-md cursor-pointer  '>
										<img src={item.defImg} className='rounded-md'  />
										<h3 className='txt-lg text-center'>{item.perTitle}</h3>
									</div>
								))
							}
						</div>
					</Box>
				</Box>
			</Modal>
		</div>
	);
}
