'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

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
import { replace } from '@/lib/history/replace';

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
      replace(`${pathname}?${new URLSearchParams(query)}`);
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
          title='upload images'
          description='drag and drop images here to upload them'
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
            <ImageGrid images={group.images} />
          </div>
        ))}
    </div>
  );
};

export default Gallery;
