"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

import Details from "./details";
import AboutUs from "@/public/images/about-us.svg";
import Prod from "@/public/images/prod-abotus.svg";
import styles from "./style.module.css";

import Img1 from "@/public/images/img.svg";
import Img2 from "@/public/images/img (1).svg";
import Img3 from "@/public/images/img (2).svg";

const Main = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 750);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-[80%] mx-auto screen900:w-[90%] screen750:w-[95%]">
      <div className="flex flex-row-reverse my-20 screen750:flex-col-reverse ">
        <div className="w-[90%] my-auto screen750:w-full">
          <div style={{ direction: "rtl" }} className="pb-8">
            <span className={styles.backGroundText}>SBN Dental ،</span>
            <span className="text-[32px] text-[#4B5C66] screen750:text-[28px] ">
              مراقبت جامع از بهداشت دهان و دندان شما
            </span>
          </div>
          <div
            style={{ direction: "rtl" }}
            className="text-lg screen750:text-base"
          >
            یکی از برندهای پیشرو در زمینه تولید محصولات بهداشت دهان و دندان است.
            ما با بهره‌گیری از ترکیبات طبیعی و پیشرفته، به سلامت و مراقبت از
            دندان‌های شما اهمیت می‌دهیم. محصولات ما با فرمولاسیون‌های خاص خود،
            محافظت طولانی‌مدت از دندان‌ها و بهبود بهداشت دهانی شما را تضمین
            می‌کنند.
          </div>
        </div>
        <Image
          src={AboutUs}
          width={300}
          height={370}
          alt="عکس در باره ما"
          className="my-auto screen750:mx-auto screen900:w-60 "
        />
      </div>

      <div className="w-full mx-auto flex flex-row screen750:flex-col-reverse">
        <div
          style={{ direction: "rtl" }}
          className="w-[68%] mx-auto 
          screen750:w-full
          screen1550:w-[100%]  "
        >
          <div className="screen1550:flex screen1550:flex-row-reverse my-auto  screen1550:pb-16">
            <div className="screen1550:w-[68%] screen1230:w-full">
              <div className="screen1230:flex screen1230:flex-row-reverse my-auto screen1230:pb-16 screen600:flex-col-reverse">
                <div className="screen1230:w-[80%] screen600:w-full ">
                  <h3 className="text-[#4B5C66] text-2xl leading-[34px] pb-6 font-bold screen750:text-lg">
                    درباره شرکت استیلا
                  </h3>
                  <div className="text-[#4B5C66] text-lg pb-16 screen1230:pb-0 screen750:text-base">
                    SBN Dental به عنوان یکی از برندهای موفق زیرمجموعه شرکت
                    استیلا تجارت پیشگام فعالیت می‌کند. شرکت استیلا از سال ۱۳۹۴
                    با تمرکز بر تولید و توزیع محصولات بهداشتی، در راستای ارتقای
                    سطح سلامت جامعه قدم برداشته است. فعالیت اصلی شرکت استیلا از
                    سال ۱۴۰۱ به تولید محصولات داخلی در حوزه بهداشت و سلامت با
                    بالاترین استانداردها اختصاص یافته است.
                  </div>
                </div>
                <div
                  className="w-[28%] mx-auto  items-stretch justify-start
                  screen1230:flex hidden  screen700:my-auto 
                  screen600:w-2/3 
                  screen600:justify-center
                  screen600:mb-8
                  screen400:w-[90%] "
                >
                  <div className="relative w-[80%] h-full  screen700:w-[90%]  ">
                    <Image
                      src={Prod}
                      alt="عکس در باره ما"
                      quality={100}
                      style={{ objectFit: "cover" }}
                      className="rounded-lg"
                      fill={!isSmallScreen}
                    />
                  </div>
                </div>
              </div>

              <h3 className="text-[#4B5C66] text-2xl leading-[34px] pb-6 font-bold screen750:text-lg">
                تاریخچه شرکت
              </h3>
              <div className="text-[#4B5C66] text-lg pb-16 screen1550:pb-0 screen750:text-base">
                شرکت SBN Dental در سال ۱۳۹۳ تأسیس شد و فعالیت خود را از سال ۱۳۹۴
                در زمینه واردات محصولات بهداشتی دهان، دندان و مراقبت پوست و مو
                آغاز کرد. در طول این سال‌ها، تمرکز ما ابتدا بر واردات محصولات
                تخصصی بود، اما با تغییر استراتژی در سال ۱۴۰۱، به تولید محصولات
                داخلی در زمینه بهداشت دهان و دندان پرداختیم. با تلاش در زمینه
                تحقیق و توسعه، توانسته‌ایم سبد محصولات خود را به بیش از ۲۰۰
                محصول متنوع گسترش دهیم. هدف ما ارائه بهترین محصولات بهداشتی برای
                ارتقای سلامت و زیبایی مشتریان است.
              </div>
            </div>
            <div
              className="w-[31%] mx-auto  items-stretch justify-end
              screen1550:flex hidden screen1230:hidden  "
            >
              <div className="relative w-full h-full  ml-10 screen1350:ml-4">
                <Image
                  src={Prod}
                  alt="عکس در باره ما"
                  quality={300}
                  style={{ objectFit: "cover" }}
                  className="rounded-lg "
                  fill={!isSmallScreen}
                />
              </div>
            </div>
          </div>
          <h3 className="text-[#4B5C66] text-2xl leading-[34px] pb-6 font-bold screen750:text-lg">
            چشم‌انداز و ماموریت
          </h3>
          <div className="text-[#4B5C66] text-lg screen750:text-base">
            هدف ما ارائه محصولاتی با کیفیت بالا است که با ترکیبات طبیعی و
            تاثیرگذار، زندگی سالم‌تر و لبخندی درخشان‌تر به ارمغان بیاورند. ما بر
            این باوریم که بهداشت دهان و دندان نه تنها سلامت فردی را بهبود
            می‌بخشد، بلکه تاثیر مثبتی بر اعتماد به نفس و کیفیت زندگی افراد دارد.
          </div>
        </div>

        <div
          className="w-[29%] mx-auto flex items-stretch justify-end
          screen1550:hidden  "
        >
          <div className="relative w-full h-full screen750:w-[95%] screen750:mx-auto ">
            <Image
              src={Prod}
              alt="عکس در باره ما"
              quality={100}
              style={{ objectFit: "cover" }}
              className="rounded-lg screen750:mx-auto"
              fill={!isSmallScreen}
            />
          </div>
        </div>
      </div>

      <div>
        <h3
          className={`${styles.backGroundTextPersian} mx-auto my-20 screen750:my-6`}
        >
          ارزش‌های ما
        </h3>
        <div
          style={{ direction: "rtl" }}
          className="grid grid-cols-3 gap-10 
            screen1230:gap-7
            screen950:gap-5
            screen800:grid-cols-2
            screen800:gap-8
            screen600:grid-cols-1 "
        >
          <Details
            image={Img3}
            title="نوآوری مستمر"
            text="ما همواره در حال به‌روزرسانی و تحقیق در مورد فناوری‌های جدید بهداشتی برای ارائه بهترین محصولات به مشتریان خود هستیم."
          />
          <Details
            image={Img2}
            title="مشتری‌محوری"
            text="تلاش ما همواره در جهت شناسایی نیازهای مشتریان و ارائه محصولاتی است که به بهبود سلامت دهان و دندان آن‌ها کمک کند."
          />
          <Details
            image={Img1}
            title="کیفیت بی‌نظیر"
            text="محصولات ما با بهترین ترکیبات طبیعی و برترین استانداردهای بین‌المللی تولید می‌شوند تا سلامت دهان و دندان شما حفظ شود."
          />
        </div>
      </div>
    </div>
  );
};

export default Main;
