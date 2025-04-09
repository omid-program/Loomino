"use client";
import { useShappingCartContext } from "@/context/ShappongCartContext";
import {  TOffCodes, TUserOrds } from "@/types";
import { formatPrice } from "@/utils/price";
import axios from "axios";
import React, { useEffect, useState } from "react";

function TotalPriceBox() {
   const { userOrd } = useShappingCartContext();
   const [totalPrice, setTotalPrice] = useState(0);
   const [qtyList, setQtyList] = useState<number[]>([]);
   const [offCodeInput, setOffCodeInput] = useState<string>("");
   const [finalPrise , setFinalPrise] = useState<number>(totalPrice)
   const [userBenefit , setUserBenefit] = useState<number>(0)
   
   console.log(userOrd); // چک کردن مقدار بسکت
   useEffect(() => {
      const qtyListMap = userOrd.map((ord) => {
         return ord.qty;
      });
      setQtyList(qtyListMap);
      
   }, [userOrd]);
   console.log(qtyList);
////////////////////////////////////
   useEffect(() => {
      const totalPriceReduse = userOrd.reduce((total, item) => {
         return item.price * item.qty + total;
      }, 0);
      setTotalPrice(totalPriceReduse);
   }, [qtyList]);

   const offCodeHan = ()=>{
      axios(`http://localhost:8000/offs/?offCode=${offCodeInput}`).then(
      result=>{
         console.log("result=>" , result );
         
         const data = result.data as TOffCodes[]
         console.log("data=> " , data);
         let finalPrice = totalPrice - (totalPrice * (data[0].persentage / 100))
         setFinalPrise(finalPrice)
         setUserBenefit(totalPrice - finalPrice)
      })
   }

   return (
      <div className="w-1/3 mx-5">
         <div className="border-b border-rose-500 my-3 p-1 ">
            <span>قیمت کل:</span>
            <span>{formatPrice(totalPrice)}</span>
         </div>
         <div>
            <input
               value={offCodeInput}
               className="bg-rose-300 p-1 rounded-md"
               type="text"
               onChange={(
                  e:React.ChangeEvent<HTMLInputElement>
               ) => {
                  setOffCodeInput(e.target.value);
               }}
            />
            <button
               onClick={offCodeHan}
               className="bg-rose-700 text-sky-400 p-1"
            >
               اعمال کد تخفیف
            </button>
         </div>
         <div>
            <span>سود شما: </span>
            <span>{formatPrice(userBenefit)}</span>
         </div>
         <div>
            <span>قیمت نهایی: </span>
            <span>{formatPrice(finalPrise)}</span>
         </div>
      </div>
   );
}

export default TotalPriceBox;
