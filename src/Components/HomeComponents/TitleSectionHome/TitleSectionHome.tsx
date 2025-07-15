import { title } from 'process';
import React from 'react';
import { AiFillProduct } from 'react-icons/ai';

function TitleSectionHome(props: { title: string }) {
	return (
		<div>
			<div className="flex items-center justify-center w-full my-12 px-4">
				{/* سمت چپ موج + خط */}
				<div className="flex-1 flex items-center justify-end gap-2">
					<div className="h-1 w-16 rounded-full bg-yellow-400"></div>
					<div className="h-2 w-2 bg-sky-400 rounded-full animate-ping"></div>
					<div className="h-0.5 w-20 border-b-2 border-gray-400"></div>
					<div className="h-0.5 w-12 border-b-2 border-dashed border-violet-400"></div>
				</div>

				{/* عنوان */}
				<h2 className="mx-4 text-xl font-bold text-gray-700">
					{props.title}
				</h2>

				{/* سمت راست موج + خط */}
				<div className="flex-1 flex items-center justify-start gap-2">
					<div className="h-0.5 w-12 border-b-2 border-dashed border-violet-400"></div>
					<div className="h-0.5 w-20 border-b-2 border-gray-400"></div>
					<div className="h-2 w-2 bg-sky-400 rounded-full animate-ping"></div>
					<div className="h-1 w-16 rounded-full bg-yellow-400"></div>
				</div>
			</div>
		</div>

		// <div className="grid grid-cols-12">
		// 	<div className="grid col-span-5 grid-cols-4 h-14 grid-rows-2  border-2">
		// 		<div className=" grid col-span-3 grid-cols-2">
		// 			<div className="col-span-1 border-b-4 rounded-b-full h-7 border-yellow-400"></div>
		// 			<div className="col-span-1 border-t-4 rounded-t-full h-7 border-sky-400"></div>
		// 		</div>
		// 		<div className=" grid grid-cols-3 col-span-1">
		// 			<div className="col-span-2 border-b-2  border-gray-900"></div>
		// 			<div className="col-span-1 border-b-2 border-dashed  border-violet-400"></div>
		// 		</div>
		// 	</div>
		// 	<div className="grid col-span-2 border-2 border-green-600">
		// 		<h2>title</h2>
		// 	</div>
		// 	<div className="grid col-span-5 grid-cols-4 h-14 grid-rows-2  border-2 ">
		// 		<div className=" grid grid-cols-3 col-span-1">
		// 			<div className="col-span-1 border-b-2 border-dashed  border-violet-400"></div>
		// 			<div className="col-span-2 border-b-2  border-gray-900"></div>
		// 		</div>
		// 		<div className=" grid col-span-3 grid-cols-2">
		// 			<div className="col-span-1 border-t-4 rounded-t-full h-7 border-sky-400"></div>
		// 			<div className="col-span-1 border-b-4 rounded-b-full h-7 border-yellow-400"></div>
		// 		</div>
		// 	</div>
		// </div>

		// <div className="flex gap-2 text-xl items-center">
		// 	<span className='text-violet-600'>
		// 		<AiFillProduct />
		// 	</span>
		// 	<h3 className="">{props.title}</h3>
		// </div>
	);
}

export default TitleSectionHome;
