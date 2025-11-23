import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { StoreProvider } from '@/store/StoreProvider';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Test App',
    description: 'My test Next.js app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en'>
            <body className={`${inter.className} flex flex-col min-h-screen`}>
                <StoreProvider>
                    <Header />
                    <main className='flex-1'>{children}</main>
                    <Footer />
                </StoreProvider>
            </body>
        </html>
    );
}
