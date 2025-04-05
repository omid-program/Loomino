"use client";
import CartItem from "@/Components/CartItem/CartItem";
import PagesTitle from "@/Components/PageTitle/PagesTitle";
import SmartImg from "@/Components/SmartImg/SmartImg";
import { useShappingCartContext } from "@/context/ShappongCartContext";
import { TAllProductData } from "@/types";
import axios from "axios";
import React, { useEffect, useState } from "react";

function Cart() {
   const { userOrd } = useShappingCartContext();
   // const [allProduct, setAllProduct] = useState<TAllProductData[]>();
   // useEffect(() => {
   //    axios(`http://localhost:8000/Products`).then((result) => {
   //       const { data } = result;
   //       console.log(data);
   //       setAllProduct(data);
   //    });
   // }, []);

   
   return (
      <div>
         <PagesTitle title="سبد خرید" />


         {userOrd?.map((item) => (
            <CartItem
               id={item.id}
               colorCode={item.colorCode}
               price={item.price}
               qty={item.qty}
            />
            // <div>
            //    <p className="text-5xl text-red-500">{item.id}</p>
            //    <p className="text-5xl text-red-500">{item.colorCode}</p>
            //    <p className="text-5xl text-red-500">{item.qty}</p>
            //    <p className="text-5xl text-red-500">{item.price}</p>
            // </div>
         ))}
      </div>
   );
}

export default Cart;
