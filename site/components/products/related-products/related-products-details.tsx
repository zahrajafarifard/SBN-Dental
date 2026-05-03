import React from "react";
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
  bgColor: string;
}

interface ProductDetailsProps {
  item: Product;
}

const RelatedProductsDetails: React.FC<ProductDetailsProps> = ({ item }) => {
  return (
    <Link prefetch={true} href={`/products/${item?.id}`}>
      <div className="flex flex-col  justify-center items-center">
        <div
          className={` bg-[#F7FAFD] w-72 h-72 rounded-full flex justify-center items-center hover:bg-[${item?.bgColor}] group
          screen600:w-56
          screen600:h-56
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
            className="screen600:w-1/2"
          />
        </div>

        <div className="mt-8">
          <h2 className="text-xl text-[#264490] text-center font-bold screen600:text-lg">
            {item?.productTitle}
          </h2>
          <p className="text-[#264490] text-lg text-center screen600:text-base">
            {Number(item?.price).toLocaleString()} تومان
          </p>
        </div>
      </div>
    </Link>
  );
};

export default RelatedProductsDetails;
