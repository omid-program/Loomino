import { TAllProductData } from "@/types";
import React from "react";
import PaginationBtns from "../PaginationBtns/PaginationBtns";

async function ProductManagerTable() {
   const response = await fetch(`http://localhost:8000/fabrics`);
   const fabricData = (await response.json()) as TAllProductData[];
   // console.log(fabricData);
   const itemPageCount = 2;
   const pageCount = Math.ceil(fabricData.length / itemPageCount);

   const buttons = [];

   const paginatedHand = () => {};

   for (let i = 0; i < pageCount; i++) {
      buttons.push(
         <PaginationBtns
            key={i}
            pageNumber={i}
            itemPageCount={itemPageCount}
            paginatedHand={paginatedHand}
         />
      );
   }

   return <div className="flex gap-2">{buttons}</div>;
}

export default ProductManagerTable;
