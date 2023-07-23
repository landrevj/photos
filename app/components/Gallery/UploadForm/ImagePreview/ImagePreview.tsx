'use client';

import clsx from 'clsx';

/** external components */
import NextImage from 'next/image';

/** components */

/** state */
import { getFileProgressMap } from '@/lib/redux/state/uploader/uploader.selectors';
import { useSelector } from '@/lib/redux';
import { useState } from 'react';

/** helpers */

/** types */
interface ImagePreviewProps {
  uuid: string;
}

export const ImagePreview = ({ uuid }: ImagePreviewProps) => {
  const fileProgress = useSelector(getFileProgressMap);
  const state = fileProgress[uuid];
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div className='relative aspect-square rounded-xl drop-shadow'>
      {!isImageLoaded && (
        <div className='absolute inset-0 flex flex-col-reverse items-start overflow-hidden rounded-xl'>
          <div
            className={clsx(
              'absolute inset-0 bg-black bg-opacity-30',
              !state?.progress && 'animate-pulse'
            )}
          />
          <div
            className='w-full grow bg-blue-400 bg-opacity-60 transition-transform'
            style={{
              transform: `translateY(${100 - (state?.progress ?? 0)}%)`,
            }}
          />
        </div>
      )}
      {state?.awsFilename && (
        <NextImage
          src={`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/images/${state?.awsFilename}`}
          alt={uuid}
          fill
          className='overflow-hidden rounded-xl object-cover'
          sizes='10vw'
          onLoadingComplete={() => {
            setIsImageLoaded(true);
          }}
        />
      )}
    </div>
  );
};

export default ImagePreview;
