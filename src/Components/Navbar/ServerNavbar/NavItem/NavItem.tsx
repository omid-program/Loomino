"use client";
import { TPropsNavItem, TSubItemNav } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

function NavItem({ children, navLinksItem }: TPropsNavItem): React.JSX.Element{

   const [hoverFlag , setHoverFlag] = useState(false)
   const pathName = usePathname()

   const startHoverItem = () => {
      //code for hover
      setHoverFlag(true)
   };

   const endHoverItem = () => {
      //code hover
      setHoverFlag(false)
   };

   return (
      <div
         className={`p-1 text-lg   ${pathName ===navLinksItem.link ? 'border-b-4 border-violet-600 bg-violet-100 rounded-t-md': '' }`} 
         onMouseEnter={startHoverItem}
         onMouseLeave={endHoverItem}
      >
         <Link href={navLinksItem.link}>{navLinksItem.perTitle}</Link>
         <div className={`transition-all duration-500 delay-75 ${!hoverFlag ? "hidden" : "absolute"}`}>{children}</div>
      </div>
   );
}

export default NavItem;
