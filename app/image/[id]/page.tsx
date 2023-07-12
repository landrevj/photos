'use client';

import { useSearchParams } from 'next/navigation';

/** external components */

/** components */
import { useGetImageQuery, useGetImagesQuery } from '@/lib/redux/state/api';
import ImageGallery from '@/components/ImageGallery/ImageGallery';

/** state */

/** helpers */

/** types */
import type { Image, ImageQueryParams } from '@/types/images';

interface ImagePageProps {
  params: { id: string };
}

export const ImagePage = ({ params }: ImagePageProps) => {
  const searchParams = useSearchParams();
  const hasSearch = !!Array.from(searchParams.keys()).length;
  const imagesQuery = useGetImagesQuery(
    {
      groupBy: searchParams.get('groupBy') as ImageQueryParams['groupBy'],
      order: searchParams.get('order') as ImageQueryParams['order'],
    },
    { skip: !hasSearch }
  );
  const imageQuery = useGetImageQuery(params.id, { skip: hasSearch });

  if (hasSearch && imagesQuery.isSuccess && !imagesQuery.isFetching) {
    return (
      <ImageGallery
        value={params.id}
        images={imagesQuery.data.reduce<Image[]>(
          (acc, curr) => [...acc, ...curr.images],
          []
        )}
      />
    );
  }

  if (!hasSearch && imageQuery.isSuccess && !imageQuery.isFetching) {
    return <ImageGallery value={params.id} images={[imageQuery.data]} />;
  }

  return null;
};

export default ImagePage;
