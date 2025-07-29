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
         className={`p-1 text-lg   ${pathName ===navLinksItem.link ? 'border-y-2 border-textMain text-textMainMuted transition duration-150 ease-out  ': ' hover:border-b-2 hover:border-textMain hover:text-textMainMuted ' }`} 
         onMouseEnter={startHoverItem}
         onMouseLeave={endHoverItem}
      >
         <Link href={navLinksItem.link}>{navLinksItem.perTitle}</Link>
         <div className={`transition-all duration-500 delay-75 ${!hoverFlag ? "hidden" : "absolute"}`}>{children}</div>
      </div>
   );
}

export default NavItem;
