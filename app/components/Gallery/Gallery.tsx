'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import NextImage from 'next/image';

/** external components */

/** components */
import Button from '@/components/common/Button/Button';
import Dialog from '@/components/common/Dialog/Dialog';
import GroupHeading from './GroupHeading/GroupHeading';
import ImageGrid from '@/components/common/ImageGrid/ImageGrid';
import QueryForm from './QueryForm/QueryForm';
import UploadForm from './UploadForm/UploadForm';

/** state */
import { useGetImagesQuery } from '@/lib/redux/state/api';

/** helpers */
import { createImageColorDataUrl } from '@/lib/images/utils';

/** types */
import type { ImageQueryParams } from '@/types/images';

export const Gallery = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasSearch = !!Array.from(searchParams.keys()).length;
  const query: ImageQueryParams = useMemo(
    () => ({
      groupBy:
        (searchParams.get('groupBy') as ImageQueryParams['groupBy']) || 'month',
      order: (searchParams.get('order') as ImageQueryParams['order']) || 'desc',
    }),
    [searchParams]
  );
  const { data, isSuccess, isFetching, refetch } = useGetImagesQuery(query);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

  useEffect(() => {
    if (!hasSearch) {
      router.replace(`${pathname}?${new URLSearchParams(query)}`);
    }
  }, [hasSearch, pathname, query, router]);

  return (
    <div className='flex flex-col gap-8 pb-16'>
      <div className='flex flex-wrap items-center'>
        <QueryForm formValues={query} />
        <div className='flex-1' />
        <Button color='primary' onClick={() => setIsUploadDialogOpen(true)}>
          upload
        </Button>
        <Dialog
          isFullscreen
          // containerClassName='pt-8 px-5 pb-5'
          isOpen={isUploadDialogOpen}
          onClose={() => {
            setIsUploadDialogOpen(false);
          }}
        >
          <UploadForm
            onSuccess={() => {
              setIsUploadDialogOpen(false);
              refetch();
            }}
          />
        </Dialog>
      </div>
      <hr />
      {!isFetching &&
        isSuccess &&
        data.map((group) => (
          <div key={group._id}>
            <GroupHeading date={group._id} groupBy={query.groupBy} />
            <ImageGrid
              images={group.images}
              getImageLink={(image) =>
                `/image/${image._id}?${searchParams.toString()}`
              }
            >
              {(image) => (
                <NextImage
                  src={`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/images/${image.awsFilename}`}
                  alt={image.name}
                  fill
                  blurDataURL={createImageColorDataUrl(image.colors.dominant)}
                  placeholder='blur'
                  className='overflow-hidden rounded-xl drop-shadow'
                  sizes='(min-width: 1536px) 20vw, (min-width: 1280px) 20vw, (min-width: 1024px) 30vw, (min-width: 768px) 50vw, 100vw'
                />
              )}
            </ImageGrid>
          </div>
        ))}
    </div>
  );
};

export default Gallery;
