'use client';
import { TiThMenu } from 'react-icons/ti';
import { PiUserListFill } from 'react-icons/pi';
import { TfiDashboard } from 'react-icons/tfi';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { FaHome } from 'react-icons/fa';
import { GiRolledCloth } from 'react-icons/gi';
import { MdOutlineCategory } from 'react-icons/md';
import { MdOutlineMapsHomeWork } from "react-icons/md";


import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Link from '@/next/link';
import { useAuthStatus } from '@/hooks/useAuthStatus';
import { useShappingCartContext } from '@/context/ShappongCartContext';
import { formatPrice } from '@/utils/price';
import { GrLogout } from '@/react-icons/gr';
import { TCatDatas, TLinksData } from '@/types';
import { API_BASE_URL } from './../../../../../config';


export default function AccountMenu() {
	// {children}:{children:React.ReactNode}
	// mui functions

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	// my functions

	const [catInfo, setCatInfo] = useState<TCatDatas[]>();
	const getCatData = async () => {
		const catRes = await fetch(`${API_BASE_URL}/cats`);
		const catData = (await catRes.json()) as TCatDatas[];
		setCatInfo(catData);
	};
	useEffect(() => {
		getCatData();
	}, []);

	const [basketPrice, setBasketPrice] = useState<number>(0);
	const isLogin = useAuthStatus();
	const { userOrd } = useShappingCartContext();

	useEffect(() => {
		const basketItems = userOrd?.reduce((total, item) => {
			return total + Number(item.price) * Number(item.qty);
		}, 0);

		setBasketPrice(basketItems);
	}, [userOrd]);

	const deleteToken = () => {
		document.cookie = 'token=; Max-Age=0; path=/';
		window.location.reload(); // یا یه context trigger بزنی برای ری‌رندر
		handleClose();
	};
	const navLinks: TLinksData[] = [
		{
			id: 1,
			perTitle: 'خانه',
			engTitle: 'Home',
			link: '/',
			icon: <FaHome fontSize="small" />,
		},
		{
			id: 2,
			perTitle: 'فروشگاه',
			engTitle: 'Shop',
			link: '/shop',
			icon: <GiRolledCloth fontSize="small" />,
		},
		{
			id: 3,
			perTitle: 'دسته بندی',
			engTitle: 'Categoties',
			subItems: catInfo,
			link: '/cats',
			icon: <MdOutlineCategory fontSize="small" />,
		},
		{
			id: 5,
			perTitle: 'درباره‌ی ما',
			engTitle: 'About us',
			link: '/aboutUs',
			icon: <MdOutlineMapsHomeWork fontSize="small" />,
		},
		// {
		// 	id: 4,
		// 	perTitle: 'داشبورد',
		// 	engTitle: 'Dashboard',
		// 	link: '/dashboard',
		// },
	];

	return (
		<>
			<Box
				sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' , background:'#1d1d1d' , color:'#dbd0c0' }}
				
			>
				{/* <Typography sx={{ minWidth: 100 }}>Contact</Typography> */}
				{/* <Typography sx={{ minWidth: 100 }}>Profile</Typography> */}
				<Tooltip title="Account settings">
					<IconButton
						onClick={handleClick}
						size="medium"
						sx={{ ml: 2 }}
						aria-controls={open ? 'account-menu' : undefined}
						aria-haspopup="true"
						aria-expanded={open ? 'true' : undefined}
					>
						<Avatar sx={{ width: 32, height: 32 }}>
							<TiThMenu />
						</Avatar>
					</IconButton>
				</Tooltip>
			</Box>
			<Menu
			sx={{background:'#374151' , color:'dcba92'}}
				anchorEl={anchorEl}
				id="account-menu"
				open={open}
				onClose={handleClose}
				onClick={handleClose}
				slotProps={{
					paper: {
						elevation: 0,
						sx: {
							overflow: 'visible',
							filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
							mt: 1.5,
							'& .MuiAvatar-root': {
								width: 32,
								height: 32,
								ml: -0.5,
								mr: 1,
							},
							'&::before': {
								content: '""',
								display: 'block',
								position: 'absolute',
								top: 0,
								right: 14,
								width: 10,
								height: 10,
								bgcolor: 'background.paper',
								transform: 'translateY(-50%) rotate(45deg)',
								zIndex: 0,
							},
						},
					},
				}}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
			>
				<MenuItem onClick={handleClose} >
					<Link href={`/cart`} className='flex gap-3'>
						<MdOutlineShoppingCart />{' '}
						<div >
							<span>{formatPrice(basketPrice)}</span>
							<span> تومان</span>
						</div>
					</Link>
				</MenuItem>
				{!isLogin ? (
					<MenuItem onClick={handleClose}>
						<Link
							href={`/login`}
							className="flex gap-2 items-center text-lg"
						>
							<PiUserListFill className="text-lg" />{' '}
							<span className="text-lg">ورود/ثبت نام</span>
						</Link>
					</MenuItem>
				) : (
					<>
						<MenuItem>
							<Link
								href={`/dashboard`}
								className="flex gap-2 items-center text-lg"
							>
								<TfiDashboard className="text-lg" />{' '}
								<span className="text-lg">داشبورد</span>
							</Link>
						</MenuItem>
						<MenuItem
							onClick={deleteToken}
							className="flex gap-3 text-lg"
						>
							<GrLogout /> <span>خروج</span>
						</MenuItem>
					</>
				)}

				<Divider />
				{navLinks.map(item => (
					<MenuItem key={item.id} onClick={handleClose}>
						<Link href={item.link}>
							<ListItemIcon>{item.icon}</ListItemIcon>
							{item.perTitle}
						</Link>
					</MenuItem>
				))}
			</Menu>
		</>
	);
}
