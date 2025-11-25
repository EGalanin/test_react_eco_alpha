import { ReactNode } from 'react';

interface ProductInfoProps {
    children: ReactNode;
    className?: string;
}

export function ProductInfo({ children, className = '' }: ProductInfoProps) {
    return (
        <div
            className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden ${className}`}
        >
            <div className='p-6'>{children}</div>
        </div>
    );
}
