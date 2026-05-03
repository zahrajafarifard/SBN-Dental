"use client";
import React, { useState, useEffect, useRef } from "react";

import ArticleDetails from "./relatedArticles-details";
import "./style.css";
import Image from "next/image";

interface Article {
  id: number;
  mainImage: string;
  articleTitle: string;
  createdAt: string;
  sectionOneText: string;
}

interface ArticleProps {
  articleId: number;
  CategoryId: number;
}
const RealtedArticles: React.FC<ArticleProps> = ({ articleId, CategoryId }) => {
  const [realtedArticles, setRealtedArticles] = useState<Article[]>([]);

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
    const _realtedArticles = async () => {
      const _response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/sbn/realtedArticles`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            articleId,
            CategoryId,
          }),
        }
      );

      const _data = await _response.json();

      setRealtedArticles(_data);
    };
    _realtedArticles();
  }, [CategoryId, articleId]);

  return (
    <div className="w-[24%]  mt-20   screen1150:w-[30%]  screen1100:w-[95%] screen1100:mx-auto screen1100:mt-0 screen1100:mb-20  screen750:mb-14">
      <h3 className="w-[80%] mx-auto text-[#264490] font-bold text-xl text-right mb-8 screen1100:w-[95%] screen1150:w-full">
        مقالات مرتبط
      </h3>

      <div
        ref={scrollRef}
        style={{ direction: "rtl" }}
        className="w-[80%] mx-auto grid grid-cols-1   mb-8   
        screen1100:w-[100%] screen1100:flex 
        screen1100:flex-row p-1
        gap-8 screen1100:p-4 screen1100:justify-evenly screen1100:overflow-x-auto   no-scrollbar "
      >
        {realtedArticles.length === 0 ? (
          <div
            className="border border-[#EE5248] rounded-[32px] w-[100%] mx-auto py-10 
              screen1100:w-2/3
               screen950:py-8
               screen750:w-2/3
               screen500:w-[100%]
               "
          >
            <Image
              src={"/images/info-circle.svg"}
              alt="info"
              width={40}
              height={40}
              className="mx-auto mb-8 screen950:w-8"
            />
            <div
              style={{ direction: "rtl" }}
              className="text-[#4B5C66] text-sm mx-auto w-full text-center screen1100:text-lg screen550:text-base"
            >
              مقاله ای وجود ندارد!
            </div>
          </div>
        ) : (
          realtedArticles?.map((article) => {
            return <ArticleDetails key={article?.id} article={article} />;
          })
        )}
      </div>
    </div>
  );
};

export default RealtedArticles;
