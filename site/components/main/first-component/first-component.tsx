"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
// import dynamic from "next/dynamic";

// const Card = dynamic(() => import("@/components/shared/card"));
// const Spinner = dynamic(() => import("@/components/shared/spinner/page"));
import Card from "@/components/shared/card";

import VerfiyYellow from "@/public/images/verify-yellow.svg";
import VerfiyBlue from "@/public/images/verify-blue.svg";
import Img from "@/public/images/placeholder.svg";
import "./style.css";
import Info from "@/components/shared/info/page";
// import Spinner from "@/components/shared/spinner/page";

interface Product {
  id: number;
  productTitle: string;
  price: string;
  ProductImages: [{ mainImage: string }];
  keyWord1: string;
  keyWord2: string;
  keyWord3: string;
  mainDescriptionItems: string;
  bgColor: string;
}

interface WindowSize {
  width: number;
  height: number;
}

const FirstComponent = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    // Handler to call on window resize
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    // Add event listener for resize
    window.addEventListener("resize", handleResize);

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const _products = async () => {
      const _response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/sbn/products`
      );

      const _data = await _response.json();

      setProducts(_data);
    };
    _products();
  }, []);

  // Function to handle 'next' arrow click
  const handleNext = () => {
    if (products.length > 0) {
      // Shift the first element to the end of the array (rotate the queue)
      setProducts((prevProducts) => {
        const newProducts = [...prevProducts];
        const firstProduct = newProducts.shift(); // Remove the first product
        if (firstProduct) {
          newProducts.push(firstProduct); // Add it to the end of the array
        }
        return newProducts;
      });
    }
  };

  // Function to handle 'previous' arrow click
  const handlePrev = () => {
    if (products.length > 0) {
      // Shift the last element to the start of the array (rotate backwards)
      setProducts((prevProducts) => {
        const newProducts = [...prevProducts];
        const lastProduct = newProducts.pop(); // Remove the last product
        if (lastProduct) {
          newProducts.unshift(lastProduct); // Add it to the start of the array
        }
        return newProducts;
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 6000);

    return () => clearInterval(interval);
  }, [products]);

  const darkenColor = (hex: string, percent: number): string => {
    // Remove the '#' if present
    hex = hex.replace("#", "");

    // Parse the hex color into RGB components
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Calculate the darker color
    const darken = (color: number) =>
      Math.max(0, Math.min(255, Math.floor(color * (1 - percent / 100))));

    const rDarker = darken(r);
    const gDarker = darken(g);
    const bDarker = darken(b);

    // Convert back to hex and pad with zeros if needed
    const rgbToHex = (color: number) => color.toString(16).padStart(2, "0");

    return `#${rgbToHex(rDarker)}${rgbToHex(gDarker)}${rgbToHex(bDarker)}`;
  };

  return (
    <div className="my-24 overflow-x-hidden">
      <div className="mb-24 w-[80%] mx-auto my-auto">
        <div className="flex flex-row-reverse justify-between my-auto">
          <div className="my-auto text-[#DEB900] text-lg  screen1000:text-base">
            محصولات ما
          </div>
          <Link href={"/products"} prefetch={true} className="screen600:hidden">
            <div className="my-auto">
              <Card text="همه محصولات" />
            </div>
          </Link>
        </div>
        <h3
          style={{ direction: "rtl" }}
          className=" text-right text-[#264490] text-xl font-bold screen1000:text-lg"
        >
          خمیر دندان های تخصصی SBN، آرامش را به دندان های شما برمیگرداند
        </h3>
      </div>
      <div className="flex flex-row justify-evenly ">
        {products?.length === 0 ? (
          // <Spinner />
          <Info text="محصولی وجود ندارد!" />
        ) : (
          products
            ?.slice(
              0,
              windowSize.width > 1450
                ? 4
                : windowSize.width > 1200
                ? 3
                : windowSize.width > 600
                ? 2
                : 1
            )
            .map((product, index) => {
              const isActive = index === 0;
              return (
                <div
                  key={product.id}
                  className={`flex items-center justify-center rounded-lg   ${
                    isActive
                      ? "flex-grow-[2] w-1/2  screen1000:w-[35%] screen750:flex-col-reverse screen750:w-[10%]  "
                      : "flex-grow  w-[6%]  "
                  }`}
                >
                  {isActive && (
                    <div
                      style={{
                        direction: "rtl",
                        animationName: "slide-in-left",
                        animationDuration: "0.6s",
                        animationTimingFunction: "ease-in-out",
                        animationFillMode: "forwards",
                      }}
                      className="w-1/2 mr-16 screen600:mr-0 screen600:w-[80%] screen600:mt-8 screen450:w-[85%] "
                    >
                      <h2 className="text-xl text-[#264490] font-bold mb-4 ">
                        {product?.productTitle}
                      </h2>

                      {product?.mainDescriptionItems
                        .split("***")
                        .filter((item) => item.trim() !== "")
                        ?.map((item, index) => {
                          return (
                            <div
                              key={index}
                              className="flex flex-row my-2 -mr-1"
                            >
                              <Image
                                src={VerfiyYellow}
                                width={30}
                                height={30}
                                alt="عکس محصول"
                                className="w-7 h-7 my-auto ml-2"
                              />
                              <div className="text-[#4B5C66] my-auto">
                                {item}
                              </div>
                            </div>
                          );
                        })}

                      <div
                        key={index}
                        className="flex flex-row my-auto -mr-1 mt-3"
                      >
                        <Image
                          src={VerfiyBlue}
                          width={30}
                          height={30}
                          alt="check icon"
                          className="ml-2 my-auto"
                        />
                        <div className="text-sm text-[#264490] font-bold my-auto">
                          قیمت: {Number(product?.price).toLocaleString()} تومان
                        </div>
                      </div>
                    </div>
                  )}

                  <div
                    className={`relative flex flex-col justify-center items-center rounded-full    
                ${
                  isActive
                    ? "w-80 h-80 screen1000:w-64 screen1000:h-64 screen400:w-56 screen400:h-56"
                    : "w-44 h-44 screen1000:w-40 screen1000:h-40"
                } 
                `}
                    style={{
                      backgroundColor: product?.bgColor,
                      animationName: isActive ? "slide-in-right" : "",
                      animationDuration: isActive ? "0.6s" : "",
                      animationTimingFunction: isActive ? "ease-in-out" : "",
                      animationFillMode: isActive ? "forwards" : "",
                    }}
                  >
                    <Image
                      src={
                        product?.ProductImages[0]?.mainImage
                          ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/${product?.ProductImages[0]?.mainImage}`
                          : Img
                      }
                      className={`${
                        isActive
                          ? "absolute bottom-10 screen1000:w-48 screen400:w-44"
                          : " screen1000:w-32 screen1000:h-32"
                      } `}
                      alt={product?.productTitle}
                      width={isActive ? 260 : 90}
                      height={isActive ? 220 : 90}
                    />
                    {isActive ? (
                      <div className=" text-white text-center text-xs">
                        <p
                          style={{
                            backgroundColor: darkenColor(product?.bgColor, 18),
                          }}
                          className=" absolute top-7 -right-5 rounded-[14px] py-2 px-5"
                        >
                          {product?.keyWord1}
                        </p>
                        <p
                          style={{
                            backgroundColor: darkenColor(product?.bgColor, 18),
                          }}
                          className=" absolute top-20 -left-8 rounded-[14px] py-2 px-5"
                        >
                          {product?.keyWord2}
                        </p>
                        <p
                          style={{
                            backgroundColor: darkenColor(product?.bgColor, 18),
                          }}
                          className=" absolute bottom-16 -right-8 rounded-[14px] py-2 px-5"
                        >
                          {product?.keyWord3}
                        </p>
                      </div>
                    ) : (
                      <div className="text-[#264490] text-center text-sm">
                        {product?.productTitle
                          .replace(/خمیر دندان |خمیردندان|دهان شویه/g, "")
                          .trim()}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
        )}
      </div>
      {products?.length !== 0 && (
        <div className="flex flex-row justify-center mt-8  w-3/4 screen750:hidden">
          <Image
            src={"/images/arrow-right.svg"}
            className="transform -scale-x-100 cursor-pointer"
            alt="قبلی"
            width={40}
            height={40}
            onClick={handlePrev}
          />
          <Image
            src={"/images/arrow-right.svg"}
            className="cursor-pointer"
            alt="بعدی"
            width={40}
            height={40}
            onClick={handleNext}
          />
        </div>
      )}

      <Link
        href={"/products"}
        prefetch={true}
        className="screen600:flex mt-14 justify-center hidden "
      >
        <div className="my-auto">
          <Card text="همه محصولات" />
        </div>
      </Link>
    </div>
  );
};

export default FirstComponent;
