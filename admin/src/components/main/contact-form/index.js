import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Details from "./details";
import Spinner from "../../shared-component/spinner";
import Pagination from "../../shared-component/pagination";

const ContactFrom = () => {
  const [contacts, setContacts] = useState([]);

  const _token = useSelector((state) => state.reducer.token);
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setToken(_token);
  }, [_token, setToken]);

  const handlePageChange = (page) => {
    if (page !== "...") {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    const _fetchFunction = async () => {
      setIsLoading(true);

      const response = await fetch(
        `${process.env.REACT_APP_URL}/api/contact-form`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            page: currentPage,
            pageSize: itemsPerPage,
          }),
        }
      );

      switch (response?.status) {
        case 200:
          const data = await response.json();

          setContacts(data?.rows);
          setIsLoading(false);

          setTotalItems(data?.count);
          // setProducts(data?.rows);

          break;

        default:
          setIsLoading(false);
          break;
      }
    };

    token && _fetchFunction();
  }, [
    currentPage,
    itemsPerPage,
    setTotalItems,
    setCurrentPage,
    token,
    setContacts,
  ]);

  return (
    <div className="w-[98%] ">
      <div className="grid grid-cols-5 bg-[#264490] rounded-2xl text-white px-8 py-2 mb-6">
        <div>ردیف</div>
        <div>نام و نام خانوادگی</div>
        <div>شماره تماس</div>
        <div className="col-span-2 text-center">پیام</div>
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        contacts?.map((item, index) => {
          return <Details key={item.id} item={item} index={index} />;
        })
      )}

      {totalItems > 6 && (
        <div className="my-20 flex justify-center ">
          <Pagination
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            current={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default ContactFrom;
