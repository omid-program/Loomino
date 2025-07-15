import React from 'react';
import OptionsShop from './OptionsShop';


type THomeDesignGapToPageProps = {
	title: string;
	description: string;
	secendDescription?: string;
};

function HomeDesignGapToImg(props: THomeDesignGapToPageProps) {
	return (
		<div className="grid grid-cols-7 gap-0 ">
			<div className="col-span-2 h-[420px]">
				<img
					className="h-[420px] rounded-br-full mx-0 px-0 w-full"
					src="Home-page/tow-img-gap-design-2.jpg"
					alt=""
				/>
			</div>
			<div className="col-span-3 bg-violet-200 mx-0 text-center grid grid-rows-3">
				<div>
					<h3 className="text-3xl mt-2 mb-7 font-bold text-pretty">
						{props.title}
					</h3>
				</div>
				<div>
					<p className="text-yellow-800 my-1">{props.description}</p>
					<p className="text-yellow-800 my-1">{props.secendDescription}</p>
				</div>
            <OptionsShop/>
			</div>
			<div className="col-span-2 h-[420px]">
				<img
					className="h-[420px] rounded-tl-full"
					src="Home-page/tow-img-gap-design.jpg"
					alt=""
				/>
			</div>
		</div>
	);
}

export default HomeDesignGapToImg;
