import React from "react";

import style from "./header.module.css";

interface ArticleHeader {
  articleTitle: string;
  shortDescription: string;
  authorName: string;
  mainImage: string | null;
  readingTime: string;
}
interface HeaderProps {
  header: ArticleHeader;
}
const Header: React.FC<HeaderProps> = ({ header }) => {
  return (
    <div
      className="bg-cover bg-center bg-no-repeat py-40  "
      style={{
        backgroundImage: `url(${process.env.NEXT_PUBLIC_API_URL}/uploads/${header?.mainImage})`,
      }}
    >
      <div className="w-fit whitespace-nowrap  mx-auto screen750:px-8 ">
        <div
          className={`${style.title} w-fit mx-auto text-center pt-8 pb-10 px-16 rounded-[32px] screen750:px-6 `}
        >
          <h1 className="text-[64px] text-[#264490] screen1000:text-5xl screen900:text-4xl screen750:whitespace-normal screen750:mb-2">
            {header?.articleTitle}
          </h1>
          <h3 className="text-lg text-[#264490] tracking-wide screen1000:text-[17px] screen900:text-base screen900:whitespace-normal ">
            {header?.shortDescription}
          </h3>
        </div>
        <div
          className={`${style.title} w-full mx-auto text-center flex flex-row-reverse justify-between rounded-2xl  py-4 px-6 mt-2 screen750:text-sm`}
        >
          <h3 style={{ direction: "rtl" }} className="text-[#264490] ">
            <span className="screen450:hidden">نویسنده : </span>
            {header?.authorName}
          </h3>
          <h3 className=" text-[#264490] ">
            مدت زمان مطالعه: {header?.readingTime} دقیقه
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Header;
