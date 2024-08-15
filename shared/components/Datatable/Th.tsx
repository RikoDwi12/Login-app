import { Center, Group, Text, UnstyledButton } from "@mantine/core";
import { ThProps } from "@shared/types/DataTable";
import { SortableIcon } from "./SortableIcon";

export default function Th({
  children,
  onSortCol,
  sorted,
  reversed = false,
  sortable = false,
  className,
  pureSortBy,
  ...propsTh
}: ThProps) {
  return (
    <th {...propsTh} className={className}>
      <UnstyledButton onClick={sortable ? onSortCol : () => {}}>
        <Group position="apart" className="flex-row flex flex-nowrap">
          <Text weight={600} size="sm">
            {children}
          </Text>
          <Center>
            {sortable ? (
              <SortableIcon
                size={14}
                stroke={1.5}
                sorted={sorted}
                reversed={reversed}
                pureSortBy={pureSortBy}
              />
            ) : null}
          </Center>
        </Group>
      </UnstyledButton>
    </th>
  );
}
