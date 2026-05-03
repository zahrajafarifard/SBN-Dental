"use client";

import React, { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

const Info = dynamic(() => import("@/components/shared/info/page"));

const Spinner = dynamic(() => import("@/components/shared/spinner/page"));

import Card from "@/components/shared/card";
import ArticleDetails from "./article-details";
// import Info from "@/components/shared/info/page";
// import Spinner from "@/components/shared/spinner/page";

interface Article {
  id: number;
  mainImage: string;
  articleTitle: string;
  createdAt: string;
  sectionOneText: string;
}

const ThirdComponent = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const _articles = async () => {
      startTransition(async () => {
        const _response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/sbn/getLatestArticlesHome`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const _data = await _response.json();
        setArticles(_data);
      });
    };
    _articles();
  }, []);

  if (isPending) {
    return <Spinner />;
  }

  return (
    <div className="w-[80%] mx-auto my-20 screen900:w-[92%] ">
      <div className="flex flex-row-reverse justify-between my-auto mb-2 ">
        <div className="text-[#DEB900] text-lg text-right my-auto screen600:text-center screen600:text-base">
          مقالات
        </div>

        <Link prefetch={true} href={"/articles"}>
          <div className="my-auto screen600:hidden ">
            <Card text="همه مقالات" />
          </div>
        </Link>
      </div>
      <h3
        style={{ direction: "rtl" }}
        className="text-[#264490] font-bold text-xl mb-20 text-right screen600:text-center screen600:text-lg "
      >
        ما برای خلق بهترین تجربه بهداشت دهان و دندان همراه شما هستیم.
      </h3>

      {!articles ? (
        <Spinner />
      ) : articles.length === 0 ? (
        <Info text="مقاله ای وجود ندارد!" />
      ) : (
        <div
          style={{ direction: "rtl" }}
          className="grid grid-cols-4 gap-14 screen1400:gap-8
            screen1230:grid-cols-3
            screen800:grid-cols-2
            screen500:grid-cols-1
            screen500:w-[80%]
            screen500:mx-auto
            screen400:w-[90%]  "
        >
          {articles.map((article) => (
            <ArticleDetails key={article.id} article={article} />
          ))}
        </div>
      )}

      <Link prefetch={true} href={"/articles"}>
        <div className="my-auto screen600:flex hidden justify-center mt-10">
          <Card text="همه مقالات" />
        </div>
      </Link>
    </div>
  );
};

export default ThirdComponent;
