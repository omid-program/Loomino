"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";

function Pagination({ pageCount }: { pageCount: number }) {
   const router = useRouter();
   const [searchParams, setSearchParams] = useState("");

   const handlePageClick = (e: { selected: number }) => {
      console.log(e.selected);
      const page = e.selected + 1;
      const currentparams = new URLSearchParams(searchParams.toString());
      console.log(currentparams);

      currentparams.set("page", page.toString());
      currentparams.set("per_page", "4");

      router.push(`store?${currentparams}`);
   };

   return (
      <div>
         <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={4}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
         />
      </div>
   );
}

export default Pagination;
