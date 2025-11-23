import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product } from '@/types/products';

const API_URL = 'https://jsonplaceholder.typicode.com';

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    reducerPath: 'api',
    tagTypes: ['Products'],
    endpoints: (builder) => ({
        getProducts: builder.query<Product[], { page: number; limit: number }>({
            query: ({ page, limit }) => `/posts?_page=${page}&_limit=${limit}`,
            transformResponse: (response: Omit<Product, 'isLiked'>[]) => {
                const likedProducts = JSON.parse(localStorage.getItem('likedProducts') || '[]');
                return response.map((product) => ({
                    ...product,
                    isLiked: likedProducts.includes(product.id),
                }));
            },
            providesTags: ['Products'],
        }),
        getProductById: builder.query<Product, number>({
            query: (id) => `/posts/${id}`,
            providesTags: ['Products'],
        }),
        getTotalProductsCount: builder.query<{ total: number }, void>({
            query: () => '/posts',
            transformResponse: (response: Product[]) => {
                return {
                    total: response.length,
                };
            },
        }),
        createProduct: builder.mutation({
            query: (productData) => ({
                url: '/posts',
                method: 'POST',
                body: productData,
            }),
            invalidatesTags: ['Products'],
        }),
        deleteProduct: builder.mutation<void, number>({
            query: (id) => ({
                url: `/posts/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Products'],
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
    useGetTotalProductsCountQuery,
    useCreateProductMutation,
    useDeleteProductMutation,
} = api;
