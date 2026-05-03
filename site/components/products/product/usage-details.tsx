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

const UsageDetails: React.FC<SecondComponentDetailsProps> = ({ item }) => {
  return (
    <div className="flex flex-row  border-b border-b-[#DDF3DF] w-full py-6 gap-x-4 my-auto last:border-b-0  screen750:gap-x-2">
      <Image
        src={Verify}
        width={30}
        height={30}
        alt="item"
        className=" my-auto"
      />
      <h4 className="text-[#4B5C66] my-auto  screen750:text-sm">
        {item.description}
      </h4>
    </div>
  );
};

export default UsageDetails;
