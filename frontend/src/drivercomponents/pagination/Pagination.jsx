import React from "react";
import "./pagination.css";

export default function Pagination({ ndriverpages, currentPage, setCurrentPage }) {
  // Display the numbers in between
  const pageNumbers = [...Array(ndriverpages + 1).keys()].slice(1);

  // Set the page number when next page is clicked
  const nextPage = () => {
    if (currentPage !== ndriverpages) setCurrentPage(currentPage + 1);
  };

  // Set the page number when previous page is clicked
  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  // Pagination buttons
  return (
    <div className="dpagination-container">
      <i
        className="fa-solid fa-backward-step"
        id="prev-button"
        aria-label="Previous page"
        title="Previous page"
        onClick={prevPage}
      ></i>
      {pageNumbers.map((pgNumber, index) => {
        return (
          <button
            key={index}
            className={`dpagination-number ${
              currentPage === pgNumber ? "active" : ""
            } `}
            onClick={() => setCurrentPage(pgNumber)}
          >
            {pgNumber}
          </button>
        );
      })}

      <i
        className="fa-solid fa-forward-step"
        id="next-button"
        aria-label="Next page"
        title="Next page"
        onClick={nextPage}
      ></i>
    </div>
  );
}
