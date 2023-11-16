import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

/** external components */
import { Dialog as HeadlessDialog } from '@headlessui/react';
import { MdClose } from '@/lib/icons';

/** components */
import Button from '../Button/Button';
import Card from '../Card/Card';

/** state */

/** helpers */

/** types */
import type { ReactNode } from 'react';

interface DialogProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  isFullscreen?: boolean;
  isOpen: boolean;
  onClose: () => void;
}

export const Dialog = ({
  children,
  className,
  containerClassName,
  isFullscreen,
  isOpen,
  onClose,
}: DialogProps) => {
  return (
    <HeadlessDialog
      open={isOpen}
      onClose={onClose}
      className={twMerge('relative z-50', className)}
    >
      <div
        className={twMerge(
          'fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 p-8',
          clsx(isFullscreen && 'p-0')
        )}
      >
        <Card
          className={clsx(
            'max-h-screen overflow-y-auto',
            isFullscreen && 'h-screen w-screen rounded-none p-0'
          )}
        >
          <Button
            className={clsx(
              'absolute right-0 p-0',
              isFullscreen && 'right-4 top-4'
            )}
            color='transparent'
            icon={<MdClose className='text-xl' />}
            onClick={onClose}
          />
          <HeadlessDialog.Panel
            className={twMerge('min-h-full', containerClassName)}
          >
            {children}
          </HeadlessDialog.Panel>
        </Card>
      </div>
    </HeadlessDialog>
  );
};

export const { Title, Description } = HeadlessDialog;
export default Dialog;
