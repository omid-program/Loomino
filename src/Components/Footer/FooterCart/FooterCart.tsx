'use client';
import React from 'react';

function FooterCart({
	children,
	bgImg,
	colorTeam,
	setHoverColor,
}: {
	children: React.ReactNode;
	bgImg: string;
	colorTeam: string;
	setHoverColor?: (color: string | null) => void;
}) {
	return (
		<div
			onMouseEnter={() => setHoverColor?.(colorTeam)}
			onMouseLeave={() => setHoverColor?.(null)}
			style={{
				backgroundImage: `url(${bgImg})`,
				backgroundSize: 'cover',
			}}
			className="p-4 min-h-72 rounded-lg shadow-lg backdrop-blur-sm bg-white/50 transition-all duration-300 grid col-span-1 "
		>
			{children}
		</div>
	);
}

export default FooterCart;
