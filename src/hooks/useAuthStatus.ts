import { useEffect, useState } from "react";

export function useAuthStatus (){
   const [isLoggedIn ,setIsLoggedIn ]=useState<boolean>(false)

   useEffect(()=>{
      const cookies = document.cookie
      const hasToken = cookies.includes("token=")
      setIsLoggedIn(hasToken)
   },[])
   return isLoggedIn
}