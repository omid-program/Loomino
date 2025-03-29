'use client'
import { TSmartImgProps } from "@/types";
import React, { useState } from "react";

function SmartImg(props:TSmartImgProps

) {
    console.log(props);
    const colorList = props.colorList;
    console.log(colorList);
    const [colorImg ,setColorImg ] = useState<string >(colorList[0].colorImg)
    const [colorQtys , setColorQtys] = useState<number |undefined >(colorList[0].qtys)
    // const []


    const changeImgColor = (colorSelectImg : string)=>{
        setColorImg(colorSelectImg)
        let colorSelect = colorList.find((item)=>{
            return item.colorImg === colorSelectImg
        })
        setColorQtys(colorSelect?.qtys)
    }
    return (
        <div className="flex flex-col gap-4 justify-center items-center my-8">
            <div>
                <img id="smartImgId" src={colorImg} alt="" />
            </div>
            
            <div className="flex gap-3">
            {
                colorList.map((colorItem)=>(
                    <button 
                    onClick={()=>{changeImgColor(colorItem.colorImg)}}
                    style={{backgroundColor:colorItem.colorCode}}
                    className="size-10 rounded-full">......</button>
                ))
            }
            </div>
            <div>
                {colorQtys}
            </div>
            <div>
                <input type="range" min={20} max={(colorQtys)? colorQtys * 100 : "درحال پردازیش" } value={}/>
            </div>
        </div>
    );
}
// typeScript problem
export default SmartImg;
