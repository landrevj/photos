'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import clsx from 'clsx';
import { useHotkeys } from 'react-hotkeys-hook';

/** external components */
import {
  MdArrowBackIos,
  MdArrowForwardIos,
  MdKeyboardBackspace,
} from '@/lib/icons';

/** components */
import Button from '../../common/Button/Button';

/** state */

/** helpers */

/** types */
import type { Image } from '@/types/images';

interface NavigationProps {
  position: number;
  images: Image[];
}

export const Navigation = ({ position, images }: NavigationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useHotkeys(
    'left',
    () => {
      if (position > 0) {
        router.replace(`/image/${images[position - 1]._id}?${searchParams}`);
      }
    },
    [position, images, searchParams]
  );
  useHotkeys(
    'right',
    () => {
      if (position < images.length - 1) {
        router.replace(`/image/${images[position + 1]._id}?${searchParams}`);
      }
    },
    [position, images, searchParams]
  );

  return (
    <nav className='pointer-events-none relative flex h-full w-full flex-col p-4 text-white'>
      <div className='flex items-center gap-2'>
        <Button
          className='pointer-events-auto rounded-full px-1'
          color='transparent'
          onClick={() => router.back()}
          icon={<MdKeyboardBackspace className='text-2xl' />}
        />
        <span className='text-sm text-neutral-300'>
          {position + 1} / {images.length}
        </span>
      </div>
      <div className='flex-1' />
      <div className='flex w-full justify-between'>
        <Button
          className={clsx(
            'pointer-events-auto rounded-full px-1',
            position === 0 && 'invisible'
          )}
          color='transparent'
          onClick={() =>
            router.replace(`/image/${images[position - 1]._id}?${searchParams}`)
          }
          icon={<MdArrowBackIos className='text-2xl' />}
        />
        <Button
          className={clsx(
            'pointer-events-auto rounded-full px-1',
            position === images.length - 1 && 'invisible'
          )}
          color='transparent'
          onClick={() =>
            router.replace(`/image/${images[position + 1]._id}?${searchParams}`)
          }
          icon={<MdArrowForwardIos className='text-2xl' />}
        />
      </div>
    </nav>
  );
};

export default Navigation;
