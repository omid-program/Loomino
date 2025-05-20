import Link from "next/link";
import React from "react";

function layout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   const sidebarItems = [
      {
         id: "1",
         perTitle: "افرودن محصول",
         engTitle: "Add Product",
         href: "/dashboard/add-product",
      },
      {
         id: "2",
         perTitle: "مدیریت محصولات",
         engTitle: "product Manager",
         href: "/dashboard/product-manager",
      },
      {
         id: "3",
         perTitle: "مدیریت سفارشات",
         engTitle: "Ord Manager",
         href: "/dashboard/ord-manager",
      },
      {
         id: "4",
         perTitle: "مدیریت دسته بندی و برچست",
         engTitle: "cat and Tag Manager",
         href: "/dashboard/manage-items",
      },
   ];
   return (
      <div className="flex">
         <div className="sidebar mr-0 ml-5 px-6 py-8  w-1/5 min-h-screen sticky bg-rose-300 rounded-tl-[80px]">
            <div className="mb-7 mx-auto text-center">logo</div>
            <div>
               <div className="flex flex-col gap-5">
                  {sidebarItems.map((item) => (
                     <Link
                        href={item.href}
                        key={item.id}
                        className="  py-2 px-3 border-y border-sky-400"
                     >
                        <div className="">{item.perTitle}</div>
                     </Link>
                  ))}
               </div>
            </div>
         </div>
         <div className="w-full">{children}</div>
      </div>
   );
}

export default layout;
