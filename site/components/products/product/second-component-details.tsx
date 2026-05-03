import React from "react";
import Image from "next/image";

import Verify from "@/public/images/verify.svg";

interface Ingredient {
  id: number;
  title: string;
  description: string;
}
interface SecondComponentDetailsProps {
  item: Ingredient;
}

const SecondComponentDetails: React.FC<SecondComponentDetailsProps> = ({
  item,
}) => {
  return (
    <div className="text-center">
      <Image
        src={Verify}
        width={30}
        height={30}
        alt="item"
        className="mx-auto pb-2"
      />
      <h4 className="text-[#162933] text-lg font-semibold pb-2 screen750:text-base">
        {item.title}
      </h4>
      <h3 className="text-[#4B5C66]  screen750:text-sm">{item.description}</h3>
    </div>
  );
};

export default SecondComponentDetails;
