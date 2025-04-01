"use client";
import { useShappingCartContext } from "@/context/ShappongCartContext";
import React, { useState } from "react";

import { RiDeleteBinLine } from "react-icons/ri";


function QtyManager(props: { id: string; colorCode: string }) {
   const [meterVal, setMeterVal] = useState<number>(0);
   const [centiMeterVal, setCentiMeterVal] = useState<number>(0);
   const { id, colorCode } = props;
   const { addOrdToCart } = useShappingCartContext();
   return (
      <div>
         <div className="grid grid-cols-2">
            <div className="grid col-span-1">
               <label htmlFor="meterInputId">متر:</label>
               <input
                  className="w-2/5"
                  id="meterInputId"
                  type="number"
                  placeholder="متر"
                  value={meterVal}
                  onChange={(e) => setMeterVal(Number(e.target.value))}
               />
            </div>
            <div className="grid col-span-1">
               <label htmlFor="centiMeterInputId">سانتی متر</label>
               <input
                  id="centiMeterInputId"
                  className="w-2/5"
                  type="number"
                  placeholder="سانتی متر"
                  value={centiMeterVal}
                  onChange={(e) => setCentiMeterVal(Number(e.target.value))}
               />
            </div>
         </div>
         <div className="grid grid-cols-5 gap-1">
            <div className="col-span-4">
               <button
                  className=" w-full mx-auto px-1 py-2 rounded-md bg-sky-400"
                  onClick={() => {
                     addOrdToCart(id, meterVal, centiMeterVal, colorCode);
                  }}
               >
                  افزودن به سبد خرید
               </button>
            </div>
            <div>
               <button className=" grid col-span-1 size-full bg-red-700 rounded-full p-2 text-white items-center justify-center text-center">
                  <RiDeleteBinLine className="text-white"/>
               </button>
            </div>
         </div>
      </div>
   );
}

export default QtyManager;
