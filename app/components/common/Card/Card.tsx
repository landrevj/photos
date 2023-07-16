import { twMerge } from 'tailwind-merge';
/** external components */

/** components */
import Paper from '../Paper/Paper';

/** state */

/** helpers */

/** types */
import type { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className, ...divProps }: CardProps) => {
  return (
    <Paper className={twMerge('p-4', className)} {...divProps}>
      {children}
    </Paper>
  );
};

export default Card;
