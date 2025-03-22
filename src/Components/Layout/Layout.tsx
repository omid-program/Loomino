import Navbar from "../Navbar/Navbar";

export default function Layout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <div>
         <Navbar />
         {children}
      </div>
   );
}
