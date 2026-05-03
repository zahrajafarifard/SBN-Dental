import React, { useState } from "react";
import ReactDOM from "react-dom";

import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Sidebar from "./components/sideBar";

import Articles from "./components/main/articles";
import NewArticles from "./components/main/articles/new-article";
import Products from "./components/main/products";
import Category from "./components/main/category";
import NewProduct from "./components/main/products/new-product";
import EditProduct from "./components/main/products/edit-product";
import EditArticle from "./components/main/articles/edit-article";
import ContactForm from "./components/main/contact-form";
import SocialMedia from "./components/main/social-media";

import User from "./assets/icons/user.svg";
import LogoutIcon from "./assets/icons/logout.svg";
import InfoCircle from "./assets/icons/info-circle.svg";

import { useDispatch } from "react-redux";
import { Logout } from "./store/action";

function MainLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showExitModal, setShowExitModal] = useState(false);

  const _LogoutBox = (
    <div
      className="pt-10 pb-12 px-20 w-full mx-auto  flex flex-col text-center  rounded-[32px] bg-white 
    screen1000:px-16
     screen850:pt-8
     screen850:pb-10
     screen850:px-4
    "
    >
      <img src={InfoCircle} className="w-10 h-10 mx-auto mb-8" />
      <div className="w-full mx-auto text-lg  text-[#4B5C66] ">
        آیا مطمئن هستید که می‌خواهید خارج شوید؟
      </div>
      <div
        className="flex flex-row-reverse justify-center items-center place-items-center gap-5 w-[78%]  mx-auto mt-10
        screen1000:w-[80%]
        "
      >
        <button
          onClick={() => {
            setShowExitModal(false);
            navigate("/", { replace: true });
            dispatch(Logout());
          }}
          className="w-56 mx-auto text-white border border-[#EE5248] font-bold bg-[#EE5248] py-3  rounded-[20px] text-sm 
          screen1000:text-base
          screen850:text-xs
          "
        >
          خروج
        </button>
        <button
          onClick={() => {
            setShowExitModal(false);
          }}
          className="w-56 mx-auto border border-[#EE5248] font-bold py-3 text-[#EE5248] rounded-[20px] text-sm 
          screen1000:text-base
           screen850:text-xs
          "
        >
          لغو
        </button>
      </div>
    </div>
  );

  return (
    <div className="font-Vazir">
      <div className=" w-full flex flex-row-reverse justify-between p-4 sticky top-0 bg-white z-50">
        <div className="border border-[#B7D3E4] w-[19%] py-2 px-3 rounded-2xl flex flex-row-reverse justify-start">
          <img src={User} className="w-6 h-6" />
          <div className="my-auto text-[#4B5C66] mr-3">ادمین </div>
        </div>
        <div
          onClick={() => {
            setShowExitModal(true);
          }}
          className="bg-[#EE5248] w-fit py-2 px-3 rounded-2xl flex flex-row-reverse justify-start my-auto cursor-pointer"
        >
          <img src={LogoutIcon} className="w-6 h-6" />
          <div className="text-white mr-2">خروج</div>
        </div>
      </div>
      <div style={{ direction: "rtl" }} className="flex  ">
        <div className="relative w-1/4 ">
          <Sidebar />
        </div>

        <div className="flex flex-col w-full">
          <div className="flex-grow p-4">
            <Routes>
              <Route path="/" element={<Articles />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/new-article" element={<NewArticles />} />
              <Route path="/products" element={<Products />} />
              <Route path="/categories" element={<Category />} />
              <Route path="/new-product" element={<NewProduct />} />
              <Route path="/edit-product" element={<EditProduct />} />
              <Route path="/edit-article" element={<EditArticle />} />
              <Route path="/contact-form" element={<ContactForm />} />
              <Route path="/social-media" element={<SocialMedia />} />
            </Routes>
          </div>
        </div>
      </div>

      <div className={`${showExitModal && " relative"} `}>
        {showExitModal &&
          ReactDOM.createPortal(
            <>
              <div
                className="w-full h-full bg-[#4c4c4c]   opacity-60 fixed top-0 left-0 z-20 "
                onClick={() => {
                  setShowExitModal(false);
                }}
              />

              <div
                className="z-30 fixed justify-center h-fit mx-auto inset-x-0 my-auto inset-y-0  font-Vazir
                  w-[40%]
                  screen1350:w-1/2
                  screen1250:w-[60%]
                  screen620:w-[80%]
                  screen440:w-[95%]
                  "
              >
                {_LogoutBox}
              </div>
            </>,

            document.getElementById("modal")
          )}
      </div>
    </div>
  );
}

export default MainLayout;
