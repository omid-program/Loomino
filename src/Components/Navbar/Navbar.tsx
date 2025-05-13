// import { TNavbarPromps } from "@/types";
import React from "react";
import NavItem from "./NavItem/NavItem";
import Link from "next/link";
import { TLinksData } from "@/types";
import NavSubItem from "./NavSubItem/NavSubItem";
import { BsCart4 } from "react-icons/bs";

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
               catName:'clothFab',
               perSubNavTitle: "خرید پارچه لباسی",
               engSubNavTitle: "Buying clothes",
               href: `/${''}`,
               // Tagname => href ... => subItem.map=> link('/${params.cat}')
            },
            {
               id: 2,
               catName:'bedSheetFab',
               perSubNavTitle: "خرید پارچه ملحفه ای",
               engSubNavTitle: "Buying bed sheet fabric",
               href: "/",
            },
         ],
         link: "/cats",
      },
      {
         id: 4,
         perTitle: "داشبورد",
         engTitle: "Dashboard",
         link: "/dashboard",
      },
   ];
   return (
      <nav className="w-10/12 max-h-12 relative mx-auto  bg-sky-400 rounded-full py-2 px-1 flex justify-between items-center ">
         <ul className="flex gap-2">
            {navLinks.map((navLinksItem: TLinksData) => (
               <li key={navLinksItem.id}>
                  <NavItem key={navLinksItem.id} navLinksItem={navLinksItem}>
                     {navLinksItem.subItems?.map((subItem) => (
                        <ul
                           key={subItem?.id}
                           className="shadow-sky-700 shadow-md px-2 py-3   z-50"
                        >
                           <NavSubItem subItems={subItem} />
                        </ul>
                     ))}
                  </NavItem>
               </li>
            ))}
         </ul>
         <div>
            <div className="size-5">
               <Link href={'/cart'} className="w-full">
                  <BsCart4 />
               </Link>
            </div>
         </div>
      </nav>
   );
}

export default Navbar;
