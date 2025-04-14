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
		<button className="size-10 rounded-full bg-sky-500"
      onClick={runToEditPage}>
			<TiEdit />
		</button>
	);
}

export default ProductManagerEditActions;
