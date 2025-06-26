import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import { TProductBoxData } from '@/types';
import { Box } from '@/@mui/material/esm';
import { isOverflown } from '@/@mui/x-data-grid/utils/domUtils';
import { formatPrice } from '@/utils/price';

type TProductBoxProps = TProductBoxData & {
	offerPersentage?: string;
};

export default function ProductCard(props: TProductBoxProps) {
	const {
		id,
		defImg,
		engTitle,
		perTitle,
		perMiniDescription,
		rate,
		width,
		price,
		offerPersentage,
	} = props;
	let finalDescription = perMiniDescription?.slice(0, 96);
	return (
		<Card
			sx={{
				maxWidth: 345,
				display: 'flex',
				flexDirection: 'column',
				height: '100%',
				// objectFit: 'cover',
				// overflow: 'hidden',
			}}
		>
			<CardActionArea
				sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}
			>
				<CardMedia
					component="img"
					height={350}
					image={defImg}
					alt={engTitle}
					// className='max-h-80'
					sx={{ objectFit: 'cover', flexShrink: 0, width: '100%' }}
				/>
				<CardContent sx={{ flexGrow: 1 }}>
					<Typography gutterBottom variant="h5" component="div">
						{perTitle}
					</Typography>
					<Typography variant="body2" sx={{ color: 'text.secondary' }}>
						{finalDescription}...
					</Typography>
				</CardContent>
			</CardActionArea>
			<Box sx={{ p: 2, borderTop: '1px solid #eee', mt: 'auto' }}>
				{offerPersentage ? (
					<Box>
						<Box display={'flex'} justifyContent={'space-between'}>
							<Typography
								variant="body1"
								color="warning"
								className="line-through"
							>
								قیمت: {formatPrice(Number(price))} تومان
							</Typography>
							<Typography variant="caption" color="error">
								<p className='text-sm font-bold'>تخفیف: {offerPersentage}% </p>
							</Typography>
						</Box>
						<Typography variant="body1" color="success">
							قیمت:
							{formatPrice(
								Number(price) -
									Number(price) * (Number(offerPersentage) / 100)
							)}
							تومان
						</Typography>
					</Box>
				) : (
					<Typography variant="body1" color="text.primary">
						قیمت: {formatPrice(Number(price))} تومان
					</Typography>
				)}
			</Box>
		</Card>
	);
}
