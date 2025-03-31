import { ShappingCartContextProvider } from "@/context/ShappongCartContext";
import Navbar from "../Navbar/Navbar";

export default function Layout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <div>
         <ShappingCartContextProvider>
            <Navbar />
            {children}
         </ShappingCartContextProvider>
      </div>
   );
}
