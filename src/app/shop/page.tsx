import Container from "@/Components/Container/Container";
import PagesTitle from "@/Components/PageTitle/PagesTitle";
import Pagination from "@/Components/Pagination/Pagination";
import PaginationC from "@/Components/PaginationC/PaginationC";
import ProductBox from "@/Components/ProductBox/ProductBox";
import Search from "@/Components/Search/Search";
import { IPaginateShop, TAllProductData, TShopParams } from "@/types";
import Link from "next/link";
import React from "react";

async function Shop({searchParams}: TShopParams) {
   // const response = await fetch(`http://localhost:8000/fabrics`);
   const page = (await searchParams).page ?? "1"
   const per_page = (await searchParams).per_page ?? "6"
   const title = (await searchParams).title?? ''

   let url = `http://localhost:8000/fabrics?_page=${page}&_per_page=${per_page}`

   if(title.trim()){
      url+= `&q=${encodeURIComponent(title)}`
   }

   const response = await fetch(url,{cache:'no-cache'})
   const allProducts = (await response.json()) as IPaginateShop;
   console.log(allProducts);

   return (
      <Container>
         <div>
            <div><PagesTitle title={"فروشگاه"} /></div>
            <div>
               <Search/>
            </div>
         </div>
         <div className="grid grid-cols-4 gap-3">
            { allProducts.data.map((product) => (
               <Link key={product?.id} href={`/shop/${product?.id}`}>
                  <ProductBox {...product} />
               </Link>
            ))}
         </div>
         <div>{/* <Pagination pageCount={allProducts.pages}/> */}</div>
         <PaginationC
         pageCount={2}/>
      </Container>
   );
}

export default Shop;
