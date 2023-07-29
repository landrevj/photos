/** external components */

/** components */

/** state */

/** helpers */

/** types */
import type { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

interface TableBodyProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLTableSectionElement>,
    HTMLTableSectionElement
  > {
  children?: ReactNode;
}

export const TableBody = ({ children, ...tableBodyProps }: TableBodyProps) => {
  return <tbody {...tableBodyProps}>{children}</tbody>;
};

export default TableBody;
