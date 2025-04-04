// 'use client'
// import CartItem from "@/Components/CartItem/CartItem";
// import PagesTitle from "@/Components/PageTitle/PagesTitle";
// import SmartImg from "@/Components/SmartImg/SmartImg";
// import { useShappingCartContext } from "@/context/ShappongCartContext";
// import { TAllProductData } from "@/types";
// import axios from "axios";
// import React, { useEffect, useState } from "react";

// function Cart() {
//    const {userOrd}=useShappingCartContext()
//    const [allProduct,setAllProduct] = useState<TAllProductData>()
//    // useEffect(()=>{
//    //    async function fetchingProduct() {
//    //       const allProductFetch = await axios({
//    //          url:`http://localhost:8000/fabrics`,
//    //          method:'POST'
//    //       })
//    //       setAllProduct(allProductFetch)
//    //       console.log(allProduct);
         
//    //    }
//    //    fetchingProduct()
//    // },[])
//    return (
//       <div>
//          <PagesTitle title="سبد خرید" />
//             {
//                userOrd?.map((item)=>(
//                   <CartItem id={item.id}  colorCode={item.colorCode }/>
//                ))
//             }
//       </div>
//    );
// }

// export default Cart;
