import React from 'react';
import { AiFillProduct } from 'react-icons/ai';

function TitleSectionHome(props:{title:string}) {
	return (
		<div className="flex gap-2 text-xl">
			<span>
				<AiFillProduct />
			</span>
			<h3 className="">{props.title}</h3>
		</div>
	);
}

export default TitleSectionHome;
