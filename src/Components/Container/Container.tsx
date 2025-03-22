import React from "react";

function Container({ children }: { children: React.ReactNode }) {
   return <div className="w-9/12 container mx-auto">{children}</div>;
}

export default Container;
