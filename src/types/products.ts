export interface Product {
    id: number;
    title: string;
    body: string;
    userId: number;
    isLiked?: boolean;
}

export type ProductFilter = 'all' | 'favorites';