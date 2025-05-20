import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TCatDatas, TProductCatData } from '@/types';

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

interface IAddCatModalProps {
	openCatModal: boolean
	onCloseCatModal: ()=>void
}


export default function AddCatModal(
	{openCatModal , onCloseCatModal} : IAddCatModalProps
) {
	// const [open, setOpen] = React.useState(false);
	const [catInputData, setCatInputData] = React.useState<TCatDatas | null>({
		id: crypto.randomUUID(),
		nameTag: '',
		perTitle: '',
		engTitle: '',
		defImg: '',
		engDesc: '',
		engMiniDescription: '',
		perDesc: '',
		perMiniDescription: '',
	});
	const catInputs = [
		{
			id: '1',
			label: 'عنوان',
			name: 'perTitle',
			type: 'text',
			isLong: false,
			size: 'sm',
			value: catInputData?.perTitle,
		},
		{
			id: '2',
			label: 'عنوان انگلیسی',
			name: 'engTitle',
			type: 'text',
			isLong: false,
			size: 'sm',
			value: catInputData?.engTitle,
		},
		{
			id: '2.5',
			label: 'تصویر',
			name: 'defImg',
			type: 'text',
			isLong: false,
			size: 'lg',
			value: catInputData?.defImg,
		},
		{
			id: '3',
			label: 'شناسه',
			name: 'nameTag',
			type: 'text',
			isLong: false,
			size: 'sm',
			value: catInputData?.nameTag,
		},
		{
			id: '4',
			label: 'توضیحات کوتاه',
			name: 'perMiniDescription',
			type: 'text',
			isLong: true,
			size: 'md',
			value: catInputData?.perMiniDescription,
		},
		{
			id: '5',
			label: 'توضیحات انگلیسی کوتاه',
			name: 'engMiniDescription',
			type: 'text',
			isLong: true,
			size: 'md',
			value: catInputData?.engMiniDescription,
		},
		{
			id: '1',
			label: 'توضیحات:',
			name: 'perDesc',
			type: 'text',
			isLong: true,
			size: 'lg',
			value: catInputData?.perDesc,
		},
		{
			id: '1',
			label: 'توضیحات انگلیسی',
			name: 'engDesc',
			type: 'text',
			isLong: true,
			size: 'lg',
			value: catInputData?.engDesc,
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
		setCatInputData(prevData =>
			prevData ? { ...prevData, [name]: value } : null
		);
	};
	const sendNewCatToDatabase = async () => {
		if (catInputData) {
			try {
				const response = await fetch('http://localhost:8000/cats', {
					method: 'POST',
					headers: { 'Contetnt-Type': 'application/json' },
					body: JSON.stringify(catInputData),
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
			{/* <Button
				// className="border border-rose-600 rounded-md bg-rose-400"

				onClick={handleOpen}
			>
				افزودن دسته بندی جدید
			</Button> */}
			<Modal
				open={openCatModal}
				onClose={onCloseCatModal}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Typography id="modal-modal-title" variant="h6" component="h2">
						افزودن دسته بندی جدید
					</Typography>
					<Typography id="modal-modal-description" sx={{ mt: 2 }}>
						<div className="grid grid-cols-2">
							{catInputs.map(item => (
								<div
									key={item.name}
									className="flex items-center justify-center"
								>
									<label htmlFor={item.name}>{item.label}</label>
									{item.isLong === false ? (
										<input
											name={item.name}
											value={item.value}
											type="text"
											className="rounded-sm col-span-1 px-1 py-2 border border-rose-500"
											onChange={e => {
												changeStateHand(e);
											}}
										/>
									) : (
										<textarea
											name={item.name}
											value={item.value}
											className="rounded-sm col-span-2 px-1 py-2 border border-rose-500"
											rows={4}
											onChange={e => {
												changeStateHand(e);
											}}
										/>
									)}
								</div>
							))}
							<button
								className="w-full bg-green-300"
								onClick={sendNewCatToDatabase}
							>
								ثبت دسته بندی جدید
							</button>
						</div>
					</Typography>
				</Box>
			</Modal>
		</div>
	);
}
