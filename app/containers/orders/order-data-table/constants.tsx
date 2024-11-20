/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import ColumnHeaderSortable from '@/app/common/DataTable/ColumnHeaderSortable';
import { Button } from '@/components/ui/button';
import { Order } from '@/services/order.service';
import { ColumnDef } from '@tanstack/react-table';
import { Check, TicketPercent, X } from 'lucide-react';

export const ORDER_DATA_TABLE_QUERY_KEY = 'order-data-table';

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => {
      return <ColumnHeaderSortable label="Order ID" column={column} />;
    },
    cell: ({ row }) => <p>#{row.original.id}</p>,
  },
  {
    accessorKey: 'users',
    header: 'Customer',
    cell: ({ row }) => (
      <div>
        <p>{row.original.users.email}</p>
        <p>{row.original.users.phone ?? '03******989'}</p>
      </div>
    ),
  },
  {
    accessorKey: '',
    header: 'Customer Type',
    cell: () => <p>Phụ huynh</p>,
  },
  {
    accessorKey: 'course',
    header: 'Course',
    cell: ({ row }) => <p>{row.original.courses.name}</p>,
  },
  {
    accessorKey: 'price',
    header: 'Order price',
    cell: ({ row }) => (
      <div className="flex flex-col text-red-500 font-semibold">
        <p>{row.original.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }).replace("VND", "VNĐ")}</p>
        {row.original.is_discount && (
          <div className="flex items-center gap-1 rounded-sm justify-center w-[90px] h-[20px] bg-red-500 text-white">
            <TicketPercent size={12} />
            <span className="text-xs">DISCOUNT</span>
          </div>
        )}
      </div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Order status',
    cell: ({ row }) => {
      const upperFirstWord =
        String(row.original.status).charAt(0).toUpperCase() +
        String(row.original.status).slice(1);
      switch (row.original.status) {
        case 'pending':
          return (
            <span className="text-xs text-white p-1 font-semibold rounded-sm bg-orange-500">
              {upperFirstWord}
            </span>
          );
        case 'canceled':
          return (
            <span className="text-xs text-white p-1 font-semibold rounded-sm bg-red-500">
              {upperFirstWord}
            </span>
          );
        case 'done':
          return (
            <span className="text-xs text-white p-1 font-semibold rounded-sm bg-green-500">
              {upperFirstWord}
            </span>
          );
        default:
          return <></>;
      }
    },
  },
  {
    accessorKey: 'updated_at',
    header: 'Last update',
    cell: ({ row }) => <p>{row.original.updated_at}</p>,
  },
  {
    accessorKey: 'action',
    header: 'Action',
    aggregationFn: (row, cell) => {
      console.log(row, cell);
    },
    cell: ({ row, onCellClick, cell }: any) => {
      return row.original.status !== 'done' &&
        row.original.status !== 'canceled' ? (
        <div className="flex flex-col gap-1">
          <Button
            variant="default"
            onClick={() => onCellClick(row, { ...cell, payload: 'done' })}
            className="h-6 px-2"
          >
            <Check size={10} />
            <span className="ml-1 text-xs">Activate</span>
          </Button>
          {row.original.status === 'pending' && (
            <Button
              onClick={() => onCellClick(row, { ...cell, payload: 'canceled' })}
              variant="secondary"
              className="h-6 px-2"
            >
              <X size={10} />
              <span className="ml-1 text-xs">Cancel</span>
            </Button>
          )}
        </div>
      ) : (
        <></>
      );
    },
  },
];
