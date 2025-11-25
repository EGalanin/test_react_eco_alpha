'use client';

import { ProductFormHeader } from '@/components/creatProduct/ProuctFormHeader';
import { CreateProductForm } from '@/components/creatProduct/CreateProductForm';

export default function CreateProductPage() {
    return (
        <div className='container mx-auto px-4 py-8 max-w-2xl bg-gray-800 rounded-2xl'>
            <ProductFormHeader title='Создать продукт' backHref='/products' />
            <CreateProductForm />
        </div>
    );
}
