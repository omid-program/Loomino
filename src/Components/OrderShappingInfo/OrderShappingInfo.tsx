"use client";
import React, { useState } from "react";
import OrderShappingInfoInput from "./OrderShappingInfoInput/OrderSappingInfoInput";
import { TOrderShappingInfo } from "@/types";
import axios from "axios";
import {
   ShappingCartContextProvider,
   useShappingCartContext,
} from "@/context/ShappongCartContext";

function OrderShappingInfo() {
   // function for colected information
   const [orderShappingInfo, setOrderShappingInfo] = useState({
      country: "",
      state: "",
      city: "",
      address: "",
      phoneNumber: "",
      emailAddres: "",
   });
   const [isShowEmpthyCartError, setIsShowEmpthyCartError] =
      useState<boolean>(false);

   const sendNewOrdInfo = (name: string, value: string) => {
      // let newOrdInfo = {
      //    [name] : value
      // }
      setOrderShappingInfo({
         ...orderShappingInfo,
         [name]: value,
      });
      console.log(orderShappingInfo);
   };
   const { userOrd, userOffCode } = useShappingCartContext();
   // const [ordDate , setOrdDate] = useState<string>('')
    

   const submitedOrd = () => {
      if (userOrd.length > 0) {
         
         axios({
            method: "POST",
            url: "http://localhost:8000/ords",
            data: {
               id: Math.floor(Math.random() * 10000),
               country: orderShappingInfo.country,
               state: orderShappingInfo.state,
               city: orderShappingInfo.city,
               address: orderShappingInfo.address,
               phoneNumber: orderShappingInfo.phoneNumber,
               emailAddres: orderShappingInfo.emailAddres,
               userOrd,
               userOffCode,
               // date:

            },
         });
      } else {
         setIsShowEmpthyCartError(true);
      }
   };
   return (
      <div className="">
         <div className="flex flex-col gap-3 ">
            <div className="flex my-1 justify-between  items-center gap-4 w-full">
               <OrderShappingInfoInput
                  typeInput={"text"}
                  name="country"
                  label="کشور"
                  sendNewOrdInfo={sendNewOrdInfo}
               />
               <OrderShappingInfoInput
                  typeInput={"text"}
                  name="state"
                  label="ایالت / استان"
                  sendNewOrdInfo={sendNewOrdInfo}
               />
               <OrderShappingInfoInput
                  typeInput={"text"}
                  name="city"
                  label="شهر"
                  sendNewOrdInfo={sendNewOrdInfo}
               />
            </div>
            <div className="flex my-1 w-full">
               <OrderShappingInfoInput
                  typeInput={"aria"}
                  name="address"
                  label="آدرس"
                  sendNewOrdInfo={sendNewOrdInfo}
               />
            </div>
            <div className="flex my-1 w-full">
               <OrderShappingInfoInput
                  typeInput={"text"}
                  name="phoneNumber"
                  label="شماره تماس"
                  sendNewOrdInfo={sendNewOrdInfo}
               />
               <OrderShappingInfoInput
                  typeInput={"text"}
                  name="emailAddres"
                  label="ایمیل"
                  sendNewOrdInfo={sendNewOrdInfo}
               />
            </div>
         </div>
         <div className="w-full mx-auto flex justify-center items-center">
            <p
               className={`text-red-600 ${
                  isShowEmpthyCartError ? "block" : "hidden"
               }`}
            >
               سبد خرید شما نمیتواند خالی باشد
            </p>
            <button className="w-1/4" onClick={submitedOrd}>
               ثبت سفارش
            </button>
         </div>
      </div>
   );
}

export default OrderShappingInfo;
