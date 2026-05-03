import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SketchPicker } from "react-color";

import AddImg from "../../../assets/icons/gallery-add.svg";
import AddImgIcn from "../../../assets/icons/add-circle.svg";
import EditIcon from "../../../assets/icons/edit.svg";
import TickSquare from "../../../assets/icons/tick-square.svg";
import InfoCircle from "../../../assets/icons/info-circle.svg";
import CategotyDetails from "./categoty-details";

const NewProduct = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [color, setColor] = useState("");
  const [showColorPicker, setShowColorPicker] = useState(false);

  const [responseMsg, setResponseMsg] = useState("");
  const [showCategotyItems, setShowCategoryItems] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");

  const _token = useSelector((state) => state.reducer.token);
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(_token);
  }, [_token, setToken]);

  const [formValues, setFormValues] = useState({
    productTitle: "",
    category: "",
    price: "",
    mainDescriptionSectionOne: "",
    mainDescriptionItems: "",
    keyWord1: "",
    keyWord2: "",
    keyWord3: "",
  });

  const handleChangeComplete = (newColor) => {
    setColor(newColor.hex);
  };

  const [compositions, setCompositions] = useState([
    { title: "", description: "" },
  ]);

  const [productDetails, setProductDetails] = useState([
    { title: "", description: "" },
  ]);
  const [usageInstructions, setUsageInstructions] = useState([
    { description: "" },
  ]);

  const handleUsageInstructionsChange = (e, index) => {
    const { name, value } = e.target;

    const updatedUsage = usageInstructions.map((usage, i) =>
      i === index ? { ...usage, [name]: value } : usage
    );
    setUsageInstructions(updatedUsage);
  };
  const handleProductDetailsChange = (e, index) => {
    const { name, value } = e.target;

    const updatedProductDetails = productDetails.map((product, i) =>
      i === index ? { ...product, [name]: value } : product
    );
    setProductDetails(updatedProductDetails);
  };

  const handleCompositionChange = (e, index) => {
    const { name, value } = e.target;

    const updatedCompositions = compositions.map((composition, i) =>
      i === index ? { ...composition, [name]: value } : composition
    );
    setCompositions(updatedCompositions);
  };

  const [previewImages, setPreviewImages] = useState({
    mainImagePreview: null,
    image1Preview: null,
    image2Preview: null,
    image3Preview: null,
  });

  const mainImageInputRef = useRef(null);
  const image1InputRef = useRef(null);
  const image2InputRef = useRef(null);
  const image3InputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
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

  const triggerFileInput = (ref) => {
    if (ref.current) {
      ref.current.click();
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const validCompositions = compositions.filter(
      (composition) =>
        composition.title.trim() !== "" && composition.description.trim() !== ""
    );
    const validProductDeails = productDetails.filter(
      (product) =>
        product.title.trim() !== "" && product.description.trim() !== ""
    );
    const validUsageInstructions = usageInstructions.filter(
      (usage) => usage.description.trim() !== ""
    );

    const formData = new FormData();
    formData.append("productTitle", formValues.productTitle);
    formData.append("category", categoryId);
    formData.append("price", formValues.price);
    formData.append("bgColor", color);
    formData.append("keyWord1", formValues.keyWord1);
    formData.append("keyWord2", formValues.keyWord2);
    formData.append("keyWord3", formValues.keyWord3);
    formData.append(
      "mainDescriptionSectionOne",
      formValues.mainDescriptionSectionOne
    );
    formData.append("mainDescriptionItems", formValues.mainDescriptionItems);

    validCompositions.forEach((obj, index) => {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          formData.append(`composition[${index}][${key}]`, obj[key]);
        }
      }
    });
    validProductDeails.forEach((obj, index) => {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          formData.append(`productDetails[${index}][${key}]`, obj[key]);
        }
      }
    });
    validUsageInstructions.forEach((obj, index) => {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          formData.append(`usageInstructions[${index}][${key}]`, obj[key]);
        }
      }
    });

    if (mainImageInputRef.current.files[0]) {
      formData.append("mainImage", mainImageInputRef.current.files[0]);
    }
    if (image1InputRef.current.files[0]) {
      formData.append("image1", image1InputRef.current.files[0]);
    }
    if (image2InputRef.current.files[0]) {
      formData.append("image2", image2InputRef.current.files[0]);
    }
    if (image3InputRef.current.files[0]) {
      formData.append("image3", image3InputRef.current.files[0]);
    }

    // for (let pair of formData.entries()) {
    //   console.log(pair[0], pair[1]); // This will log each field name and its value
    // }
    let response;
    try {
      // response = await axios.post(
      //   `${process.env.REACT_APP_URL}/api/products`,
      //   formData
      // );

      response = await fetch(`${process.env.REACT_APP_URL}/api/products`, {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        body: formData,
      });
    } catch (error) {
      setResponseMsg("500");
      setIsLoading(false);
    }

    switch (response.status) {
      case 201:
        setIsLoading(false);
        setResponseMsg("201");
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

          setFormValues((prev) => ({ ...prev, category: _data[0].name }));

          setCategoryId(_data[0].id);
          break;
        case 500:
          break;

        default:
          break;
      }
    };

    token && _cats();
  }, [token]);

  const addNewUsage = () => {
    const lastUsageInstructions =
      usageInstructions[usageInstructions.length - 1];

    if (lastUsageInstructions.description.trim() === "") {
      alert(
        "Please fill out both the title and description of the last composition before adding a new one."
      );
      return;
    }

    if (usageInstructions.length < 6) {
      setUsageInstructions([...usageInstructions, { description: "" }]);
    }
  };
  const addNewComposition = () => {
    const lastComposition = compositions[compositions.length - 1];

    if (
      lastComposition.title.trim() === "" ||
      lastComposition.description.trim() === ""
    ) {
      alert(
        "Please fill out both the title and description of the last composition before adding a new one."
      );
      return;
    }

    if (compositions.length < 6) {
      setCompositions([...compositions, { title: "", description: "" }]);
    }
  };
  const addNewProductDetails = () => {
    const lastProductDetails = productDetails[productDetails.length - 1];

    if (
      lastProductDetails.title.trim() === "" ||
      lastProductDetails.description.trim() === ""
    ) {
      alert(
        "Please fill out both the title and description of the last ProductDetails before adding a new one."
      );
      return;
    }

    if (productDetails.length < 6) {
      setProductDetails([...productDetails, { title: "", description: "" }]);
    }
  };

  useEffect(() => {
    const lastUsageInstructions =
      usageInstructions[usageInstructions.length - 1];

    if (lastUsageInstructions.description.trim() !== "") {
      addNewUsage();
    }
  }, [usageInstructions]);

  useEffect(() => {
    const lastProductDetails = productDetails[productDetails.length - 1];

    if (
      lastProductDetails.title.trim() !== "" &&
      lastProductDetails.description.trim() !== ""
    ) {
      addNewProductDetails();
    }
  }, [productDetails]);

  useEffect(() => {
    const lastComposition = compositions[compositions.length - 1];

    if (
      lastComposition.title.trim() !== "" &&
      lastComposition.description.trim() !== ""
    ) {
      addNewComposition();
    }
  }, [compositions]);

  return (
    <div className="w-[98%] relative">
      {responseMsg === "201" && (
        <div className="fixed inset-0 flex justify-center items-center z-10">
          <div
            onClick={() => {
              setResponseMsg("");
              navigate("/products");
            }}
            className="fixed top-0 left-0 h-screen w-screen z-10 bg-gray-600 opacity-35"
          />
          <div className="bg-white z-20 mx-auto py-10 px-40 rounded-[32px] ">
            <img src={TickSquare} className="mx-auto w-10 h-10 mb-8" />
            <div className="mb-8 text-[#4B5C66]">محصول با موفقیت اضافه شد!</div>
            <div
              onClick={() => {
                setResponseMsg("");
                navigate("/products");
              }}
              className="bg-[#18D099] text-white text-sm text-center rounded-[20px] py-2 w-fit px-10 mx-auto"
            >
              برو به محصولات
            </div>
          </div>
        </div>
      )}
      {responseMsg === "500" && (
        <div className="fixed inset-0 flex justify-center items-center z-10">
          <div
            onClick={() => {
              setResponseMsg("");
            }}
            className="absolute top-0 left-0 h-screen w-screen bg-gray-600 opacity-35 z-10"
          />
          <div className="bg-white z-20 mx-auto py-10 px-40 rounded-[32px] text-center">
            <img src={InfoCircle} className="mx-auto w-10 h-10 mb-8" />
            <div className="mb-8 text-[#4B5C66]">
              بارگذاری محصول موفقیت آمیز نبود!
            </div>
            <div
              onClick={() => setResponseMsg("")}
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

      <div className="flex flex-row gap-6 h-[340px]">
        <div className="w-1/2">
          <div className="text-[#264490] mb-2 font-semibold">عنوان محصول</div>
          <input
            name="productTitle"
            value={formValues.productTitle}
            onChange={handleInputChange}
            placeholder="عنوان محصول"
            className="w-full rounded-[20px] p-4 border border-[#B7D3E4]  placeholder:text-[#C6CED3] text-[#4B5C66]  mb-8 focus:outline-none"
          />
          <div className="text-[#264490] mb-2 font-semibold"> دسته بندی</div>
          <div className="relative">
            <input
              name="category"
              value={formValues.category}
              onChange={handleInputChange}
              autoComplete="off"
              onClick={() => setShowCategoryItems((prev) => !prev)}
              className="w-full rounded-[20px] p-4 border border-[#B7D3E4]  placeholder:text-[#C6CED3] text-[#4B5C66]  mb-8 focus:outline-none "
            />
            {showCategotyItems && (
              <div className="border rounded-[20px] border-[#B7D3E4] absolute top-16 overflow-hidden w-full">
                <div
                  onClick={() => setShowCategoryItems(false)}
                  className="fixed top-0 left-0 h-screen w-screen z-10"
                />
                {categories?.map((item) => {
                  return (
                    <CategotyDetails
                      category={item}
                      key={item.id}
                      // position={16}
                      setShowCategoryItems={setShowCategoryItems}
                      setFormValues={setFormValues}
                      setCategoryId={setCategoryId}
                    />
                  );
                })}
              </div>
            )}
          </div>
          <div className="text-[#264490] mb-2 font-semibold">قیمت </div>
          <input
            name="price"
            value={formValues.price}
            onChange={handleInputChange}
            placeholder="قیمت"
            className="w-full rounded-[20px] p-4 border border-[#B7D3E4]  placeholder:text-[#C6CED3] text-[#4B5C66]  mb-8 focus:outline-none"
          />
        </div>

        <div className="w-1/2 border border-[#B7D3E4] rounded-[20px] flex flex-col justify-center items-center relative ">
          {previewImages.mainImagePreview ? (
            <div
              style={{ backgroundColor: color }}
              className="w-full h-full  rounded-[20px]"
            >
              <img
                src={previewImages.mainImagePreview}
                alt="Main Preview"
                className="w-fit h-full mx-auto"
              />
              <button
                className="absolute top-4 right-4 bg-[#DEB900] py-2 px-3 rounded-[16px] flex flex-row"
                onClick={() => {
                  setShowColorPicker(!showColorPicker);
                }}
              >
                <img src={AddImgIcn} alt="Edit" className="w-[22px] h-[22px]" />
                <div className="text-white text-sm mr-2"> پس زمینه اختصاصی</div>
              </button>

              {showColorPicker && (
                <>
                  <div
                    className="w-full h-full  fixed top-0 left-0 z-20 "
                    onClick={() => {
                      setShowColorPicker(false);
                    }}
                  />
                  <div className=" absolute top-14 z-20">
                    <SketchPicker
                      color={color}
                      onChangeComplete={handleChangeComplete}
                      width="300px"
                    />
                  </div>
                </>
              )}

              <button
                className="absolute top-4 left-4 bg-[#264490] py-2 px-3 rounded-[16px] flex flex-row"
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
            onChange={(e) => handleFileUpload(e, "mainImage")}
          />
        </div>
      </div>
      <div className="flex flex-row pr-4 text-start w-1/2 mr-[50%] mt-2">
        <img src={InfoCircle} className="w-5 h-5 my-auto" />
        <div className="text-[#EE5248] my-auto pr-1">
          تصویر اصلی را بدون پیش زمینه ( بک گراند) وارد کنید.
        </div>
      </div>

      <div className="text-[#264490] mb-2 font-semibold mt-6">
        توضیحات اصلی (بخش اول)
      </div>
      <input
        name="mainDescriptionSectionOne"
        value={formValues.mainDescriptionSectionOne}
        onChange={handleInputChange}
        placeholder="توضیحات اصلی (بخش اول)"
        className="w-full rounded-[20px] p-4 border border-[#B7D3E4]  placeholder:text-[#C6CED3] text-[#4B5C66]  mb-8 focus:outline-none"
      />

      <div className="text-[#264490] mb-2 font-semibold">
        توضیحات اصلی (آیتم ها)
      </div>
      <input
        name="mainDescriptionItems"
        value={formValues.mainDescriptionItems}
        onChange={handleInputChange}
        placeholder="توضیحات اصلی (آیتم ها)"
        className="w-full rounded-[20px] p-4 border border-[#B7D3E4]  placeholder:text-[#C6CED3] text-[#4B5C66]   focus:outline-none"
      />
      <div className="flex flex-row  text-start mt-2 mb-8">
        <img src={InfoCircle} className="w-5 h-5 my-auto" />
        <div className="text-[#EE5248] my-auto pr-1">
          برای جدا کردن هر آیتم، بین جملات سه عدد ستاره (***) قرار دهید.
        </div>
      </div>

      <div className="text-[#264490] mb-2 font-semibold">کلمه کلیدی 1</div>
      <input
        name="keyWord1"
        value={formValues.keyWord1}
        onChange={handleInputChange}
        placeholder="کلمه کلیدی 1"
        className="w-full rounded-[20px] p-4 border border-[#B7D3E4]  placeholder:text-[#C6CED3] text-[#4B5C66]  mb-8 focus:outline-none"
      />
      <div className="text-[#264490] mb-2 font-semibold">کلمه کلیدی 2</div>
      <input
        name="keyWord2"
        value={formValues.keyWord2}
        onChange={handleInputChange}
        placeholder="کلمه کلیدی 2"
        className="w-full rounded-[20px] p-4 border border-[#B7D3E4]  placeholder:text-[#C6CED3] text-[#4B5C66]  mb-8 focus:outline-none"
      />
      <div className="text-[#264490] mb-2 font-semibold">کلمه کلیدی 3</div>
      <input
        name="keyWord3"
        value={formValues.keyWord3}
        onChange={handleInputChange}
        placeholder="کلمه کلیدی 3"
        className="w-full rounded-[20px] p-4 border border-[#B7D3E4]  placeholder:text-[#C6CED3] text-[#4B5C66]  mb-8 focus:outline-none"
      />

      <div className="bg-[#264490] text-white rounded-2xl w-full mx-auto text-2xl font-bold text-center py-1 mb-6 my-6">
        جزئیات محصول
      </div>

      <div className="flex flex-row gap-4 h-[290px] mb-6">
        {/* Image 1 */}
        <div className="w-1/3 border border-[#B7D3E4] rounded-[20px] flex flex-col justify-center items-center relative overflow-hidden">
          {previewImages.image1Preview ? (
            <div className="w-full h-full">
              <img
                src={previewImages.image1Preview}
                alt="Image 1 Preview"
                className="w-full h-full"
              />
              <button
                className="absolute top-4 right-4 bg-[#DEB900] py-2 px-3 rounded-[16px] flex flex-row"
                onClick={() => triggerFileInput(image1InputRef)}
              >
                <img src={EditIcon} alt="Edit" className="w-[22px] h-[22px]" />
                <div className="text-white text-sm mr-2">ویرایش تصویر</div>
              </button>
            </div>
          ) : (
            <div
              className="bg-[#264490] w-16 h-16 rounded-full flex justify-center items-center cursor-pointer"
              onClick={() => triggerFileInput(image1InputRef)}
            >
              <img src={AddImg} alt="Add" />
            </div>
          )}
          {!previewImages.image1Preview && (
            <div className="text-[#587BD3] text-sm mt-1">تصویر 1</div>
          )}
          <input
            type="file"
            ref={image1InputRef}
            style={{ display: "none" }}
            name="image1"
            onChange={(e) => handleFileUpload(e, "image1")}
          />
        </div>

        {/* Image 2 */}
        <div className="w-1/3 border border-[#B7D3E4] rounded-[20px] flex flex-col justify-center items-center relative overflow-hidden">
          {previewImages.image2Preview ? (
            <div className="w-full h-full">
              <img
                src={previewImages.image2Preview}
                alt="Image 2 Preview"
                className="w-full h-full"
              />
              <button
                className="absolute top-4 right-4 bg-[#DEB900] py-2 px-3 rounded-[16px] flex flex-row"
                onClick={() => triggerFileInput(image2InputRef)}
              >
                <img src={EditIcon} alt="Edit" className="w-[22px] h-[22px]" />
                <div className="text-white text-sm mr-2">ویرایش تصویر</div>
              </button>
            </div>
          ) : (
            <div
              className="bg-[#264490] w-16 h-16 rounded-full flex justify-center items-center cursor-pointer"
              onClick={() => triggerFileInput(image2InputRef)}
            >
              <img src={AddImg} alt="Add" />
            </div>
          )}
          {!previewImages.image2Preview && (
            <div className="text-[#587BD3] text-sm mt-1">تصویر 2</div>
          )}
          <input
            type="file"
            ref={image2InputRef}
            style={{ display: "none" }}
            name="image2"
            onChange={(e) => handleFileUpload(e, "image2")}
          />
        </div>

        {/* Image 3 */}
        <div className="w-1/3 border border-[#B7D3E4] rounded-[20px] flex flex-col justify-center items-center relative overflow-hidden">
          {previewImages.image3Preview ? (
            <div className="w-full h-full">
              <img
                src={previewImages.image3Preview}
                alt="Image 3 Preview"
                className="w-full h-full"
              />
              <button
                className="absolute top-4 right-4 bg-[#DEB900] py-2 px-3 rounded-[16px] flex flex-row"
                onClick={() => triggerFileInput(image3InputRef)}
              >
                <img src={EditIcon} alt="Edit" className="w-[22px] h-[22px]" />
                <div className="text-white text-sm mr-2">ویرایش تصویر</div>
              </button>
            </div>
          ) : (
            <div
              className="bg-[#264490] w-16 h-16 rounded-full flex justify-center items-center cursor-pointer"
              onClick={() => triggerFileInput(image3InputRef)}
            >
              <img src={AddImg} alt="Add" />
            </div>
          )}
          {!previewImages.image3Preview && (
            <div className="text-[#587BD3] text-sm mt-1">تصویر 3</div>
          )}
          <input
            type="file"
            ref={image3InputRef}
            style={{ display: "none" }}
            name="image3"
            onChange={(e) => handleFileUpload(e, "image3")}
          />
        </div>
      </div>

      <div className="text-[#264490] mb-6 font-semibold text-2xl">
        ترکیبات محصول
      </div>

      {compositions.map((composition, index) => (
        <div className="flex flex-row gap-4 " key={index}>
          <div className="w-1/2">
            <div className="text-[#264490] mb-2 font-semibold">عنوان </div>
            <input
              name="title"
              value={composition.title}
              onChange={(e) => handleCompositionChange(e, index)}
              placeholder={`ترکیب ${index + 1}`}
              className="w-full rounded-[20px] p-4 border border-[#B7D3E4] placeholder:text-[#C6CED3] text-[#4B5C66] mb-8 focus:outline-none"
            />
          </div>

          <div className="w-1/2">
            <div className="text-[#264490] mb-2 font-semibold">توضیح</div>
            <input
              name="description"
              value={composition.description}
              onChange={(e) => handleCompositionChange(e, index)}
              placeholder={`توضیح ${index + 1}`}
              className="w-full rounded-[20px] p-4 border border-[#B7D3E4] placeholder:text-[#C6CED3] text-[#4B5C66] mb-8 focus:outline-none"
            />
          </div>
        </div>
      ))}

      <div className="text-[#264490] mb-6 font-semibold text-2xl">
        جزئیات محصول
      </div>
      {productDetails?.map((product, index) => (
        <div className="flex flex-row gap-4 " key={index}>
          <div className="w-1/2">
            <div className="text-[#264490] mb-2 font-semibold">عنوان </div>
            <input
              name="title"
              value={product.title}
              onChange={(e) => handleProductDetailsChange(e, index)}
              placeholder={`ترکیب ${index + 1}`}
              className="w-full rounded-[20px] p-4 border border-[#B7D3E4] placeholder:text-[#C6CED3] text-[#4B5C66] mb-8 focus:outline-none"
            />
          </div>

          <div className="w-1/2">
            <div className="text-[#264490] mb-2 font-semibold">توضیح</div>
            <input
              name="description"
              value={product.description}
              onChange={(e) => handleProductDetailsChange(e, index)}
              placeholder={`توضیح ${index + 1}`}
              className="w-full rounded-[20px] p-4 border border-[#B7D3E4] placeholder:text-[#C6CED3] text-[#4B5C66] mb-8 focus:outline-none"
            />
          </div>
        </div>
      ))}

      <div className="text-[#264490] mb-6 font-semibold text-2xl">
        طریقه مصرف
      </div>

      {usageInstructions?.map((usageInstruction, index) => (
        <div key={index} className="w-full">
          <div className="text-[#264490] mb-2 font-semibold">توضیح</div>
          <input
            name="description"
            value={usageInstruction.description}
            onChange={(e) => handleUsageInstructionsChange(e, index)}
            placeholder={`توضیح ${index + 1}`}
            className="w-full rounded-[20px] p-4 border border-[#B7D3E4] placeholder:text-[#C6CED3] text-[#4B5C66] mb-8 focus:outline-none"
          />
        </div>
      ))}

      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="bg-[#264490] border w-56 mx-auto flex justify-center mt-1 text-white rounded-[20px] py-2 disabled:bg-[#C6CED3] disabled:text-white"
      >
        تایید و بارگذاری
      </button>
    </div>
  );
};

export default NewProduct;
