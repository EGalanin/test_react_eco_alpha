'use client';

import { ProductCard } from '@/components/ProductCard';
import { useEffect, useState } from 'react';
import { Product } from '@/types/products';
import { fetchProducts } from '@/services/productService';

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const handleToggleLike = (id: number) => {
        setProducts((prevProducts) => {
            const updatedProducts = prevProducts.map((product) =>
                product.id === id ? { ...product, isLiked: !product.isLiked } : product
            );

            const likedProducts = updatedProducts.filter((p) => p.isLiked).map((p) => p.id);
            localStorage.setItem('likedProducts', JSON.stringify(likedProducts));

            return updatedProducts;
        });
    };

    const handleDelete = (id: number) => {
        setProducts(products.filter((product) => product.id !== id));
    };

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await fetchProducts();

                const likedProducts = JSON.parse(localStorage.getItem('likedProducts') || '[]');
                const productsWithLike = data.map((product: Product) => ({
                    ...product,
                    isLiked: likedProducts.includes(product.id),
                }));
                setProducts(productsWithLike);
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка';
                setError(`Не удалось загрузить продукты: ${errorMessage}`);
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, []);

    if (loading) {
        return <div className='text-center py-8'>Загрузка...</div>;
    }

    if (error) {
        return <div className='text-red-500 text-center py-8'>{error}</div>;
    }

    return (
        <div className='flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black'>
            <main className='flex min-h-screen w-full flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black sm:items-start'>
                <h1 className='text-2xl font-bold mb-4 text-center w-full'>Home</h1>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full'>
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onToggleLike={handleToggleLike}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
}
