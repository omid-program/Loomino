import Container from "@/Components/Container/Container";
import SmartImg from "@/Components/SmartImg/SmartImg";
import {
   TAllProductData,
   TInStoreAllProduct,
   TProductPageParams,
} from "@/types";
import React from "react";

async function ProductPage({ params }: TProductPageParams) {
   const { id } = await params;
   console.log('productPage=>' ,id);
   const response = await fetch(`http://localhost:8000/fabrics/${id}`);
   const productData = (await response.json()) as TAllProductData;
   const colorList = productData?.inStore as TInStoreAllProduct[];
   const productPrice = Number(productData?.price)
   console.log(colorList);
   
   

   return (
      <Container>
         <div className="grid grid-cols-4">
            <div className="col-span-1">
               <SmartImg id={id} colorList={colorList} price={productPrice} />
            </div>
            <div className="col-span-3 justify-center items-center gap-8">
               <div className="flex flex-col ">
                  <h1 className="text-3xl">{productData?.perTitle}</h1>
                  <div>
                     <p>{productData?.perDescription}</p>
                  </div>
               </div>
            </div>
         </div>
      </Container>
   );
}

export default ProductPage;
