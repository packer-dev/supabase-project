import { Lesson } from "@/services/lesson.service";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Lesson>[] = [
  {
    accessorKey: "name",
    header: "Lesson Name",
    cell: ({ row }) => (
      <span className="font-semibold text-primary cursor-pointer underline">
        {row.original.name}
      </span>
    ),
  },
  {
    accessorKey: "updated_at",
    header: "Updated At",
    cell: ({ row }) => <span>{row.original.update_at}</span>,
  },
];
