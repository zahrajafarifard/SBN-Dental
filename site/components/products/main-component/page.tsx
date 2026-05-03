"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

const ContactUs = dynamic(
  () => import("@/components/shared/contact-us/contact-us")
);

import Titles from "@/components/shared/title/titles";
import NavLink from "@/components/shared/navLink/navLink-category";

import Search from "@/public/images/search.svg";
import Filter from "@/public/images/filter button.svg";
import ProductDetails from "./product-details";
// import ContactUs from "@/components/shared/contact-us/contact-us";
import Pagination from "@/components/shared/pagination/page";
import Info from "@/components/shared/info/page";

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
interface Category {
  id: number;
  name: string;
}

const Main: React.FC = () => {
  const [showCategoriesOnSmallScreen, setShowCategoriesOnSmallScreen] =
    useState<boolean>(false);

  const [inputVisible, setInputVisible] = useState(false);

  const [showFilterItems, setShowFilterItems] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchItem, setSearchItem] = useState<string>("");

  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [selectedCategoryName, setSelectedCategoryName] =
    useState<string>("همه");

  const [totalItems, setTotalItems] = useState<number>(0);
  const itemsPerPage: number = 6;
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    let _response, _data;

    const _cats = async () => {
      _response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/sbn/products/categories`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      _data = await _response.json();

      setCategories(_data);
    };
    _cats();
  }, []);

  useEffect(() => {
    const _products = async () => {
      const _response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/sbn/products`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            page: currentPage,
            pageSize: itemsPerPage,
            selectedCategory,
          }),
        }
      );

      const _data = await _response.json();

      setTotalItems(_data?.count);
      setProducts(_data?.rows);
    };
    _products();
  }, [
    selectedCategory,
    setProducts,
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

  const mostVisited = async () => {
    const _response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/sbn/products/mostVisited`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          page: currentPage,
          pageSize: itemsPerPage,
          selectedCategory,
        }),
      }
    );

    const _data = await _response.json();

    setProducts(_data);
  };

  const newest = async () => {
    const _response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/sbn/products/newest`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          page: currentPage,
          pageSize: itemsPerPage,
          selectedCategory,
        }),
      }
    );

    const _data = await _response.json();
    setProducts(_data);
  };
  const cheapest = async () => {
    const _response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/sbn/products/cheapest`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          page: currentPage,
          pageSize: itemsPerPage,
          selectedCategory,
        }),
      }
    );

    const _data = await _response.json();
    setProducts(_data);
  };
  const mostExpensive = async () => {
    const _response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/sbn/products/mostExpensive`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          page: currentPage,
          pageSize: itemsPerPage,
          selectedCategory,
        }),
      }
    );

    const _data = await _response.json();
    setProducts(_data);
  };

  const searchHandler = async () => {
    const _response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/sbn/products/search`,
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
    // console.log("seaaaaarrr", _data);
    setProducts(_data);
    setSearchItem("");
  };

  return (
    <div className="">
      <Titles />

      <div
        className="flex flex-row-reverse w-[80%] mx-auto justify-between my-24
        screen750:w-[95%]
        screen1400:w-[95%]
   
      "
      >
        <div className="w-[22%] flex justify-end items-start  screen750:hidden screen1400:w-[25%] ">
          <div
            style={{ direction: "rtl" }}
            className="w-[80%] shadow-[-1px_1px_6px_0_rgba(0,0,0,0.15)] h-[450px] rounded-[32px] py-6 pr-5 pl-4 sticky top-4
            screen1400:w-[95%] 
            "
          >
            <h3
              className={`text-[#4B5C66] pr-4 text-2xl font-bold border-b border-b-[#EBF5FB] pb-4 mb-10 screen1400:text-xl screen1400:pr-0`}
            >
              دسته بندی ها
            </h3>

            <NavLink
              href="/products"
              isActive={selectedCategory === 0}
              onClick={() => {
                setSelectedCategory(0);
                setCurrentPage(1);
              }}
            >
              <span className="">همه</span>
            </NavLink>

            {categories?.map((cat) => (
              <NavLink
                key={cat.id}
                href="/products"
                isActive={selectedCategory === cat?.id}
                onClick={() => {
                  setSelectedCategory(cat?.id);

                  setCurrentPage(1);
                }}
              >
                <span className="">{cat?.name}</span>
              </NavLink>
            ))}
          </div>
        </div>
        <div className="w-[78%] screen750:w-full ">
          <div
            className="flex flex-row-reverse justify-between mb-10 sticky top-4 bg-white z-20
            screen750:justify-end "
          >
            <div className="hidden screen750:flex relative ">
              <div
                onClick={() => setShowCategoriesOnSmallScreen((prev) => !prev)}
              >
                <div
                  className={`border border-[#B7D3E4] rounded-[22px] flex flex-row   h-full 
                
                ${inputVisible && "w-16"}
                
                `}
                >
                  <div
                    className={`my-auto text-right whitespace-nowrap  pl-2 
                    ${inputVisible && "hidden"}
                    `}
                  >
                    {selectedCategoryName}
                  </div>

                  <Image
                    src="/images/indicator.svg"
                    alt="indicator"
                    width={45}
                    height={45}
                    className={`px-2 
                      ${inputVisible ? "mx-auto my-auto" : "mr-8"}
                    `}
                  />
                </div>
              </div>
              {showCategoriesOnSmallScreen && (
                <>
                  <div
                    onClick={() => {
                      setShowCategoriesOnSmallScreen(false);
                    }}
                    className="fixed top-0 left-0 h-screen w-screen  z-10"
                  />

                  <div
                    style={{ direction: "rtl" }}
                    className="absolute z-20 top-[72px] right-0 bg-white rounded-2xl w-44 screen450:w-40 shadow-[-1px_1px_6px_0_rgba(0,0,0,0.15)] py-2 text-[#4B5C66]"
                  >
                    <NavLink
                      href="/products"
                      isActive={selectedCategory === 0}
                      onClick={() => {
                        setInputVisible(false);
                        setSelectedCategoryName("همه");
                        setSelectedCategory(0);
                        setCurrentPage(1);
                        setShowCategoriesOnSmallScreen(false);
                      }}
                    >
                      <span className="">همه</span>
                    </NavLink>

                    {categories?.map((cat) => (
                      <NavLink
                        key={cat.id}
                        href="/products"
                        isActive={selectedCategory === cat?.id}
                        onClick={() => {
                          setInputVisible(false);
                          setSelectedCategory(cat?.id);
                          setSelectedCategoryName(cat?.name);
                          setCurrentPage(1);
                          setShowCategoriesOnSmallScreen(false);
                        }}
                      >
                        <span className="">{cat?.name}</span>
                      </NavLink>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="w-full flex flex-row-reverse justify-between screen750:justify-end ">
              <div
                className={`hidden screen750:flex border rounded-[22px] border-[#929BA0] flex-row-reverse justify-between ml-4 screen500:ml-2
                ${
                  inputVisible
                    ? "w-80 screen500:w-60 screen450:w-44 screen380:w-40"
                    : "w-16"
                }
                `}
              >
                <input
                  value={searchItem}
                  onChange={(e) => setSearchItem(e.target.value)}
                  dir="rtl"
                  placeholder="جست و جو ..."
                  className={`rounded-[22px] px-2 focus:outline-none w-full my-0.5 ${
                    inputVisible ? "" : "hidden"
                  }`}
                />
                <Image
                  onClick={() => {
                    setInputVisible((prev) => !prev);
                    searchHandler();
                  }}
                  src={Search}
                  width={30}
                  height={30}
                  alt="جست و جو "
                  className={`cursor-pointer mx-auto ${inputVisible && "ml-3"}`}
                />
              </div>

              <div
                className="border rounded-[20px] border-[#B7D3E4] w-80 flex flex-row-reverse justify-between 
                screen750:hidden         
              "
              >
                <input
                  value={searchItem}
                  onChange={(e) => setSearchItem(e.target.value)}
                  dir="rtl"
                  placeholder="جست و جو ..."
                  className="rounded-[20px] px-2 focus:outline-none w-full  my-0.5 "
                />
                <Image
                  onClick={searchHandler}
                  src={Search}
                  width={30}
                  height={30}
                  alt="جست و جو"
                  className="ml-2 cursor-pointer"
                />
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
                        پربازدید ترین
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
                      <div
                        onClick={() => {
                          cheapest();
                          setShowFilterItems(false);
                        }}
                        className="py-3 hover:bg-[#F7FAFD] pr-5"
                      >
                        ارزان ترین
                      </div>
                      <div
                        onClick={() => {
                          mostExpensive();
                          setShowFilterItems(false);
                        }}
                        className="py-3 hover:bg-[#F7FAFD] pr-5"
                      >
                        گران ترین
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {products && products.length === 0 ? (
            <div className="mt-16">
              <Info text="محصولی وجود ندارد!" />
            </div>
          ) : (
            <div
              style={{ direction: "rtl" }}
              className="grid grid-cols-3 justify-items-start gap-x-10 gap-y-20 p-10
                screen1550:grid-cols-2
                screen1550:justify-items-center
                screen750:grid-cols-1
                screen750:justify-items-center
                screen750:gap-0 "
            >
              {selectedCategory === 0 &&
                products.map((product) => (
                  <ProductDetails item={product} key={product.id} />
                ))}

              {selectedCategory !== 0 &&
                categories?.map((category) =>
                  category.id === selectedCategory
                    ? products.map((product) => (
                        <ProductDetails item={product} key={product.id} />
                      ))
                    : null
                )}
            </div>
          )}

          <div style={{ direction: "rtl" }} className="mt-20">
            {totalItems > 6 && (
              <Pagination
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                current={currentPage}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </div>

      <ContactUs />
    </div>
  );
};

export default Main;
