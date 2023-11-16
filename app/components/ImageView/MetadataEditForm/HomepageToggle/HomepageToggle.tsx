import clsx from 'clsx';

/** external components */
import NextImage from 'next/image';

/** components */
import Switch from '@/components/common/Switch/Switch';

/** state */

/** helpers */
import { createImageColorDataUrl } from '@/lib/images/utils';

/** types */
import type { Image } from '@/types/images';

interface HomepageToggleProps {
  awsFilename?: string;
  formValues: Partial<Image>;
  onChange: (enabled: boolean) => void;
}

export const HomepageToggle = ({
  awsFilename,
  formValues,
  onChange,
}: HomepageToggleProps) => {
  return (
    <div className='flex flex-col gap-2'>
      <Switch
        label='Allow on homepage'
        enabled={formValues.isAllowedOnHomepage}
        onChange={onChange}
      />
      <div
        className={clsx(
          'relative flex h-52 items-center justify-center overflow-hidden rounded-xl drop-shadow transition-opacity',
          !formValues.isAllowedOnHomepage && 'opacity-50'
        )}
      >
        <NextImage
          className='object-cover'
          src={`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/images/${awsFilename}`}
          alt='hero preview'
          fill
          blurDataURL={createImageColorDataUrl(
            formValues?.colors?.dominant || '#2e2e2e',
            100,
            100
          )}
          placeholder='blur'
          sizes='25vw'
        />
        <div
          className='absolute inset-0'
          style={{
            background: `linear-gradient(45deg, ${formValues?.colors?.dominant}33, ${formValues?.colors?.complement}66)`,
          }}
        />
        <div className='relative w-full break-words p-10 text-center'>
          <span className='break-all text-5xl font-extrabold text-white mix-blend-difference'>
            landrevj.photos
          </span>
        </div>
      </div>
    </div>
  );
};

export default HomepageToggle;
