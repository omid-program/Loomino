import { describe } from 'node:test';
import React from 'react';

import { IoEarthOutline } from 'react-icons/io5';
import { FaCity, FaLinkedinIn, FaMountainCity, FaStar } from 'react-icons/fa6';
import { LuInstagram } from 'react-icons/lu';
import { SiOrigin } from 'react-icons/si';
import { LiaShippingFastSolid } from "react-icons/lia";


import EditRoadOutlinedIcon from '@mui/icons-material/EditRoadOutlined';

import FooterContainer from './FooterContainer/FooterContainer';
import FooterCart from './FooterCart/FooterCart';
import Link from '@/next/link';
import { FaTelegramPlane } from '@/react-icons/fa';
import { MdOutlineMonetizationOn } from '@/react-icons/md';
import { AiFillSafetyCertificate } from '@/react-icons/ai';
function Footer() {
	const footerItems = [
		{
			id: '001',
			bgImg: '/footer-img/addres-footer-img.jpg',
			colorTeam: '#2b4a77',
			title: 'آدرس',
			describe: (
				<div>
					<div className="w-10/12 flex items-center gap-2 ">
						<span className=" text-black ">
							<IoEarthOutline />
						</span>
						<span className="text-black">کشور: ایران</span>
					</div>
					<div className="w-10/12 flex items-center gap-2 ">
						<span className=" text-black ">
							<FaMountainCity />
						</span>
						<span className="text-black">استان: خراسان رضوی</span>
					</div>
					<div className="w-10/12 flex items-center gap-2 ">
						<span className=" text-black ">
							<FaCity />
						</span>
						<span className="text-black">شهر: مشهد</span>
					</div>
					<div className="w-10/12 flex items-center gap-2 ">
						<span className=" text-black ">
							<EditRoadOutlinedIcon />
						</span>
						<span className="text-black">خیابان آموزگار و پلاک...</span>
					</div>
				</div>
			),
		},
		{
			id: '002',
			bgImg: '/footer-img/socials-footer-img-04.jpg',
			colorTeam: '#fdb05e',
			title: 'ارتباط با ما',
			describe: (
				<div>
					<div className="w-10/12 flex items-center gap-2 ">
						<span className=" text-black ">
							<LuInstagram />
						</span>
						<Link href={`/`}>
							<span className="text-black">Instagram</span>
						</Link>
					</div>
					<div className="w-10/12 flex items-center gap-2 ">
						<span className=" text-black ">
							<FaTelegramPlane />
						</span>
						<Link href={`/`}>
							<span className="text-black">Telegram</span>
						</Link>
					</div>
					<div className="w-10/12 flex items-center gap-2 ">
						<span className=" text-black ">
							<FaLinkedinIn />
						</span>
						<Link href={`/`}>
							<span className="text-black">Linkedin</span>
						</Link>
					</div>
				</div>
			),
		},
		{
			id: '003',
			bgImg: '/footer-img/Warranty-footer-img-01.jpg',
			colorTeam: '#ffcae3',
			title: 'ضمانت',
			describe: (
				<div>
					<div className="w-10/12 flex items-center gap-2 ">
						<span className=" text-black ">
							<SiOrigin />
						</span>
						<span className="text-black">ضمانت اصالت</span>
					</div>
					<div className="w-10/12 flex items-center gap-2 ">
						<span className=" text-black ">
							<FaStar />
						</span>
						<span className="text-black">ضمانت کیفیت</span>
					</div>
					<div className="w-10/12 flex items-center gap-2 ">
						<span className=" text-black ">
							<MdOutlineMonetizationOn  />
						</span>
						<span className="text-black">ضمانت قیمت</span>
					</div>
				</div>
			),
		},
		{
			id: '004',
			bgImg: '/footer-img/send-footer-img-01.jpg',
			colorTeam: '#fcfcba',
			title: 'ارسال',
			describe: (
				<div>
					<div className="w-10/12 flex items-center gap-2 ">
						<span className=" text-black ">
							<LiaShippingFastSolid />
						</span>
						<span className="text-black">سریع</span>
					</div>
					<div className="w-10/12 flex items-center gap-2 ">
						<span className=" text-black ">
							<AiFillSafetyCertificate />
						</span>
						<span className="text-black">ایمن</span>
					</div>
				</div>
			),
		},
	];
	return (
		<FooterContainer>
			{footerItems.map(item => (
				<FooterCart bgImg={item.bgImg} colorTeam={item.colorTeam}>
					<div className="relative w-full flex flex-col justify-between gap-8">
						<div className="backdrop-blur-sm bg-white/30 p-4 rounded-md shadow-md">
							<span className="  text-xl font-bold text-black">
								{item.title}
							</span>
						</div>
						<div className="backdrop-blur-sm bg-white/30 p-4 rounded-md shadow-md">
							{item.describe}
						</div>
					</div>
				</FooterCart>
			))}
		</FooterContainer>
	);
}

export default Footer;
