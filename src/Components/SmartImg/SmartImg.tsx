"use client";
import { useShappingCartContext } from "@/context/ShappongCartContext";
import { TSmartImgProps, TUserOrds } from "@/types";
import React, { useState } from "react";

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
    const { userOrd , addOrdToCart } = useShappingCartContext();

    const changeImgColor = (colorSelectImg: string) => {
        setColorImg(colorSelectImg);
        let colorSelect = colorList.find((item) => {
            return item.colorImg === colorSelectImg;
        });
        setColorQtys(colorSelect?.qtys);
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
                            changeImgColor(colorItem.colorImg);
                        }}
                        style={{ backgroundColor: colorItem.colorCode }}
                        className="size-10 rounded-full"
                    >
                        ......
                    </button>
                ))}
            </div>
            <div>{colorQtys}</div>
            <div className="grid grid-cols-2">
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
                    onClick={()=>{addOrdToCart(id , meterVal , centiMeterVal)}}
                    >
                        افزودن به سبد خرید
                    </button>
                </div>
            </div>
        </div>
    );
}
// typeScript problem
export default SmartImg;
