import React from 'react';
import styled from 'styled-components';

const Loader = () => {
	return (
		<StyledWrapper>
			<div className="loader">
				<div className="light" />
				<div className="black_overlay" />
			</div>
		</StyledWrapper>
	);
};

const StyledWrapper = styled.div`
	.loader {
		height: 2px;
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
			rgb(0, 204, 255) 40%,
			rgb(0, 204, 255) 60%,
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

export default Loader;
