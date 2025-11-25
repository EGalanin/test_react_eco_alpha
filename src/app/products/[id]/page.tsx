import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Страница продукта',
    description: 'Страница описания продукта',
};

import ProductById from '@/app/products/[id]/ProductById';

export default function ProductPage() {
    return <ProductById />;
}
