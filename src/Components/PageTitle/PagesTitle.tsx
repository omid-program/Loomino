import React from "react";

function PagesTitle({title}: {title:string}) {
   return (
      <div 
      style={{boxShadow:' -1px 10px 12px -4px rgb(255, 254, 232)'}}
      className="w-auto py-2 border-b-4 border-primary mx-auto text-center mt-5 mb-16  rounded-4xl md:w-1/2" >
         <h1 className="text-4xl">{title}</h1>
      </div>
   );
}

export default PagesTitle;
