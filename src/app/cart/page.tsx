'use client'
import PagesTitle from "@/Components/PageTitle/PagesTitle";
import SmartImg from "@/Components/SmartImg/SmartImg";
import { useShappingCartContext } from "@/context/ShappongCartContext";
import React from "react";

function Cart() {
   const {userOrd}=useShappingCartContext()
   return (
      <div>
         <PagesTitle title="سبد خرید" />
            {
               userOrd?.map((item)=>(
                  
                  <div className="grid grid-col-4">
                  <div className="col-span-1">
                     
                  </div>
                  <div className="col-span-3"></div>
         </div>
               ))
            }
      </div>
   );
}

export default Cart;
