"use client";
import React, { useState } from "react";

import SecondComponentDetails from "./second-component-details";
import ProductDetails from "./product-details";
import UsageDetails from "./usage-details";
import styles from "./second-component.module.css";

interface Composition {
  id: number;
  title: string;
  description: string;
}

interface Detail {
  id: number;
  title: string;
  description: string;
}

interface Usage {
  id: number;
  title: string;
  description: string;
}

interface SecondComponentProps {
  compositions?: Composition[];
  details?: Detail[];
  usages?: Usage[];
}

const SecondComponent: React.FC<SecondComponentProps> = ({
  compositions,
  details,
  usages,
}) => {
  const [selectedItem, setSelectedItem] = useState("1");

  return (
    <div
      className={`w-[100%] mx-auto  ${
        compositions?.length !== 0 &&
        details?.length !== 0 &&
        usages?.length !== 0 &&
        styles.backGround
      } ${
        compositions?.length !== 0 &&
        details?.length !== 0 &&
        usages?.length !== 0 &&
        "pt-10 pb-52 screen950:pb-20"
      }`}
    >
      {compositions?.length == 0 &&
      details?.length == 0 &&
      usages?.length == 0 ? (
        <></>
      ) : (
        <div className="w-[80%] mx-auto screen750:w-[95%]">
          <div
            className="w-[55%] mx-auto flex flex-row-reverse justify-between text-[#4B5C66] font-bold pb-6
            screen750:w-full
            screen750:text-sm 
            screen1300:w-[70%]
            screen1000:w-[80%]
            screen900:w-[92%] "
          >
            <h4
              className={`px-10 py-6 text-center whitespace-nowrap screen600:whitespace-normal screen600:px-4 screen600:py-4 screen600:text-sm screen400:text-xs ${
                selectedItem === "1"
                  ? "bg-[#DDF3DF] rounded-[20px] screen600:rounded-2xl"
                  : "bg-transparent"
              }`}
              onClick={() => setSelectedItem("1")}
            >
              ترکیبات محصول
            </h4>
            <h4
              className={`px-10 py-6 text-center whitespace-nowrap screen600:whitespace-normal screen600:px-4 screen600:py-4 screen600:text-sm screen400:text-xs ${
                selectedItem === "2"
                  ? "bg-[#DDF3DF] rounded-[20px] screen600:rounded-2xl"
                  : "bg-transparent"
              }`}
              onClick={() => setSelectedItem("2")}
            >
              جزئیات محصول
            </h4>
            <h4
              className={`px-10 py-6 text-center whitespace-nowrap screen600:whitespace-normal screen600:px-4 screen600:py-4 screen600:text-sm screen400:text-xs ${
                selectedItem === "3"
                  ? "bg-[#DDF3DF] rounded-[20px] screen600:rounded-2xl"
                  : "bg-transparent"
              }`}
              onClick={() => setSelectedItem("3")}
            >
              طریقه ی مصرف
            </h4>
          </div>

          <div className="pt-24 border-t-2 border-t-[#DDF3DF] screen750:pt-8">
            {selectedItem === "1" && (
              <div
                style={{ direction: "rtl" }}
                className="grid grid-cols-3 justify-items-center gap-y-16
                screen950:grid-cols-2
                screen750:grid-cols-1
                screen750:gap-y-5 "
              >
                {compositions?.map((item) => (
                  <SecondComponentDetails key={item?.id} item={item} />
                ))}
              </div>
            )}
            {selectedItem === "2" && (
              <div
                style={{ direction: "rtl" }}
                className="grid grid-cols-1 justify-items-center "
              >
                {details?.map((item) => (
                  <ProductDetails key={item?.id} item={item} />
                ))}
              </div>
            )}
            {selectedItem === "3" && (
              <div
                style={{ direction: "rtl" }}
                className="flex flex-col justify-items-start "
              >
                {usages?.map((item) => (
                  <UsageDetails key={item?.id} item={item} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SecondComponent;
