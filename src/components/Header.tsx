import Link from 'next/link';

export function Header() {
    return (
        <header className='bg-gray-800 text-white p-4 shadow-md'>
            <div className='container mx-auto flex justify-between items-center'>
                <Link href='/' className='text-xl font-bold hover:text-gray-300 transition-colors'>
                    My App
                </Link>
                <nav className='space-x-4'>
                    <Link href='/products' className='hover:text-gray-300 transition-colors'>
                        Продукты
                    </Link>
                    <Link
                        href='/products/create-product'
                        className='hover:text-gray-300 transition-colors'
                    >
                        Создать продукт
                    </Link>
                </nav>
            </div>
        </header>
    );
}
