import { IconProps } from "@shared/types/DataTable";
import {
  IconChevronDown,
  IconChevronUp,
  IconSelector,
} from "@tabler/icons-react";

export function SortableIcon({
  pureSortBy,
  sorted,
  reversed,
  ...props
}: IconProps): JSX.Element {
  if (pureSortBy === sorted) {
    if (reversed) {
      return <IconChevronUp {...props} />;
    }
    return <IconChevronDown {...props} />;
  }
  return <IconSelector {...props} />;
}
