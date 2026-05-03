import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

import ProdTiny from "@/public/images/placeholder.svg";
import Prod1 from "@/public/images/placeholder.svg";

interface ProductImage {
  mainImage: string;
  image1: string;
  image2: string;
  image3: string;
}
interface CategoryDetails {
  name: string;
}

interface ProductDetails {
  productTitle: string;
  price: string;
  ProductImages: ProductImage[];
  keyWord1: string;
  keyWord2: string;
  keyWord3: string;
  bgColor: string;
  Category: CategoryDetails;
  mainDescriptionSectionOne: string;
  mainDescriptionItems: string;
}

interface Product {
  product?: ProductDetails;
}

const FirstComponent: React.FC<Product> = ({ product }) => {
  const [mainImageHeight, setMainImageHeight] = useState<number | null>(null);
  const mainImageRef = useRef<HTMLDivElement>(null);

  const [windowWidth, setWindowWidth] = useState<number | null>(null);

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

  useEffect(() => {
    // Set initial window width
    setWindowWidth(window.innerWidth);

    // Function to update window width
    const handleResize = () => setWindowWidth(window.innerWidth);

    // Event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (mainImageRef.current) {
        setMainImageHeight(mainImageRef.current.clientHeight);
      }
    };

    // Set initial height after the component mounts
    handleResize();

    // Update height on window resize
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const onImageLoad = () => {
    if (mainImageRef.current) {
      setMainImageHeight(mainImageRef.current.clientHeight);
    }
  };

  const result = product?.mainDescriptionItems
    .split("***")
    .filter((item) => item.trim() !== "");

  return (
    <div className="w-[80%] mx-auto my-40 screen750:w-[85%] screen600:w-[95%] screen750:my-20">
      <div
        style={{ direction: "rtl" }}
        className="text-sm text-[#929BA0]"
      >{`محصولات > ${product?.Category?.name} > ${product?.productTitle} `}</div>

      <div className="w-full mx-auto flex flex-row justify-center pt-20 screen1300:flex-col-reverse screen750:pt-8">
        <div
          style={{ direction: "rtl" }}
          className="w-[46%] mx-auto screen1300:w-[90%] screen1300:mt-16 screen750:w-full"
        >
          <h2
            style={{
              color: product?.bgColor && darkenColor(product?.bgColor, 20),
            }}
            className={
              " font-bold text-[48px] pb-10 screen1300:text-[40px] screen750:text-[32px]"
            }
          >
            {product?.productTitle}
          </h2>
          <div className="text-[#4B5C66] text-lg pb-5 screen750:text-base">
            {product?.mainDescriptionSectionOne}
          </div>

          {result?.map((item, index) => (
            <div key={index} className="flex flex-row py-2 my-auto ">
              <svg
                version="1.1"
                id="Layer_1"
                // xmlns="http://www.w3.org/2000/svg"
                // xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 26 26"
                xmlSpace="preserve"
                // style={{ enableBackground: "new 0 0 26 26" }}
                style={{ width: "30px", height: "30px", marginLeft: "10px" }}
              >
                <path
                  style={{ opacity: 1 }}
                  fill={product?.bgColor} // Apply the primary color dynamically
                  d="M11.6,2.7c0.7-0.6,2-0.6,2.7,0l1.7,1.5c0.3,0.3,0.9,0.5,1.4,0.5h1.8c1.1,0,2.1,0.9,2.1,2.1v1.8
                  c0,0.4,0.2,1,0.5,1.4l1.5,1.7c0.6,0.7,0.6,2,0,2.7l-1.5,1.7c-0.3,0.3-0.5,0.9-0.5,1.4v1.8c0,1.1-0.9,2.1-2.1,2.1h-1.8
                  c-0.4,0-1,0.2-1.4,0.5l-1.7,1.5c-0.7,0.6-2,0.6-2.7,0l-1.7-1.5c-0.3-0.3-0.9-0.5-1.4-0.5H6.7c-1.1,0-2.1-0.9-2.1-2.1v-1.9
                  c0-0.4-0.2-1-0.5-1.4l-1.5-1.7c-0.6-0.7-0.6-2,0-2.7l1.5-1.7C4.4,9.6,4.6,9,4.6,8.6V6.7c0-1.1,0.9-2.1,2.1-2.1h1.9
                  c0.4,0,1-0.2,1.4-0.5L11.6,2.7z"
                />
                <path
                  fill={product?.bgColor && darkenColor(product?.bgColor, 30)} // Apply the secondary color dynamically
                  style={{ opacity: 1 }}
                  d="M11.7,16.4c-0.2,0-0.4-0.1-0.6-0.2l-2.6-2.6c-0.3-0.3-0.3-0.8,0-1.1c0.3-0.3,0.8-0.3,1.1,0l2,2l4.7-4.7
                  c0.3-0.3,0.8-0.3,1.1,0c0.3,0.3,0.3,0.8,0,1.1l-5.2,5.2C12.1,16.3,11.9,16.4,11.7,16.4z"
                />
              </svg>

              <div className="text-[#4B5C66] my-auto screen750:text-sm">
                {item}
              </div>
            </div>
          ))}

          <div className="bg-[#F2C900] rounded-[20px] text-white py-[10px] w-56 text-center mt-20 screen750:mt-12 screen750:text-sm">
            {Number(product?.price)?.toLocaleString()}
            <span className="mx-1">تومان</span>
          </div>
        </div>

        <div className="w-1/2 screen1300:w-[64%] flex flex-row-reverse justify-between mx-auto screen750:flex-col-reverse screen750:w-full">
          {/* Right images container */}
          <div
            className="w-[25%] flex flex-col justify-between screen750:flex-row-reverse screen750:justify-between screen750:w-full screen750:mb-12"
            style={{
              height:
                (windowWidth &&
                  (windowWidth > 750 ? mainImageHeight : "auto")) ||
                "auto",
            }}
          >
            {[
              product?.ProductImages[0]?.image1,
              product?.ProductImages[0]?.image2,
              product?.ProductImages[0]?.image3,
            ].map((img, index) => (
              <Image
                key={index}
                src={
                  img
                    ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/${img}`
                    : ProdTiny
                }
                width={130}
                height={130}
                alt="عکس محصول"
                className="rounded-3xl object-cover screen750:w-[30%] "
                style={{
                  height: mainImageHeight
                    ? `${(mainImageHeight - 35) / 3}px`
                    : "auto",
                }}
              />
            ))}
          </div>

          {/* Main image container */}
          <div
            ref={mainImageRef} // Reference to get height
            className="w-[70%] mx-auto h-full screen1300:my-auto bg-[#F7FAFD] rounded-3xl flex justify-center items-center screen750:p-10 screen750:w-full screen750:mb-6"
          >
            <Image
              src={
                product?.ProductImages[0]?.mainImage
                  ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/${product?.ProductImages[0]?.mainImage}`
                  : Prod1
              }
              width={350}
              height={350}
              alt="عکس محصول"
              className="rounded-3xl object-cover screen750:w-72"
              onLoadingComplete={onImageLoad} // Ensure height is set when image loads
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstComponent;
