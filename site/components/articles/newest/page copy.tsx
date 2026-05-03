"use client";
import React, { useEffect, useState, useTransition } from "react";
import Image from "next/image";
import moment from "moment-jalaali";
import Link from "next/link";
import dynamic from "next/dynamic";

const Info = dynamic(() => import("@/components/shared/info/page"));

import Article1 from "@/public/images/placeholder.svg";
import Spinner from "@/components/shared/spinner/page";
// import Info from "@/components/shared/info/page";

interface LatestArticles {
  createdAt: string;
  mainImage: string;
  articleTitle: string;
  sectionOneText: string;
  id: number;
}

const Newest = () => {
  const [isPending, startTransition] = useTransition();

  const [latestArticles, setLatestArticles] = useState<LatestArticles[]>([]);

  useEffect(() => {
    const _article = async () => {
      startTransition(async () => {
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
      });
    };
    _article();
  }, []);

  if (isPending) {
    return <Spinner />;
  }
  return (
    <div className="w-[80%] mx-auto mt-32 screen750:w-[95%] screen750:mt-10 ">
      <h3
        className="text-[#264490] text-xl leading-9 font-bold my-auto flex justify-end mb-8
        screen750:text-lg
        "
      >
        جدیدترین مقالات
      </h3>

      {latestArticles?.length === 0 ? (
        <Info text="مقاله ای وجود ندارد!" />
      ) : (
        <div
          className={`flex flex-row-reverse screen1800:flex-col  ${
            latestArticles[0] && latestArticles[1]
              ? "justify-between"
              : "justify-center"
          } `}
        >
          {latestArticles[0] && (
            <Link href={`/articles/${latestArticles[0]?.id}`} prefetch={true}>
              <div
                className="w-[800px] h-[420px] mx-auto relative 
              screen1800:w-full
              screen500:h-[320px]
            "
              >
                <Image
                  src={
                    latestArticles[0]?.mainImage
                      ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/${latestArticles[0]?.mainImage}`
                      : Article1
                  }
                  alt="مقاله 2"
                  fill
                  quality={100}
                  style={{ objectFit: "cover" }}
                  className="rounded-[32px]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#162933] via-transparent to-transparent rounded-b-[32px] ">
                  <h2 className="text-white text-[32px] font-bold absolute bottom-24 right-4 screen750:text-[28px]">
                    {latestArticles[0]?.articleTitle}
                  </h2>
                  <div
                    className="text-white text-sm  absolute bottom-24 left-4 
                screen1050:left-auto
                screen1050:right-4
                screen1050:bottom-36
                
                "
                  >
                    {moment(latestArticles[0]?.createdAt).format("jYYYY/jM/jD")}
                  </div>

                  <div
                    style={{ direction: "rtl" }}
                    className="text-white text-sm  w-full  absolute bottom-8 mx-auto inset-x-0 px-4 leading-[22px] line-clamp-2"
                  >
                    {latestArticles[0]?.sectionOneText}
                  </div>
                </div>
              </div>
            </Link>
          )}
          {latestArticles[0] && latestArticles[1] && (
            <div
              className="w-[40%] mx-auto mr-10 
            screen1800:flex screen1800:flex-row-reverse 
            screen1800:mt-10 
            screen1800:w-full
            screen1800:justify-between

            screen1050:flex-col
                 

            "
            >
              {latestArticles[1] && (
                <Link
                  prefetch={true}
                  href={`/articles/${latestArticles[1]?.id}`}
                >
                  <div
                    className="w-[600px] h-[230px] mx-auto  relative mb-8 
                      screen1800:mb-0
                      screen1800:w-[660px]
                      screen1800:h-[270px]
                      screen1700:w-[610px]
                      screen1550:w-[570px]
                      screen1450:w-[549px]
                      screen1400:w-[510px]
                      screen1300:w-[480px]
                      screen1230:w-[450px]
                      screen1150:w-[410px]
                      screen1050:mb-8
                      screen1050:w-full "
                  >
                    <Image
                      src={
                        latestArticles[1]?.mainImage
                          ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/${latestArticles[1]?.mainImage}`
                          : Article1
                      }
                      fill
                      style={{ objectFit: "cover" }}
                      quality={100}
                      alt="مقاله 3"
                      className="rounded-[32px] screen1700:w-1/2"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#162933] via-transparent to-transparent rounded-b-[32px] ">
                      <h2 className="text-white text-2xl font-bold absolute bottom-20 right-4">
                        {latestArticles[1]?.articleTitle}
                      </h2>
                      <div className="text-white text-sm  absolute bottom-28 right-4">
                        {moment(latestArticles[1]?.createdAt).format(
                          "jYYYY/jM/jD"
                        )}
                      </div>

                      <div
                        style={{ direction: "rtl" }}
                        className="text-white text-sm  w-full  absolute bottom-6 mx-auto inset-x-0 px-4 leading-[22px] line-clamp-2"
                      >
                        {latestArticles[1]?.sectionOneText}
                      </div>
                    </div>
                  </div>
                </Link>
              )}
              {latestArticles[2] && (
                <Link
                  prefetch={true}
                  href={`/articles/${latestArticles[2]?.id}`}
                >
                  <div
                    className="w-[600px] h-[230px] mx-auto  relative
                      screen1800:w-[660px]
                      screen1800:h-[270px]
                      screen1700:w-[610px]
                      screen1550:w-[570px]
                      screen1450:w-[549px]
                      screen1400:w-[510px]
                      screen1300:w-[480px]
                      screen1230:w-[450px]
                      screen1150:w-[410px]
                      screen1050:w-full   "
                  >
                    <Image
                      src={
                        latestArticles[2]?.mainImage
                          ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/${latestArticles[2]?.mainImage}`
                          : Article1
                      }
                      fill
                      style={{ objectFit: "cover" }}
                      quality={100}
                      alt="مقاله 1"
                      className="rounded-[32px] "
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#162933] via-transparent to-transparent rounded-b-[32px] ">
                      <h2 className="text-white text-2xl font-bold absolute bottom-20 right-4">
                        {latestArticles[2]?.articleTitle}
                      </h2>
                      <div className="text-white text-sm  absolute bottom-28 right-4">
                        {moment(latestArticles[2]?.createdAt).format(
                          "jYYYY/jM/jD"
                        )}
                      </div>

                      <div
                        style={{ direction: "rtl" }}
                        className="text-white text-sm  w-full  absolute bottom-6 mx-auto inset-x-0 px-4 leading-[22px] line-clamp-2"
                      >
                        {latestArticles[2]?.sectionOneText}
                      </div>
                    </div>
                  </div>
                </Link>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Newest;
