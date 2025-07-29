import { TOrderShappingInfoInputProps } from "@/types";
import React from "react";

function OrderShappingInfoInput(props: TOrderShappingInfoInputProps) {
   const { name, label, sendNewOrdInfo, typeInput , isLong } = props;

   const sendNewOrdInfoHan = (
      e:
         | React.ChangeEvent<HTMLInputElement>
         | React.ChangeEvent<HTMLTextAreaElement>
   ) => {
      const { name, value } = e.target;
      sendNewOrdInfo(name, value);
   };
   return (
      <div className="w-full flex gap-1 items-center col-span-2 md:col-span-1">
         <label>{label}:</label>
         {!isLong ? (
            <input
               placeholder={label}
               type="text"
               name={name}
               // value={state}
               className="mx-1 px-1 py-2 shadow-md shadow-accent bg-bg  rounded-md w-8/12"
               onChange={(e) => {
                  sendNewOrdInfoHan(e);
               }}
            />
         ) : (
            <textarea
               name={name}
               placeholder={label}
               onChange={(e) => {
                  sendNewOrdInfoHan(e);
               }}
               className="w-full shadow-md shadow-accent bg-bg px-1 py-2 rounded-md"
            ></textarea>
         )}
      </div>
   );
}

export default OrderShappingInfoInput;
