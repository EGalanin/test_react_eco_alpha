'use client';

import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { createProduct } from '@/services/productService';

const productSchema = z.object({
    title: z.string().min(3, 'Минимум 3 символа').max(100, 'Максимум 100 символов'),
    body: z.string().min(10, 'Минимум 10 символов').max(1000, 'Максимум 1000 символов'),
    userId: z.number().min(1, 'Обязательное поле'),
});

type ProductFormData = z.infer<typeof productSchema>;

export default function CreateProductPage() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
    });

    const onSubmit = async (data: ProductFormData) => {
        // try {
        //     await createProduct(data);
        //     router.push('/products');
        // } catch (error) {
        //     console.error('Error creating product:', error);
        // }
        console.log(data);
    };

    return (
        <div className='container mx-auto px-4 py-8 max-w-2xl bg-gray-800 rounded-2xl'>
            <div className='flex justify-between items-center mb-8'>
                <h1 className='text-2xl font-bold text-white'>Создать продукт</h1>
                <Link
                    href='/products'
                    className='px-4 py-2 bg-gray-700 text-white hover:bg-gray-600 rounded transition-colors'
                >
                    Назад к списку
                </Link>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                <div>
                    <label htmlFor='title' className='block text-sm font-medium text-gray-200'>
                        Название продукта
                    </label>
                    <input
                        type='text'
                        id='title'
                        placeholder='Название продукта'
                        {...register('title')}
                        className='mt-2 block w-full rounded-md border border-gray-300 bg-white text-gray-900
                        shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                    />
                    {errors.title && (
                        <p className='mt-1 text-sm text-red-600'>{errors.title.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor='body' className='block text-sm font-medium text-gray-200'>
                        Описание продукта
                    </label>
                    <textarea
                        id='body'
                        rows={4}
                        placeholder='Описание продукта'
                        {...register('body')}
                        className='mt-2 block w-full rounded-md border border-gray-300 bg-white text-gray-900
                        shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                    />
                    {errors.body && (
                        <p className='mt-1 text-sm text-red-600'>{errors.body.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor='userId' className='block text-sm font-medium text-gray-200'>
                        ID пользователя
                    </label>
                    <input
                        type='number'
                        id='userId'
                        {...register('userId', { valueAsNumber: true })}
                        className='mt-2 block w-full rounded-md border border-gray-300 bg-white text-gray-900
                        shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                    />
                    {errors.userId && (
                        <p className='mt-1 text-sm text-red-600'>{errors.userId.message}</p>
                    )}
                </div>

                <div className='flex justify-end'>
                    <button
                        type='submit'
                        disabled={isSubmitting}
                        className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50'
                    >
                        {isSubmitting ? 'Сохранение...' : 'Создать продукт'}
                    </button>
                </div>
            </form>
        </div>
    );
}
