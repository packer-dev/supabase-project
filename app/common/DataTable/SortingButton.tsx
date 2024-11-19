import { Button } from "@/components/ui/button";
import {
  CaretDownIcon,
  CaretSortIcon,
  CaretUpIcon,
} from "@radix-ui/react-icons";
import { Column } from "@tanstack/react-table";

export default function SortingButton({ column }: { column: Column<any> }) {
  return (
    <Button
      variant="link"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {column.getIsSorted() ? (
        column.getIsSorted() === "asc" ? (
          <CaretUpIcon />
        ) : (
          <CaretDownIcon />
        )
      ) : (
        <CaretSortIcon className="h-4 w-4" />
      )}
    </Button>
  );
}
