"use client";
import React, { useEffect, useState } from "react";
import QtyManager from "../QtyManager/QtyManager";
import { TAllProductData, TCartItemProps, TInStoreAllProduct } from "@/types";
import axios from "axios";

function CartItem(props: TCartItemProps) {
   const { id, colorCode, price } = props;
   const [productDatas, setProductDatas] = useState<TAllProductData | null>(
      null
   );
   const [imageCartItem, setImageCartItem] = useState<
      TInStoreAllProduct | undefined
   >();

   // گرفتن اطلاعات محصول از API
   useEffect(() => {
      axios(`http://localhost:8000/fabrics/${id}`).then((result) => {
         setProductDatas(result.data);
      });
   }, [id]); // فقط وقتی id تغییر کنه دوباره fetch بشه

   // تنظیم تصویر محصول بر اساس رنگ انتخاب شده
   useEffect(() => {
      if (productDatas?.inStore) {
         const imageItem = productDatas.inStore.find(
            (item) => item?.colorCode === colorCode
         );
         setImageCartItem(imageItem);
      }
   }, [productDatas, colorCode]); // وابستگی روی productDatas و colorCode

   return (
      <div className="grid grid-cols-8 shadow-md shadow-sky-600 my-2 rounded-md p-2 gap-2">
         <div className="col-span-2 rounded-sm bg-cover overflow-hidden">
            {imageCartItem && (
               <img
                  src={imageCartItem.colorImg}
                  alt="Product Image"
                  className=" rounded-sm"
               />
            )}
         </div>
         <div className="col-span-2">
            <QtyManager
               id={id}
               colorCode={colorCode}
               price={productDatas?.price}
            />
         </div>
         <div className="grid col-span-4 ">
            <h3>{productDatas?.perTitle}</h3>
            <p>{productDatas?.perMiniDescription}</p>
         </div>
      </div>
   );
}

export default CartItem;
