import type { Metadata } from 'next';
import { ProductFormHeader } from '@/components/creatProduct/ProuctFormHeader';
import { CreateProductForm } from '@/components/creatProduct/CreateProductForm';

export const metadata: Metadata = {
    title: 'Создание продукта',
    description: 'Страница для создания нового продукта',
};

export default function CreateProductPage() {
    return (
        <div className='min-h-screen flex items-center justify-center p-4 bg-gray-900'>
            <div className='w-full max-w-2xl bg-gray-800 rounded-2xl p-6 shadow-lg'>
                <ProductFormHeader title='Создать продукт' backHref='/products' />
                <CreateProductForm />
            </div>
        </div>
    );
}
