'use client';

import { Product } from '@/types/products';
import { Heart, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ProductCardProps {
    product: Product;
    onToggleLike: (id: number) => void;
    onDelete: (id: number) => void;
}

export const ProductCard = ({ product, onToggleLike, onDelete }: ProductCardProps) => {
    const router = useRouter();
    const MAX_DESCRIPTION_LENGTH = 100;

    const handleCardClick = () => {
        router.push(`/products/${product.id}`);
    };

    const handleLikeClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onToggleLike(product.id);
    };

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onDelete(product.id);
    };

    const truncatedBody =
        product.body.length > MAX_DESCRIPTION_LENGTH
            ? `${product.body.substring(0, MAX_DESCRIPTION_LENGTH)}...`
            : product.body;

    return (
        <div
            className='p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer h-48 flex flex-col bg-gray-900'
            onClick={handleCardClick}
        >
            <div className='flex justify-between items-start mb-2'>
                <h3 className='text-lg font-semibold line-clamp-1'>{product.title}</h3>
                <div className='flex gap-2'>
                    <button
                        onClick={handleLikeClick}
                        className='p-1 hover:bg-gray-100 rounded-full'
                        aria-label={
                            product.isLiked ? 'Удалить из избранного' : 'Добавить в избранное'
                        }
                    >
                        <Heart
                            className={`w-5 h-5 ${product.isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                        />
                    </button>
                    <button
                        onClick={handleDeleteClick}
                        className='p-1 text-gray-400 hover:text-red-500 hover:bg-gray-100 rounded-full'
                        aria-label='Удалить'
                    >
                        <X className='w-5 h-5' />
                    </button>
                </div>
            </div>
            <p className='text-gray-400 flex-grow overflow-hidden'>{truncatedBody}</p>
        </div>
    );
};
