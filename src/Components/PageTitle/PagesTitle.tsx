import React from "react";

function PagesTitle({title}: {title:string}) {
   return (
      <div 
      style={{boxShadow:' -1px 10px 12px -4px rgb(221 214 254)'}}
      className="w-1/2 py-2 border-b-4 border-violet-200 mx-auto text-center mt-5 mb-10 px-1 rounded-4xl" >
         <h1 className="text-4xl">{title}</h1>
      </div>
   );
}

export default PagesTitle;
