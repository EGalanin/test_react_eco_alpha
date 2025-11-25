'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '@/services/api';
import { useAppDispatch } from '@/store/hooks';
import { ITEMS_PER_PAGE } from '@/constants/pagination';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { FormField } from './FormField';

const productSchema = z.object({
    title: z.string().min(3, 'Минимум 3 символа').max(100, 'Максимум 100 символов'),
    body: z.string().min(10, 'Минимум 10 символов').max(1000, 'Максимум 1000 символов'),
    userId: z.number().min(1, 'Обязательное поле'),
});

type ProductFormData = z.infer<typeof productSchema>;

export const CreateProductForm = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
    });

    const onSubmit = async (data: ProductFormData) => {
        const loadingToast = toast.loading('Создание продукта...');

        try {
            // апи работает но не сохраняет изменения
            // const newProduct = await createProduct(data).unwrap();
            // console.log(newProduct);

            // демонстрация добавления продукта, при обновлении сбросит
            await new Promise((resolve) => setTimeout(resolve, 1000));

            const getClientSideId = () => {
                if (typeof window === 'undefined') return 0;
                return Date.now();
            };

            const mockProduct = {
                ...data,
                id: getClientSideId(),
                isLiked: false,
            };

            dispatch(
                api.util.updateQueryData(
                    'getProducts',
                    { page: 1, limit: ITEMS_PER_PAGE, favoritesOnly: false },
                    (draft) => {
                        draft.unshift(mockProduct);
                        if (draft.length > ITEMS_PER_PAGE) {
                            draft.pop();
                        }
                    }
                )
            );
            toast.success('Продукт успешно создан!', { id: loadingToast });
            router.push('/products?page=1');
        } catch (error) {
            console.error('Не удалось создать новый продукт:', error);
            toast.error('Произошла ошибка при создании продукта', { id: loadingToast });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
            <FormField
                name='title'
                label='Название продукта'
                placeholder='Введите название товара'
                register={register}
                error={errors.title}
                required
            />

            <FormField
                name='body'
                label='Описание продукта'
                type='textarea'
                placeholder='Опишите товар подробно'
                register={register}
                error={errors.body}
                required
            />

            <FormField
                name='userId'
                label='ID пользователя'
                type='number'
                placeholder='Введите ID пользователя'
                register={register}
                error={errors.userId}
                required
            />

            <div className='flex justify-end'>
                <button
                    type='submit'
                    disabled={isSubmitting}
                    className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ${isSubmitting ? 'opacity-50' : ''}`}
                >
                    {isSubmitting ? 'Сохранение...' : 'Создать продукт'}
                </button>
            </div>
        </form>
    );
};