'use client';

import { useParams } from 'next/navigation';
import { Loader } from '@/components/Loader';
import { useGetProductByIdQuery } from '@/services/api';
import { ProductHeader } from '@/components/product/ProductHeader';
import { ProductInfo } from '@/components/product/ProductInfo';
import { ProductMetadata } from '@/components/product/ProductMetadata';
import { ErrorHandler } from '@/components/shared/ErrorHandler';

interface ProductByIdProps {
    id: string;
}

export default function ProductById({ id }: ProductByIdProps) {
    const { data: product, isLoading, error } = useGetProductByIdQuery(id);

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
                defaultMessage='Не удалось загрузить информацию о продукте'
                className='text-red-500 text-center py-8'
            />
        );
    }

    if (!product) return <div className='text-center py-8'>Продукт не найден</div>;

    return (
        <div className='container mx-auto px-4 py-8 max-w-4xl'>
            <ProductInfo>
                <ProductHeader title={product.title} backUrl='/products' />

                <div className='mt-6'>
                    <p className='text-gray-700 dark:text-gray-300'>{product.body}</p>
                    <ProductMetadata productId={product.id} userId={product.userId} />
                </div>
            </ProductInfo>
        </div>
    );
}
