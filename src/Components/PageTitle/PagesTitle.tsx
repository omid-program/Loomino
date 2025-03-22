import React from "react";

function PagesTitle({title}: {title:string}) {
   return (
      <div className="w-2/3 border-b-4 border-rose-700 mx-auto text-center my-5 px-1 rounded-4xl" >
         <h1 className="text-4xl">{title}</h1>
      </div>
   );
}

export default PagesTitle;
