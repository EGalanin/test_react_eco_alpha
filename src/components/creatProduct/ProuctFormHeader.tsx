'use client';

import Link from 'next/link';

interface ProductFormHeaderProps {
    title: string;
    backHref: string;
}

export const ProductFormHeader = ({ title, backHref }: ProductFormHeaderProps) => {
    return (
        <div className='flex justify-between items-center mb-8'>
            <h1 className='text-2xl font-bold text-white'>{title}</h1>
            <Link
                href={backHref}
                className='px-4 py-2 bg-gray-700 text-white hover:bg-gray-600 rounded transition-colors'
            >
                Назад к списку
            </Link>
        </div>
    );
};
