import Link from 'next/link';

interface ProductsHeaderProps {
    showFavorites: boolean;
    onToggleFavorites: () => void;
}

export function ProductsHeader({ showFavorites, onToggleFavorites }: ProductsHeaderProps) {
    return (
        <div className='flex flex-col sm:flex-row justify-between items-center mt-10 mb-6 gap-4'>
            <h1 className='text-2xl font-bold'>
                {showFavorites ? 'Избранные продукты' : 'Список продуктов'}
            </h1>
            <div className='flex gap-4'>
                <button
                    onClick={onToggleFavorites}
                    className={`px-4 py-2 rounded transition-colors cursor-pointer ${
                        showFavorites
                            ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                >
                    {showFavorites ? 'Показать все' : 'Показать избранное'}
                </button>
                <Link
                    href='/products/create-product'
                    className='px-4 py-2 bg-gray-700 text-white hover:bg-gray-600 rounded transition-colors'
                >
                    Создать продукт
                </Link>
            </div>
        </div>
    );
}
