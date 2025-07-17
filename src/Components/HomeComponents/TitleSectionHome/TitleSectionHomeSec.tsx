'use client';
import React from 'react';
import styled from 'styled-components';

type TitleSectionHomeProps = {
	title: string;
};

const TitleSectionHome = (props: TitleSectionHomeProps) => {
	return (
		<StyledWrapper>
			<div className="flex gap-8 justify-center items-center">
				<div className="loader">
					<div className="light" />
					<div className="black_overlay" />
				</div>

				<h3 className='text-lg font-bold'>{props.title}</h3>

				<div className="loader rotate-180">
					<div className="light" />
					<div className="black_overlay" />
				</div>
			</div>
		</StyledWrapper>
	);
};

const StyledWrapper = styled.div`
	.loader {
		height: 8px;
		width: 300px;
		background: rgb(44, 44, 44);
		position: relative;
		overflow: hidden;
	}
	.loader .black_overlay {
		background: linear-gradient(
			87deg,
			rgb(0, 0, 0) 0%,
			rgba(0, 0, 0, 0.14) 30%,
			rgba(0, 0, 0, 0.14) 70%,
			rgb(0, 0, 0) 100%
		);
		position: absolute;
		inset: 0px;
	}
	.loader .light {
		width: 70px;
		height: 100%;
		position: absolute;
		left: -20%;
		top: 0px;
		background: linear-gradient(
			87deg,
			rgba(0, 0, 0, 0) 0%,
			rgb(178, 102, 255) 40%,
			rgb(178, 102, 255) 60%,
			rgba(0, 0, 0, 0) 100%
		);
		animation: light 2s infinite ease-in-out;
	}

	@keyframes light {
		from {
			left: -30%;
		}
		to {
			left: 100%;
		}
	}
`;

export default TitleSectionHome;
