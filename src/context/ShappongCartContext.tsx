'use client'

import { TShappingCartContext, TUserOrds } from "@/types"
import { baskeFormatMeter } from "@/utils/inputMeter"
import { createContext, useContext, useState } from "react"


const shappingCartContext = createContext({} as TShappingCartContext)


export const useShappingCartContext = ()=>{
   return useContext(shappingCartContext)
}

   export function ShappingCartContextProvider({children}:{children:React.ReactNode}){

      const [userOrd , setUserOrd] = useState<TUserOrds[]>([])
      const addOrdToCart = (id:string , meterCount:number , centiMeterCount:number, colorCode:string)=>{
         let productCount = baskeFormatMeter(meterCount , centiMeterCount)
         let isHaveOrd = userOrd.some((ord)=>ord.id === id)
         console.log('productCount' , productCount);
         console.log('isHaveOrd' , isHaveOrd);
         
      }

      return(
         <shappingCartContext.Provider value={{userOrd , addOrdToCart }}>
            {children}
         </shappingCartContext.Provider>
      )
   }