import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Image, ImageQueryGroup, ImageQueryParams } from '@/types/images';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    getImage: builder.query<Image, string>({
      query: (id) => {
        return `images/${id}`;
      },
    }),
    getImages: builder.query<ImageQueryGroup[], ImageQueryParams | void>({
      query: (params) => {
        const trimmedParams = Object.fromEntries(
          Object.entries(params || {}).filter(([_, value]) => value != null)
        );

        if (!params || !Object.keys(trimmedParams).length) return 'images';

        return `images?${new URLSearchParams(trimmedParams)}`;
      },
    }),
    getRandomHeroImage: builder.query<Image, void>({
      query: () => ({ url: 'images/random', cache: 'no-cache' }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetImageQuery,
  useGetImagesQuery,
  useGetRandomHeroImageQuery,
} = api;
