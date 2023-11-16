/** external components */

import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

/** components */

/** state */

/** helpers */

/** types */
interface SliderProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  className?: string;
  label?: string;
}

export const Slider = ({ className, label, ...inputProps }: SliderProps) => {
  return (
    <label
      htmlFor='customRange1'
      className={twMerge('flex flex-col', className)}
    >
      {label}
      <input
        type='range'
        className='h-1.5 cursor-pointer appearance-none rounded-full bg-neutral-100'
        {...inputProps}
      />
    </label>
  );
};

export default Slider;
