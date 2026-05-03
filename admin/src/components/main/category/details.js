import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";

import DeleteIcon from "../../../assets/icons/trash.svg";
import EditIcon from "../../../assets/icons/edit-product.svg";
import CheckCircleIcon from "../../../assets/images/check_circle.svg";

const FileTypeDetails = ({
  category,
  index,
  setCategories,
  setEditingCategory,
}) => {
  const _token = useSelector((state) => state.reducer.token);

  const [token, setToken] = useState("");
  const [showDeleteBox, setShowDeleteBox] = useState(false);

  useEffect(() => {
    setToken(_token);
  }, [_token, token]);

  const deleteFileHandler = async () => {
    let _response, _data;

    _response = await fetch(
      `${process.env.REACT_APP_URL}/api/delete-category`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          id: category?.id,
        }),
      }
    );

    switch (_response.status) {
      case 200:
        // _data = await _response.json();
        setEditingCategory({ id: "", value: "" });

        setCategories((prevStates) => {
          return prevStates.filter((item) => item?.id !== category?.id);
        });

        break;

      default:
        break;
    }
  };
  return (
    <div className="w-full mx-auto grid grid-cols-8 border border-[#B7D3E4] text-[#4B5C66] rounded-2xl my-4 py-2 ">
      <div className="bg-[#264490] rounded-full w-6 h-6 my-auto text-sm  text-white  mx-auto flex items-center justify-center">
        {index + 1}
      </div>
      <div className="my-auto mx-auto">{category?.name}</div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div>
        <div className="text-center flex flex-row justify-center  ">
          <div
            onClick={() => {
              setEditingCategory({ id: category?.id, value: category?.name });
            }}
            className="py-1 px-2 my-auto rounded-sm cursor-pointer"
          >
            <img src={EditIcon} className="w-5 h-5 my-auto" />
          </div>
          <div
            onClick={() => setShowDeleteBox(true)}
            className=" mx-2  py-1 px-2 my-auto rounded-sm cursor-pointer"
          >
            <img src={DeleteIcon} className="w-6 h-6 my-auto" />
          </div>
        </div>
      </div>

      <div className={`${showDeleteBox && " relative"} `}>
        {showDeleteBox &&
          ReactDOM.createPortal(
            <div>
              <div
                className="w-full h-full bg-[#4c4c4c]  opacity-60 fixed top-0 left-0 z-20 "
                onClick={() => setShowDeleteBox(false)}
              />

              <div className="bg-white font-Vazir rounded-[32px] py-10 px-20 w-1/3 z-30 fixed justify-center h-fit mx-auto inset-x-0 my-auto inset-y-0">
                <div className=" w-full mx-auto">
                  <img src={CheckCircleIcon} className=" w-10 h-10 mx-auto" />
                </div>
                <div className="text-xl text-right text-[#4B5C66] mx-auto w-fit pt-3">
                  آیا از حذف این دسته بندی مطمئن هستید؟
                </div>
                <div className="mt-10 flex flex-row w-[75%] mx-auto">
                  <div
                    onClick={() => setShowDeleteBox(false)}
                    className="border border-[#EE5248] text-center text-[#EE5248] text-lg mx-auto  py-3 rounded-[20px] cursor-pointer w-44  mr-2"
                  >
                    انصراف
                  </div>

                  <div
                    onClick={() => {
                      setShowDeleteBox(false);
                      deleteFileHandler();
                    }}
                    className="bg-[#EE5248] text-white text-center text-lg mx-auto py-3 rounded-[20px] cursor-pointer w-44  ml-2"
                  >
                    حذف
                  </div>
                </div>
              </div>
            </div>,

            document.getElementById("modal")
          )}
      </div>
    </div>
  );
};

export default FileTypeDetails;
