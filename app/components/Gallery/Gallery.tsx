'use client';

import { useState } from 'react';

/** external components */

/** components */
import Button from '@/components/common/Button/Button';
import Card from '@/components/common/Card/Card';
import Dialog from '@/components/common/Dialog/Dialog';
import UploadForm from './UploadForm/UploadForm';

/** state */
import { useGetAllImagesQuery } from '@/lib/redux/state/api';

/** helpers */
import ImageGallery from '../common/ImageGallery/ImageGallery';

/** types */

export const Gallery = () => {
  const { data, isSuccess, refetch } = useGetAllImagesQuery();
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

  return (
    <div>
      <Card className='flex items-center'>
        <span>no sort</span>
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
      </Card>
      {isSuccess && <ImageGallery images={data} />}
    </div>
  );
};

export default Gallery;
