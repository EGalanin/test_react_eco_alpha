import { Metadata } from 'next';
import ProductById from './ProductById';

export const metadata: Metadata = {
    title: 'Продукт',
    description: 'Страница описания продукта',
};

export async function generateStaticParams() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const products = await response.json();

    return products.map((product: { id: number }) => ({
        id: product.id.toString(),
    }));
}

export default async function ProductPage({ params }: { params: { id: string } }) {
    const { id } = await Promise.resolve(params);
    return <ProductById id={id} />;
}
