'use client';

/** external components */
import NextImage from 'next/image';

/** components */

/** state */
import { useGetRandomHeroImageQuery } from '@/lib/redux/state/api';

/** helpers */
import { createImageColorDataUrl } from '@/lib/images/utils';

/** types */
import { ReactNode } from 'react';

interface HeroProps {
  children?: ReactNode;
}

export const Hero = ({ children }: HeroProps) => {
  const { data, isSuccess } = useGetRandomHeroImageQuery();

  if (!isSuccess) {
    return null;
  }

  return (
    <div
      className='relative flex h-full items-center justify-center'
      style={{
        background: `linear-gradient(45deg, ${data?.colors?.dominant}33, ${data?.colors?.complement}66)`,
      }}
    >
      <NextImage
        className='-z-10 object-cover'
        src={`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/images/${data.awsFilename}`}
        alt='hero'
        fill
        blurDataURL={createImageColorDataUrl(
          data?.colors?.dominant || '#2e2e2e',
          100,
          100
        )}
        placeholder='blur'
        loading='eager'
      />
      <div className='w-full break-words p-10 text-center'>{children}</div>
    </div>
  );
};

export default Hero;
