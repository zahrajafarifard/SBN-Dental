import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import moment from "moment-jalaali";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import DeleteIcon from "../../../assets/icons/trash.svg";
import EditIcon from "../../../assets/icons/edit-product.svg";
import InfoCircle from "../../../assets/icons/info-circle.svg";

const ArticleDetails = ({ article, setArticles }) => {
  const navigate = useNavigate();

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const _token = useSelector((state) => state.reducer.token);
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(_token);
  }, [_token, setToken]);

  const deleteArticleHandler = async () => {
    let _response, _data;
    _response = await fetch(`${process.env.REACT_APP_URL}/api/article`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },

      body: JSON.stringify({
        articleId: article?.id,
      }),
    });

    switch (_response.status) {
      case 200:
        _data = await _response.json();
        // setResponseMsg("200");
        setArticles((prev) => {
          return prev.filter((item) => item.id !== article?.id);
        });
        break;

      case 500:
        // setResponseMsg("500");

        break;

      default:
        // setResponseMsg("500");
        break;
    }
  };

  const _DeleteBox = (
    <div className="bg-white z-20 mx-auto py-10 px-20 rounded-[32px] text-center">
      <img src={InfoCircle} className="mx-auto w-10 h-10 mb-8" />
      <div className="mb-8 text-[#4B5C66]">آیا از حذف مقاله اطمینان دارید؟</div>

      <div className="flex flex-row-reverse justify-center items-center place-items-center gap-2 w-[100%]  mx-auto mt-10">
        <div
          onClick={() => {
            setShowDeleteModal(false);
            deleteArticleHandler();
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
      <div className="rounded-[20px] shadow-[-1px_1px_6px_0_rgba(0,0,0,0.15)] overflow-hidden ">
        <img
          src={`${process.env.REACT_APP_URL}/uploads/${article?.mainImage}`}
          className="w-full mx-auto  h-56"
        />

        <div className="p-4">
          <div className="flex flex-row justify-between mb-2">
            <div className="text-[#162933] ">{article?.articleTitle}</div>
            <div className="text-[#929BA0] text-sm">
              {moment(article?.createdAt).format("jYYYY/jM/jD")}
            </div>
          </div>

          <div className="text-[#4B5C66] text-sm leading-[22px] line-clamp-3 mb-3">
            {article?.sectionOneText}
          </div>

          <div className="flex flex-row justify-between">
            <div
              onClick={() => {
                navigate("/edit-article", {
                  state: {
                    articleId: article?.id,
                  },
                });
              }}
              className="flex flex-row cursor-pointer"
            >
              <div className="text-[#264490] text-sm">ویرایش</div>
              <img src={EditIcon} className="mr-2 w-5 h-5" />
            </div>
            <div
              onClick={() => setShowDeleteModal(true)}
              className="flex flex-row cursor-pointer"
            >
              <img src={DeleteIcon} className="mr-2 w-5 h-5" />
              <div className="text-[#EE5248] text-sm mr-2">حذف</div>
            </div>
          </div>
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

export default ArticleDetails;
