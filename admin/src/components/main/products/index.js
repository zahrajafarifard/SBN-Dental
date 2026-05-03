import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import TickSquare from "../../../assets/icons/tick-square.svg";
import InfoCircle from "../../../assets/icons/info-circle.svg";

import ProductDetails from "./product-details";
import Pagination from "../../shared-component/pagination";
import SearchFilter from "../../shared-component/serach-filter";
import Spinner from "../../shared-component/spinner";

const Products = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
  const _token = useSelector((state) => state.reducer.token);
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(_token);
  }, [_token, setToken]);

  const [products, setProducts] = useState([]);

  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

 

  useEffect(() => {
    const _products = async () => {
      setIsLoading(false);
      let _response, _data;
      _response = await fetch(
        `${process.env.REACT_APP_URL}/api/products/allProducts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            page: currentPage,
            pageSize: itemsPerPage,
          }),
        }
      );

      setIsLoading(false);
      switch (_response.status) {
        case 200:
          _data = await _response.json();

          setTotalItems(_data?.count);
          setProducts(_data?.rows);

          break;

        default:
          break;
      }
    };
    token && _products();
  }, [currentPage, itemsPerPage, setTotalItems, setCurrentPage, token]);

  const handlePageChange = (page) => {
    if (page !== "...") {
      setCurrentPage(page);
    }
  };

  return (
    <div className="">
      {responseMsg === "201" && (
        <div className="fixed inset-0 flex justify-center items-center z-10">
          <div
            onClick={() => setResponseMsg("")}
            className="fixed top-0 left-0 h-screen w-screen z-10 bg-gray-600 opacity-35"
          />
          <div className="bg-white z-20 mx-auto py-10 px-40 rounded-[32px] ">
            <img src={TickSquare} className="mx-auto w-10 h-10 mb-8" />
            <div className="mb-8 text-[#4B5C66]">محصول با موفقیت حذف شد!</div>
            <div
              onClick={() => setResponseMsg("")}
              className="bg-[#18D099] text-white text-sm text-center rounded-[20px] py-2 w-fit px-10"
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
              حذف محصول موفقیت آمیز نبود!
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

      <SearchFilter
        item={"محصول جدید"}
        navigateUrl={"/new-product"}
        setState={setProducts}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
      />

      {isLoading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-3 gap-10">
          {products?.map((item) => {
            return (
              <ProductDetails
                key={item.id}
                product={item}
                setProducts={setProducts}
                setResponseMsg={setResponseMsg}
              />
            );
          })}
        </div>
      )}

      <div className="my-20 flex justify-center ">
        <Pagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          current={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Products;
