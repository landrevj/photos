import { twMerge } from 'tailwind-merge';
/** external components */

/** components */
import Paper from '../Paper/Paper';

/** state */

/** helpers */

/** types */
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className }: CardProps) => {
  return <Paper className={twMerge('p-4', className)}>{children}</Paper>;
};

export default Card;
