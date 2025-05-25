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
         className={`p-1 text-lg   ${pathName ===navLinksItem.link ? 'border border-rose-600': '' }`} 
         onMouseEnter={startHoverItem}
         onMouseLeave={endHoverItem}
      >
         <Link href={navLinksItem.link}>{navLinksItem.perTitle}</Link>
         <div className={`${!hoverFlag ? "hidden" : "absolute"}`}>{children}</div>
      </div>
   );
}

export default NavItem;
