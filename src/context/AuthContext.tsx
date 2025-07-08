'use client'
import { cookies } from '@/next/headers';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext({
	isLoggedIn: false,
	setIsLoggedIn: (value: boolean) => {},
});

export const AuthContextProvider = ({children}:{children:React.ReactNode}) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	useEffect(() => {
		const token = document.cookie;
		const isHaveToken = token.includes('token');
		setIsLoggedIn(isHaveToken);
	}, []);
	return (
		<AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = ()=> useContext(AuthContext)
