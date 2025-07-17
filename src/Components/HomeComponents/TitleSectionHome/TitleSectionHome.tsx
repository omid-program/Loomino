import React from 'react';

function TitleSectionHome(props:{title:string}) {
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
	);
}

export default TitleSectionHome;
