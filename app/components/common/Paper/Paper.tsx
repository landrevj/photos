import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

/** external components */

/** components */

/** state */

/** helpers */

/** types */
import type { HTMLAttributes, ReactNode } from 'react';

interface PaperProps extends HTMLAttributes<HTMLDivElement> {
  elevation?: number;
  children: ReactNode;
  className?: string;
}

const elevationShadowMap: Record<number, string> = {
  0: 'drop-shadow-none',
  1: 'drop-shadow',
  2: 'drop-shadow-md',
  3: 'drop-shadow-lg',
  4: 'drop-shadow-xl',
  5: 'drop-shadow-2xl',
};

export const Paper = ({
  children,
  className,
  elevation = 1,
  ...divProps
}: PaperProps) => {
  return (
    <div
      className={twMerge(
        clsx('rounded-xl bg-white', elevationShadowMap[elevation]),
        className
      )}
      {...divProps}
    >
      {children}
    </div>
  );
};

export default Paper;
