'use client';
import React, { useState } from 'react';

function FooterContainer({ children }: { children: React.ReactNode }) {
	const [hoverColor, setHoverColor] = useState<string | null>(null);

	return (
		<div
			style={{ backgroundColor: hoverColor ?? 'transparent' }}
			className="mt-10 border-violet-400 border-2 px-8 py-12 flex flex-col md:grid md:grid-cols-4  gap-7 transition-colors duration-300 "
		>
			{/* به تمام کارت‌ها این تابع رو پاس بده */}
			{React.Children.map(children, child => {
				if (React.isValidElement(child)) {
					return React.cloneElement(child, { setHoverColor });
				}
				return child;
			})}
		</div>
	);
}

export default FooterContainer;
