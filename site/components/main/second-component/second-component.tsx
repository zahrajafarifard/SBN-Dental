import React from "react";
import Image from "next/image";
import Link from "next/link";

import styles from "./style.module.css";

import Card from "@/components/shared/card";

const SecondComponent = () => {
  return (
    <div
      className={` ${styles.backGround} flex flex-row justify-between w-full mx-auto screen600:flex-col`}
    >
      <Image
        src="/images/Intersect-1.png"
        alt="عکس"
        width={550}
        height={400}
        className="-ml-10  overflow-hidden screen600:hidden"
      />
      <Image
        src="/images/Intersect-1-small.png"
        alt="عکس درباره sbn"
        width={600}
        height={300}
        className=" overflow-hidden screen600:flex hidden"
      />

      <div
        className="w-2/3 text-right mt-16 mb-20 px-60 screen1700:px-36  screen1400:px-16 screen1230:pr-10 screen1230:pl-4 screen1230:mt-10 screen1230:mb-12 
        screen:mt-5
        screen900:mb-5
        screen900:pr-6
        screen600:w-full
        screen600:px-5
        screen600:mt-10
        screen600:mb-10
        "
      >
        <h3
          style={{ direction: "rtl" }}
          className="text-[#162933] text-[20px] font-bold mb-8 screen900:text-base screen600:text-lg
          screen900:mb-4   "
        >
          درباره SBN Dental
        </h3>
        <div
          style={{ direction: "rtl" }}
          className="text-[#4B5C66] text-lg screen900:text-sm screen600:text-base   screen900:leading-[1.6]
          screen900:tracking-tighter
          screen600:leading-normal
          screen600:tracking-normal
          "
        >
          بخشی از شرکت استیلا تجارت پیشگام است که با هدف ارائه محصولات تخصصی
          بهداشت دهان و دندان تأسیس شده است. با تمرکز بر استفاده از مواد طبیعی و
          ترکیبات مؤثر، محصولات ما ضمن محافظت از مینای دندان و جلوگیری از
          پوسیدگی، لبخندی درخشان و حس طراوتی تازه را به شما هدیه می‌دهند. تیم ما
          همواره در تلاش است تا با نوآوری و کیفیت، محصولاتی را عرضه کند که مطابق
          با نیازهای روزمره شما باشد. ما برای خلق بهترین تجربه بهداشت دهان و
          دندان همراه شما هستیم.
        </div>
        <Link href="/#contactUs">
          <div className="flex justify-end mt-10 screen1230:mt-5">
            <Card text="بیشتر بدانید" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SecondComponent;
