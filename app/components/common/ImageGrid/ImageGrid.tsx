'use client';

import { twMerge } from 'tailwind-merge';

/** external components */
import Link from 'next/link';

/** components */

/** state */

/** helpers */
import { useGalleryLayout } from '@/lib/images/useGalleryLayout';

/** types */
import type { ReactNode } from 'react';

type WidthHeight = { width: number; height: number };
interface ImageGridProps<T extends WidthHeight> {
  children: (image: T) => ReactNode;
  className?: string;
  gap?: number;
  getImageLink?: (img: T) => string;
  images: T[];
  ratioMultiplier?: number;
}

export const ImageGrid = <T extends WidthHeight>({
  children,
  className,
  images,
  gap = 8,
  getImageLink,
  ratioMultiplier,
}: ImageGridProps<T>) => {
  const { imageStyles, lastRowWidthRemainder } = useGalleryLayout(
    images,
    ratioMultiplier
  );

  if (!imageStyles || !lastRowWidthRemainder) return null;

  return (
    <div
      className={twMerge('flex flex-wrap', className)}
      style={{
        margin: `-${gap / 2}px`,
      }}
    >
      {images.map((image, index) =>
        getImageLink ? (
          <Link
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            className='border-box relative shrink-0 grow'
            style={imageStyles[index]}
            href={getImageLink ? getImageLink(image) : ''}
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
              {children(image)}
            </div>
          </Link>
        ) : (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            className='border-box relative shrink-0 grow'
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
              {children(image)}
            </div>
          </div>
        )
      )}
      <div
        className='shrink-0 grow'
        style={{
          width: lastRowWidthRemainder,
        }}
      />
    </div>
  );
};

export default ImageGrid;
