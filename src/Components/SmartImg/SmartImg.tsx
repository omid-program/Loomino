"use client";
import { useShappingCartContext } from "@/context/ShappongCartContext";
import { TInStoreAllProduct, TSmartImgProps, TUserOrds } from "@/types";
import React, { useState } from "react";
import QtyManager from "../QtyManager/QtyManager";

function SmartImg(props: TSmartImgProps) {
    console.log(props);
    const colorList = props.colorList;
    const id = props.id
    console.log(colorList);
    const [colorImg, setColorImg] = useState<string>(colorList[0].colorImg);
    const [colorQtys, setColorQtys] = useState<number | undefined>(
        colorList[0].qtys
    );
    const [meterVal, setMeterVal] = useState<number>(0);
    const [centiMeterVal, setCentiMeterVal] = useState<number>(0);
    const [colorCode , setColorCode]=useState<string>(colorList[0].colorCode)
    const { userOrd , addOrdToCart } = useShappingCartContext();

    const changeImgColor = (colorSelectImg: TInStoreAllProduct) => {
        setColorImg(colorSelectImg.colorImg);
        let colorSelect = colorList.find((item) => {
            return item.colorImg === colorSelectImg.colorImg;
        });
        setColorQtys(colorSelect?.qtys);
        setColorCode(colorSelectImg.colorCode)

    };
    return (
        <div className="flex flex-col gap-4 justify-center items-center my-8">
            <div>
                <img id="smartImgId" src={colorImg} alt="" />
            </div>

            <div className="flex gap-3">
                {colorList.map((colorItem) => (
                    <button
                        onClick={() => {
                            // changeImgColor(colorItem.colorImg);
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
            {/* manage QTY */}
            <QtyManager id={id} colorCode={colorCode}/>
            {/* <div className="grid grid-cols-2">
                <div className="grid col-span-1">
                    <label htmlFor="meterInputId">متر:</label>
                    <input
                        className="w-2/5"
                        id="meterInputId"
                        type="number"
                        placeholder="متر"
                        value={meterVal}
                        onChange={(e) => setMeterVal(Number(e.target.value))}
                    />
                </div>
                <div className="grid col-span-1">
                    <label htmlFor="centiMeterInputId">سانتی متر</label>
                    <input
                        id="centiMeterInputId"
                        className="w-2/5"
                        type="number"
                        placeholder="سانتی متر"
                        value={centiMeterVal}
                        onChange={(e) =>
                            setCentiMeterVal(Number(e.target.value))
                        }
                    />
                </div>
                <div>
                    <button className=" grid col-span-2 p-1 rounded-md bg-sky-400"
                    onClick={()=>{addOrdToCart(id , meterVal , centiMeterVal ,colorCode )}}
                    >
                        افزودن به سبد خرید
                    </button>
                </div>
            </div> */}
            {/* end QTY manager */}
        </div>
    );
}
// typeScript problem
export default SmartImg;
