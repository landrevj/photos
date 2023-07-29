/** external components */

/** components */

/** state */

/** helpers */

/** types */
import type { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface TableRowProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLTableRowElement>,
    HTMLTableRowElement
  > {
  children?: ReactNode;
}

export const TableRow = ({
  children,
  className,
  ...tableRowProps
}: TableRowProps) => {
  return (
    <tr
      className={twMerge(
        'odd:bg-neutral-600 odd:bg-opacity-5 even:bg-neutral-900 even:bg-opacity-5 hover:bg-neutral-200 hover:bg-opacity-10',
        className
      )}
      {...tableRowProps}
    >
      {children}
    </tr>
  );
};

export default TableRow;
