import React from "react";
import Image from "next/image";

interface CardProps {
  text: string;
}

const Card: React.FC<CardProps> = ({ text }) => {
  return (
  
    <div className="w-fit bg-[#264490] rounded-[20px] flex flex-row-reverse py-3 pr-6 pl-4  ">
      <div className="text-white my-auto screen600:text-sm">{text}</div>

      <Image
        src="/images/arrow-left2.svg"
        className="mr-2 screen600:w-5 screen600:h-5"
        alt="learn more"
        width={22}
        height={22}
        
      />
    </div>
  );
};

export default Card;
