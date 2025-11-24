'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Loader } from '@/components/Loader';
import { useGetProductByIdQuery } from '@/services/api';
import toast from 'react-hot-toast';

export default function ProductPage() {
    const params = useParams();
    const productId = Number(params.id);
    const { data: product, isLoading, error } = useGetProductByIdQuery(productId);

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
        toast.error(`Ошибка загрузки: ${errorMessage}`);

        return (
            <div className='text-red-500 text-center py-8'>
                Ошибка загрузки продуктов: {errorMessage}
            </div>
        );
    }

    if (!product) return <div className='text-center py-8'>Продукт не найден</div>;

    return (
        <div className='container mx-auto px-4 py-8 max-w-4xl'>
            <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden'>
                <div className='p-6'>
                    <div className='flex justify-between items-center gap-4 mb-4'>
                        <div className='flex-1 min-w-0'>
                            <h1 className='text-2xl font-bold truncate' title={product.title}>
                                {product.title}
                            </h1>
                        </div>
                        <Link
                            href='/'
                            className='flex-shrink-0 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors whitespace-nowrap'
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
