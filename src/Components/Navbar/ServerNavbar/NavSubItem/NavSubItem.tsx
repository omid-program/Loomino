import { TCatDatas, TSubItems } from "@/types";
import Link from "next/link";
import React from "react";

function NavSubItem({subItems}:{subItems:TCatDatas}) {
   // console.log(subItems);
   
   return (
<li>
   <Link href={`http://localhost:3000/cats/${subItems.id}`}> خرید پارچه ی {subItems.perTitle}</Link>
</li>
   );
}

export default NavSubItem;
