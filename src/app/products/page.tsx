'use client';

import { ProductCard } from '@/components/ProductCard';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import '../../styles/pagination.css';
import { Loader } from '@/components/Loader';
import { ErrorHandler } from '@/components/shared/ErrorHandler';
import Link from 'next/link';
import {
    api,
    useDeleteProductMutation,
    useGetProductsQuery,
    useGetTotalProductsCountQuery,
} from '@/services/api';
import { useAppDispatch } from '@/store/hooks';
import { ITEMS_PER_PAGE } from '@/constants/pagination';
import toast from 'react-hot-toast';

export default function ProductsList() {
    const [currentPage, setCurrentPage] = useState(0);
    const [showFavorites, setShowFavorites] = useState(false);
    const dispatch = useAppDispatch();
    const [deleteProduct] = useDeleteProductMutation();

    const {
        data: products = [],
        isLoading,
        error,
    } = useGetProductsQuery({
        page: currentPage + 1,
        limit: ITEMS_PER_PAGE,
        favoritesOnly: showFavorites,
    });

    const { data: countData } = useGetTotalProductsCountQuery(undefined, {
        selectFromResult: (result) => ({
            ...result,
            data: {
                total: showFavorites
                    ? JSON.parse(localStorage.getItem('likedProducts') || '[]').length
                    : result.data?.total || 0,
            },
        }),
    });

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
                {
                    page: currentPage + 1,
                    limit: ITEMS_PER_PAGE,
                    favoritesOnly: showFavorites,
                },
                (draft) => {
                    return draft.map((product) => ({
                        ...product,
                        isLiked: newLikedProducts.includes(product.id),
                    }));
                }
            )
        );

        dispatch(api.util.invalidateTags(['Products']));
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
            toast.success('Продукт успешно удален');
        } catch (error) {
            dispatch(
                api.util.updateQueryData(
                    'getProducts',
                    { page: currentPage + 1, limit: ITEMS_PER_PAGE },
                    () => previousData
                )
            );
            toast.error('Не удалось удалить продукт');
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
        return (
            <ErrorHandler
                error={error}
                defaultMessage="Не удалось загрузить список продуктов"
                className="text-red-500 text-center py-8"
            />
        );
    }

    return (
        <div className='flex flex-col min-h-0 flex-1 px-6'>
            <div className='flex flex-col sm:flex-row justify-between items-center mt-10 mb-6 gap-4'>
                <h1 className='text-2xl font-bold'>
                    {showFavorites ? 'Избранные продукты' : 'Список продуктов'}
                </h1>
                <div className='flex gap-4'>
                    <button
                        onClick={() => setShowFavorites(!showFavorites)}
                        className={`px-4 py-2 rounded transition-colors cursor-pointer ${
                            showFavorites
                                ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                                : 'bg-blue-500 text-white hover:bg-blue-600'
                        }`}
                    >
                        {showFavorites ? 'Показать все' : 'Показать избранное'}
                    </button>
                    <Link
                        href='/products/create-product'
                        className='px-4 py-2 bg-gray-700 text-white hover:bg-gray-600 rounded transition-colors'
                    >
                        Создать продукт
                    </Link>
                </div>
            </div>
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
            {pageCount > 1 && (
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
                        forcePage={currentPage}
                    />
                </div>
            )}
        </div>
    );
}
