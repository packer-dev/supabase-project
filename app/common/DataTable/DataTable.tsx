'use client';

import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Ref,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { cn } from '@/lib/utils';
import { DataTableProps } from './type';
import EventEmitter from '@/utils/event-emitter';
import Spinner from '../Spinner';
import { getColumns } from './util';

const DataTable = forwardRef(function DataTable(
  props: DataTableProps,
  ref: Ref<any>
) {
  const {
    loading,
    datasource = [],
    enableRowSelection = false,
    stripedRows = true,
    cellInsideClick,
  } = props;
  const eventEmitter = useRef<EventEmitter>();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const onRowSelectionChange = (selectedRows: any) => {
    setRowSelection(selectedRows);
  };
  const actualColumns = getColumns(props);

  const table = useReactTable({
    data: datasource,
    columns: actualColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange,
    enableRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  useEffect(() => {
    eventEmitter.current = new EventEmitter();
  }, []);

  const selectRow = table.getSelectedRowModel().rows;

  useEffect(() => {
    eventEmitter.current?.emit(
      'rowSelectionChange',
      table.getSelectedRowModel().rows
    );
  }, [table, selectRow]);

  useImperativeHandle(
    ref,
    () => {
      return {
        current() {
          return table;
        },
        events: {
          on: {
            rowSelectionChange: (listener: any) => {
              eventEmitter.current?.on('rowSelectionChange', (rows: any) => {
                listener(rows);
              });
            },
          },
        },
      };
    },
    [table]
  );

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow className="border-white" key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="px-3 py-0.5 text-gray-900 bg-gray-200 first:rounded-l-md first:border-l last:rounded-r-md last:border-r border-white"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={actualColumns.length}>
                <div className="py-8">
                  <Spinner />
                </div>
              </TableCell>
            </TableRow>
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                className={cn(stripedRows && 'odd:bg-white even:bg-slate-50')}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="p-3">
                    <div
                      onClick={() =>
                        !cellInsideClick && props.onCellClick?.(row, cell)
                      }
                    >
                      {flexRender(cell.column.columnDef.cell, {
                        ...cell.getContext(),
                        onCellClick: props.onCellClick,
                      })}
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={actualColumns.length}
                className="h-24 text-center"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 pt-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
});

export default DataTable;
