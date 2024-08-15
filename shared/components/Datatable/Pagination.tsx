import { Pagination, Select, Text } from "@mantine/core";
import { DataTablePropsBase } from "@shared/types/DataTable";

interface Props<T> {
  data: DataTablePropsBase<T>["data"];
  page?: DataTablePropsBase<T>["page"];
}
export function PaginationDataTable<T>({ page, data }: Props<T>) {
  if (!page) return null;
  return (
    <div className="flex justify-between my-5 p-6">
      <div className="flex-row flex items-center">
        <div className="w-28 mr-8">
          <Select
            value={page?.sizePerPage?.toString() ?? "100"}
            data={[
              { value: "10", label: "10" },
              { value: "50", label: "50" },
              { value: "100", label: "100" },
              { value: "500", label: "500" },
              { value: "1000", label: "1000" },
            ]}
            onChange={v => page?.onSizeChange(Number(v))}
          />
        </div>
        <Text color="#828282" size={14} className="hidden md:flex">
          Show {data.length} from {page?.totalData ?? data.length}
        </Text>
      </div>
      <Pagination
        onChange={page?.onCurrentPageChange}
        total={page?.totalPage ?? 0}
      />
    </div>
  );
}
