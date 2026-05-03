import React from "react";

interface Ingredient {
  id: number;
  title: string;
  description: string;
}
interface SecondComponentDetailsProps {
  item: Ingredient;
}

const ProductDetails: React.FC<SecondComponentDetailsProps> = ({ item }) => {
  return (
    <div className="flex flex-row border-b border-b-[#DDF3DF] w-full py-6 gap-x-16 my-auto last:border-b-0">
      <h3 className="text-[#162933] text-lg font-semibold pb-2  screen750:text-base">
        {item.title}
      </h3>
      <h4 className="text-[#4B5C66]  screen750:text-sm">
        {item.description}
      </h4>
    </div>
  );
};

export default ProductDetails;
