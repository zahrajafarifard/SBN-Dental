import React, { useState } from "react";

const Details = ({ item, index }) => {
  const [showText, setShowText] = useState(false);

  return (
    <div>
      <div className="grid grid-cols-5 border border-[#B7D3E4] rounded-[20px] text-[#4B5C66] px-8 py-4 mb-4">
        <div className="bg-[#264490] rounded-full p-2 w-7 h-7 text-white flex justify-center items-center my-auto">
          {index + 1}
        </div>
        <div className="my-auto"> {item?.name} </div>
        <div className="my-auto"> {item?.mobile}</div>
        <div
          onClick={() => {
            setShowText((prev) => !prev);
          }}
          className={`col-span-2 my-auto line-clamp-2 hover:line-clamp-none cursor-pointer
            ${showText ? "line-clamp-none" : "line-clamp-2"}
            `}
        >
          {item?.message}
        </div>
      </div>
    </div>
  );
};

export default Details;
