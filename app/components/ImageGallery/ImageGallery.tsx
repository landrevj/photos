/** external components */
import NextImage from 'next/image';

/** components */
import ImageMetadata from './ImageMetadata/ImageMetadata';
import Navigation from './Navigation/Navigation';

/** state */

/** helpers */

/** types */
import type { Image } from '@/types/images';
import { useMemo } from 'react';

interface ImageGalleryProps {
  /**
   * The id of the current image being displayed
   */
  value: string;
  /**
   * The images the user can cycle through
   */
  images: Image[];
}

export const ImageGallery = ({ value, images }: ImageGalleryProps) => {
  const position = useMemo(
    () => images.findIndex((img) => img._id === value),
    [images, value]
  );
  const image = images[position];

  return (
    <div className='h-screen w-full bg-neutral-950'>
      <div className='flex h-full w-full'>
        <section className='relative h-full flex-1'>
          <NextImage
            src={`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/images/${image?.awsFilename}`}
            alt='image'
            className='object-contain'
            fill
          />
          <Navigation position={position} images={images} />
        </section>
        <section className='w-72 bg-neutral-900 p-4 text-neutral-200'>
          <ImageMetadata image={image} />
        </section>
      </div>
      <div className='container mx-auto h-[399px]'>more stuff</div>
    </div>
  );
};

export default ImageGallery;
