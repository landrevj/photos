import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Image } from '@/api/images/images.types';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    getAllImages: builder.query<Image[], void>({
      query: () => 'images',
    }),
    getRandomHeroImage: builder.query<Image, void>({
      query: () => 'images/random',
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllImagesQuery, useGetRandomHeroImageQuery } = api;
