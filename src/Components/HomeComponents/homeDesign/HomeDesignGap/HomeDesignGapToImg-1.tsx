import React from 'react';
import OptionsShop from './OptionsShop';

type THomeDesignGapToPageProps = {
	title: string;
	description: string;
	secendDescription?: string;
};

function HomeDesignGapToImg(props: THomeDesignGapToPageProps) {
	return (
		<div className="grid grid-cols-7 gap-0 h-36 md:h-[420px] ">
			<div className="col-span-2 h-36 md:h-[420px]">
				<img
					className="h-[100%] rounded-br-full mx-0 px-0 w-full"
					src="Home-page/tow-img-gap-design-2.jpg"
					alt=""
				/>
			</div>
			<div className="col-span-3 bg-violet-200 mx-0 text-center grid grid-rows-3 h-36 md:h-[420px]">
				<div>
					<h3 className="text-xl mt-2 mb-7 font-bold text-pretty md:text-3xl">
						{props.title}
					</h3>
				</div>
				<div>
					<p className="text-sm  text-yellow-800 my-1 md:text-base ">{props.description}</p>
					<p className="text-yellow-800 my-1 hidden md:block">{props.secendDescription}</p>
				</div>
				<div className='hidden md:block'>
				<OptionsShop />
				</div>
			</div>
			<div className="col-span-2 h-36 md:h-[420px]">
				<img
					className="h-[100%] rounded-tl-full"
					src="Home-page/tow-img-gap-design.jpg"
					alt=""
				/>
			</div>
		</div>
	);
}

export default HomeDesignGapToImg;
