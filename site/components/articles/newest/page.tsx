"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import moment from "moment-jalaali";

import Article1 from "@/public/images/placeholder.svg";

import Link from "next/link";
import Info from "@/components/shared/info/page";

interface LatestArticles {
  createdAt: string;
  mainImage: string;
  articleTitle: string;
  sectionOneText: string;
  id: number;
}

const Newest = () => {
  const [latestArticles, setLatestArticles] = useState<LatestArticles[]>([]);

  useEffect(() => {
    const _article = async () => {
      const _response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/sbn/getLatestArticles`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const _data = await _response.json();

      setLatestArticles(_data);
    };
    _article();
  }, []);

  return (
    <div className="w-[80%] mx-auto mt-32 screen750:w-[95%] screen750:mt-10 ">
      <div
        className="text-[#264490] text-xl leading-9 font-bold my-auto flex justify-end mb-8
      screen750:text-lg
      "
      >
        جدیدترین مقالات
      </div>

      {latestArticles?.length === 0 ? (
        <div className="mx-auto my-20">
          <Info text="مقاله ای وجود ندارد!" />
        </div>
      ) : (
        <div
          style={{ direction: "rtl" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full screen1050:grid-cols-1 "
        >
          {/* Right Column - Single image */}
          <Link href={`/articles/${latestArticles[0]?.id}`}>
            <div className="relative w-full h-96 md:h-full lg:h-full screen1050:h-96">
              <div className="absolute inset-0 bg-gradient-to-t from-[#162933] via-transparent to-transparent rounded-[32px] z-10"></div>
              <Image
                src={
                  latestArticles[0]?.mainImage
                    ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/${latestArticles[0]?.mainImage}`
                    : Article1
                }
                alt="Right Image"
                layout="fill"
                objectFit="cover"
                className="rounded-[32px]"
              />
              <div className="text-white text-[32px] font-bold absolute bottom-24 right-6   z-20 screen750:text-[28px]">
                {latestArticles[0]?.articleTitle}
              </div>
              <div
                className="text-white text-sm  absolute bottom-24 mb-3 z-20 left-4 
                  screen1050:left-auto
                  screen1050:right-6 
                  screen1050:bottom-36
                  screen1050:mb-0
                
                "
              >
                {moment(latestArticles[0]?.createdAt).format("jYYYY/jM/jD")}
              </div>
              <div
                style={{ direction: "rtl" }}
                className="text-white text-sm  w-full z-20 absolute bottom-8 mx-auto inset-x-0 px-6 leading-[22px] line-clamp-2"
              >
                {latestArticles[0]?.sectionOneText}
              </div>
            </div>
          </Link>
          {/* Left Column - Two stacked images */}
          <div className="flex flex-col gap-4 w-full screen1050:flex-row screen700:flex-col">
            {/* First Image */}
            <Link
              href={`/articles/${latestArticles[1]?.id}`}
              className="relative w-full h-48 md:h-56 lg:h-56"
            >
              <div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#162933] via-transparent to-transparent rounded-[32px] z-10"></div>
                <Image
                  src={
                    latestArticles[1]?.mainImage
                      ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/${latestArticles[1]?.mainImage}`
                      : Article1
                  }
                  alt="Left Image 1"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-[32px]"
                />
                <div className="text-white text-2xl font-bold absolute bottom-20 right-6  z-20">
                  {latestArticles[1]?.articleTitle}
                </div>
                <div
                  className="text-white text-sm  absolute bottom-28 right-6  z-20
                
                "
                >
                  {moment(latestArticles[1]?.createdAt).format("jYYYY/jM/jD")}
                </div>
                <div
                  style={{ direction: "rtl" }}
                  className="text-white text-sm  w-full  absolute bottom-6 mx-auto inset-x-0 px-6 leading-[22px] line-clamp-2 z-20"
                >
                  {latestArticles[1]?.sectionOneText}
                </div>
              </div>
            </Link>

            {/* Second Image */}
            <Link
              href={`/articles/${latestArticles[2]?.id}`}
              className="relative w-full h-48 md:h-56 lg:h-56"
            >
              <div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#162933] via-transparent to-transparent rounded-[32px] z-10"></div>
                <Image
                  src={
                    latestArticles[2]?.mainImage
                      ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/${latestArticles[2]?.mainImage}`
                      : Article1
                  }
                  alt="Left Image 2"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-[32px]"
                />
                <div className="text-white text-2xl font-bold absolute bottom-20 right-6  z-20">
                  {latestArticles[2]?.articleTitle}
                </div>
                <div className="text-white z-20 text-sm  absolute bottom-28 right-6 ">
                  {moment(latestArticles[2]?.createdAt).format("jYYYY/jM/jD")}
                </div>
                <div
                  style={{ direction: "rtl" }}
                  className="text-white text-sm z-20 w-full  absolute bottom-6 mx-auto inset-x-0 px-6 leading-[22px] line-clamp-2"
                >
                  {latestArticles[2]?.sectionOneText}
                </div>
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Newest;
