"use client";
import React, { useState, useEffect, useTransition } from "react";
import Image from "next/image";

import ArticleDetails from "./article-details";
import Filter from "@/public/images/filter button.svg";
import Search from "@/public/images/search.svg";
import Pagination from "@/components/shared/pagination/page";
import Spinner from "@/components/shared/spinner/page";
import Info from "@/components/shared/info/page";

interface Article {
  id: number;
  mainImage: string;
  articleTitle: string;
  createdAt: string;
  sectionOneText: string;
}

const Archive = () => {
  const [isPending, startTransition] = useTransition();

  const [showFilterItems, setShowFilterItems] = useState(false);

  const [realtedArticles, setRealtedArticles] = useState<Article[]>([]);
  const [searchItem, setSearchItem] = useState<string>("");

  const [totalItems, setTotalItems] = useState<number>(0);
  const itemsPerPage: number = 8;
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const _realtedArticles = async () => {
      let _response, _data;

      startTransition(async () => {
        _response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/sbn/articles`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              page: currentPage,
              pageSize: itemsPerPage,
            }),
          }
        );
        _data = await _response.json();

        setTotalItems(+_data?.count - 3);
        setRealtedArticles(_data?.rows);
      });
    };
    _realtedArticles();
  }, [
    setRealtedArticles,
    currentPage,
    itemsPerPage,
    setTotalItems,
    setCurrentPage,
  ]);

  const handlePageChange = (page: number | string) => {
    if (page !== "...") {
      setCurrentPage(Number(page));
    }
  };

  const searchHandler = async () => {
    const _response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/sbn/articles/search`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          searchItem,
          page: currentPage,
          pageSize: itemsPerPage,
        }),
      }
    );

    const _data = await _response.json();

    setRealtedArticles(_data);
    setSearchItem("");
  };

  const mostVisited = async () => {
    const _response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/sbn/articles/mostVisited`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          page: currentPage,
          pageSize: itemsPerPage,
        }),
      }
    );

    const _data = await _response.json();
    setRealtedArticles(_data);
  };
  const newest = async () => {
    const _response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/sbn/articles/newest`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          page: currentPage,
          pageSize: itemsPerPage,
        }),
      }
    );

    const _data = await _response.json();
    setRealtedArticles(_data);
  };

  if (isPending) {
    return <Spinner />;
  }
  return (
    <div className="w-[80%] mx-auto mt-32 screen750:w-[95%]">
      <div className="hidden screen600:flex justify-end mb-4  text-[#264490]  leading-9 font-bold my-auto text-lg ">
        آرشیو مقالات
      </div>
      <div className="flex flex-row-reverse justify-between w-full mx-auto mb-8 screen600:justify-end">
        <div className="text-[#264490] text-xl leading-9 font-bold my-auto screen750:text-lg screen600:hidden">
          آرشیو مقالات
        </div>

        <div
          className="flex flex-row-reverse gap-x-5 
          screen600:gap-x-2 "
        >
          <div>
            <div
              className="border rounded-[20px] border-[#B7D3E4] w-96 p-4 flex flex-row-reverse justify-between
              screen750:w-80
              screen600:w-72
              screen450:w-60
              screen400:w-48          
              "
            >
              <input
                value={searchItem}
                onChange={(e) => setSearchItem(e.target.value)}
                dir="rtl"
                placeholder="جست و جو ..."
                className="rounded-[20px] px-2 focus:outline-none w-full my-0.5 "
              />
              <Image
                onClick={searchHandler}
                src={Search}
                width={30}
                height={30}
                alt="جست و جو"
              />
            </div>
          </div>
          <div className="relative">
            <div onClick={() => setShowFilterItems((prev) => !prev)}>
              <Image src={Filter} width={65} height={65} alt="فیلتر" />
            </div>
            {showFilterItems && (
              <>
                <div
                  onClick={() => {
                    setShowFilterItems(false);
                  }}
                  className="fixed top-0 left-0 h-screen w-screen  z-10"
                />

                <div className="absolute z-20 top-[70px] bg-white rounded-2xl w-56 text-end shadow-[-1px_1px_6px_0_rgba(0,0,0,0.15)] py-2 text-[#4B5C66]">
                  <div
                    onClick={() => {
                      mostVisited();
                      setShowFilterItems(false);
                    }}
                    className="py-3 hover:bg-[#F7FAFD] pr-5"
                  >
                    پربازدیدترین
                  </div>
                  <div
                    onClick={() => {
                      newest();
                      setShowFilterItems(false);
                    }}
                    className="py-3 hover:bg-[#F7FAFD] pr-5"
                  >
                    جدید ترین
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {!isPending && realtedArticles?.length === 0 ? (
        <div className="mt-10">
          <Info text="مقاله ای وجود ندارد!" />
        </div>
      ) : (
        <div
          style={{ direction: "rtl" }}
          className="grid grid-cols-4 gap-14 mb-32
          screen1400:gap-8
          screen1300:grid-cols-3
          screen1100:gap-6
          screen900:grid-cols-2
          screen900:gap-8
          screen550:grid-cols-1
          screen550:w-[84%]
          screen550:mx-auto
          "
        >
          {realtedArticles?.map((article) => {
            return <ArticleDetails key={article?.id} article={article} />;
          })}
        </div>
      )}

      <div style={{ direction: "rtl" }} className="my-20">
        {totalItems > 8 && (
          <Pagination
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            current={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default Archive;
