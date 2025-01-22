import React from "react";
import "../styles/Pagination.css";

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
    return (
        <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
                <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={`pagination-button ${currentPage === index + 1 ? "active" : ""}`}
                >
                    {index + 1}
                </button>
            ))}
        </div>
    );
};

export default Pagination;
