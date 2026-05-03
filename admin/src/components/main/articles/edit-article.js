import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import { useLocation, useNavigate } from "react-router-dom";

import AddImg from "../../../assets/icons/gallery-add.svg";
import EditIcon from "../../../assets/icons/edit.svg";
import TickSquare from "../../../assets/icons/tick-square.svg";
import InfoCircle from "../../../assets/icons/info-circle.svg";

import CategoryDetails from "./category-details";

const EditArticle = () => {
  const location = useLocation();
  const navigate = useNavigate();

  let _articleId = location?.state?.articleId;

  const [isLoading, setIsLoading] = useState(false);

  const _token = useSelector((state) => state.reducer.token);
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(_token);
  }, [_token, setToken]);

  const [formData, setFormData] = useState({
    articleTitle: "",
    shortDescription: "",
    authorName: "",
    sectionOneTitle: "",
    sectionOneText: "",
    sectionTwoTitle: "",
    sectionTwoText: "",
    sectionThreeTitle: "",
    sectionThreeText: "",
    sectionFourTitle: "",
    sectionFourText: "",
    sectionFiveTitle: "",
    sectionFiveText: "",
    sectionSixTitle: "",
    sectionSixText: "",
    category: "",
    mainImage: null,
    sectionTwoImage: null,
    sectionFourImage: null,
    sectionFiveImage: null,
  });

  const [showCategotyItems, setShowCategoryItems] = useState(false);

  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");

  const [previewImages, setPreviewImages] = useState({
    mainImagePreview: null,
    sectionTwoImagePreview: null,
    sectionFourImagePreview: null,
    sectionFiveImagePreview: null,
  });

  const [responseMsg, setResponseMsg] = useState("");

  const mainImageInputRef = useRef(null);
  const sectionTwoImageInputRef = useRef(null);
  const sectionFourImageInputRef = useRef(null);
  const sectionFiveImageInputRef = useRef(null);

  useEffect(() => {
    const _fetchProduct = async () => {
      let _response, _data;
      _response = await fetch(
        `${process.env.REACT_APP_URL}/api/article/${_articleId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      switch (_response.status) {
        case 200:
          _data = await _response.json();

          setFormData({
            articleTitle: _data?.articleTitle,
            shortDescription: _data?.shortDescription,
            authorName: _data?.authorName,
            sectionOneTitle: _data?.sectionOneTitle,
            sectionOneText: _data?.sectionOneText,
            sectionTwoTitle: _data?.sectionTwoTitle,
            sectionTwoText: _data?.sectionTwoText,
            sectionThreeTitle: _data?.sectionThreeTitle,
            sectionThreeText: _data?.sectionThreeText,
            sectionFourTitle: _data?.sectionFourTitle,
            sectionFourText: _data?.sectionFourText,
            sectionFiveTitle: _data?.sectionFiveTitle,
            sectionFiveText: _data?.sectionFiveText,
            sectionSixTitle: _data?.sectionSixTitle,
            sectionSixText: _data?.sectionSixText,
            category: _data?.Category?.name,
          });

          setCategoryId(_data?.Category?.id);

          setPreviewImages({
            mainImagePreview: _data?.mainImage,
            sectionTwoImagePreview: _data?.sectionTwoImage,
            sectionFourImagePreview: _data?.sectionFourImage,
            sectionFiveImagePreview: _data?.sectionFiveImage,
          });

          break;

        case 500:
          break;

        default:
          break;
      }
    };

    token && _fetchProduct();
  }, [_articleId, token]);

  useEffect(() => {
    const _cats = async () => {
      let _response, _data;

      _response = await fetch(`${process.env.REACT_APP_URL}/api/categories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      switch (_response.status) {
        case 200:
          _data = await _response.json();

          setCategories(_data);

          // setFormData((prev) => ({ ...prev, category: _data[0].name }));

          // setCategoryId(_data[0].id);
          break;
        case 500:
          break;

        default:
          break;
      }
    };

    token && _cats();
  }, [token]);

  const calculateReadingTime = (text) => {
    const wordsPerMinute = 150; // Average reading speed
    const words = text.trim().split(/\s+/).length; // Split text by spaces and count words
    const minutes = words / wordsPerMinute;
    return Math.ceil(minutes); // Round up to the nearest whole number
  };

  const combinedText = [
    formData.sectionOneText,
    formData.sectionTwoText,
    formData.sectionThreeText,
    formData.sectionFourText,
    formData.sectionFiveText,
    formData.sectionSixText,
  ].join(" "); // Join all section texts into one

  // Calculate reading time
  const readingTime = calculateReadingTime(combinedText);

  const handleSubmit = async () => {
    setIsLoading(true);
    let response;
    const formDataToSend = new FormData();

    formDataToSend.append("articleId", _articleId);
    formDataToSend.append("articleTitle", formData.articleTitle);
    formDataToSend.append("shortDescription", formData.shortDescription);
    formDataToSend.append("authorName", formData.authorName);
    formDataToSend.append("readingTime", readingTime);
    formDataToSend.append("sectionOneTitle", formData.sectionOneTitle);
    formDataToSend.append("sectionOneText", formData.sectionOneText);
    formDataToSend.append("sectionTwoTitle", formData.sectionTwoTitle);
    formDataToSend.append("sectionTwoText", formData.sectionTwoText);
    formDataToSend.append("sectionThreeTitle", formData.sectionThreeTitle);
    formDataToSend.append("sectionThreeText", formData.sectionThreeText);
    formDataToSend.append("sectionFourTitle", formData.sectionFourTitle);
    formDataToSend.append("sectionFourText", formData.sectionFourText);
    formDataToSend.append("sectionFiveTitle", formData.sectionFiveTitle);
    formDataToSend.append("sectionFiveText", formData.sectionFiveText);
    formDataToSend.append("sectionSixTitle", formData.sectionSixTitle);
    formDataToSend.append("sectionSixText", formData.sectionSixText);
    formDataToSend.append("category", categoryId);

    if (mainImageInputRef.current.files[0]) {
      formDataToSend.append("mainImage", mainImageInputRef.current.files[0]);
    }
    if (sectionTwoImageInputRef.current.files[0]) {
      formDataToSend.append(
        "sectionTwoImage",
        sectionTwoImageInputRef.current.files[0]
      );
    }
    if (sectionFourImageInputRef.current.files[0]) {
      formDataToSend.append(
        "sectionFourImage",
        sectionFourImageInputRef.current.files[0]
      );
    }
    if (sectionFiveImageInputRef.current.files[0]) {
      formDataToSend.append(
        "sectionFiveImage",
        sectionFiveImageInputRef.current.files[0]
      );
    }

    // for (let pair of formDataToSend.entries()) {
    //   console.log(pair[0], pair[1]);
    // }

    try {
      response = await axios.patch(
        `${process.env.REACT_APP_URL}/api/articles`,
        formDataToSend,
        {
          timeout: 10000,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      setResponseMsg("500");
      setIsLoading(false);
      // if (error.code === "ECONNABORTED") {
      //   console.error("Request timed out:", error);
      // } else if (error.response.status === 500) {
      //   console.error("Server error:", error.response);
      //   setResponseMsg("500");
      // } else {
      //   console.error("Error submitting article:", error.message);
      // }
    }

    switch (response?.status) {
      case 200:
        setIsLoading(false);
        setResponseMsg("200");
        break;
      case 500:
        setIsLoading(false);
        setResponseMsg("500");
        break;

      default:
        setIsLoading(false);
        break;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileUpload = (e, imageType) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImages((prev) => ({
          ...prev,
          [`${imageType}Preview`]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = (inputRef) => {
    inputRef.current.click();
  };

  return (
    <div className="w-[98%] relative">
      {responseMsg === "200" && (
        <div className="fixed inset-0 flex justify-center items-center z-10">
          <div
            onClick={() => {
              setResponseMsg("");
              navigate("/articles");
            }}
            className="fixed top-0 left-0 h-screen w-screen z-10 bg-gray-600 opacity-35"
          />
          <div className="bg-white z-20 mx-auto  py-10 px-40 rounded-[32px] ">
            <img src={TickSquare} className="mx-auto w-10 h-10 mb-8" />
            <div className="mb-8 text-[#4B5C66]">
              مقاله با موفقیت بروزرسانی شد!
            </div>
            <div
              onClick={() => {
                setResponseMsg("");
                navigate("/articles");
              }}
              className="bg-[#18D099] text-white text-sm text-center rounded-[20px] py-2 w-fit px-10 mx-auto"
            >
              برو به مقالات
            </div>
          </div>
        </div>
      )}
      {responseMsg === "500" && (
        <div className="fixed inset-0 flex justify-center items-center z-10">
          <div
            onClick={() => setResponseMsg("")}
            className="absolute top-0 left-0 h-screen w-screen bg-gray-600 opacity-35 z-10"
          />
          <div className="bg-white z-20 mx-auto py-10 px-40 rounded-[32px] text-center">
            <img src={InfoCircle} className="mx-auto w-10 h-10 mb-8" />
            <div className="mb-8 text-[#4B5C66]">
              بارگذاری مقاله موفقیت آمیز نبود!
            </div>
            <div
              onClick={() => {
                setResponseMsg("");
              }}
              className="bg-[#EE5248] text-white text-sm text-center rounded-[20px] py-2 w-fit px-10 mx-auto"
            >
              تلاش دوباره
            </div>
          </div>
        </div>
      )}

      <div className="bg-[#264490] text-white rounded-2xl w-full mx-auto text-2xl font-bold text-center py-1 mb-6">
        جزئیات اصلی
      </div>

      <div className="relative">
        <div className="text-[#264490] mb-2 font-semibold"> دسته بندی</div>
        <input
          name="category"
          value={formData?.category}
          onChange={handleInputChange}
          onClick={() => setShowCategoryItems((prev) => !prev)}
          className="w-full rounded-[20px] p-4 border border-[#B7D3E4]  placeholder:text-[#C6CED3] text-[#4B5C66]  mb-8 focus:outline-none"
        />

        {showCategotyItems && (
          <div className="border rounded-[20px] border-[#B7D3E4] absolute top-24 overflow-hidden w-full">
            <div
              onClick={() => setShowCategoryItems(false)}
              className="fixed top-0 left-0 h-screen w-screen z-10"
            />
            {categories?.map((item) => {
              return (
                <CategoryDetails
                  category={item}
                  key={item.id}
                  // position={24}
                  setShowCategoryItems={setShowCategoryItems}
                  setFormValues={setFormData}
                  setCategoryId={setCategoryId}
                />
              );
            })}
          </div>
        )}
      </div>

      <div className="flex flex-row gap-6 h-[340px]">
        <div className="w-1/2">
          <div className="text-[#264490] mb-2 font-semibold">عنوان مقاله</div>
          <input
            name="articleTitle"
            value={formData.articleTitle}
            onChange={handleInputChange}
            placeholder="انتخاب مسواک مناسب"
            className="w-full rounded-[20px] p-4 border border-[#B7D3E4]  placeholder:text-[#C6CED3] text-[#4B5C66]  mb-8 focus:outline-none"
          />
          <div className="text-[#264490] mb-2 font-semibold">توضیحات کوتاه</div>
          <input
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleInputChange}
            placeholder="راهنمایی برای انتخاب بهترین مسواک برای بهداشت دهان"
            className="w-full rounded-[20px] p-4 border border-[#B7D3E4]  placeholder:text-[#C6CED3] text-[#4B5C66]  mb-8 focus:outline-none"
          />
          <div className="text-[#264490] mb-2 font-semibold">نام نویسنده</div>
          <input
            name="authorName"
            value={formData.authorName}
            onChange={handleInputChange}
            placeholder="ادمین SBN Dental"
            className="w-full rounded-[20px] p-4 border border-[#B7D3E4]  placeholder:text-[#C6CED3] text-[#4B5C66]  mb-8 focus:outline-none"
          />
        </div>
        <div className="w-1/2  border border-[#B7D3E4] rounded-[20px] flex flex-col justify-center items-center relative overflow-hidden">
          {previewImages.mainImagePreview ? (
            <div className="w-full h-full">
              <img
                src={
                  previewImages.mainImagePreview.includes("data:image")
                    ? previewImages.mainImagePreview
                    : `${process.env.REACT_APP_URL}/uploads/${previewImages?.mainImagePreview}`
                }
                alt="Main Preview"
                className="w-full h-full"
              />
              <button
                className="absolute top-4 right-4 bg-[#DEB900]  py-2 px-3 rounded-[16px] flex flex-row"
                onClick={() => triggerFileInput(mainImageInputRef)}
              >
                <img src={EditIcon} alt="Edit" className="w-[22px] h-[22px]" />
                <div className="text-white text-sm mr-2">ویرایش تصویر</div>
              </button>
            </div>
          ) : (
            <div
              className="bg-[#264490] w-16 h-16 rounded-full flex justify-center items-center cursor-pointer"
              onClick={() => triggerFileInput(mainImageInputRef)}
            >
              <img src={AddImg} alt="Add" />
            </div>
          )}
          {!previewImages.mainImagePreview && (
            <div className="text-[#587BD3] text-sm mt-1">تصویر اصلی</div>
          )}
          <input
            type="file"
            ref={mainImageInputRef}
            style={{ display: "none" }}
            name="mainImage"
            onChange={(e) =>
              handleFileUpload(e, "mainImage", "mainImagePreview")
            }
          />
        </div>
      </div>

      <div className="bg-[#264490] text-white rounded-2xl w-full mx-auto text-2xl font-bold text-center py-1 my-6">
        بدنه مقاله
      </div>

      <div className="text-[#264490] mb-6 font-bold text-2xl">بخش یک</div>

      <div className="text-[#264490] mb-2 font-semibold">عنوان</div>
      <input
        name="sectionOneTitle"
        value={formData.sectionOneTitle}
        onChange={handleInputChange}
        placeholder="متن خود را وارد کنید"
        className="w-full rounded-[20px] p-4 border border-[#B7D3E4]  placeholder:text-[#C6CED3] text-[#4B5C66]  mb-8 focus:outline-none"
      />

      <div className="text-[#264490] mb-2 font-semibold">متن 1</div>
      <textarea
        name="sectionOneText"
        value={formData.sectionOneText}
        onChange={handleInputChange}
        rows={4}
        placeholder="متن خود را وارد کنید"
        className="w-full rounded-[20px] p-4 border border-[#B7D3E4]  placeholder:text-[#C6CED3] text-[#4B5C66]  mb-8 focus:outline-none"
      />

      <div className="text-[#264490] mb-6 font-bold text-2xl">بخش دو</div>

      <div className="flex flex-row gap-6 h-[230px]">
        <div className="w-2/3">
          <div className="text-[#264490] mb-2 font-semibold">عنوان</div>
          <input
            name="sectionTwoTitle"
            value={formData.sectionTwoTitle}
            onChange={handleInputChange}
            placeholder="عنوان خود را وارد کنید"
            className="w-full rounded-[20px] p-4 border border-[#B7D3E4]  placeholder:text-[#C6CED3] text-[#4B5C66]  mb-8 focus:outline-none"
          />
          <div className="text-[#264490] mb-2 font-semibold">متن دو</div>
          <input
            name="sectionTwoText"
            value={formData.sectionTwoText}
            onChange={handleInputChange}
            placeholder="متن خود را وارد کنید"
            className="w-full rounded-[20px] p-4 border border-[#B7D3E4]  placeholder:text-[#C6CED3] text-[#4B5C66]  mb-8 focus:outline-none"
          />
        </div>
        <div className="w-1/3 border border-[#B7D3E4] rounded-[20px] flex flex-col justify-center items-center relative overflow-hidden">
          {previewImages.sectionTwoImagePreview ? (
            <div className="w-full h-full">
              <img
                src={
                  previewImages.sectionTwoImagePreview.includes("data:image")
                    ? previewImages.sectionTwoImagePreview
                    : `${process.env.REACT_APP_URL}/uploads/${previewImages?.sectionTwoImagePreview}`
                }
                alt="Section Two Preview"
                className="w-full h-full"
              />
              <button
                className="absolute top-4 right-4 bg-[#DEB900]  py-2 px-3 rounded-[16px] flex flex-row"
                onClick={() => triggerFileInput(sectionTwoImageInputRef)}
              >
                <img src={EditIcon} alt="Edit" className="w-[22px] h-[22px]" />
                <div className="text-white text-sm mr-2">ویرایش تصویر</div>
              </button>
            </div>
          ) : (
            <div
              className="bg-[#264490] w-16 h-16 rounded-full flex justify-center items-center cursor-pointer"
              onClick={() => triggerFileInput(sectionTwoImageInputRef)}
            >
              <img src={AddImg} alt="Add" />
            </div>
          )}
          {!previewImages.sectionTwoImagePreview && (
            <div className="text-[#587BD3] text-sm mt-1">تصویر بخش 2</div>
          )}
          <input
            type="file"
            ref={sectionTwoImageInputRef}
            style={{ display: "none" }}
            name="sectionTwoImage"
            onChange={(e) =>
              handleFileUpload(e, "sectionTwoImage", "sectionTwoImagePreview")
            }
          />
        </div>
      </div>

      <div className="text-[#264490] mb-6 font-bold text-2xl">بخش سه</div>

      <div className="text-[#264490] mb-2 font-semibold">عنوان</div>
      <input
        name="sectionThreeTitle"
        value={formData.sectionThreeTitle}
        onChange={handleInputChange}
        placeholder="متن خود را وارد کنید"
        className="w-full rounded-[20px] p-4 border border-[#B7D3E4]  placeholder:text-[#C6CED3] text-[#4B5C66]  mb-8 focus:outline-none"
      />

      <div className="text-[#264490] mb-2 font-semibold">متن 3</div>
      <textarea
        name="sectionThreeText"
        value={formData.sectionThreeText}
        onChange={handleInputChange}
        rows={4}
        placeholder="متن خود را وارد کنید"
        className="w-full rounded-[20px] p-4 border border-[#B7D3E4]  placeholder:text-[#C6CED3] text-[#4B5C66]  mb-8 focus:outline-none"
      />

      <div className="text-[#264490] mb-6 font-bold text-2xl">بخش چهار</div>

      <div className="flex flex-row gap-6 h-[230px]">
        <div className="w-2/3">
          <div className="text-[#264490] mb-2 font-semibold">عنوان</div>
          <input
            name="sectionFourTitle"
            value={formData.sectionFourTitle}
            onChange={handleInputChange}
            placeholder="عنوان خود را وارد کنید"
            className="w-full rounded-[20px] p-4 border border-[#B7D3E4]  placeholder:text-[#C6CED3] text-[#4B5C66]  mb-8 focus:outline-none"
          />
          <div className="text-[#264490] mb-2 font-semibold">متن 4</div>
          <input
            name="sectionFourText"
            value={formData.sectionFourText}
            onChange={handleInputChange}
            placeholder="متن خود را وارد کنید"
            className="w-full rounded-[20px] p-4 border border-[#B7D3E4]  placeholder:text-[#C6CED3] text-[#4B5C66]  mb-8 focus:outline-none"
          />
        </div>
        <div className="w-1/3 border border-[#B7D3E4] rounded-[20px] flex flex-col justify-center items-center relative overflow-hidden">
          {previewImages.sectionFourImagePreview ? (
            <div className="w-full h-full">
              <img
                src={
                  previewImages.sectionFourImagePreview.includes("data:image")
                    ? previewImages.sectionFourImagePreview
                    : `${process.env.REACT_APP_URL}/uploads/${previewImages?.sectionFourImagePreview}`
                }
                alt="Section Four Preview"
                className="w-full h-full  "
              />
              <button
                className="absolute top-4 right-4 bg-[#DEB900] py-2 px-3 rounded-[16px] flex flex-row"
                onClick={() => triggerFileInput(sectionFourImageInputRef)}
              >
                <img src={EditIcon} alt="Edit" className="w-[22px] h-[22px]" />
                <div className="text-white text-sm mr-2">ویرایش تصویر</div>
              </button>
            </div>
          ) : (
            <div
              className="bg-[#264490] w-16 h-16 rounded-full flex justify-center items-center cursor-pointer"
              onClick={() => triggerFileInput(sectionFourImageInputRef)}
            >
              <img src={AddImg} alt="Add" />
            </div>
          )}
          {!previewImages.sectionFourImagePreview && (
            <div className="text-[#587BD3] text-sm mt-1">تصویر بخش 4</div>
          )}
          <input
            type="file"
            ref={sectionFourImageInputRef}
            name="sectionFourImage"
            style={{ display: "none" }}
            onChange={(e) =>
              handleFileUpload(e, "sectionFourImage", "sectionFourImagePreview")
            }
          />
        </div>
      </div>

      <div className="text-[#264490] mb-6 font-bold text-2xl">بخش پنج</div>

      <div className="flex flex-row gap-6 h-[230px]">
        <div className="w-2/3">
          <div className="text-[#264490] mb-2 font-semibold">عنوان</div>
          <input
            name="sectionFiveTitle"
            value={formData.sectionFiveTitle}
            onChange={handleInputChange}
            placeholder="عنوان خود را وارد کنید"
            className="w-full rounded-[20px] p-4 border border-[#B7D3E4]  placeholder:text-[#C6CED3] text-[#4B5C66]  mb-8 focus:outline-none"
          />
          <div className="text-[#264490] mb-2 font-semibold">متن 5</div>
          <input
            name="sectionFiveText"
            value={formData.sectionFiveText}
            onChange={handleInputChange}
            placeholder="متن خود را وارد کنید"
            className="w-full rounded-[20px] p-4 border border-[#B7D3E4]  placeholder:text-[#C6CED3] text-[#4B5C66]  mb-8 focus:outline-none"
          />
        </div>
        <div className="w-1/3 border border-[#B7D3E4] rounded-[20px] flex flex-col justify-center items-center relative overflow-hidden">
          {previewImages.sectionFiveImagePreview ? (
            <div className="w-full h-full">
              <img
                src={
                  previewImages.sectionFiveImagePreview.includes("data:image")
                    ? previewImages.sectionFiveImagePreview
                    : `${process.env.REACT_APP_URL}/uploads/${previewImages?.sectionFiveImagePreview}`
                }
                alt="Section Five Preview"
                className="w-full h-full"
              />
              <button
                className="absolute top-4 right-4 bg-[#DEB900]  py-2 px-3 rounded-[16px] flex flex-row"
                onClick={() => triggerFileInput(sectionFiveImageInputRef)}
              >
                <img src={EditIcon} alt="Edit" className="w-[22px] h-[22px]" />
                <div className="text-white text-sm mr-2">ویرایش تصویر</div>
              </button>
            </div>
          ) : (
            <div
              className="bg-[#264490] w-16 h-16 rounded-full flex justify-center items-center cursor-pointer"
              onClick={() => triggerFileInput(sectionFiveImageInputRef)}
            >
              <img src={AddImg} alt="Add" />
            </div>
          )}
          {!previewImages.sectionFiveImagePreview && (
            <div className="text-[#587BD3] text-sm mt-1">تصویر بخش 5</div>
          )}
          <input
            type="file"
            ref={sectionFiveImageInputRef}
            name="sectionFiveImage"
            style={{ display: "none" }}
            onChange={(e) =>
              handleFileUpload(e, "sectionFiveImage", "sectionFiveImagePreview")
            }
          />
        </div>
      </div>

      <div className="text-[#264490] mb-6 font-bold text-2xl">بخش شش</div>

      <div className="text-[#264490] mb-2 font-semibold">عنوان</div>
      <input
        name="sectionSixTitle"
        value={formData.sectionSixTitle}
        onChange={handleInputChange}
        placeholder="متن خود را وارد کنید"
        className="w-full rounded-[20px] p-4 border border-[#B7D3E4]  placeholder:text-[#C6CED3] text-[#4B5C66]  mb-8 focus:outline-none"
      />

      <div className="text-[#264490] mb-2 font-semibold">متن 6</div>
      <textarea
        name="sectionSixText"
        value={formData.sectionSixText}
        onChange={handleInputChange}
        rows={4}
        placeholder="متن خود را وارد کنید"
        className="w-full rounded-[20px] p-4 border border-[#B7D3E4]  placeholder:text-[#C6CED3] text-[#4B5C66]  mb-8 focus:outline-none"
      />

      <button
        onClick={() => handleSubmit()}
        disabled={isLoading}
        className="bg-[#264490] border w-56 mx-auto flex justify-center mt-1 text-white rounded-[20px] py-2 disabled:bg-[#C6CED3] disabled:text-white"
      >
        بروزرسانی مقاله
      </button>
    </div>
  );
};

export default EditArticle;
