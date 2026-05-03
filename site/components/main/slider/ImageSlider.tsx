// components/Slider.tsx
"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./style.module.css"; // Import the CSS module
import Spinner from "@/components/shared/spinner/page";
import Link from "next/link";

const images = [
  "/images/banner1.png",
  "/images/banner2.png",
  "/images/banner3.png",
];

const imagesTablet = [
  "/images/banner1-1000.png",
  "/images/banner2-1000.png",
  "/images/banner3-1000.png",
];
const imagesMobile = [
  "/images/banner1-mobile.png",
  "/images/banner2-mobile.png",
  "/images/banner3-mobile.png",
];

const Slider = () => {
  // const [width, setWidth] = useState(
  //   typeof window !== "undefined" ? window.innerWidth : 0
  // );

  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setWidth, width]);

  const [activeIndex, setActiveIndex] = useState(0);

  const goToNextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevSlide = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  useEffect(() => {
    const interval = setInterval(goToNextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  if (width === null) {
    return <Spinner />;
    
  }

  return (
    <div className={styles.slider}>
      <button
        className={`${styles.arrow} ${styles.left}`}
        onClick={goToPrevSlide}
      >
        <Image
          src="/images/arrow-left.svg"
          alt="arrow left"
          width={40}
          height={40}
        />
      </button>

      <div
        className={styles.slides}
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {width > 1100
          ? images.map((image, index) => (
              <div
                key={index}
                className={`${styles.slide} ${
                  index === activeIndex ? styles.active : ""
                }`}
              >
                <Image
                  src={image}
                  alt={`Slide ${index + 1}`}
                  //   layout="fill"
                  fill
                  style={{ objectFit: "fill" }}
                  //   quality={100}
                  key={image}
                  priority
                />
                {index === 0 && (
                  <Link href="#contactUs">
                    <div
                      className={` ${styles.textSlide1} w-fit bg-[#264490] rounded-full flex flex-row-reverse py-3 pr-6 pl-4  `}
                    >
                      <div className="text-white my-auto screen600:text-sm">
                        بیشتر بدانید
                      </div>

                      <Image
                        src="/images/arrow-left2.svg"
                        className="mr-2 screen600:w-5 screen600:h-5"
                        alt="learn more"
                        width={22}
                        height={22}
                      />
                    </div>
                  </Link>
                )}
                {index === 1 && (
                  <Link href="/products">
                    <div
                      className={` ${styles.text} w-fit bg-[#264490] rounded-full flex flex-row-reverse py-3 pr-6 pl-4  `}
                    >
                      <div className="text-white my-auto screen600:text-sm">
                        دیدن محصولات
                      </div>

                      <Image
                        src="/images/arrow-left2.svg"
                        className="mr-2 screen600:w-5 screen600:h-5"
                        alt="learn more"
                        width={22}
                        height={22}
                      />
                    </div>
                  </Link>
                )}
                {index === 2 && (
                  <Link href="/products">
                    <div
                      className={` ${styles.text} w-fit bg-[#63BEF3] rounded-full flex flex-row-reverse py-3 pr-6 pl-4  `}
                    >
                      <div className="text-white my-auto screen600:text-sm">
                        مشاهده محصول
                      </div>

                      <Image
                        src="/images/arrow-left2.svg"
                        className="mr-2 screen600:w-5 screen600:h-5"
                        alt="learn more"
                        width={22}
                        height={22}
                      />
                    </div>
                  </Link>
                )}
              </div>
            ))
          : width > 600
          ? imagesTablet.map((image, index) => (
              <div
                key={index}
                className={`${styles.slide} ${
                  index === activeIndex ? styles.active : ""
                }`}
              >
                <Image
                  src={image}
                  alt={`Slide ${index + 1}`}
                  fill
                  style={{ objectFit: "fill" }}
                  key={image}
                  priority
                />

                {index === 0 && (
                  <Link href="#contactUs">
                    <div
                      className={` ${styles.textSlide1} w-fit bg-[#264490] rounded-full flex flex-row-reverse py-2 pr-4 pl-2 
                       screen800:py-1.5 
                      `}
                    >
                      <div className="text-white my-auto screen600:text-sm screen800:text-xs">
                        بیشتر بدانید
                      </div>

                      <Image
                        src="/images/arrow-left2.svg"
                        className="mr-2 screen800:w-5 screen800:h-5 screen600:w-5 screen600:h-5"
                        alt="learn more"
                        width={22}
                        height={22}
                      />
                    </div>
                  </Link>
                )}
                {index === 1 && (
                  <Link href="/products">
                    <div
                      className={` ${styles.text} w-fit bg-[#264490] rounded-full flex flex-row-reverse py-2 pr-4 pl-2  
                      screen800:py-1.5 screen650:py-1 screen650:pr-3 screen650:pl-1`}
                    >
                      <div className="text-white my-auto text-sm screen800:text-xs screen650:text-[11px] ">
                        دیدن محصولات
                      </div>

                      <Image
                        src="/images/arrow-left2.svg"
                        className="mr-2 screen800:w-5 screen800:h-5 screen650:w-4 "
                        alt="learn more"
                        width={22}
                        height={22}
                      />
                    </div>
                  </Link>
                )}
                {index === 2 && (
                  <Link href="/products">
                    <div
                      className={` ${styles.text} w-fit bg-[#63BEF3] rounded-full flex flex-row-reverse py-2 pr-4 pl-2  screen800:py-1.5 screen650:py-1 screen650:pr-3 screen650:pl-1`}
                    >
                      <div className="text-white my-auto text-sm screen800:text-xs screen650:text-[11px]">
                        مشاهده محصول
                      </div>

                      <Image
                        src="/images/arrow-left2.svg"
                        className="mr-2 screen800:w-5 screen800:h-5 screen650:w-4"
                        alt="learn more"
                        width={22}
                        height={22}
                      />
                    </div>
                  </Link>
                )}
              </div>
            ))
          : imagesMobile.map((image, index) => (
              <div
                key={index}
                className={`${styles.slide} ${
                  index === activeIndex ? styles.active : ""
                }`}
              >
                <Image
                  src={image}
                  alt={`Slide ${index + 1}`}
                  fill
                  style={{ objectFit: "fill" }}
                  key={image}
                  priority
                />

                {index === 0 && (
                  <Link href="#contactUs">
                    <div
                      className={` ${styles.text} w-fit bg-[#264490] rounded-full flex flex-row-reverse py-3 pr-6 pl-4 
                       screen450:py-2 screen450:pr-4 screen450:pl-2
                      screen400:py-1.5 screen400:pr-3 screen400:pl-1
                      `}
                    >
                      <div className="text-white my-auto screen450:text-sm screen400:text-xs">
                        بیشتر بدانید
                      </div>

                      <Image
                        src="/images/arrow-left2.svg"
                        className="mr-2 screen450:w-5 screen450:h-5"
                        alt="learn more"
                        width={22}
                        height={22}
                      />
                    </div>
                  </Link>
                )}
                {index === 1 && (
                  <Link href="/products">
                    <div
                      className={` ${styles.text} w-fit bg-[#264490] rounded-full flex flex-row-reverse py-3 pr-6 pl-4 
                      screen450:py-2 screen450:pr-4 screen450:pl-2
                      screen400:py-1.5 screen400:pr-3 screen400:pl-1
                      `}
                    >
                      <div className="text-white my-auto screen450:text-sm screen400:text-xs">
                        دیدن محصولات
                      </div>

                      <Image
                        src="/images/arrow-left2.svg"
                        className="mr-2 screen450:w-5 screen450:h-5"
                        alt="learn more"
                        width={22}
                        height={22}
                      />
                    </div>
                  </Link>
                )}
                {index === 2 && (
                  <Link href="/products">
                    <div
                      className={` ${styles.text} w-fit bg-[#63BEF3] rounded-full flex flex-row-reverse py-3 pr-6 pl-4 
                      screen450:py-2 screen450:pr-4 screen450:pl-2
                      screen400:py-1.5 screen400:pr-3 screen400:pl-1
                      
                      `}
                    >
                      <div className="text-white my-auto screen450:text-sm screen400:text-xs">
                        مشاهده محصول
                      </div>

                      <Image
                        src="/images/arrow-left2.svg"
                        className="mr-2 screen600:w-5 screen600:h-5 screen450:w-5 screen450:h-5 "
                        alt="learn more"
                        width={22}
                        height={22}
                      />
                    </div>
                  </Link>
                )}
              </div>
            ))}
      </div>

      <button
        className={`${styles.arrow} ${styles.right}`}
        onClick={goToNextSlide}
      >
        <Image
          src="/images/arrow-right.svg"
          alt="arrow right"
          width={40}
          height={40}
        />
      </button>

      <div className={styles.indicators}>
        {images.map((_, index) => (
          <button
            key={index}
            className={`${styles.indicator} ${
              index === activeIndex ? styles.active : ""
            }`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
