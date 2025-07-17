'use client';
import Link from '@/next/link';
import React from 'react';
import styled from 'styled-components';

const GitHubBtn = () => {
	return (
		<StyledWrapper>
			<div className="tooltip-container">
				<div className="tooltip">
					<div className="profile">
						<div className="user">
							<div className="img">
								<img src="logo/omid-program-logo-L-07.png" alt="" />
							</div>
							<div className="details">
								<div className="name">User</div>
								<div className="username">@username</div>
							</div>
						</div>
						<div className="about">500+ Connections</div>
					</div>
				</div>
				<div className="text">
					<Link href="https://freecodez.com/" className="icon">
						<div className="layer">
							<span />
							<span />
							<span />
							<span />
							<span className="fab fa-discord flex items-center justify-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="56px"
									height="56px"
									viewBox="0 -3.5 256 256"
									preserveAspectRatio="xMinYMin meet"
									fill="#bb00ff"
									stroke="#bb00ff"
								>
									<g id="SVGRepo_bgCarrier" stroke-width="0" />

									<g
										id="SVGRepo_tracerCarrier"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>

									<g id="SVGRepo_iconCarrier">
										<g fill="#ffffff">
											<path d="M127.505 0C57.095 0 0 57.085 0 127.505c0 56.336 36.534 104.13 87.196 120.99 6.372 1.18 8.712-2.766 8.712-6.134 0-3.04-.119-13.085-.173-23.739-35.473 7.713-42.958-15.044-42.958-15.044-5.8-14.738-14.157-18.656-14.157-18.656-11.568-7.914.872-7.752.872-7.752 12.804.9 19.546 13.14 19.546 13.14 11.372 19.493 29.828 13.857 37.104 10.6 1.144-8.242 4.449-13.866 8.095-17.05-28.32-3.225-58.092-14.158-58.092-63.014 0-13.92 4.981-25.295 13.138-34.224-1.324-3.212-5.688-16.18 1.235-33.743 0 0 10.707-3.427 35.073 13.07 10.17-2.826 21.078-4.242 31.914-4.29 10.836.048 21.752 1.464 31.942 4.29 24.337-16.497 35.029-13.07 35.029-13.07 6.94 17.563 2.574 30.531 1.25 33.743 8.175 8.929 13.122 20.303 13.122 34.224 0 48.972-29.828 59.756-58.22 62.912 4.573 3.957 8.648 11.717 8.648 23.612 0 17.06-.148 30.791-.148 34.991 0 3.393 2.295 7.369 8.759 6.117 50.634-16.879 87.122-64.656 87.122-120.973C255.009 57.085 197.922 0 127.505 0" />{' '}
											<path d="M47.755 181.634c-.28.633-1.278.823-2.185.389-.925-.416-1.445-1.28-1.145-1.916.275-.652 1.273-.834 2.196-.396.927.415 1.455 1.287 1.134 1.923M54.027 187.23c-.608.564-1.797.302-2.604-.589-.834-.889-.99-2.077-.373-2.65.627-.563 1.78-.3 2.616.59.834.899.996 2.08.36 2.65M58.33 194.39c-.782.543-2.06.034-2.849-1.1-.781-1.133-.781-2.493.017-3.038.792-.545 2.05-.055 2.85 1.07.78 1.153.78 2.513-.019 3.069M65.606 202.683c-.699.77-2.187.564-3.277-.488-1.114-1.028-1.425-2.487-.724-3.258.707-.772 2.204-.555 3.302.488 1.107 1.026 1.445 2.496.7 3.258M75.01 205.483c-.307.998-1.741 1.452-3.185 1.028-1.442-.437-2.386-1.607-2.095-2.616.3-1.005 1.74-1.478 3.195-1.024 1.44.435 2.386 1.596 2.086 2.612M85.714 206.67c.036 1.052-1.189 1.924-2.705 1.943-1.525.033-2.758-.818-2.774-1.852 0-1.062 1.197-1.926 2.721-1.951 1.516-.03 2.758.815 2.758 1.86M96.228 206.267c.182 1.026-.872 2.08-2.377 2.36-1.48.27-2.85-.363-3.039-1.38-.184-1.052.89-2.105 2.367-2.378 1.508-.262 2.857.355 3.049 1.398" />{' '}
										</g>
									</g>
								</svg>
								{/* <svg
									preserveAspectRatio="xMidYMid"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 -3.117 28 28"
									height={28}
									width={28}
								>
									<path
										fill="#5865F2"
										d="M23.719 1.815A22.8 22.8 0 0 0 17.942 0c-.249.45-.54 1.055-.74 1.536q-3.231-.486-6.402 0C10.6 1.055 10.302.45 10.051 0A22.7 22.7 0 0 0 4.27 1.82C.614 7.344-.377 12.731.119 18.042c2.425 1.811 4.775 2.911 7.085 3.63a17.6 17.6 0 0 0 1.517-2.499 15 15 0 0 1-2.389-1.163 12 12 0 0 0 .586-.463c4.607 2.155 9.613 2.155 14.165 0a14 14 0 0 0 .586.463 15 15 0 0 1-2.394 1.165c.438.877.945 1.714 1.517 2.499 2.312-.72 4.664-1.82 7.089-3.633.581-6.156-.993-11.494-4.162-16.227M9.349 14.776c-1.383 0-2.517-1.291-2.517-2.863s1.11-2.866 2.517-2.866 2.541 1.291 2.517 2.866c.002 1.572-1.11 2.863-2.517 2.863m9.302 0c-1.383 0-2.517-1.291-2.517-2.863s1.11-2.866 2.517-2.866 2.541 1.291 2.517 2.866c0 1.572-1.11 2.863-2.517 2.863"
									/>
								</svg> */}
							</span>
						</div>
						<div className="text">Github</div>
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
		background: #2a2b2f;
		border-radius: 10px 15px;
		padding: 10px;
		border: 1px solid #5865f2;
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
	.layer {
		width: 55px;
		height: 55px;
		transition: transform 0.3s;
	}
	.icon:hover .layer {
		transform: rotate(-35deg) skew(20deg);
	}
	.layer span {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		border: 1px solid #fff;
		border-radius: 5px;
		transition: all 0.3s;
	}

	.layer span,
	.text {
		color: #5865f2;
		border-color: #5865f2;
	}

	.icon:hover.layer span {
		box-shadow: -1px 1px 3px #5865f2;
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

	.layer span.fab {
		font-size: 30px;
		line-height: 64px;
		text-align: center;
		fill: #5865f2;
		background: #000;
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
		border: 1px solid #5865f2;
		border-radius: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #fff;
	}
	.name {
		font-size: 17px;
		font-weight: 700;
		color: #5865f2;
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

export default GitHubBtn;
