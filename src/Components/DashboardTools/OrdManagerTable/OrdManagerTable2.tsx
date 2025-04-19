import { TAllOrdData, TAllProductData } from '@/types'
import React from 'react'

async function OrdManagerTable2() {
   const response = await fetch(`http://localhost:8000/ords`)
   const ordsData = await response.json() as TAllOrdData
   console.log(ordsData);
   
  return (
    <div>
      
    </div>
  )
}

export default OrdManagerTable2
