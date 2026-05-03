"use client";
import React, { useEffect, useState, useRef } from "react";

import RelatedProductsDetails from "./related-products-details";
import "./style.css";

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

interface CategoryProps {
  category?: number;
  productId?: string;
}

const RelatedProducts: React.FC<CategoryProps> = ({ category, productId }) => {
  const [products, setProducts] = useState<Product[]>([]);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        if (scrollRef.current) {
          scrollRef.current.scrollLeft += e.deltaY;
        }
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (scrollRef.current) {
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !scrollRef.current) return;
      e.preventDefault();
      const x = e.pageX - scrollRef.current.offsetLeft;
      const walk = (x - startX) * 2; // Multiply for faster scrolling
      scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const container = scrollRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel);
      container.addEventListener("mousedown", handleMouseDown);
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseUp);
      container.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
        container.removeEventListener("mousedown", handleMouseDown);
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseUp);
        container.removeEventListener("mouseup", handleMouseUp);
      }
    };
  }, [isDragging, startX, scrollLeft]);

  useEffect(() => {
    const _product = async () => {
      const _response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/sbn/relatedProducts/${category}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId,
          }),
        }
      );

      const _data = await _response.json();

      setProducts(_data);
    };
    _product();
  }, [productId, category]);

  return (
    <div style={{ direction: "rtl" }} className="w-[80%] mx-auto  my-40">
      <h2 className="text-[#264490] text-xl font-bold mb-20">محصولات مرتبط</h2>
      <div
        ref={scrollRef}
        className="flex flex-row gap-8 justify-evenly overflow-x-auto whitespace-nowrap  no-scrollbar"
      >
        {products?.map((product) => {
          return <RelatedProductsDetails key={product?.id} item={product} />;
        })}
      </div>
    </div>
  );
};

export default RelatedProducts;
