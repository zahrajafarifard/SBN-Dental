import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import ArticleDetails from "./article-details";
import Pagination from "../../shared-component/pagination";
import SearchFilter from "../../shared-component/serach-filter";
import Spinner from "../../shared-component/spinner";

const Articles = () => {
  const [isLoading, setIsLoading] = useState(false);

  const _token = useSelector((state) => state.reducer.token);
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(_token);
  }, [_token, setToken]);

  const [articles, setArticles] = useState([]);

  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const _articles = async () => {
      setIsLoading(true);
      let _response, _data;
      _response = await fetch(
        `${process.env.REACT_APP_URL}/api/articles/getArticles`,
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

      setIsLoading(false);

      switch (_response.status) {
        case 200:
          _data = await _response.json();
          setTotalItems(_data?.count);
          setArticles(_data?.rows);
          break;

        default:
          break;
      }
    };
    token && _articles();
  }, [
    currentPage,
    itemsPerPage,
    setTotalItems,
    setCurrentPage,
    token,
    // setArticles,
  ]);

  const handlePageChange = (page) => {
    if (page !== "...") {
      setCurrentPage(page);
    }
  };

  return (
    <div className="">
      <SearchFilter
        item={"مقاله جدید"}
        navigateUrl={"/new-article"}
        setState={setArticles}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
      />

      {isLoading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {articles?.map((item) => {
            return (
              <ArticleDetails
                key={item.id}
                article={item}
                setArticles={setArticles}
              />
            );
          })}
        </div>
      )}

      <div className="my-20 flex justify-center">
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

export default Articles;
