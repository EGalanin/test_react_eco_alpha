import { Product } from '@/types/product';
import { ProductCard } from '@/components/ProductCard';
import { EmptyState } from '@/components/shared/EmptyState';

interface ProductsGridProps {
    products: Product[];
    onToggleLike: (id: number) => void;
    onDelete: (id: number) => void;
    emptyMessage?: string;
}

export function ProductsGrid({
    products,
    onToggleLike,
    onDelete,
    emptyMessage = 'Товары не найдены',
}: ProductsGridProps) {
    if (products.length === 0) {
        return <EmptyState message={emptyMessage} />;
    }

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full mb-6'>
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    onToggleLike={onToggleLike}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}
