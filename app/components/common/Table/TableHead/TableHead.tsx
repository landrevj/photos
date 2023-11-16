/** external components */

/** components */

/** state */

/** helpers */

/** types */
import type { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface TableHeadProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLTableSectionElement>,
    HTMLTableSectionElement
  > {
  children?: ReactNode;
}

export const TableHead = ({
  children,
  className,
  ...tableHeadProps
}: TableHeadProps) => {
  return (
    <thead
      className={twMerge(
        'border-b-[1px] border-white border-opacity-30',
        className
      )}
      {...tableHeadProps}
    >
      {children}
    </thead>
  );
};

export default TableHead;
