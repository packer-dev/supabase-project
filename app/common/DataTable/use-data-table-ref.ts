import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';

import { FilePenLineIcon, Trash2Icon } from 'lucide-react';
import { DataTableProps } from './type';

export function getColumns<T>(tableProps: DataTableProps): ColumnDef<T>[] {
  const { columns, enableRowSelection, enableAction, onEdit, onDelete } =
    tableProps;

  const actionColumn: ColumnDef<T> = {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const handleDelete = () => {
        console.log('sdhs', row);
        onDelete?.(row.original);
      };
      const handleEdit = () => onEdit?.(row.original);
      return (
        // <DropdownMenu>
        //   <DropdownMenuTrigger asChild>
        //     <Button variant='ghost' className='h-8 w-8 p-0'>
        //       <span className='sr-only'>Open menu</span>
        //       <DotsHorizontalIcon className='h-4 w-4' />
        //     </Button>
        //   </DropdownMenuTrigger>
        //   <DropdownMenuContent align='end'>
        //     <DropdownMenuItem className='gap-2 text-sm'>
        //       <SquarePenIcon className='size-4' />
        //       <span>Edit</span>
        //     </DropdownMenuItem>
        //     <DropdownMenuSeparator />
        //     <DropdownMenuItem className='gap-2 text-sm text-red-600'>
        //       <TrashIcon className='size-4' />
        //       <span>Delete</span>
        //     </DropdownMenuItem>
        //   </DropdownMenuContent>
        // </DropdownMenu>
        <div className="flex items-center gap-1">
          <Button
            size="icon"
            variant="ghost"
            className="text-gray-700 hover:text-gray-900"
            onClick={handleEdit}
          >
            <FilePenLineIcon className="size-5" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="text-red-400 hover:text-red-600"
            onClick={handleDelete}
          >
            <Trash2Icon className="size-5" />
          </Button>
        </div>
      );
    },
  };

  const selectionColumn: ColumnDef<T> = {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  };

  return (
    [
      enableRowSelection ? selectionColumn : undefined,
      ...columns,
      enableAction ? actionColumn : undefined,
    ] as ColumnDef<T>[]
  ).filter((column) => !!column);
}
