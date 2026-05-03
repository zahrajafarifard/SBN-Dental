import React from "react";
import Image from "next/image";

import arrowBackward from "@/public/images/arrow-left-pagination-disable.svg";
import arrowForward from "@/public/images/arrow-right-pagination.svg";

// Defining prop types for the Pagination component
interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  current: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  current,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const generatePagination = () => {
    const pages: (number | string)[] = [];

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

    // Always show the last page if there's more than one page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = generatePagination();

  return (
    <div className="flex flex-row-reverse justify-center items-center">
      {/* Left Arrow (Backward) */}
      {current === 1 ? (
        <Image
          src={arrowBackward}
          alt="Previous"
          className="w-8 h-8 my-auto mx-4 "
        />
      ) : (
        <Image
          src={arrowForward}
          alt="Previous"
          className="w-8 h-8 my-auto mx-4 transform scale-x-[-1]"
          onClick={() => onPageChange(current - 1)}
        />
      )}

      {/* Pagination Buttons */}
      {pages.map((page, index) => (
        <button
          key={index}
          onClick={() => {
            if (typeof page === "number") {
              onPageChange(page);
            }
          }}
          className={`mx-3 my-auto ${
            page === current
              ? "border border-[#264490] bg-[#264490] rounded-lg py-1 px-[14px] text-white "
              : "text-[#B7D3E4] border border-[#B7D3E4] rounded-lg py-1 px-3   bg-white  "
          }`}
          disabled={page === "..."}
        >
          {page}
        </button>
      ))}

      {/* Right Arrow (Forward) */}
      {current === totalPages ? (
        <Image
          src={arrowBackward}
          alt="Next"
          className="w-8 h-8 my-auto mx-4 scale-x-[-1]"
        />
      ) : (
        <Image
          src={arrowForward}
          alt="Next"
          className="w-8 h-8 my-auto mx-4"
          onClick={() => onPageChange(current + 1)}
        />
      )}
    </div>
  );
};

export default Pagination;
