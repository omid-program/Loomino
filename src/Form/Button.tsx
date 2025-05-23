import React, { MouseEventHandler, ReactNode } from 'react';
import './Button.css';
import Link from 'next/link';

interface ButtonProps {
	to?: string;
	href?: string;
	className?: string;
	type?: 'button' | 'submit' | 'reset';
	onClick?: MouseEventHandler<HTMLButtonElement>;
	disabled?: boolean;
	children: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
	to,
	href,
	className,
	type = 'button',
	onClick,
	disabled = false,
	children,
}) => {
	if (to) {
		return (
			<Link href={to} className={className}>
				{children}
			</Link>
		);
	} else if (href) {
		return (
			<a href={href} className={className}>
				{children}
			</a>
		);
	} else {
		return (
			<button
				className={className}
				type={type}
				onClick={onClick}
				disabled={disabled}
			>
				{children}
			</button>
		);
	}
};

export default Button;
