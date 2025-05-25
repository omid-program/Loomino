'use client'
import React from 'react';
import Cookies from "js-cookie";
import { redirect } from 'next/navigation';
import { GrLogout } from "react-icons/gr";



function LogoutComponent() {
	const deleteToken = () => {
		Cookies.remove('token');
		redirect('/');
	};
	return (
		<div>
			<button onClick={deleteToken}><GrLogout/></button>
		</div>
	);
}

export default LogoutComponent;
