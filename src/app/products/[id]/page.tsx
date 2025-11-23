'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Product } from '@/types/products';
import { getProductById } from '@/services/productService';
import Link from 'next/link';
import { Loader } from '@/components/Loader';

export default function ProductPage() {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const params = useParams();
    const productId = Number(params.id);

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const data = await getProductById(productId);
                const likedProducts = JSON.parse(localStorage.getItem('likedProducts') || '[]');
                const productWithLike = {
                    ...data,
                    isLiked: likedProducts.includes(data.id),
                };

                setProduct(productWithLike);
            } catch (error) {
                setError('Не удалось загрузить продукт');
                console.error('Ошибка загрузки продукта:', error);
            } finally {
                setLoading(false);
            }
        };

        if (productId) {
            loadProduct();
        }
    }, [productId]);

    if (loading) {
        return (
            <div className='flex items-center justify-center min-h-screen'>
                <Loader />
            </div>
        );
    }
    if (error) return <div className='text-red-500 text-center py-8'>{error}</div>;
    if (!product) return <div className='text-center py-8'>Продукт не найден</div>;

    return (
        <div className='container mx-auto px-4 py-8 max-w-4xl'>
            <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden'>
                <div className='p-6'>
                    <div className='flex justify-between items-start'>
                        <h1 className='text-2xl font-bold mb-4'>{product.title}</h1>
                        <Link
                            href='/'
                            className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors'
                        >
                            Назад к списку
                        </Link>
                    </div>

                    <div className='mt-6'>
                        <p className='text-gray-700 dark:text-gray-300'>{product.body}</p>

                        <div className='mt-8 pt-4 border-t border-gray-200 dark:border-gray-700'>
                            <p className='text-sm text-gray-500 dark:text-gray-400'>
                                ID продукта: {product.id} | Пользователь: {product.userId}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
