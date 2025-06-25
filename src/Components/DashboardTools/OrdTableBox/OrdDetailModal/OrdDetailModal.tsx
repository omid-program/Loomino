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
			<Button onClick={handleOpen} >
				{ords ? (
					<span className='text-lg text-violet-500 py-1 px-3 border-2 border-violet-600 rounded-md'>{ords?.flatMap(ord => ord.items.length)}-محصول</span>
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
					<div className="border-b-2 border-gray-800 text-center">
						<Typography
							id="modal-modal-title"
							variant="h5"
							component="h2"
						>
							لیست محصولات
						</Typography>
					</div>
					<Box id="modal-modal-description" sx={{ mt: 2 }}>
						{ords &&
							ords.flatMap(ord => (
								<div className='overflow-y-scroll'>
									<div
										id="header-ord-detail"
										className=" grid grid-cols-5 font-bold w-full"
									>
										<span className="grid col-span-1 border px-1 py-2 text-center">
											عنوان
										</span>
										<span className="grid col-span-1 border px-1 py-2 text-center">
											قیمت
										</span>
										<span className="grid col-span-1 border px-1 py-2 text-center">
											متراژ
										</span>
										<span className="grid col-span-1 border px-1 py-2 text-center">
											قیمت کل
										</span>
										<span className="grid col-span-1 border px-1 py-2 text-center">
											رنگ
										</span>
									</div>
									<div className=''>
										{ord.items.map(item => (
											<div className="grid grid-cols-5 text-center border-b">
												<span className="border-x p-1">
													{item.perTitle}
												</span>
												<span className="border-x p-1">
													{formatPrice(item.price)}
												</span>
												<span className="border-x p-1">
													{item.qty}
												</span>
												<span className="border-x p-1">
													{formatPrice(item.qty * item.price)}
												</span>
												<span
													className="border-x p-1"
													style={{
														backgroundColor: item.colorCode,
													}}
												>
													{item.colorCode}
												</span>
											</div>
										))}
									</div>
								</div>
							))}
					</Box>
				</Box>
			</Modal>
		</div>
	);
}
