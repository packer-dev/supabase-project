/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ColumnHeaderSortable from "@/app/common/DataTable/ColumnHeaderSortable";
import { Button } from "@/components/ui/button";
import { Order } from "@/services/order.service";
import { ColumnDef } from "@tanstack/react-table";
import { Check, TicketPercent, X } from "lucide-react";

export const ORDER_DATA_TABLE_QUERY_KEY = "order-data-table";

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return <ColumnHeaderSortable label="Order ID" column={column} />;
    },
    cell: ({ row }) => <p>#{row.original.id}</p>,
  },
  {
    accessorKey: "user",
    header: "Customer",
    cell: ({ row }) => (
      <div>
        <p>{row.original.user.email}</p>
        <p>{row.original.user.phone ?? "03******989"}</p>
      </div>
    ),
  },
  {
    accessorKey: "",
    header: "Customer Type",
    cell: () => <p>Phụ huynh</p>,
  },
  {
    accessorKey: "course",
    header: "Course",
    cell: ({ row }) => <p>{row.original.course.name}</p>,
  },
  {
    accessorKey: "price",
    header: "Order price",
    cell: ({ row }) => (
      <div className="flex flex-col text-red-500 font-semibold">
        <p>{row.original.price}</p>
        <div className="flex items-center gap-1 rounded-sm justify-center w-[90px] h-[20px] bg-red-500 text-white">
          <TicketPercent size={12} />
          <span className="text-xs">DISCOUNT</span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Order status",
    cell: ({ row }) => <p>{row.original.status}</p>,
  },
  {
    accessorKey: "updated_at",
    header: "Last update",
    cell: ({ row }) => <p>{row.original.updated_at}</p>,
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) =>
      row.original.status !== "done" && row.original.status !== "canceled" ? (
        <div className="flex flex-col gap-1">
          <Button variant="default" className="h-6 px-2">
            <Check size={10} />
            <span className="ml-1 text-xs">Activate</span>
          </Button>
          {row.original.status === "pending" && (
            <Button variant="secondary" className="h-6 px-2">
              <X size={10} />
              <span className="ml-1 text-xs">Cancel</span>
            </Button>
          )}
        </div>
      ) : (
        <></>
      ),
  },
];
