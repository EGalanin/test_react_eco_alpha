'use client';

import { useState } from 'react';
import { ITEMS_PER_PAGE } from '@/constants/pagination';
import { Loader } from '@/components/Loader';
import { ErrorHandler } from '@/components/shared/ErrorHandler';
import { ProductsHeader } from '@/components/products/ProductsHeader';
import { ProductsGrid } from '@/components/products/ProductsGrid';
import { ProductsPagination } from '@/components/products/ProductsPagination';
import { useGetProductsQuery, useGetTotalProductsCountQuery } from '@/services/api';
import { useProductLikes } from '@/hooks/useProductLikes';
import { useProductDeletion } from '@/hooks/useProductDeletion';

export default function ProductsListPage() {
    const [currentPage, setCurrentPage] = useState(0);
    const [showFavorites, setShowFavorites] = useState(false);
    const { toggleLike } = useProductLikes(currentPage, showFavorites);

    const {
        data: products = [],
        isLoading,
        error,
    } = useGetProductsQuery({
        page: currentPage + 1,
        limit: ITEMS_PER_PAGE,
        favoritesOnly: showFavorites,
    });

    const { handleDelete } = useProductDeletion(currentPage, products);

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
                defaultMessage='Не удалось загрузить список продуктов'
                className='text-red-500 text-center py-8'
            />
        );
    }

    return (
        <div className='flex flex-col min-h-0 flex-1 px-6'>
            <ProductsHeader
                showFavorites={showFavorites}
                onToggleFavorites={() => {
                    setShowFavorites(!showFavorites);
                    setCurrentPage(0);
                }}
            />
            <ProductsGrid
                products={products}
                onToggleLike={toggleLike}
                onDelete={handleDelete}
                emptyMessage={
                    showFavorites ? 'У вас пока нет избранных товаров' : 'Товары не найдены'
                }
            />
            <ProductsPagination
                pageCount={pageCount}
                currentPage={currentPage}
                onPageChange={handlePageClick}
            />
        </div>
    );
}
