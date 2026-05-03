import React from "react";
import { StaticImageData } from "next/image";
import Image from "next/image";

interface DetailsProps {
  image: StaticImageData;
  title: string;
  text: string;
}
const Details: React.FC<DetailsProps> = ({ image, title, text }) => {
  return (
    <div className="bg-[#F7FAFD] rounded-[32px] overflow-hidden  shadow-[-1px_1px_6px_0_rgba(0,0,0,0.15)]">
      <div className="flex  justify-self-end justify-end ">
        <Image
          src={image}
          width={320}
          height={320}
          alt={`عکس ${title}`}
          className="screen800:w-[80%]"
        />
      </div>
      <div
        className="  px-8 text-[#4B5C66] font-bold text-2xl text-right -mt-10 mb-10
        screen1550:-mt-6
        screen1450:-mt-0
        screen1400:px-6
        screen1230:mb-6
        screen1050:text-lg 
        screen1050:mb-3
        screen1050:px-5
        screen950:px-4
        screen600:-mt-6
        screen600:px-6
      "
      >
        {title}
      </div>
      <div
        style={{ direction: "rtl" }}
        className="text-[#4B5C66] text-lg px-8 pb-10 
        screen1400:px-6
        screen1230:pb-6
        screen1230:leading-6
        screen1050:px-5
        screen1050:text-base 
        screen950:px-4
        screen950:text-[15px]
        screen600:text-base
        screen600:leading-normal
        screen600:px-6
        screen600:pb-10
        screen750:px-4 screen750:pt-4 screen750:pb-6 "
      >
        {text}
      </div>
    </div>
  );
};

export default Details;
