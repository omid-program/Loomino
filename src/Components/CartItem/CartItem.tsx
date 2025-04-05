"use client";
import React, { useEffect, useState } from "react";
import QtyManager from "../QtyManager/QtyManager";
import { TAllProductData, TCartItemProps, TInStoreAllProduct } from "@/types";
import axios from "axios";

function CartItem(props: TCartItemProps) {
   const { id, colorCode, price } = props;
   const [productDatas, setProductDatas] = useState<TAllProductData | null>(null);
   const [imageCartItem, setImageCartItem] = useState<TInStoreAllProduct | undefined>();

   // گرفتن اطلاعات محصول از API
   useEffect(() => {
      axios(`http://localhost:8000/fabrics/${id}`).then((result) => {
         setProductDatas(result.data);
      });
   }, [id]); // فقط وقتی id تغییر کنه دوباره fetch بشه

   // تنظیم تصویر محصول بر اساس رنگ انتخاب شده
   useEffect(() => {
      if (productDatas?.inStore) {
         const imageItem = productDatas.inStore.find((item) => item.colorCode === colorCode);
         setImageCartItem(imageItem);
      }
   }, [productDatas, colorCode]); // وابستگی روی productDatas و colorCode

   return (
      <div className="grid grid-cols-8 shadow-md shadow-sky-600">
         <div>{imageCartItem && <img src={imageCartItem.colorImg} alt="Product Image" />}</div>
         <QtyManager id={id} colorCode={colorCode} price={productDatas?.price} />
         <div className="grid col-span-6">
            <h3>{productDatas?.perTitle}</h3>
            <p>{productDatas?.perDescription}</p>
         </div>
      </div>
   );
}

export default CartItem;
