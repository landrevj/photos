'use client';

import clsx from 'clsx';
import { useHotkeys } from 'react-hotkeys-hook';
import { useRouter } from 'next/navigation';

/** external components */
import {
  MdArrowBackIos,
  MdArrowForwardIos,
  MdKeyboardBackspace,
  MdRestartAlt,
  MdZoomIn,
  MdZoomOut,
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
  onNavBackward: () => void;
  onNavForward: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoomReset: () => void;
}

export const Navigation = ({
  position,
  images,
  onNavBackward,
  onNavForward,
  onZoomIn,
  onZoomOut,
  onZoomReset,
}: NavigationProps) => {
  const router = useRouter();

  useHotkeys(
    'left',
    () => {
      if (position > 0) {
        onNavForward();
      }
    },
    [position]
  );
  useHotkeys(
    'right',
    () => {
      if (position < images.length - 1) {
        onNavBackward();
      }
    },
    [position]
  );

  return (
    <nav className='pointer-events-none relative flex h-full w-full flex-col p-4 text-white'>
      <div className='flex justify-between'>
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
        <div>
          <Button
            className='pointer-events-auto rounded-full px-1'
            color='transparent'
            onClick={onZoomReset}
            icon={<MdRestartAlt className='text-2xl' />}
          />
          <Button
            className='pointer-events-auto rounded-full px-1'
            color='transparent'
            onClick={onZoomIn}
            icon={<MdZoomOut className='text-2xl' />}
          />
          <Button
            className='pointer-events-auto rounded-full px-1'
            color='transparent'
            onClick={onZoomOut}
            icon={<MdZoomIn className='text-2xl' />}
          />
        </div>
      </div>
      <div className='flex-1' />
      <div className='flex w-full justify-between'>
        <Button
          className={clsx(
            'pointer-events-auto rounded-full px-1',
            position === 0 && 'invisible'
          )}
          color='transparent'
          onClick={onNavBackward}
          icon={<MdArrowBackIos className='text-2xl' />}
        />
        <Button
          className={clsx(
            'pointer-events-auto rounded-full px-1',
            position === images.length - 1 && 'invisible'
          )}
          color='transparent'
          onClick={onNavForward}
          icon={<MdArrowForwardIos className='text-2xl' />}
        />
      </div>
    </nav>
  );
};

export default Navigation;
