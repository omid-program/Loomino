import Container from "@/Components/Container/Container";
import PagesTitle from "@/Components/PageTitle/PagesTitle";
import Pagination from "@/Components/Pagination/Pagination";
import ProductBox from "@/Components/ProductBox/ProductBox";
import { TAllProductData, TShopParams } from "@/types";
import Link from "next/link";
import React from "react";

async function Shop(params: TShopParams) {
   const response = await fetch(`http://localhost:8000/fabrics`);
   // const page = (await params.searchParams).page ?? "1"
   // const per_page = (await params.searchParams).per_page ?? "6"
   // const response = await fetch(`http://localhost:8000/fabrics?_page=${page}&_per_page=${per_page}`)
   const allProducts = (await response.json()) as TAllProductData[];
   console.log(allProducts);

   return (
      <Container>
         <div>
            <PagesTitle title={"فروشگاه"} />
         </div>
         <div className="grid grid-cols-4 gap-3">
            {allProducts.map((product) => (
               <Link href={`/shop/${product.id}`}>
                  <ProductBox {...product} />
               </Link>
            ))}
         </div>
         <div>{/* <Pagination pageCount={allProducts.pages}/> */}</div>
      </Container>
   );
}

export default Shop;
