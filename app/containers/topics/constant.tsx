import { Course } from '@/services/course.service';
import { ColumnDef } from '@tanstack/react-table';
import * as yup from 'yup';

export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: 'name',
    header: 'Exam topic name',
    cell: ({ row }) => (
      <span className="font-semibold text-primary cursor-pointer underline">
        {row.original.name}
      </span>
    ),
  },
  {
    accessorKey: 'created_at',
    header: 'Created At',
    cell: ({ row }) => <span>{row.original.created_at}</span>,
  },
];

export const schema = yup
  .object({
    name: yup.string().required(),
  })
  .required();
