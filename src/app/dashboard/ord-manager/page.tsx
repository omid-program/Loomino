import OrdManagerTable from "@/Components/DashboardTools/OrdManagerTable/OrdManagerTable";
import OrdManagerTable2 from "@/Components/DashboardTools/OrdManagerTable/OrdManagerTable2";
import PagesTitle from "@/Components/PageTitle/PagesTitle";
import React from "react";

function OrdManager() {
   return (
      <div className="w-full flex flex-col items-center my-12 ">
         <div className="w-full">
            {/* <OrdManagerTable /> */}
            <PagesTitle title="مدیریت سفارشات"/>
            <OrdManagerTable2/>
         </div>
      </div>
   );
}

export default OrdManager;
