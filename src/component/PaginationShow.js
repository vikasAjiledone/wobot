import React from "react";
import ReactPaginate from "react-paginate";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const PaginationShow = ({
  rowsPerPage,
  handleRowsPerPageChange,
  currentPage,
  pageCount,
  handlePageClick,
}) => {
  return (
    <div className="pagination_style">
      <div className="rows_per_page">
        <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div>
      <div className="page-number">
        {currentPage + 1} of {pageCount}
      </div>
      <ReactPaginate
        previousLabel={<MdChevronLeft />}
        nextLabel={<MdChevronRight />}
        breakLabel={""}
        onPageChange={handlePageClick}
        forcePage={currentPage}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        marginPagesDisplayed={0}
        pageRangeDisplayed={0}
        containerClassName={"pagination"}
        activeClassName={"active"}
        previousClassName={"prev"}
        nextClassName={"next"}
        disabledClassName={"disabled"}
      />
    </div>
  );
};

export default PaginationShow;
