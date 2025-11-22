import { Product } from '@/types/products';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export const fetchProducts = async (start: number, limit: number): Promise<Product[]> => {
    const response = await fetch(`${API_URL}?_start=${start}&_limit=${limit}`);
    if (!response.ok) {
        throw new Error('Не удалось загрузить продукты');
    }
    const data = await response.json();
    return data.map((product: Product) => ({
        id: product.id,
        title: product.title,
        body: product.body,
        userId: product.userId,
        isLiked: false,
    }));
};

export const getProductById = async (id: number): Promise<Product> => {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
        throw new Error('Не удалось загрузить продукт');
    }
    const data = await response.json();
    return {
        id: data.id,
        title: data.title,
        body: data.body,
        userId: data.userId,
        isLiked: false,
    };
};

export const getTotalProductsCount = async (): Promise<number> => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    return data.length;
};
