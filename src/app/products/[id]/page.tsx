import { Metadata } from 'next';
import { api } from '@/services/api';
import ProductById from '@/app/products/[id]/ProductById';
import { Product } from '@/types/product';

export const metadata: Metadata = {
    title: 'Продукт',
    description: 'Страница описания продукта',
};

export async function generateStaticParams() {
    const result = api.endpoints.getProducts.initiate({ page: 1, limit: 100 });
    const response = await result;

    const products = (response as { data?: Product[] })?.data || [];

    if ('unsubscribe' in result) {
        (result as { unsubscribe: () => void }).unsubscribe();
    }

    return products.map((product) => ({
        id: product.id.toString(),
    }));
}

export default async function ProductPage({ params }: { params: { id: string } }) {
    const { id } = await Promise.resolve(params);
    return <ProductById id={id} />;
}
