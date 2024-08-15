import { TablerIconsProps } from "@tabler/icons-react";
import { Dispatch } from "react";

export interface DataTableColumnProps<T> {
  label: string;
  dataKey: keyof T;
  subkey?: string;
  sortable?: boolean;
  thClassName?: string;
  tdClassName?: string;
  render?: (value: any, index: number, row: T) => any;
  disableClick?: boolean;
}

export interface DataTablePropsBase<T> {
  data: T[];
  columns: DataTableColumnProps<T>[];
  onRowClick?: (row: T) => void;
  onSort?: (sortBy: any) => void;
  sortDir?: boolean;
  onSortDir?: (sortDir?: boolean) => void;
  sortBy?: keyof T;
  dragableColumn?: boolean;
  dragableRow?: boolean;
  onDragRow?: (data: T[]) => void;
  onDragColumn?: (column: DataTableColumnProps<T>[]) => void;
  page?: {
    currentPage: number;
    totalPage: number;
    totalData: number;
    sizePerPage: number;
    onSizeChange: (size: number) => void;
    onCurrentPageChange: (currentPage: number) => void;
  };
}

type DataTablePropsSelectable<T> = DataTablePropsBase<T> & {
  selectableRows: true;
  onSelectedRow: Dispatch<React.SetStateAction<T[]>>;
  selectedRows: T[];
  id: keyof T;
};

type DataTablePropsNotSelectable<T> = DataTablePropsBase<T> & {
  selectableRows?: false;
  onSelectedRow?: never;
  selectedRows?: never;
  id?: never;
};

export type DataTableProps<T> =
  | DataTablePropsSelectable<T>
  | DataTablePropsNotSelectable<T>;

export interface IconProps extends TablerIconsProps {
  sorted?: string;
  reversed?: boolean;
  pureSortBy?: string;
}

export interface ThProps extends React.ComponentPropsWithoutRef<"th"> {
  onSortCol?: () => void;
  sorted?: string;
  reversed?: boolean;
  sortable?: boolean;
  className?: string;
  pureSortBy?: string;
  children: React.ReactNode;
}
