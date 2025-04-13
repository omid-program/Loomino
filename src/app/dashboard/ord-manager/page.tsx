import OrdManagerTable from "@/Components/OrdManagerTable/OrdManagerTable";
import OrdManagerTable2 from "@/Components/OrdManagerTable/OrdManagerTable2";
import React from "react";

function OrdManager() {
   return (
      <div className="w-full flex flex-col items-center my-12 ">
         <div>
            {/* <OrdManagerTable /> */}
            <OrdManagerTable2/>
         </div>
      </div>
   );
}

export default OrdManager;
