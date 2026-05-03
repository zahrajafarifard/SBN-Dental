import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import AddIcon from "../../../assets/icons/add-circle.svg";
import WarningIcon from "../../../assets/icons/info-circle.svg";
import CategoryDetails from "./details";

import styles from "../../../style.module.css";
import Spinner from "../../shared-component/spinner";

const Category = () => {
  const _token = useSelector((state) => state.reducer.token);
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [categoryName, setCategoryName] = useState("");
  const [editingCategory, setEditingCategory] = useState({ id: "", value: "" });

  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setToken(_token);
  }, [_token]);

  useEffect(() => {
    setCategoryName(editingCategory.value);
  }, [editingCategory]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    const _getCategories = async () => {
      try {
        setIsLoading(false);

        const _response = await fetch(
          `${process.env.REACT_APP_URL}/api/categories`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        if (_response.status === 200) {
          const _data = await _response.json();
          setCategories(_data);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        console.error("Failed to fetch categories:", error);
      }
    };

    if (token) {
      _getCategories();
    }
  }, [token, categoryName]);

  const addCategoryHandler = async () => {
    let _response, _data;
    setIsLoading(false);

    _response = await fetch(`${process.env.REACT_APP_URL}/api/addCategory`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },

      body: JSON.stringify({
        categoryName,
      }),
    });

    setCategoryName("");
    switch (_response.status) {
      case 201:
        // _data = await _response.json();
        setIsLoading(false);

        break;
      case 409:
        setMessage("مقدار وارد شده تکراری است !");
        setIsLoading(false);
        break;

      default:
        setIsLoading(false);

        break;
    }
  };

  const editCategoryHandler = async () => {
    let _response, _data;
    setIsLoading(true);

    _response = await fetch(`${process.env.REACT_APP_URL}/api/editCategory`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },

      body: JSON.stringify({
        categoryId: editingCategory?.id,
        categoryName,
      }),
    });

    setCategoryName("");
    setEditingCategory({ id: "", value: "" });

    switch (_response.status) {
      case 200:
        // _data = await _response.json();
        setIsLoading(false);

        break;
      case 403:
        setMessage("مقدار وارد شده تکراری است !");
        setIsLoading(false);

        break;
      case 404:
        setIsLoading(false);

        break;
      case 500:
        setIsLoading(false);

        break;

      default:
        setIsLoading(false);
        break;
    }
  };

  return (
    <div className=" w-full mx-auto flex flex-col place-items-center ">
      {message !== "" && (
        <div className="w-fit text-[#434242] text-sm flex flex-row  border border-[#EE5248] p-2 rounded-sm my-auto">
          <img src={WarningIcon} alt="آیکن هشدار" className="my-auto w-6 h-6" />

          <div
            style={{ direction: "rtl" }}
            className="my-auto mr-2 text-[#EE5248]"
          >
            {message}
          </div>
        </div>
      )}
      <div className="w-full text-[#264490] mb-2 mt-10 ">عنوان دسته بندی</div>
      <div className="w-full flex flex-row  justify-between gap-8 mb-8">
        <input
          value={categoryName}
          placeholder="دسته بندی جدید را وارد کنید"
          onChange={(e) => setCategoryName(e.target.value)}
          className="w-[80%] mx-auto rounded-[20px] py-4 px-4  placeholder:text-[#C6CED3] text-[#4B5C66]  my-auto border-[#B7D3E4] 
          border focus:outline-none focus:ring-0"
        />

        <div
          className={` ${
            styles.backGround
          } w-[20%]  mx-auto my-auto  text-lg flex flex-row items-center justify-center 
         text-white px-2 py-[14px] rounded-[16px]   ${
           !categoryName || isLoading ? "cursor-not-allowed" : "cursor-pointer"
         }`}
          onClick={
            !editingCategory?.value ? addCategoryHandler : editCategoryHandler
          }
        >
          <img src={AddIcon} className="w-6 h-6 my-auto ml-2" />
          {editingCategory?.value !== ""
            ? "ویرایش دسته بندی"
            : " افزودن دسته بندی"}
        </div>
      </div>
      <div className="w-full mx-auto ">
        <div
          style={{ direction: "rtl" }}
          className="grid grid-cols-8 bg-[#264490]  w-full mx-auto py-2 text-[#fff] rounded-2xl text-sm "
        >
          <div className="my-auto mx-auto">ردیف</div>
          <div className="my-auto mx-auto"> نام</div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className="my-auto mx-auto">عملیات</div>
        </div>
        <div className="w-full mx-auto h-[650px] overflow-y-auto overflow-hidden">
          {isLoading ? (
            <Spinner />
          ) : (
            categories?.map((category, index) => {
              return (
                <CategoryDetails
                  category={category}
                  key={category.id}
                  index={index}
                  setCategories={setCategories}
                  setEditingCategory={setEditingCategory}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Category;
