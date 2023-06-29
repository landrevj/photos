import clsx from 'clsx';
import React from 'react';
import { twMerge } from 'tailwind-merge';

/** external components */
import Link from 'next/link';

/** components */

/** state */

/** helpers */

/** types */
import type { ColorTypes } from '../types';

export interface ButtonProps
  extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    React.AriaAttributes {
  href?: string;
  icon?: React.ReactNode;
  color?: ColorTypes | 'transparent';
}

export const Button = ({
  children,
  color = 'secondary',
  className,
  href,
  icon,
  ...rest
}: ButtonProps) => {
  const classString = twMerge(
    'rounded-lg px-4 py-1 hover:opacity-80 active:opacity-60 inline-block transition-opacity transition-colors drop-shadow',
    clsx(
      color === 'primary' && 'bg-gradient-primary text-white',
      color === 'secondary' && 'bg-gradient-secondary text-white',
      color === 'info' && 'bg-gradient-info text-white',
      color === 'success' && 'bg-gradient-success text-white',
      color === 'warning' && 'bg-gradient-warning text-white',
      color === 'error' && 'bg-gradient-error text-white',
      color === 'transparent' && 'bg-transparent drop-shadow-none'
    ),
    className
  );

  if (href) {
    return (
      <Link className={classString} href={href}>
        <div className='flex items-center gap-2'>
          {icon}
          {children}
        </div>
      </Link>
    );
  }

  return (
    // eslint-disable-next-line react/button-has-type
    <button className={classString} {...rest}>
      <div className='flex items-center gap-2'>
        {icon}
        {children}
      </div>
    </button>
  );
};

export default Button;
