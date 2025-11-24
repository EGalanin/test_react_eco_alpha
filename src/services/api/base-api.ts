import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = 'https://jsonplaceholder.typicode.com';

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
        prepareHeaders: (headers) => {
            return headers;
        },
    }),
    tagTypes: ['Products'],
    endpoints: () => ({}),
});
