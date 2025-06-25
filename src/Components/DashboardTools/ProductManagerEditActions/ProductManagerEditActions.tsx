'use client';
import { TProductManagerEditActionsProps } from '@/types';
import { useRouter } from 'next/navigation';
import React from 'react';
import { TiEdit } from 'react-icons/ti';

function ProductManagerEditActions(props:TProductManagerEditActionsProps) {
   const {id} = props

   const router = useRouter()
   const runToEditPage = ()=>{
      router.push(`/dashboard/product-manager/${id}`)
   }

   return (
		<button className="size-10 rounded-full shadow-md shadow-sky-300 border-2 border-sky-600 flex items-center justify-center text-sky-600"
      onClick={runToEditPage}>
			<TiEdit className='w-full size-5' />
		</button>
	);
}

export default ProductManagerEditActions;
