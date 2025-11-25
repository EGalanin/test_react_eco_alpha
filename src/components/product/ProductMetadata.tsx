interface ProductMetadataProps {
    productId: number;
    userId: number;
    className?: string;
}

export function ProductMetadata({ productId, userId, className = '' }: ProductMetadataProps) {
    return (
        <div className={`mt-8 pt-4 border-t border-gray-200 dark:border-gray-700 ${className}`}>
            <p className='text-sm text-gray-500 dark:text-gray-400'>
                ID продукта: {productId} | Пользователь: {userId}
            </p>
        </div>
    );
}
