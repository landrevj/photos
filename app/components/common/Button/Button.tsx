import Link from 'next/link';
import React from 'react';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps
  extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    React.AriaAttributes {
  href?: string;
  icon?: React.ReactNode;
}

export const Button = ({
  children,
  className,
  href,
  icon,
  ...rest
}: ButtonProps) => {
  const classString = twMerge(
    'rounded-lg bg-gray-200 px-4 py-1 hover:bg-gray-300 active:bg-gray-400 inline-block',
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
