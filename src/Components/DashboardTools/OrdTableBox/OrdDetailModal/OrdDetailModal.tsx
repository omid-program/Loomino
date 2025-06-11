import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TOrdDetailModal } from '@/types';
import { formatPrice } from '@/utils/price';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 700,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

export default function OrdDetailModal(props: TOrdDetailModal) {
	const { ords } = props;
	console.log('ords=> ', ords);
	ords?.flatMap(item => {
		console.log('flatMap ords=>', item);
	});

	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<div>
			<Button onClick={handleOpen}>
				{ords ? (
					<span>{ords?.flatMap(ord => ord.items.length)}-محصول</span>
				) : (
					<div></div>
				)}
			</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Typography id="modal-modal-title" variant="h6" component="h2">
						Text in a modal
					</Typography>
					<Box id="modal-modal-description" sx={{ mt: 2 }}>
						{ords &&
							ords.flatMap(ord => (
								<div>
									<div id='header-ord-detail' className='grid-cols-5 font-bold w-full' >
										<span className='grid col-span-1 border px-1 py-2 text-center'>عنوان</span>
										<span className='grid col-span-1 border px-1 py-2 text-center'>قیمت</span>
										<span className='grid col-span-1 border px-1 py-2 text-center'>متراژ</span>
										<span className='grid col-span-1 border px-1 py-2 text-center'>قیمت کل</span>
										<span className='grid col-span-1 border px-1 py-2 text-center'>زنگ</span>
									</div>
									{ord.items.map(item => (
										<div className='grid grid-cols-5'>
											<span>{item.perTitle}</span>
											<span>{formatPrice(item.price)}</span>
											<span>{item.qty}</span>
											<span>{formatPrice((item.qty) * (item.price))}</span>
											<span style={{backgroundColor:item.colorCode}} >{item.colorCode}</span>
										</div>
									))}
								</div>
							))}
					</Box>
				</Box>
			</Modal>
		</div>
	);
}
