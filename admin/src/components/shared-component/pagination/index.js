// Pagination.js
import React from "react";

import arrowBackwardDisabled from "../../../assets/icons/arrow-left.svg";
import arrowForward from "../../../assets/icons/arrow-right.svg";

const Pagination = ({ totalItems, itemsPerPage, current, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const generatePagination = () => {
    let pages = [];

    // Always show the first page
    pages.push(1);

    // Show dots if current page is far from the first page
    if (current > 3) {
      pages.push("...");
    }

    // Show the previous page, current page, and next page
    if (current > 2) {
      pages.push(current - 1);
    }
    if (current !== 1 && current !== totalPages) {
      pages.push(current);
    }
    if (current < totalPages - 1) {
      pages.push(current + 1);
    }

    // Show dots if current page is far from the last page
    if (current < totalPages - 2) {
      pages.push("...");
    }

    // Always show the last page

    // if (totalPages !== 0 ) {
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = generatePagination();

  return (
    <div className="flex flex-row-reverse justify-center items-center">
      {current === 1 ? (
        <img src={arrowBackwardDisabled} className="w-8 h-8 my-auto mx-4 " />
      ) : (
        <img
          src={arrowForward}
          className="w-8 h-8 my-auto mx-4 transform scale-x-[-1]"
        />
      )}
      {pages.map((page, index) => {
        return (
          <button
            key={index}
            onClick={() => {
              if (page === "<" && current > 1) {
                onPageChange(current - 1);
              } else if (page === ">" && current < totalPages) {
                onPageChange(current + 1);
              } else if (page !== "<" && page !== ">" && page !== "...") {
                onPageChange(page);
              }
            }}
            className={`mx-2 my-auto ${
              page === current
                ? "border border-[#264490] bg-[#264490] rounded-lg py-1 px-[14px] text-white "
                : "text-[#B7D3E4] border border-[#B7D3E4] rounded-lg py-1 px-3   bg-white  "
            }`}
          >
            {page}
          </button>
        );
      })}

      {current === totalPages ? (
        <img
          src={arrowBackwardDisabled}
          className="w-8 h-8 my-auto mx-4 transform scale-x-[-1]"
        />
      ) : (
        <img src={arrowForward} className="w-8 h-8 my-auto mx-4" />
      )}
    </div>
  );
};

export default Pagination;
