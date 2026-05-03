import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Img from "@/public/images/placeholder.svg";

interface ProductImage {
  mainImage: string;
  image1: string;
  image2: string;
  image3: string;
}

interface Product {
  id: number;
  productTitle: string;
  price: string;
  ProductImages: ProductImage[];
  keyWord1: string;
  keyWord2: string;
  keyWord3: string;
  bgColor: string;
}

interface ProductDetailsProps {
  item: Product;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);

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

  const style = {
    backgroundColor: isHovered ? item?.bgColor : "#F7FAFD",
  };

  return (
    <Link prefetch={true} href={`/products/${item?.id}`}>
      <div className="flex flex-col justify-center items-center">
        <div
          style={style}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`relative  w-72 h-72 rounded-full flex justify-center items-center  group
            screen950:w-64
            screen950:h-64 
            screen800:w-[240px]
            screen800:h-[240px] 
            screen750:w-72
            screen750:h-72
            `}
        >
          <Image
            src={
              item?.ProductImages[0]?.mainImage
                ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/${item?.ProductImages[0]?.mainImage}`
                : Img
            }
            alt={item?.productTitle}
            width={150}
            height={150}
            className="screen950:w-1/2"
          />

          <div className="absolute inset-0 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {item?.keyWord1 && (
              <span
                style={{ backgroundColor: darkenColor(item?.bgColor, 20) }}
                className=" rounded-[14px] text-white text-xs font-bold px-5 py-2 m-1 absolute top-10 -right-6"
              >
                {item?.keyWord1}
              </span>
            )}
            {item?.keyWord2 && (
              <span
                style={{ backgroundColor: darkenColor(item?.bgColor, 20) }}
                className=" rounded-[14px] text-white text-xs font-bold px-5 py-2 m-1 absolute top-16 -left-7"
              >
                {item?.keyWord2}
              </span>
            )}
            {item.keyWord3 && (
              <span
                style={{ backgroundColor: darkenColor(item?.bgColor, 20) }}
                className=" rounded-[14px] text-white text-xs font-bold px-5 py-2 m-1 absolute bottom-10 -right-6"
              >
                {item?.keyWord3}
              </span>
            )}
          </div>
        </div>

        <div className="mt-8 mb-10">
          <h3 className="text-xl text-[#264490] text-center font-bold">
            {item?.productTitle}
          </h3>
          <h4 className="text-[#264490] text-lg text-center">
            {Number(item?.price)?.toLocaleString()}
            <span className="mx-1">تومان</span>
          </h4>
        </div>
      </div>
    </Link>
  );
};

export default ProductDetails;
