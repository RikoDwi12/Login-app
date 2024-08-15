import { Center, Checkbox } from "@mantine/core";
import { DataTableProps, DataTablePropsBase } from "@shared/types/DataTable";
import Th from "./Th";

interface HeadProps<T> {
  data: DataTablePropsBase<T>["data"];
  sortBy?: DataTablePropsBase<T>["sortBy"];
  onSort?: DataTablePropsBase<T>["onSort"];
  sortDir?: DataTablePropsBase<T>["sortDir"];
  onSortDir?: DataTablePropsBase<T>["onSortDir"];
  columns: DataTablePropsBase<T>["columns"];
  onDragColumn?: DataTablePropsBase<T>["onDragColumn"];
  dragableRow?: DataTablePropsBase<T>["dragableRow"];
  selectableRows: DataTableProps<T>["selectableRows"];
  selectedRows: DataTableProps<T>["selectedRows"];
  onSelectedRow: DataTableProps<T>["onSelectedRow"];
  dragableColumn: DataTableProps<T>["dragableColumn"];
}

export default function THead<T>({
  data,
  onSort,
  sortBy,
  sortDir,
  onSortDir,
  columns,
  onDragColumn,
  dragableRow,
  selectableRows,
  selectedRows,
  onSelectedRow,
  dragableColumn,
}: HeadProps<T>) {
  const keyX = "text/plain";
  const pureSortBy = sortBy ? sortBy?.toString().split(".")[0] : undefined;

  const onSortHandler = (sort: any, subKey: any) => {
    // jika onSort ada, maka akan dijalankan
    if (onSort) {
      if (subKey) {
        onSort(`${sort}.${subKey}`);
      } else {
        onSort(sort);
      }
      if (sort === pureSortBy) {
        if (sortDir === false) {
          onSort(undefined);
          onSortDir && onSortDir(undefined);
        } else if (sortDir === undefined) {
          onSortDir && onSortDir(true);
        } else {
          onSortDir && onSortDir(false);
        }
      }
    }
  };

  const handleDragColumnStart = (
    e: React.DragEvent<HTMLTableCellElement>,
    columnIndex: number
  ) => {
    e.dataTransfer.setData(keyX, columnIndex.toString());
  };

  const handleDragColumnOver = (e: React.DragEvent<HTMLTableCellElement>) => {
    e.preventDefault();
  };

  const handleDropColumn = (
    e: React.DragEvent<HTMLTableCellElement>,
    targetIndex: number
  ) => {
    const draggedIndex = e.dataTransfer.getData(keyX);

    const updatedColumns = [...columns];
    const [draggedColumn] = updatedColumns.splice(Number(draggedIndex), 1);
    updatedColumns.splice(targetIndex, 0, draggedColumn);

    onDragColumn && onDragColumn(updatedColumns);
  };

  const handleSelectAll = () => {
    if (selectedRows && selectedRows.length === data.length) {
      onSelectedRow && onSelectedRow([]);
    } else {
      onSelectedRow && onSelectedRow(data);
    }
  };

  return (
    <thead className="sticky top-0">
      <tr>
        {dragableRow && <th className="rounded-l-[12px]" />}
        {selectableRows && selectedRows && (
          <th className={!dragableRow ? "rounded-l-[12px]" : ""}>
            <Center>
              <Checkbox
                color="dark"
                checked={
                  selectedRows.length > 0 && selectedRows.length === data.length
                }
                indeterminate={
                  selectedRows.length > 0 && selectedRows.length < data.length
                }
                onChange={handleSelectAll}
              />
            </Center>
          </th>
        )}
        {columns.map((column, index) => (
          <Th
            className={`${column.thClassName ?? ""} ${
              index === 0 && !dragableRow && !selectableRows
                ? "rounded-l-[12px]"
                : ""
            } ${index === columns.length - 1 ? "rounded-r-[12px]" : ""}`}
            sortable={column.sortable}
            onSortCol={() => onSortHandler(column.dataKey, column.subkey)}
            sorted={column.dataKey as string}
            reversed={sortDir && pureSortBy === column.dataKey}
            draggable={dragableColumn}
            onDragStart={e => handleDragColumnStart(e, index)}
            onDragOver={handleDragColumnOver}
            onDrop={e => handleDropColumn(e, index)}
            pureSortBy={pureSortBy}
          >
            {column.label}
          </Th>
        ))}
      </tr>
    </thead>
  );
}
