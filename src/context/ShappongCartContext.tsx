"use client";

import { TItemsOfOrders, TShappingCartContext, TUserOrds } from "@/types";
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
   const [userOrd, setUserOrd] = useState<TItemsOfOrders[]>([]);
   const [userOffCode, setUserOffCode] = useState<number>(0);

   const addOrdToCart = (
      id: string,
      perTitle: string ,
      colorId : string,
      meterCount: number,
      centiMeterCount: number,
      colorCode: string,
      price: number
   ) => {
      let productCount = baskeFormatMeter(meterCount, centiMeterCount);
      let isHaveOrd = userOrd.find(
         (ord) => ord.colorId === colorId 
         // && ord.colorCode === colorCode
      );
      // console.log("productCount", productCount);
      // console.log("isHaveOrd", isHaveOrd);
      if (productCount >= 0.2) {
         if (isHaveOrd) {
            // اگر محصول از قبل وجود دارد، مقدار qty را جایگزین کن
            setUserOrd((prev) =>
               prev.map((ord) =>
                  ord.colorId === colorId && ord.colorCode === colorCode
                     ? { ...ord, qty: productCount } // مقدار جدید را جایگزین مقدار قبلی کن
                     : ord
               )
            );
         } else {
            // اگر محصول وجود ندارد، یک آیتم جدید اضافه کن
            let newOrd: TItemsOfOrders = {
               id,
               perTitle,
               colorId,
               qty: productCount,
               colorCode,
               price: Number(price),
            };
            setUserOrd((prev) => [...prev, newOrd]);
         }
      }
      console.log(userOrd);
   };
   


   const removeProductFromCart = (productId: string, colorId: string) => {
      setUserOrd((prev) => {
         return prev.filter((ord) => {
            return ord.colorId !== colorId || ord.id !== productId;
         });
      });
   };

   const addOffcode = (persentageOffCode: number) => {
      setUserOffCode(persentageOffCode);
   };

   return (
      <shappingCartContext.Provider
         value={{
            userOrd,
            addOffcode,
            addOrdToCart,
            removeProductFromCart,
            userOffCode,
         }}
      >
         {children}
      </shappingCartContext.Provider>
   );
}
