import { Center, Checkbox } from "@mantine/core";
import { CaretSortIcon } from "@modulz/radix-icons";
import { DataTableProps, DataTablePropsBase } from "@shared/types/DataTable";

interface TbodyProps<T> {
  data: DataTablePropsBase<T>["data"];
  onDragRow?: DataTablePropsBase<T>["onDragRow"];
  dragableRow?: DataTablePropsBase<T>["dragableRow"];
  onRowClick?: DataTablePropsBase<T>["onRowClick"];
  columns: DataTablePropsBase<T>["columns"];
  selectableRows?: DataTableProps<T>["selectableRows"];
  selectedRows?: DataTableProps<T>["selectedRows"];
  id: DataTableProps<T>["id"];
  onSelectedRow?: DataTableProps<T>["onSelectedRow"];
}

export default function Tbody<T>({
  data,
  onDragRow,
  dragableRow,
  onRowClick,
  columns,
  selectableRows,
  selectedRows,
  id,
  onSelectedRow,
}: TbodyProps<T>) {
  const keyX = "text/plain";

  const handleDragRowStart = (
    e: React.DragEvent<HTMLTableRowElement>,
    i: string
  ) => {
    e.dataTransfer.setData(keyX, i);
  };

  const handleDragRowOver = (e: React.DragEvent<HTMLTableRowElement>) => {
    e.preventDefault();
  };

  const handleDropRow = (
    e: React.DragEvent<HTMLTableRowElement>,
    targetId: number
  ) => {
    const draggedId = e.dataTransfer.getData(keyX);
    const draggedRow = data.find((d, i) => i === +draggedId);
    const targetIndex = data.findIndex((d, i) => i === +targetId);

    const updatedRows = data.filter((d, i) => i !== +draggedId);
    updatedRows.splice(targetIndex, 0, draggedRow as T);

    onDragRow && onDragRow(updatedRows);
  };

  const items = data.map((row, i: number) => (
    <tr
      draggable={dragableRow}
      onDragStart={e => handleDragRowStart(e, i.toString())}
      onDragOver={handleDragRowOver}
      onDrop={e => handleDropRow(e, i as number)}
    >
      {dragableRow && (
        <td>
          <CaretSortIcon style={{ cursor: "grab" }} />
        </td>
      )}
      {selectableRows && selectedRows && id && onSelectedRow && (
        <td>
          <Center>
            <Checkbox
              color="dark"
              checked={selectedRows.some(r => row[id] === r[id])}
              onChange={() => {
                if (selectedRows.some(r => r[id] === row[id])) {
                  onSelectedRow(p => p.filter(r => r[id] !== row[id]));
                } else {
                  onSelectedRow(p => [
                    ...p,
                    data.find(r => r[id] === row[id]) as T,
                  ]);
                }
              }}
            />
          </Center>
        </td>
      )}

      {columns.map((column, idx) => (
        <td
          onClick={() => !column.disableClick && onRowClick && onRowClick(row)}
          className={`${column.tdClassName ?? ""} ${
            onRowClick ? "cursor-pointer" : ""
          }`}
        >
          {column.render
            ? column.render(
                typeof row[column.dataKey] === "object" && row[column.dataKey]
                  ? (row[column.dataKey] as any)[column.subkey as string]
                  : row[column.dataKey],
                idx,
                row
              )
            : row[column.dataKey]}
        </td>
      ))}
    </tr>
  ));

  const emptyData = () => {
    const columnsLength =
      columns.length + (selectableRows ? +1 : 0) + (dragableRow ? +1 : 0);
    return (
      <tr>
        <td colSpan={columnsLength} className="text-center text-gray-400">
          No data available
        </td>
      </tr>
    );
  };

  return <tbody>{data.length === 0 ? emptyData() : items}</tbody>;
}
