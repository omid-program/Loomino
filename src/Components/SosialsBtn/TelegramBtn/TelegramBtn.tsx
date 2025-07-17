'use client';
import Link from '@/next/link';
import React from 'react';
import styled from 'styled-components';

const TelegramBtn = () => {
	return (
		<StyledWrapper>
			<div className="tooltip-container">
				<div className="tooltip">
					<div className="profile">
						<div className="user">
							<div className="img">Fb</div>
							<div className="details">
								<div className="name">User</div>
								<div className="username">@username</div>
							</div>
						</div>
						<div className="about"></div>
					</div>
				</div>
				<div className="text">
					<Link className="icon" href="https://t.me/odakli79">
						<div className="layer">
							<span />
							<span />
							<span />
							<span />
							<span className="facebookSVG">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="800px"
									height="800px"
									viewBox="0 0 32 32"
									fill="none"
								>
									<circle
										cx="16"
										cy="16"
										r="14"
										fill="url(#paint0_linear_87_7225)"
									/>
									<path
										d="M22.9866 10.2088C23.1112 9.40332 22.3454 8.76755 21.6292 9.082L7.36482 15.3448C6.85123 15.5703 6.8888 16.3483 7.42147 16.5179L10.3631 17.4547C10.9246 17.6335 11.5325 17.541 12.0228 17.2023L18.655 12.6203C18.855 12.4821 19.073 12.7665 18.9021 12.9426L14.1281 17.8646C13.665 18.3421 13.7569 19.1512 14.314 19.5005L19.659 22.8523C20.2585 23.2282 21.0297 22.8506 21.1418 22.1261L22.9866 10.2088Z"
										fill="white"
									/>
									<defs>
										<linearGradient
											id="paint0_linear_87_7225"
											x1="16"
											y1="2"
											x2="16"
											y2="30"
											gradientUnits="userSpaceOnUse"
										>
											<stop stop-color="#37BBFE" />
											<stop offset="1" stop-color="#007DBB" />
										</linearGradient>
									</defs>
								</svg>
							</span>
						</div>
						<div className="text">Telegtam</div>
					</Link>
				</div>
			</div>
		</StyledWrapper>
	);
};

const StyledWrapper = styled.div`
	.tooltip-container {
		position: relative;
		cursor: pointer;
		transition: all 0.2s;
		font-size: 17px;
		border-radius: 10px;
	}

	.tooltip {
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		padding: 10px;
		opacity: 0;
		pointer-events: none;
		transition: all 0.3s;
		border-radius: 15px;
		box-shadow: inset 5px 5px 5px rgba(0, 0, 0, 0.2),
			inset -5px -5px 15px rgba(255, 255, 255, 0.1),
			5px 5px 15px rgba(0, 0, 0, 0.3),
			-5px -5px 15px rgba(255, 255, 255, 0.1);
	}

	.profile {
		background: #3b5998;
		border-radius: 10px 15px;
		padding: 10px;
		border: 1px solid #29487d;
	}

	.tooltip-container:hover .tooltip {
		top: -150px;
		opacity: 1;
		visibility: visible;
		pointer-events: auto;
	}

	.icon {
		text-decoration: none;
		color: #fff;
		display: block;
		position: relative;
	}
	.icon .layer {
		width: 55px;
		height: 55px;
		border: 3px solid #1877f2;
		border-radius: 50%;
		transition: transform 0.3s, border 0.3s ease, box-shadow 0.3s ease;
		box-shadow: 0 0 15px rgba(24, 119, 242, 0.7),
			0 0 20px rgba(24, 119, 242, 0.5);
	}

	.icon:hover .layer {
		transform: rotate(-35deg) skew(20deg);
		box-shadow: 0 0 30px rgba(24, 119, 242, 1),
			0 0 40px rgba(24, 119, 242, 0.7);
	}

	.layer span {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		border: 1px solid #fff;
		border-radius: 50%;
		transition: all 0.3s;
	}

	.layer span,
	.text {
		color: #1877f2;
		border-color: #1877f2;
	}

	.icon:hover .layer span {
		box-shadow: -1px 1px 3px #1877f2;
	}

	.icon .text {
		position: absolute;
		left: 50%;
		bottom: -5px;
		opacity: 0;
		font-weight: 500;
		transform: translateX(-50%);
		transition: bottom 0.3s ease, opacity 0.3s ease;
	}

	.icon:hover .text {
		bottom: -35px;
		opacity: 1;
	}

	.icon:hover .layer span:nth-child(1) {
		opacity: 0.2;
	}

	.icon:hover .layer span:nth-child(2) {
		opacity: 0.4;
		transform: translate(5px, -5px);
	}

	.icon:hover .layer span:nth-child(3) {
		opacity: 0.6;
		transform: translate(10px, -10px);
	}

	.icon:hover .layer span:nth-child(4) {
		opacity: 0.8;
		transform: translate(15px, -15px);
	}

	.icon:hover .layer span:nth-child(5) {
		opacity: 1;
		transform: translate(20px, -20px);
	}

	.facebookSVG {
		font-size: 25px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #1877f2;
		border-radius: 50%;
		background: linear-gradient(
			45deg,
			#1877f2 0%,
			#3b5998 25%,
			#1877f2 50%,
			#3b5998 75%,
			#1877f2 100%
		);
	}

	.user {
		display: flex;
		gap: 10px;
	}

	.img {
		width: 50px;
		height: 50px;
		font-size: 25px;
		font-weight: 700;
		border: 1px solid #1877f2;
		border-radius: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #fff;
	}

	.name {
		font-size: 17px;
		font-weight: 700;
		color: #1877f2;
	}

	.details {
		display: flex;
		flex-direction: column;
		gap: 0;
		color: #fff;
	}

	.about {
		color: #ccc;
		padding-top: 5px;
	}
`;

export default TelegramBtn;
