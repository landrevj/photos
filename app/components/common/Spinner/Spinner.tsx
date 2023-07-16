import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

/** external components */

/** components */

/** state */

/** helpers */

/** types */
interface SpinnerProps {
  isLoading?: boolean;
  className?: string;
  containerClassName?: string;
}

export const Spinner = ({
  isLoading,
  className,
  containerClassName,
}: SpinnerProps) => {
  return (
    <div className={containerClassName}>
      <div
        className={twMerge(
          clsx(
            'inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-white border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]',
            !isLoading && 'hidden'
          ),
          className
        )}
        role='status'
      >
        <span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
          Loading...
        </span>
      </div>
    </div>
  );
};

export default Spinner;
