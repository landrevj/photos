'use client';

import { useSearchParams } from 'next/navigation';

/** external components */

/** components */
import { useGetImageQuery, useGetImagesQuery } from '@/lib/redux/state/api';
import ImageView from '@/app/components/ImageView/ImageView';

/** state */

/** helpers */

/** types */
import type { ImageQueryParams, Image as ImageType } from '@/types/images';

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
      <ImageView
        imageId={params.id}
        images={imagesQuery.data.reduce<ImageType[]>(
          (acc, curr) => [...acc, ...curr.images],
          []
        )}
      />
    );
  }

  if (!hasSearch && imageQuery.isSuccess && !imageQuery.isFetching) {
    return <ImageView imageId={params.id} images={[imageQuery.data]} />;
  }

  return null;
};

export default ImagePage;
