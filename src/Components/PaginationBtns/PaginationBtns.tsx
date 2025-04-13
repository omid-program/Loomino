import { TPaginationProps } from '@/types';
import React from 'react'

function PaginationBtns(props:TPaginationProps ) {
  const {pageNumber , itemPageCount ,paginatedHand} = props
  const startIndex = pageNumber * itemPageCount
  const endIndex = startIndex + itemPageCount

   console.log('PaginationBtns props =>' , props.pageNumber);
   console.log('test');
   
   
  return (
    <div className='rounded-full size-14 cursor-pointer bg-sky-200 hover:bg-sky-400'>
      {pageNumber + 1}
    </div>
  )
}

export default PaginationBtns
