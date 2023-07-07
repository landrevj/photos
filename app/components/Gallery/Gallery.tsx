'use client';

import { useState } from 'react';

/** external components */

/** components */
import Button from '@/components/common/Button/Button';
import Dialog from '@/components/common/Dialog/Dialog';
import GroupHeading from './GroupHeading/GroupHeading';
import QueryForm from './QueryForm/QueryForm';
import UploadForm from './UploadForm/UploadForm';

/** state */
import { useGetImagesQuery } from '@/lib/redux/state/api';

/** helpers */
import ImageGallery from '../common/ImageGallery/ImageGallery';

/** types */
import type { ImageQueryParams } from '@/types/images';

export const Gallery = () => {
  const [query, setQuery] = useState<ImageQueryParams>({
    groupBy: 'month',
    order: 'desc',
  });
  const { data, isSuccess, isFetching, refetch } = useGetImagesQuery(query);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

  return (
    <div className='flex flex-col gap-8 pb-16'>
      <div className='flex flex-wrap items-center'>
        <QueryForm formValues={query} setQuery={setQuery} />
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
            <ImageGallery images={group.images} />
          </div>
        ))}
    </div>
  );
};

export default Gallery;
