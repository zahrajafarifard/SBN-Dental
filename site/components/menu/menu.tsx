"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
const Sidebar = dynamic(() => import("./sidebar"));

import NavLink from "../shared/navLink/navLink";

// import Sidebar from "./sidebar";

const Menu: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white text-[#4B5C66] p-4  screen750:flex screen750:flex-row-reverse">
      <div className="container mx-auto flex flex-row-reverse justify-start screen750:justify-between ">
        <div className=" w-1/3 text-2xl font-bold  flex items-center justify-center">
          <Link prefetch={true} href="/">
            <Image
              src="/images/LOGO.svg"
              alt="sbn لوگو"
              width={120}
              height={64}
              style={{ width: "auto", height: "auto" }}
            />
          </Link>
        </div>

        <ul
          style={{ direction: "rtl" }}
          className={`w-2/3  flex flex-row gap-x-10  my-auto screen750:h-screen
            screen1100:gap-x-4
            screen900:gap-x-2
            screen900:w-[94%]
            screen750:hidden
        `}
        >
          <li
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
            }}
            className="py-4 "
          >
            <NavLink href="/">خانه</NavLink>
          </li>
          <li
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
            }}
            className="py-4 "
          >
            <NavLink href="/products">محصولات</NavLink>
          </li>
          <li
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
            }}
            className="py-4 "
          >
            <NavLink href="/about-us">درباره ما</NavLink>
          </li>
          <li
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
            }}
            className="py-4  "
          >
            <NavLink href="/contact-us">تماس با ما</NavLink>
          </li>
          <li
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
            }}
            className="py-4 "
          >
            <NavLink href="/articles">مقالات</NavLink>
          </li>
        </ul>
      </div>

      <div className="hidden screen750:flex  w-fit  ">
        <Sidebar />
      </div>
    </nav>
  );
};

export default Menu;
