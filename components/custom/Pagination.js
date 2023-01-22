import React from 'react';
import ReactPaginate from 'react-paginate';

function Pagination({
  handlePagination,
  currentPage,
  totalRecords,
  totalPages,
  rowPerPage,
}) {
  const count = Number(Math.ceil(totalRecords / rowPerPage));

  return (
    <div>
      <ReactPaginate
        previousLabel={'Pre'}
        nextLabel={'Next'}
        pageCount={totalPages || 1}
        activeClassName="text-primary"
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={(page) => handlePagination(page)}
        pageClassName={'px-3 border border-secondary-light'}
        // nextLinkClassName={''}
        nextClassName={'px-1 bg-primary'}
        previousClassName={'px-1 bg-primary'}
        // previousLinkClassName={'page-link'}
        // pageLinkClassName={''}
        containerClassName={'flex'}
      />
    </div>
  );
}

export default Pagination;
