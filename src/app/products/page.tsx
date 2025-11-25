import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Список продуктов',
    description: 'Страница со списком продуктов',
};

import ProductsListPage from '@/app/products/ProductsListPage';

export default function ProductsList() {
    return <ProductsListPage />;
}
