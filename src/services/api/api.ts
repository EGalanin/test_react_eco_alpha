import { Product } from '@/types/product';
import { baseApi } from '@/services/api/base-api';
import { ProductFormData } from '@/components/creatProduct/CreateProductForm';

export const api = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query<
            Product[],
            { page: number; limit: number; favoritesOnly?: boolean }
        >({
            query: ({ page, limit }) => `/posts?_page=${page}&_limit=${limit}`,
            transformResponse: (response: Omit<Product, 'isLiked'>[], meta, { favoritesOnly }) => {
                const likedProducts = JSON.parse(localStorage.getItem('likedProducts') || '[]');
                const products = response.map((product) => ({
                    ...product,
                    isLiked: likedProducts.includes(product.id),
                }));

                if (favoritesOnly) {
                    return products.filter((product) => likedProducts.includes(product.id));
                }

                return products;
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
        createProduct: builder.mutation<Product, ProductFormData>({
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
