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

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  children: ReactNode;
}

export const Dialog = ({
  children,
  description,
  isOpen,
  onClose,
  title,
}: ModalProps) => {
  return (
    <HeadlessDialog open={isOpen} onClose={onClose} className='relative z-50'>
      <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 p-8'>
        <Card>
          <HeadlessDialog.Panel>
            <Button
              className='absolute right-0'
              color='transparent'
              icon={<MdClose />}
              onClick={onClose}
            />
            <HeadlessDialog.Title>
              <h1 className='text-2xl'>{title || 'dialog'}</h1>
            </HeadlessDialog.Title>
            <HeadlessDialog.Description>
              <h2 className='text-blue-700'>{description || 'description'}</h2>
            </HeadlessDialog.Description>

            {children}
          </HeadlessDialog.Panel>
        </Card>
      </div>
    </HeadlessDialog>
  );
};

export default Dialog;
