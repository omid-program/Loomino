// RemoveCatModal.tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

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

interface RemoveCatModalProps {
	open: boolean;
	onClose: () => void;
	onRemove: (id: string) => void;
	itemTitle: string;
	confirmText: string;
	cancelText: string;
	loadingText: string;
}

export default function RemoveCatModal({
	open,
	onClose,
	itemTitle,
	onRemove,
	confirmText,
	cancelText,
	loadingText,
}: RemoveCatModalProps) {
	const [loading , setLoading] = React.useState<boolean>(false)
	const handleRemove = async ()=>{
		try{
			setLoading(true)
			await onRemove()
			onClose()
		}catch(error){
			console.log(error);
			
		}finally{
			setLoading(false)
		}
	}
	return (
		<Modal
			open={open}
			onClose={onClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<Typography id="modal-modal-title" variant="h6" component="h2">
					حذف دسته‌بندی
				</Typography>
				<Typography id="modal-modal-description" sx={{ mt: 2 }}>
					آیا مطمئنی می‌خوای «{itemTitle}» رو حذف کنی؟
				</Typography>
				<button onClick={() => onRemove}>
					{confirmText}
				</button>
				<button onClick={() => onRemove}>
					{cancelText}
				</button>
				{/* اینجا دکمه حذف نهایی */}
			</Box>
		</Modal>
	);
}
