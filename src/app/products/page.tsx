'use client';

import { ProductCard } from '@/components/ProductCard';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import '../../styles/pagination.css';
import { Loader } from '@/components/Loader';
import Link from 'next/link';
import {
    api,
    useDeleteProductMutation,
    useGetProductsQuery,
    useGetTotalProductsCountQuery,
} from '@/services/api';
import { useAppDispatch } from '@/store/hooks';

const ITEMS_PER_PAGE = 8;

export default function ProductsList() {
    const [currentPage, setCurrentPage] = useState(0);
    const dispatch = useAppDispatch();
    const [deleteProduct] = useDeleteProductMutation();

    const {
        data: products = [],
        isLoading,
        error,
    } = useGetProductsQuery({
        page: currentPage + 1,
        limit: ITEMS_PER_PAGE,
    });
    const { data: countData } = useGetTotalProductsCountQuery();
    const totalProducts = countData?.total || 0;
    const pageCount = Math.ceil(totalProducts / ITEMS_PER_PAGE);

    const handlePageClick = (event: { selected: number }) => {
        setCurrentPage(event.selected);
    };

    const handleToggleLike = (id: number) => {
        const likedProducts = JSON.parse(localStorage.getItem('likedProducts') || '[]');
        const isLiked = likedProducts.includes(id);

        const newLikedProducts = isLiked
            ? likedProducts.filter((productId: number) => productId !== id)
            : [...likedProducts, id];

        localStorage.setItem('likedProducts', JSON.stringify(newLikedProducts));
        dispatch(
            api.util.updateQueryData(
                'getProducts',
                { page: currentPage + 1, limit: ITEMS_PER_PAGE },
                (draft) => {
                    return draft.map((product) => ({
                        ...product,
                        isLiked: newLikedProducts.includes(product.id),
                    }));
                }
            )
        );
    };

    const handleDelete = async (id: number) => {
        const previousData = [...products];

        dispatch(
            api.util.updateQueryData(
                'getProducts',
                { page: currentPage + 1, limit: ITEMS_PER_PAGE },
                (draft) => {
                    return draft.filter((product) => product.id !== id);
                }
            )
        );

        try {
            await deleteProduct(id).unwrap();
        } catch (error) {
            dispatch(
                api.util.updateQueryData(
                    'getProducts',
                    { page: currentPage + 1, limit: ITEMS_PER_PAGE },
                    () => previousData
                )
            );
            console.error('Failed to delete product:', error);
        }
    };

    if (isLoading) {
        return (
            <div className='flex items-center justify-center min-h-screen'>
                <Loader />
            </div>
        );
    }

    if (error) {
        const errorMessage =
            'status' in error
                ? `Ошибка ${error.status}: ${JSON.stringify(error.data)}`
                : 'Произошла неизвестная ошибка';

        return (
            <div className='text-red-500 text-center py-8'>
                Ошибка загрузки продуктов: {errorMessage}
            </div>
        );
    }

    return (
        <div className='flex flex-col min-h-0 flex-1 px-6'>
            <h1 className='text-2xl font-bold text-center w-full mt-10 mb-6'>Список продуктов</h1>
            <Link
                href='/products/create-product'
                className='px-4 py-2 bg-gray-700 text-white hover:bg-gray-600 rounded transition-colors mb-6 self-center sm:self-start'
            >
                Создать продукт
            </Link>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full mb-6'>
                {products &&
                    products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onToggleLike={handleToggleLike}
                            onDelete={handleDelete}
                        />
                    ))}
            </div>
            <div className='w-full flex justify-center mb-6'>
                <ReactPaginate
                    breakLabel='...'
                    nextLabel='Вперед'
                    previousLabel='Назад'
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={1}
                    pageCount={pageCount}
                    containerClassName='pagination'
                    pageLinkClassName='page-link'
                    previousLinkClassName='page-link'
                    nextLinkClassName='page-link'
                    activeClassName='active'
                    disabledClassName='disabled'
                    forcePage={currentPage}
                />
            </div>
        </div>
    );
}
