import clsx from 'clsx';
import tinycolor from 'tinycolor2';

/** external components */
import { MdLock, MdLockOpen } from '@/lib/icons';
import { HexColorPicker } from 'react-colorful';
import { Popover } from '@headlessui/react';

/** components */
import Button from '@/components/common/Button/Button';

/** state */

/** helpers */

/** types */
import type { Image } from '@/types/images';
import { useState } from 'react';

interface ColorInputsProps {
  formValues: Partial<Image>;
  onDominantChange: (color: string, isLocked: boolean) => void;
  onComplementChange: (color: string, isLocked: boolean) => void;
  onLockChange: (isLocked: boolean) => void;
}

export const ColorInputs = ({
  formValues,
  onDominantChange,
  onComplementChange,
  onLockChange,
}: ColorInputsProps) => {
  const [areColorsSynced, setAreColorsSynced] = useState(true);

  return (
    <div className='flex flex-col gap-2'>
      <h4>Colors</h4>
      <div className='flex flex-1 gap-2'>
        <Popover className='relative flex flex-1'>
          <Popover.Button
            className={clsx(
              'flex-1 rounded-xl text-center drop-shadow hover:opacity-80 active:opacity-60',
              tinycolor(formValues.colors?.dominant).isLight() && 'text-black'
            )}
            style={{ backgroundColor: formValues.colors?.dominant }}
          >
            dominant
          </Popover.Button>
          <Popover.Panel className='absolute left-1/2 z-10 mt-14 -translate-x-1/2'>
            <HexColorPicker
              color={formValues.colors?.dominant}
              onChange={(color) => onDominantChange(color, areColorsSynced)}
            />
          </Popover.Panel>
        </Popover>
        <Button
          className='rounded-xl text-2xl'
          color='transparent'
          icon={areColorsSynced ? <MdLock /> : <MdLockOpen />}
          onClick={() =>
            setAreColorsSynced((prev) => {
              onLockChange(!prev);
              return !prev;
            })
          }
        />
        <Popover className='relative flex flex-1'>
          <Popover.Button
            className={clsx(
              'flex-1 rounded-xl p-4 text-center drop-shadow hover:opacity-80 active:opacity-60',
              tinycolor(formValues.colors?.complement).isLight() && 'text-black'
            )}
            style={{ backgroundColor: formValues.colors?.complement }}
          >
            complement
          </Popover.Button>
          <Popover.Panel className='absolute left-1/2 z-10 mt-14 -translate-x-1/2'>
            <HexColorPicker
              color={formValues.colors?.complement}
              onChange={(color) => onComplementChange(color, areColorsSynced)}
            />
          </Popover.Panel>
        </Popover>
      </div>
    </div>
  );
};

export default ColorInputs;
