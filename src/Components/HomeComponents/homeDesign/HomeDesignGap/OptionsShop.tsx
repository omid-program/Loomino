'use client';

import React from 'react';
import styled from 'styled-components';
import { LiaShippingFastSolid } from 'react-icons/lia';
import { FaRegStar } from 'react-icons/fa';
import { SiOrigin } from 'react-icons/si';
import { BsCoin } from 'react-icons/bs';

const OptionsShop = () => {
	return (
		<StyledWrapper>
			<ul className="example-2">
				<li className="icon-content">
					<a href="/" aria-label="Spotify" data-social="spotify">
						<div className="filled" />
						<BsCoin fill="currentColor" />
					</a>
					<div className="tooltip">ضمانت قیمت</div>
				</li>
				<li className="icon-content">
					<a href="/" aria-label="Pinterest" data-social="pinterest">
						<div className="filled" />
						<LiaShippingFastSolid />
					</a>
					<div className="tooltip">ارسال⚡</div>
				</li>
				<li className="icon-content">
					<a
						href="https://dribbble.com/"
						aria-label="Dribbble"
						data-social="dribbble"
					>
						<FaRegStar />
						<div className="filled" />
					</a>
					<div className="tooltip">کیفیت</div>
				</li>
				<li className="icon-content">
					<a
						href="https://telegram.org/"
						aria-label="Telegram"
						data-social="telegram"
					>
						<div className="filled" />
						<SiOrigin />
					</a>
					<div className="tooltip">اصالت</div>
				</li>
			</ul>
		</StyledWrapper>
	);
};

const StyledWrapper = styled.div`
	ul {
		list-style: none;
	}

	.example-2 {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.example-2 .icon-content {
		margin: 0 10px;
		position: relative;
	}
	.example-2 .icon-content .tooltip {
		position: absolute;
		top: -30px;
		left: 50%;
		transform: translateX(-50%);
		color: #fff;
		padding: 6px 10px;
		border-radius: 15px;
		opacity: 0;
		visibility: hidden;
		font-size: 14px;
		transition: all 0.3s ease;
	}
	.example-2 .icon-content:hover .tooltip {
		opacity: 1;
		visibility: visible;
		top: -50px;
	}
	.example-2 .icon-content a {
		position: relative;
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 50px;
		height: 50px;
		border-radius: 20%;
		color: #4d4d4d;
		background-color: #ffff;
		transition: all 0.3s ease-in-out;
	}
	.example-2 .icon-content a:hover {
		box-shadow: 3px 2px 45px 0px rgb(0 0 0 / 50%);
	}
	.example-2 .icon-content a svg {
		position: relative;
		z-index: 1;
		width: 30px;
		height: 30px;
	}
	.example-2 .icon-content a:hover {
		color: white;
	}
	.example-2 .icon-content a .filled {
		position: absolute;
		top: auto;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 0;
		background-color: #000;
		transition: all 0.3s ease-in-out;
	}
	.example-2 .icon-content a:hover .filled {
		height: 100%;
	}
	.example-2 .icon-content a[data-social='spotify'] .filled,
	.example-2 .icon-content a[data-social='spotify'] ~ .tooltip {
		background-color: #1db954;
	}
	.example-2 .icon-content a[data-social='pinterest'] .filled,
	.example-2 .icon-content a[data-social='pinterest'] ~ .tooltip {
		background-color: #bd081c;
	}
	.example-2 .icon-content a[data-social='dribbble'] .filled,
	.example-2 .icon-content a[data-social='dribbble'] ~ .tooltip {
		background-color: #ea4c89;
	}
	.example-2 .icon-content a[data-social='telegram'] .filled,
	.example-2 .icon-content a[data-social='telegram'] ~ .tooltip {
		background-color: #0088cc;
	}
`;

export default OptionsShop;
