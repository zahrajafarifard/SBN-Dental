import React from "react";
import Image from "next/image";

interface infoPropsDetails {
  text: string;
}
const Info: React.FC<infoPropsDetails> = ({ text }) => {
  return (
    <div
      className="border border-[#EE5248] rounded-[32px] w-1/2 mx-auto py-10 px-20 
      screen950:px-16
      screen950:py-8
      screen750:w-2/3
      screen500:w-[95%]
      "
    >
      <Image
        src={"/images/info-circle.svg"}
        alt="info"
        width={40}
        height={40}
        className="mx-auto mb-8 screen950:w-8"
      />
      <div
        style={{ direction: "rtl" }}
        className="text-[#4B5C66] text-lg mx-auto w-full text-center screen950:text-base"
      >
        {text}
      </div>
    </div>
  );
};

export default Info;
