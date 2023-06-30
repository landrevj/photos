'use client';

/** external components */
import NextImage from 'next/image';

/** components */

/** state */

/** helpers */
import { createImageColorDataUrl } from '@/lib/images/utils';

/** types */
import type { Image } from '@/app/api/images/images.types';
import { useGalleryLayout } from '@/lib/images/useGalleryLayout';

interface ImageGalleryProps {
  images: Image[];
  gap?: number;
}

export const ImageGallery = ({ images, gap = 8 }: ImageGalleryProps) => {
  const { imageStyles, lastRowWidthRemainder } = useGalleryLayout(images);

  if (!imageStyles || !lastRowWidthRemainder) return null;

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
      }}
    >
      {images.map((image, index) => (
        <div
          key={image.awsFilename}
          className='border-box relative flex-shrink-0 flex-grow'
          style={imageStyles[index]}
        >
          <div
            className='absolute'
            style={{
              top: `${gap / 2}px`,
              left: `${gap / 2}px`,
              right: `${gap / 2}px`,
              bottom: `${gap / 2}px`,
            }}
          >
            <NextImage
              src={`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/images/${image.awsFilename}`}
              alt={image.name}
              fill
              blurDataURL={createImageColorDataUrl(image.colors.dominant)}
              placeholder='blur'
              className='overflow-hidden rounded-xl drop-shadow'
            />
          </div>
        </div>
      ))}
      <div
        className='flex-shrink-0 flex-grow'
        style={{
          width: lastRowWidthRemainder,
        }}
      />
    </div>
  );
};

export default ImageGallery;
