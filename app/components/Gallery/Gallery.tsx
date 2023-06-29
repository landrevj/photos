'use client';

import { useState } from 'react';

/** external components */
import NextImage from 'next/image';

/** components */
import Button from '@/components/common/Button/Button';
import Card from '@/components/common/Card/Card';
import Dialog from '@/components/common/Dialog/Dialog';
import UploadForm from './UploadForm/UploadForm';

/** state */
import { useGetAllImagesQuery } from '@/lib/redux/state/api';

/** helpers */
import { createImageColorDataUrl } from '@/lib/image';

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
      <section className='grid gap-4 py-8 sm:grid-cols-3 lg:grid-cols-5'>
        {isSuccess &&
          data.map((image) => (
            <div key={image.awsFilename} style={{ maxWidth: '300px' }}>
              <NextImage
                src={`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/images/${image.awsFilename}`}
                alt='image'
                width={image.width}
                height={image.height}
                blurDataURL={createImageColorDataUrl(image.colors.dominant)}
                placeholder='blur'
              />
              <div className='flex flex-row'>
                <div
                  style={{
                    width: '50%',
                    height: '30px',
                    background: image.colors.dominant,
                  }}
                />
                <div
                  style={{
                    width: '50%',
                    height: '30px',
                    background: image.colors.complement,
                  }}
                />
              </div>
            </div>
          ))}
      </section>
    </div>
  );
};

export default Gallery;
