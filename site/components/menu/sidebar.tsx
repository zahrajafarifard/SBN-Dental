"use client";

import { useState } from "react";
import Image from "next/image";

import NavLink from "../shared/navLink/navLink";

const Sidebar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="">
      {!isMenuOpen && (
        <Image
          onClick={() => {
            setIsMenuOpen((prev) => !prev);
          }}
          src="/images/menu.svg"
          alt="منو"
          width={45}
          height={40}
          className=" my-auto absolute top-6"
          style={{ width: "auto", height: "auto" }}
        />
      )}

      {isMenuOpen && (
        <div
          className="w-full h-full bg-[#4c4c4c]   opacity-60 fixed top-0 left-0 z-30 "
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <div
        className={`top-0  w-[90%]  text-center  h-screen bg-[#fff]   fixed  z-40   ${
          isMenuOpen
            ? "transition duration-1000 ease-in-out translate-x-0 right-0"
            : "transition duration-1000 ease-in-out translate-x-full right-0"
        }`}
      >
        <div className=" flex  px-4 pt-5 pb-4  flex-row-reverse justify-between border-b border-b-[#B7D3E4]   ">
          <div
            className="flex text-[12px] cursor-pointer "
            onClick={() => {
              setIsMenuOpen((prev) => !prev);
            }}
          >
            <Image
              src="/images/LOGO.svg"
              alt="sbn لوگو"
              width={120}
              height={64}
              style={{ width: "auto", height: "auto" }}
            />
          </div>
          <div
            className="flex text-[12px] cursor-pointer "
            onClick={() => {
              setIsMenuOpen((prev) => !prev);
            }}
          >
            <Image
              src="/images/close-square.svg"
              alt="sbn لوگو"
              width={50}
              height={50}
              style={{ width: "auto", height: "auto" }}
            />
          </div>
        </div>

        <ul
          style={{ direction: "rtl" }}
          className="flex flex-col place-items-start text-lg text-black  duration-700   tracking-tighter  pt-2
          justify-between  "
        >
          <li
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
            }}
            className="py-4 px-4 hover:bg-[#F7FAFD] w-full"
          >
            <NavLink href="/">خانه</NavLink>
          </li>

          <li
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
            }}
            className="py-4 px-4 hover:bg-[#F7FAFD] w-full"
          >
            <NavLink href="/products">محصولات</NavLink>
          </li>
          <li
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
            }}
            className="py-4 px-4 hover:bg-[#F7FAFD] w-full"
          >
            <NavLink href="/about-us">درباره ما</NavLink>
          </li>
          <li
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
            }}
            className="py-4 px-4 hover:bg-[#F7FAFD] w-full "
          >
            <NavLink href="/contact-us">تماس با ما</NavLink>
          </li>
          <li
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
            }}
            className="py-4 px-4 hover:bg-[#F7FAFD] w-full"
          >
            <NavLink href="/articles">مقالات</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
