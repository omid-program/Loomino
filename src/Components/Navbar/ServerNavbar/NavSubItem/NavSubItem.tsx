import { TCatDatas, TSubItems } from "@/types";
import Link from "next/link";
import React from "react";
import {API_INSIDE_URL} from" ./../../config"

function NavSubItem({subItems}:{subItems:TCatDatas}) {
   // console.log(subItems);
   
   return (
<li className="text-sm">
   <Link href={`${API_INSIDE_URL}/cats/${subItems.id}`}> خرید پارچه ی {subItems.perTitle}</Link>
</li>
   );
}

export default NavSubItem;
