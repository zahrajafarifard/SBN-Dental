import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import DeleteIcon from "../../../assets/icons/trash-white.svg";
import EditIcon from "../../../assets/icons/edit-white.svg";
import InfoCircle from "../../../assets/icons/info-circle.svg";

const ProductDetails = ({ product, setProducts, setResponseMsg }) => {
  const navigate = useNavigate();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const _token = useSelector((state) => state.reducer.token);
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(_token);
  }, [_token, setToken]);

  const deleteProductHandler = async () => {
    let _response, _data;
    _response = await fetch(`${process.env.REACT_APP_URL}/api/product`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        productId: product?.id,
      }),
    });

    switch (_response.status) {
      case 200:
        _data = await _response.json();
        setResponseMsg("200");
        setProducts((prev) => {
          return prev.filter((item) => item.id !== product?.id);
        });
        break;

      case 500:
        setResponseMsg("500");

        break;

      default:
        setResponseMsg("500");
        break;
    }
  };

  const _DeleteBox = (
    <div className="bg-white z-20 mx-auto py-10 px-20 rounded-[32px] text-center">
      <img src={InfoCircle} className="mx-auto w-10 h-10 mb-8" />
      <div className="mb-8 text-[#4B5C66]">آیا از حذف محصول اطمینان دارید؟</div>

      <div
        className="flex flex-row-reverse justify-center items-center place-items-center gap-2 w-[100%]  mx-auto mt-10
         
        "
      >
        <div
          onClick={() => {
            setShowDeleteModal(false);
            deleteProductHandler();
          }}
          className="bg-[#EE5248] border border-[#EE5248] text-white text-sm text-center rounded-[20px] py-2 w-44 px-12 mx-auto"
        >
          حذف
        </div>
        <button
          onClick={() => {
            setShowDeleteModal(false);
          }}
          className="border border-[#EE5248] text-[#EE5248] rounded-[20px] text-sm py-2 w-44 px-10 mx-auto "
        >
          انصراف
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <div>
        <div className="bg-[#F7FAFD] rounded-full w-[400px] h-[400px] mx-auto my-auto flex relative">
          <img
            src={`${process.env.REACT_APP_URL}/uploads/${product?.ProductImages[0]?.mainImage}`}
            className="w-[220px]  mx-auto  my-auto h-fit"
          />
          <div
            onClick={() => setShowDeleteModal(true)}
            className="absolute cursor-pointer bottom-10 left-10 bg-[#EE5248] border-[#EE5248]  w-14 h-14 rounded-full"
          >
            <img
              src={DeleteIcon}
              className="w-7 h-7 mt-3 mx-auto my-auto inset-0  "
            />
          </div>
          <div
            onClick={() => {
              navigate("/edit-product", {
                state: {
                  productId: product?.id,
                },
              });
            }}
            className="absolute cursor-pointer bottom-10 right-10 bg-[#264490] border-[#264490] w-14 h-14 rounded-full"
          >
            <img
              src={EditIcon}
              className="w-7 h-7 mt-3 mx-auto my-auto inset-0  "
            />
          </div>
        </div>

        <div className="text-[#264490] text-xl font-bold text-center mt-8">
          {product?.productTitle}
        </div>
        <div className="text-[#264490] text-lg text-center mt-1">
          {Number(product?.price).toLocaleString()} تومان
        </div>
      </div>

      <div className={`${showDeleteModal && " relative"} `}>
        {showDeleteModal &&
          ReactDOM.createPortal(
            <>
              <div
                className="w-full h-full bg-[#4c4c4c]   opacity-60 fixed top-0 left-0 z-20 "
                onClick={() => {
                  setShowDeleteModal(false);
                }}
              />

              <div
                className="z-30 fixed justify-center h-fit mx-auto inset-x-0 my-auto inset-y-0  font-Vazir
                  w-[38%]
                           
                "
              >
                {_DeleteBox}
              </div>
            </>,

            document.getElementById("modal")
          )}
      </div>
    </div>
  );
};

export default ProductDetails;
