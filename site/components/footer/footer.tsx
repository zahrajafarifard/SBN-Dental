"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Insta from "@/public/images/Instagram Outline.svg";
import Whatsapp from "@/public/images/Whatsapp Outline.svg";
import Telegram from "@/public/images/Telegram Outline.svg";
import styles from "./style.module.css";
import { Key } from "react";

import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  const [data, setData] = useState({
    articles: [],
    contactData: {
      phone: "",
      email: "",
      address: "",
      insta: "",
      telegram: "",
      whatsApp: "",
    },
  });

  useEffect(() => {
    async function fetchFooterData() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/sbn/footer`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      setData({
        articles: result.articles || [],
        contactData: {
          phone: result?.data?.phone || "",
          email: result?.data?.email || "",
          address: result?.data?.address || "",
          insta: result?.data?.insta || "",
          telegram: result?.data?.telegram || "",
          whatsApp: result?.data?.whatsApp || "",
        },
      });
    }

    fetchFooterData();
  }, []);

  // console.log("data?.articles", data?.articles);

  return (
    <>
      <div
        className={`w-[80%] mx-auto border-b border-b-[#B7D3E4] screen750:w-[60%] screen600:w-[80%] screen450:w-[90%]`}
      >
        <div
          style={{ direction: "rtl" }}
          className="grid grid-cols-4 mt-20 mb-10 screen950:grid-cols-3 screen750:grid-cols-1"
        >
          <div className="screen750:mx-auto">
            <Image
              src="/images/LOGO.svg"
              alt="لوگو"
              width={175}
              height={80}
              style={{ width: "auto", height: "auto" }}
              className="screen750:mx-auto"
            />
            <div style={{ direction: "rtl" }} className="flex flex-row mt-8">
              <Link
                target="_blank"
                href={`https://www.instagram.com/${data?.contactData?.insta}`}
                className={`${styles.backGround} w-fit h-fit p-2 rounded-full`}
              >
                <Image src={Insta} alt="اینستاگرام" width={36} height={36} />
              </Link>
              <Link
                href={`https://t.me/${data?.contactData?.telegram}`}
                target="_blank"
                className={`${styles.backGround} w-fit h-fit p-2 rounded-full mx-3`}
              >
                <Image src={Telegram} alt="تلگرام" width={36} height={36} />
              </Link>
              <Link
                href={`https://wa.me/${data?.contactData?.whatsApp}`}
                target="_blank"
                className={`${styles.backGround} w-fit h-fit p-2 rounded-full`}
              >
                <Image src={Whatsapp} alt="واتس اپ" width={36} height={36} />
              </Link>
            </div>
          </div>
          <div>
            <h4 className="text-lg text-[#162933] mb-4 font-semibold screen750:text-center screen750:mt-10">
              دسترسی سریع
            </h4>
            <div className="screen750:flex screen750:flex-row screen750:justify-between">
              <Link href="/">
                <div className="text-[#4B5C66] mb-3 screen750:text-sm">
                  خانه
                </div>
              </Link>
              <Link href="/products">
                <div className="text-[#4B5C66] mb-3 screen750:text-sm">
                  محصولات
                </div>
              </Link>
              <Link href="/about-us">
                <div className="text-[#4B5C66] mb-3 screen750:text-sm">
                  درباره ما
                </div>
              </Link>
              <Link href="/privacy">
                <div className="text-[#4B5C66] mb-3 screen750:text-sm">
                  حریم خصوصی
                </div>
              </Link>
            </div>
          </div>
          <div className="screen950:hidden">
            <h4 className="text-lg text-[#162933] mb-4 font-semibold">
              آخرین مقالات
            </h4>
            {data?.articles.length === 0 ? (
              <div className="text-[#4B5C66]">مقاله ای وجود ندارد!</div>
            ) : (
              data?.articles?.map(
                (article: { id: Key; articleTitle: string }) => (
                  <Link
                    href={`/articles/${article.id}`}
                    key={article.id}
                    className="cursor-pointer"
                  >
                    <div className="text-[#4B5C66] mb-3">
                      {article.articleTitle}
                    </div>
                  </Link>
                )
              )
            )}
          </div>
          <div
            className={`${
              pathname?.includes("contact-us") && "screen750:hidden"
            }`}
          >
            <h4 className="text-lg text-[#162933] mb-5 screen750:text-center screen750:mt-6 font-semibold">
              اطلاعات تماس
            </h4>
            <div className="flex flex-row mb-4 screen750:flex-col screen750:items-center">
              <Image
                src="/images/call.svg"
                alt="تلفن"
                width={22}
                height={22}
                className="my-auto ml-3 screen750:ml-0 screen750:mb-2"
              />
              <div className="text-[#4B5C66] my-auto whitespace-nowrap screen750:w-full screen750:text-center">
                {data?.contactData?.phone}
              </div>
            </div>
            <div className="flex flex-row mb-4 screen750:flex-col screen750:items-center">
              <Image
                src="/images/sms.svg"
                alt="ایمیل"
                width={22}
                height={22}
                className="my-auto ml-3 screen750:ml-0 screen750:mb-2"
              />
              <div className="text-[#4B5C66]"> {data?.contactData?.email} </div>
            </div>
            <div className="flex flex-row mb-4 screen750:flex-col screen750:items-center">
              <Image
                src="/images/location.svg"
                alt="ادرس"
                width={22}
                height={22}
                className="my-auto ml-3 screen750:ml-0 screen750:mb-2"
              />
              <div className="text-[#4B5C66] screen750:text-center">
                {data?.contactData?.address}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-[80%] mx-auto my-10 flex flex-row-reverse justify-between text-sm screen750:w-[95%] screen750:flex-col screen750:my-4">
        <div
          style={{ direction: "rtl" }}
          className="text-[#4B5C66] screen750:text-center"
        >
          کلیه حقوق این سایت متعلق به برند SBN است.
        </div>
        <div
          className={`${styles.backGroundText} screen750:text-center screen750:mt-2 screen750:text-xs`}
        >
          طراحی و توسعه توسط شرکت&nbsp;
          <Link
            href="https://telmis.ir"
            target="_blank"
            rel="noopener noreferrer"
          >
            تلمیس
          </Link>
        </div>
      </div>
    </>
  );
};

export default Footer;
