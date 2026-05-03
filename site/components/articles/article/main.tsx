// "use client";
import React from "react";
import Image from "next/image";

import moment from "moment-jalaali";
import Article1 from "@/public/images/placeholder.svg";

interface ArticleBody {
  sectionOneTitle: string;
  sectionOneText: string;
  sectionTwoTitle: string;
  sectionTwoText: string;
  sectionThreeTitle: string;
  sectionThreeText: string;
  sectionFourTitle: string;
  sectionFourText: string;
  sectionFiveTitle: string;
  sectionFiveText: string;
  sectionSixTitle: string;
  sectionSixText: string;
  // mainImage: string | null;
  sectionTwoImage: string | null;
  sectionFourImage: string | null;
  sectionFiveImage: string | null;
  date: string;
  authorName: string; // Added here to match the fetched data
}

interface ArticleProps {
  body?: ArticleBody; // Made optional to handle loading state
  articleId: number;
}

const Main: React.FC<ArticleProps> = ({ body }) => {
  return (
    <div
      style={{ direction: "rtl" }}
      className="w-[75%] mx-auto mt-20 screen1150:w-[90%] "
    >
      <h2 className="text-[#4B5C66] text-2xl font-bold leading-8 mb-5 screen750:text-lg">
        {body?.sectionOneTitle}
      </h2>
      <div className="text-lg text-[#929BA0] mb-6 screen750:text-base">
        {body?.sectionOneText}
      </div>

      {body?.sectionTwoImage &&
        body?.sectionTwoTitle &&
        body?.sectionTwoText && (
          <div className="flex flex-row justify-between my-8 gap-6 screen750:flex-col">
            <Image
              src={
                body?.sectionTwoImage
                  ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/${body?.sectionTwoImage}`
                  : Article1
              }
              width={500}
              height={400}
              style={{ objectFit: "cover" }}
              alt="عکس مقاله"
              className="rounded-[32px] screen1700:w-[40%] screen900:w-1/3  screen750:w-full"
            />
            <div className="my-auto">
              <h2 className="text-[#4B5C66] font-bold text-2xl pb-5 screen750:text-lg">
                {body?.sectionTwoTitle}
              </h2>
              <div className="text-[#929BA0] text-lg screen750:text-base">
                {body?.sectionTwoText}
              </div>
            </div>
          </div>
        )}

      {body?.sectionThreeTitle && (
        <h2 className="text-[#4B5C66] font-bold text-2xl pb-5 screen750:text-lg">
          {body?.sectionThreeTitle}
        </h2>
      )}
      {body?.sectionThreeText && (
        <div className="text-[#929BA0] text-lg mb-6 screen750:text-base">
          {body?.sectionThreeText}
        </div>
      )}
      {/* <div className="text-[#4B5C66] font-bold text-2xl pb-5">
        {body?.sectionThreeTitle}
      </div>
      <div className="text-[#929BA0] text-lg mb-6">
        {body?.sectionThreeText}
      </div>
      <div className="text-[#4B5C66] font-bold text-2xl pb-5">
        {body?.sectionThreeTitle}
      </div>
      <div className="text-[#929BA0] text-lg mb-6">
        {body?.sectionThreeText}
      </div> */}

      {body?.sectionFourImage &&
        body?.sectionFourTitle &&
        body?.sectionFourText && (
          <div className="flex flex-row-reverse justify-between my-8 gap-6 screen750:flex-col">
            <Image
              src={
                body?.sectionFourImage
                  ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/${body?.sectionFourImage}`
                  : Article1
              }
              width={500}
              height={300}
              style={{ objectFit: "cover" }}
              alt="عکس مقاله"
              className="rounded-[32px] screen1700:w-[40%] screen900:w-1/3 screen750:w-full"
              quality={100}

              // fill={!isSmallScreen}
            />
            <div className="my-auto">
              <h2 className="text-[#4B5C66] font-bold text-2xl pb-5 my-auto screen750:text-lg">
                {body?.sectionFourTitle}
              </h2>
              <div className="text-[#929BA0] text-lg my-auto screen750:text-base">
                {body?.sectionFourText}
              </div>
            </div>
          </div>
        )}

      {body?.sectionFiveTitle && (
        <h2 className="text-[#4B5C66] font-bold text-2xl pb-5 screen750:text-lg">
          {body?.sectionFiveTitle}
        </h2>
      )}
      {body?.sectionFiveText && (
        <div className="text-[#929BA0] text-lg mb-6 screen750:text-base">
          {body?.sectionFiveText}
        </div>
      )}

      {body?.sectionFiveImage && (
        <div className="relative h-80 rounded-[32px]">
          <Image
            src={
              body?.sectionFiveImage
                ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/${body?.sectionFiveImage}`
                : Article1
            }
            fill
            quality={100}
            alt="عکس مقاله"
            className="rounded-[32px] w-full mb-6 object-cover"
          />
        </div>
      )}

      {body?.sectionSixTitle && (
        <h2 className="text-[#4B5C66] font-bold text-2xl pb-5 mt-8 screen750:text-lg">
          {body?.sectionSixTitle}
        </h2>
      )}
      {body?.sectionSixText && (
        <div className="text-[#929BA0] text-lg mb-8 screen750:text-base">
          {body?.sectionSixText}
        </div>
      )}

      <div className="flex flex-row justify-between text-[#929BA0] mt-6 mb-20">
        <div>{body?.authorName}</div>
        <div>{moment(body?.date).format("jYYYY/jM/jD")}</div>
      </div>
    </div>
  );
};

export default Main;
