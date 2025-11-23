'use client';

import { ProductCard } from '@/components/ProductCard';
import { useEffect, useState } from 'react';
import { Product } from '@/types/products';
import { fetchProducts, getTotalProductsCount } from '@/services/productService';
import ReactPaginate from 'react-paginate';
import '../../styles/pagination.css';
import { Loader } from '@/components/Loader';
import Link from 'next/link';

const ITEMS_PER_PAGE = 8;

export default function ProductsList() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    const handlePageClick = (event: { selected: number }) => {
        setCurrentPage(event.selected);
    };

    const handleToggleLike = (id: number) => {
        setProducts((prevProducts) => {
            const updatedProducts = prevProducts.map((product) =>
                product.id === id ? { ...product, isLiked: !product.isLiked } : product
            );

            const likedProducts = updatedProducts.filter((p) => p.isLiked).map((p) => p.id);
            localStorage.setItem('likedProducts', JSON.stringify(likedProducts));

            return updatedProducts;
        });
    };

    const handleDelete = (id: number) => {
        setProducts(products.filter((product) => product.id !== id));
    };

    useEffect(() => {
        const loadProducts = async () => {
            try {
                setLoading(true);
                setError(null);

                const data = await fetchProducts(currentPage * ITEMS_PER_PAGE, ITEMS_PER_PAGE);
                const total = await getTotalProductsCount();
                setPageCount(Math.ceil(total / ITEMS_PER_PAGE));

                const likedProducts = JSON.parse(localStorage.getItem('likedProducts') || '[]');
                const productsWithLike = data.map((product: Product) => ({
                    ...product,
                    isLiked: likedProducts.includes(product.id),
                }));
                setProducts(productsWithLike);
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка';
                setError(`Не удалось загрузить продукты: ${errorMessage}`);
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, [currentPage]);

    if (loading) {
        return (
            <div className='flex items-center justify-center min-h-screen'>
                <Loader />
            </div>
        );
    }

    if (error) {
        return <div className='text-red-500 text-center py-8'>{error}</div>;
    }

    return (
        <div className='flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black'>
            <main className='flex min-h-screen w-full flex-col  gap-10 items-center justify-center py-32 px-16 bg-white dark:bg-black sm:items-start'>
                <h1 className='text-2xl font-bold text-center w-full'>Список продуктов</h1>
                <Link
                    href='/products/create-product'
                    className='px-4 py-2 bg-gray-700 text-white hover:bg-gray-600 rounded transition-colors'
                >
                    Создать продукт
                </Link>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full'>
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onToggleLike={handleToggleLike}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
                <div className='w-full flex justify-center'>
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
            </main>
        </div>
    );
}
