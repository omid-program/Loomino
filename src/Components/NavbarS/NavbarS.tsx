'use client'
import React from "react";
import Container from "../Container/Container";
import Link from "next/link";
import { TNavbarPromps } from "@/types";

function NavbarS(params:TNavbarPromps) {
   const navItem = [
      {
         id:1,
         perTitle:'خانه',
         engTitle:'Home',
         href:"/"
      },
      {
         id:2,
         perTitle:'فروشگاه',
         engTitle:'Store',
         href:"/shop"
      },
   ]
   console.log(params);
   
   return (
      <>
         <div className="flex justify-between w-10/12 rounded-lg bg-sky-400 my-3 mx-auto py-2 px-3">
         <ul className=" items-center">
         {
            navItem.map(item=>(
               <li className="text-lg ">
               <Link href={item.href}>{item.perTitle}</Link>
               </li>
            ))
         }
         </ul>
         </div>
      </>
   );
}

export default NavbarS;
