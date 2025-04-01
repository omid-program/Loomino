"use client";

import { TShappingCartContext, TUserOrds } from "@/types";
import { baskeFormatMeter } from "@/utils/inputMeter";
import { createContext, useContext, useState } from "react";

const shappingCartContext = createContext({} as TShappingCartContext);

export const useShappingCartContext = () => {
   return useContext(shappingCartContext);
};

export function ShappingCartContextProvider({
   children,
}: {
   children: React.ReactNode;
}) {
   const [userOrd, setUserOrd] = useState<TUserOrds[]>([]);

   const addOrdToCart = (
      id: string,
      meterCount: number,
      centiMeterCount: number,
      colorCode: string
   ) => {
      let productCount = baskeFormatMeter(meterCount, centiMeterCount);
      let isHaveOrd = userOrd.find(
         (ord) => ord.id === id && ord.colorCode === colorCode
      );

      console.log("productCount", productCount);
      console.log("isHaveOrd", isHaveOrd);
      if(productCount >= 0.2){
         if (isHaveOrd) {
            // اگر محصول از قبل وجود دارد، مقدار qty را جایگزین کن
            setUserOrd((prev) =>
               prev.map((ord) =>
                  ord.id === id && ord.colorCode === colorCode
                     ? { ...ord, qty: productCount } // مقدار جدید را جایگزین مقدار قبلی کن
                     : ord
               )
            );
         } else {
            // اگر محصول وجود ندارد، یک آیتم جدید اضافه کن
            let newOrd: TUserOrds = {
               id,
               qty: productCount,
               colorCode,
            };
            setUserOrd((prev) => [...prev, newOrd]);
         }
      }
      console.log(userOrd);
      
   };

   return (
      <shappingCartContext.Provider value={{ userOrd, addOrdToCart }}>
         {children}
      </shappingCartContext.Provider>
   );
}
