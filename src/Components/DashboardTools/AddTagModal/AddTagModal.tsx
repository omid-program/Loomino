import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TTagData } from '@/types';
import { API_BASE_URL } from 'config';

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

interface IAddTagModalProps {
	open: boolean;
	onClose: () => void;
}

export default function AddTagModal({ open, onClose }: IAddTagModalProps) {
	// const [open, setOpen] = React.useState(false);
	const [tagInputData, setTagInputData] = React.useState<TTagData | null>({
		id: crypto.randomUUID(),
		perTitle: '',
		engTitle: '',
		TagName: '',
	});

	const catInputs = [
		{
			id: '1',
			label: 'عنوان',
			name: 'perTitle',
			type: 'text',
			isLong: false,
			size: 'sm',
			value: tagInputData?.perTitle,
		},
		{
			id: '2',
			label: 'عنوان انگلیسی',
			name: 'engTitle',
			type: 'text',
			isLong: false,
			size: 'sm',
			value: tagInputData?.engTitle,
		},
		{
			id: '3',
			label: 'شناسه',
			name: 'TagName',
			type: 'text',
			isLong: false,
			size: 'sm',
			value: tagInputData?.TagName,
		},
	];

	// const handleOpen = () => setOpen(true);
	// const handleClose = () => setOpen(false);

	const changeStateHand = (
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement>
	) => {
		console.log(e.target.value);
		const { name, value } = e.target;
		setTagInputData(prevData =>
			prevData ? { ...prevData, [name]: value } : null
		);
	};

	const sendNewCatToDatabase = async () => {
		if (tagInputData) {
			try {
				const response = await fetch(`${API_BASE_URL}/tags`, {
					method: 'POST',
					headers: { 'Contetnt-Type': 'application/json' },
					body: JSON.stringify(tagInputData),
				});
				if (response.ok) {
					alert('افزودن دسته ی جدید با موفقیت انجام شد🔥🔥');
				}
			} catch (error) {
				console.log(error);
			}
		}
	};

	return (
		<div>
			{/* <Button onClick={open}>افزودن برچسب</Button> */}
			<Modal
				open={open}
				onClose={onClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<div className="border-b-2 border-gray-700 text-center">
						<Typography
							id="modal-modal-title"
							variant="h5"
							component="h2"
						>
							افزودن برچسب جدید
						</Typography>
					</div>
					<Box id="modal-modal-description" sx={{ mt: 2 }}>
						<div
							className="flex flex-col gap-3 justify-start items-start"
							// className="grid grid-cols-2"
						>
							{catInputs.map(item => (
								<div
									key={item.name}
									className="flex items-center justify-center gap-2"
								>
									<label htmlFor={item.name}>{item.label}: </label>
									<input
										placeholder={`${item.label} برچسب ...`}
										name={item.name}
										value={item.value}
										type="text"
										// className="shadow-md shadow-violet-200 rounded-md p-1 flex-shrink"
										className="border-r-4 border-blue-500 rounded-l-md bg-blue-200 p-1 flex-shrink"
										onChange={e => {
											changeStateHand(e);
										}}
									/>
								</div>
							))}
							<button
								className="w-full py-2 my-1 border-2 border-blue-500 rounded-md hover:bg-blue-200  "
								onClick={sendNewCatToDatabase}
							>
								ثبت برچسب جدید
							</button>
						</div>
					</Box>
				</Box>
			</Modal>
		</div>
	);
}
