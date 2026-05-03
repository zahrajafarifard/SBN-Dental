import React, { useState } from "react";

import { useNavigate, useLocation } from "react-router-dom";
import Search from "../../../assets/icons/search.svg";
import Filter from "../../../assets/icons/filter button.svg";
import Add from "../../../assets/icons/add-circle.svg";
import style from "../../../style.module.css";

const SearchFilter = ({
  item,
  navigateUrl,
  setState,
  currentPage,
  itemsPerPage,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [showFilterItems, setShowFilterItems] = useState(false);
  const [searchItem, setSearchItem] = useState("");

  const mostVisited = async () => {
    let _response, _data;

    _response = await fetch(
      `${process.env.REACT_APP_URL}/sbn/${
        location.pathname.includes("product") ? "products" : "articles"
      }/mostVisited`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          page: currentPage,
          pageSize: itemsPerPage,
          selectedCategory: 0,
          admin: true,
        }),
      }
    );

    _data = await _response.json();

    setState(_data);
  };

  const newest = async () => {
    let _response, _data;

    _response = await fetch(
      `${process.env.REACT_APP_URL}/sbn/${
        location.pathname.includes("product") ? "products" : "articles"
      }/newest`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          page: currentPage,
          pageSize: itemsPerPage,
          selectedCategory: 0,
          admin: true,
        }),
      }
    );

    _data = await _response.json();
    setState(_data);
  };
  const cheapest = async () => {
    let _response, _data;

    _response = await fetch(
      `${process.env.REACT_APP_URL}/sbn/products/cheapest`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          page: currentPage,
          pageSize: itemsPerPage,
          selectedCategory: 0,
        }),
      }
    );

    _data = await _response.json();
    setState(_data);
  };
  const mostExpensive = async () => {
    let _response, _data;

    _response = await fetch(
      `${process.env.REACT_APP_URL}/sbn/products/mostExpensive`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          page: currentPage,
          pageSize: itemsPerPage,
          selectedCategory: 0,
        }),
      }
    );

    _data = await _response.json();
    setState(_data);
  };

  const searchHandler = async () => {
    let _response, _data;

    _response = await fetch(
      `${process.env.REACT_APP_URL}/sbn/${
        location.pathname.includes("product") ? "products" : "articles"
      }/search`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          searchItem,
          page: currentPage,
          pageSize: itemsPerPage,
          admin: true,
        }),
      }
    );

    _data = await _response.json();
    console.log("ddddddd", _data);

    setState(_data);
    setSearchItem("");
  };

  return (
    <div className="flex flex-row justify-between mb-10 ">
      <div className="border rounded-[20px] border-[#B7D3E4] w-1/3 p flex flex-row justify-between">
        <div style={{ direction: "rtl" }} className="text-[#929BA0]">
          <input
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}
            className="w-full p-3 rounded-[20px]  placeholder:text-[#C6CED3] text-[#4B5C66]  focus:outline-none"
            placeholder="جست و جو ..."
          />
        </div>
        <img
          onClick={searchHandler}
          src={Search}
          className="w-6 h-6 my-auto ml-3"
          alt="Search Icon"
        />
      </div>

      <div className="flex flex-row">
        {item && (
          <div
            onClick={() => {
              navigate(navigateUrl);
            }}
            style={{ borderRadius: "16px" }}
            className={`${style.backGround} flex flex-row w-fit my-auto p-3 ml-3`}
          >
            <img src={Add} className="w-6 h-6" />
            <div className="text-white mr-2"> {item}</div>
          </div>
        )}

        <div className="relative">
          <div onClick={() => setShowFilterItems((prev) => !prev)}>
            <img src={Filter} className="w-12 h-12" alt="" />
          </div>
          {showFilterItems && (
            <>
              <div
                onClick={() => {
                  setShowFilterItems(false);
                }}
                className="fixed top-0 left-0 h-screen w-screen z-10"
              />

              <div className="absolute z-20 top-[52px] left-0 bg-white rounded-2xl w-56 shadow-[-1px_1px_6px_0_rgba(0,0,0,0.15)] py-2 text-[#4B5C66]">
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
                {location.pathname.includes("product") && (
                  <div
                    onClick={() => {
                      cheapest();
                      setShowFilterItems(false);
                    }}
                    className="py-3 hover:bg-[#F7FAFD] pr-5"
                  >
                    ارزان ترین
                  </div>
                )}
                {location.pathname.includes("product") && (
                  <div
                    onClick={() => {
                      mostExpensive();
                      setShowFilterItems(false);
                    }}
                    className="py-3 hover:bg-[#F7FAFD] pr-5"
                  >
                    گران ترین
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
