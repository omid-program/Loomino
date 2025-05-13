import { TSubItems } from "@/types";
import Link from "next/link";
import React from "react";

function NavSubItem({subItems}:{subItems:TSubItems}) {
   console.log(subItems);
   
   return (
<li>
   <Link href={`/cats/${subItems.catName}`}>{subItems.perSubNavTitle}</Link>
</li>
   );
}

export default NavSubItem;
