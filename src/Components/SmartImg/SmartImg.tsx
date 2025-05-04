"use client";
import { TInStoreAllProduct, TSmartImgProps, TUserOrds } from "@/types";
import React, { useState } from "react";
import QtyManager from "../QtyManager/QtyManager";

function SmartImg(props: TSmartImgProps) {
    console.log(props);
    const colorList = props?.colorList;
    const id = props.id
    const price = Number(props.price)

    console.log(colorList);
    const [colorImg, setColorImg] = useState<string>(colorList[0].colorImg);
    const [colorQtys, setColorQtys] = useState<string | undefined>(
        colorList[0].qtys
    );
    const [colorCode , setColorCode]=useState<string>(colorList[0].colorCode)

    const changeImgColor = (colorSelectImg: TInStoreAllProduct) => {
        if(colorSelectImg?.colorImg){
            setColorImg(colorSelectImg.colorImg);
        }
        let colorSelect = colorList?.find((item) => {
            return item.colorImg === colorSelectImg?.colorImg;
        });
        setColorQtys(colorSelect?.qtys);
        colorSelectImg?.colorCode &&
        setColorCode(colorSelectImg.colorCode);

    };
    console.log('SmartImg=>' , id);
    
    return (
        <div className="flex flex-col gap-4 justify-center items-center my-8">
            <div>
                <img id="smartImgId" src={colorImg} alt="" />
            </div>

            <div className="flex gap-3">
                {colorList.map((colorItem) => (
                    <button key={colorItem.id}
                        onClick={() => {
                            changeImgColor({...colorItem});
                        }}
                        style={{ backgroundColor: colorItem.colorCode }}
                        className="size-10 rounded-full"
                    >
                        ......
                    </button>
                ))}
            </div>
            <div>{colorQtys}</div>
            <QtyManager id={id} colorCode={colorCode} price={price} />
        </div>
    );
}
export default SmartImg;
