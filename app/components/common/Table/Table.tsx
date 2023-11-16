/** external components */

/** components */

/** state */

/** helpers */

/** types */
import type { DetailedHTMLProps, ReactNode, TableHTMLAttributes } from 'react';

interface TableProps
  extends DetailedHTMLProps<
    TableHTMLAttributes<HTMLTableElement>,
    HTMLTableElement
  > {
  children?: ReactNode;
}

export const Table = ({ children, ...tableProps }: TableProps) => {
  return <table {...tableProps}>{children}</table>;
};

export default Table;
