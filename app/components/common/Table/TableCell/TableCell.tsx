import { twMerge } from 'tailwind-merge';

/** external components */

/** components */

/** state */

/** helpers */

/** types */
import type { DetailedHTMLProps, ReactNode, TdHTMLAttributes } from 'react';

interface TableCellProps
  extends DetailedHTMLProps<
    TdHTMLAttributes<HTMLTableCellElement>,
    HTMLTableCellElement
  > {
  children?: ReactNode;
}

export const TableCell = ({
  children,
  className,
  ...tableCellProps
}: TableCellProps) => {
  return (
    <td className={twMerge('p-2', className)} {...tableCellProps}>
      {children}
    </td>
  );
};

export default TableCell;
