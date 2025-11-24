export interface Product {
    id: number;
    title: string;
    body: string;
    userId: number;
    isLiked?: boolean;
}

export type ProductFilter = 'all' | 'favorites';

export interface ProductsResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}

export interface ProductParams {
    page: number;
    limit: number;
    search?: string;
    favoritesOnly?: boolean;
}
