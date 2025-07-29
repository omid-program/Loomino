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
	onRemove: () => void;
	itemTitle: string | undefined;
	confirmText: string;
	cancelText: string;
	loadingText: string;
}

export default function RemoveModal({
	open,
	onClose,
	itemTitle,
	onRemove,
	confirmText,
	cancelText,
	loadingText,
}: RemoveCatModalProps) {
	const [loading, setLoading] = React.useState<boolean>(false);
	const handleRemove = async () => {
		try {
			setLoading(true);
			await onRemove();
			onClose();
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};
	return (
		<Modal
			open={open}
			onClose={onClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<div className="border-b-2 border-gray-700 text-center my-4 text-primary">
					<Typography id="modal-modal-title" variant="h5" component="h2">
						حذف محصول
					</Typography>
				</div>
				<div className="shadow-md shadow-orange-300 px-1 py-2 rounded-md">
					<Typography
						id="modal-modal-description"
						variant="inherit"
						color="warning"
						sx={{ mt: 2 }}
					>
						آیا مطمئنی می‌خوای «{itemTitle}» رو حذف کنی؟
					</Typography>
				</div>
				<Box>
					<div className="flex gap-5 px-3 mt-5">
						<button
							className="mx-3 px-5 py-2 rounded-md border-2 border-rose-600 shadow-md shadow-rose-300 text-red-600  "
							disabled={loading}
							onClick={handleRemove}
						>
							{loading ? loadingText : confirmText}
						</button>
						<button
							className="mx-3 px-5 py-2 rounded-md border-2 border-gray-700 shadow-md shadow-gray-400 text-gray-700  "
							onClick={onClose}
						>
							{cancelText}
						</button>
					</div>
				</Box>
				{/* اینجا دکمه حذف نهایی */}
			</Box>
		</Modal>
	);
}
