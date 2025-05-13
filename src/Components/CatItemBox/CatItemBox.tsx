import { TCatDatas } from '@/types';
import Link from 'next/link';
import React from 'react';

export default function CatItemBox(props:TCatDatas) {
  const{defImg , perTitle , nameTag , perMiniDescription ,id} =  props
	return (
		<div className="w-1/3 rounded border-2 border-sky-500 flex flex-col justify-center items-center ">
			<Link href={`/cats/${id}`} className=''>
				<div className="grid grid-rows-12 justify-center items-center w-full h-full">
					<div className="row-span-1 items-center justify-center py-1">
						<h2 className="text-center text-lg">{perTitle}</h2>
					</div>
					<div className="w-4/5 row-span-8 rounded overflow-clip items-center justify-center ">
						<img className="w-full h-full" src={defImg} />
					</div>
					<div className='row-span-3 p-1'>
						<p>{perMiniDescription}</p>
					</div>
				</div>
			</Link>
		</div>
	);
}
