// import { TNavbarPromps } from "@/types";
import React from "react";
import NavItem from "./NavItem/NavItem";
import Link from "next/link";
import { TLinksData } from "@/types";
import NavSubItem from "./NavSubItem/NavSubItem";

function Navbar() {
   const navLinks: TLinksData[] = [
      {
         id: 1,
         perTitle: "خانه",
         engTitle: "Home",
         link: "/",
      },
      {
         id: 2,
         perTitle: "فروشگاه",
         engTitle: "Shop",
         link: "/shop",
      },
      {
         id: 3,
         perTitle: "دسته بندی",
         engTitle: "Categoties",
         subItems: [
            {
               id: 1,
               perSubNavTitle: "خرید پارچه لباسی",
               engSubNavTitle: "Buying clothes",
               href: "/",
            },
            {
               id: 2,
               perSubNavTitle: "خرید پارچه ملحفه ای",
               engSubNavTitle: "Buying bed sheet fabric",
               href: "/",
            },
         ],
         link: "/categiries",
      },
   ];
   return (
      <nav className="w-10/12 max-h-5 relative mx-auto  bg-sky-400 rounded-full py-2 px-1 flex justify-between items-center ">
         <ul className="flex gap-2">
            {navLinks.map((navLinksItem: TLinksData) => (
               <li>
                  <NavItem key={navLinksItem.id} navLinksItem={navLinksItem}>
                     <NavSubItem />
                  </NavItem>
               </li>
            ))}
         </ul>
      </nav>
   );
}

export default Navbar;
