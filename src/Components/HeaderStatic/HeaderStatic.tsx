import Link from 'next/link';
import React from 'react';

function HeaderStatic() {
	return (
		<header className=" h-[500px] relative overflow-hidden w-full mb-8">
			<div>
				<img 
            src="https://media.cnn.com/api/v1/images/stellar/prod/petal-and-pup-spring-dresses-lead.jpg?c=original"
            className="w-full h-full object-cover transition-all duration-500" />
				<Link href={`http://localhost:3000/cats`}>
					<div className="absolute bottom-5 left-5 text-white bg-black bg-opacity-50 px-4 py-2 rounded">
						<h2 className="text-xl font-bold">{`انواع پارچه ها`}</h2>
						<span className="text-sm">{`برای هر کاربرد و سلیقه ای`}</span>
					</div>
				</Link>
			</div>
		</header>
	);
}

export default HeaderStatic;
