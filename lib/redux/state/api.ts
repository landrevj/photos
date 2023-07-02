import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  Image,
  ImageQueryGroup,
  ImageQueryParams,
} from '@/api/images/images.types';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    getImages: builder.query<ImageQueryGroup[], ImageQueryParams | void>({
      query: (params) => {
        if (!params) return 'images';

        const search = new URLSearchParams(params).toString();
        return `images?${search}`;
      },
    }),
    getRandomHeroImage: builder.query<Image, void>({
      query: () => 'images/random',
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetImagesQuery, useGetRandomHeroImageQuery } = api;
