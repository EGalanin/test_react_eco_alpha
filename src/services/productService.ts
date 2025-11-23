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
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.length;
};

export const createProduct = async (productData: {
    title: string;
    body: string;
    userId: number;
}) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
    });

    if (!response.ok) {
        throw new Error('Не удалось создать продукт');
    }

    return response.json();
};
