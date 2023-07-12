'use client';

import { useSearchParams } from 'next/navigation';

/** external components */
import Link from 'next/link';
import NextImage from 'next/image';

/** components */

/** state */

/** helpers */
import { createImageColorDataUrl } from '@/lib/images/utils';

/** types */
import type { Image } from '@/types/images';
import { useGalleryLayout } from '@/lib/images/useGalleryLayout';

interface ImageGridProps {
  images: Image[];
  gap?: number;
  className?: string;
}

export const ImageGrid = ({ className, images, gap = 8 }: ImageGridProps) => {
  const searchParams = useSearchParams();
  const { imageStyles, lastRowWidthRemainder } = useGalleryLayout(images);

  if (!imageStyles || !lastRowWidthRemainder) return null;

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        margin: `-${gap / 2}px`,
      }}
    >
      {images.map((image, index) => (
        <Link
          key={image.awsFilename}
          className='border-box relative flex-shrink-0 flex-grow'
          style={imageStyles[index]}
          href={`/image/${image._id}?${searchParams.toString()}`}
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
        </Link>
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

export default ImageGrid;
