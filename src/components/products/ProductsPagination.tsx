import React from 'react';
import ReactPaginate from 'react-paginate';
import '../../styles/pagination.css';

interface ProductsPaginationProps {
    pageCount: number;
    currentPage: number;
    onPageChange: (selected: { selected: number }) => void;
}

export function ProductsPagination({
    pageCount,
    currentPage,
    onPageChange,
}: ProductsPaginationProps) {
    if (pageCount <= 1) return null;

    return (
        <div className='w-full flex justify-center mb-6'>
            <ReactPaginate
                breakLabel='...'
                nextLabel='Вперед'
                previousLabel='Назад'
                onPageChange={onPageChange}
                pageRangeDisplayed={3}
                marginPagesDisplayed={1}
                pageCount={pageCount}
                containerClassName='pagination'
                pageLinkClassName='page-link'
                previousLinkClassName='page-link'
                nextLinkClassName='page-link'
                activeClassName='active'
                forcePage={currentPage}
            />
        </div>
    );
}
