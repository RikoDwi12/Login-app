import { Table } from "@mantine/core";
import { DataTableProps } from "@shared/types/DataTable";
import { PaginationDataTable } from "./Pagination";
import THead from "./THead";
import Tbody from "./Tbody";

export default function DataTable<T>(props: DataTableProps<T>) {
  const {
    id,
    data,
    columns,
    onRowClick,
    onSort,
    sortBy,
    sortDir,
    onSortDir,
    onDragRow,
    onDragColumn,
    page,
    selectableRows,
    onSelectedRow,
    selectedRows,
    dragableColumn,
    dragableRow,
  } = props;

  return (
    <>
      <Table striped highlightOnHover>
        <THead
          data={data}
          columns={columns}
          onSort={onSort}
          sortBy={sortBy}
          sortDir={sortDir}
          onSortDir={onSortDir}
          dragableColumn={dragableColumn}
          onDragColumn={onDragColumn}
          onSelectedRow={onSelectedRow}
          selectableRows={selectableRows}
          selectedRows={selectedRows}
          dragableRow={dragableRow}
        />
        <Tbody
          data={data}
          columns={columns}
          onRowClick={onRowClick}
          onDragRow={onDragRow}
          onSelectedRow={onSelectedRow}
          selectableRows={selectableRows}
          selectedRows={selectedRows}
          dragableRow={dragableRow}
          id={id}
        />
      </Table>
      <PaginationDataTable data={data} page={page} />
    </>
  );
}
