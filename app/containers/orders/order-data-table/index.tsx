/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useQuery } from "@tanstack/react-query";

import { Input } from "@/components/ui/input";
import { columns, ORDER_DATA_TABLE_QUERY_KEY } from "./constants";
import { DataTable } from "@/app/common/DataTable";
import OrderTab from "../order-tab";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";
import { useApi } from "@/services/api";

export default function OrderDataTable() {
  const [tabCurrent, setTabCurrent] = useState("Pending");
  const { order } = useApi();

  const {
    isPending,
    isRefetching,
    data: { data } = {},
    refetch,
  } = useQuery({
    queryKey: [ORDER_DATA_TABLE_QUERY_KEY],
    queryFn: () => order.search("", tabCurrent.toLowerCase()),
    enabled: true,
  });
  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabCurrent]);

  return (
    <>
      <div className="flex justify-between items-center py-3">
        <OrderTab
          result={data?.result}
          tabCurrent={tabCurrent}
          setTabCurrent={(tab) => setTabCurrent(tab)}
        />
        <Button>
          <DownloadIcon size={16} />
          <span className="ml-2">Export</span>
        </Button>
      </div>
      <div className="flex justify-between">
        <div className="w-1/2">
          <Input
            className="h-8 w-1/2 bg-white"
            placeholder="Enter name to find..."
          />
        </div>
        <div className="flex w-1/2 justify-end"></div>
      </div>

      <div className="p-4 bg-white rounded shadow-md">
        <DataTable
          loading={isPending || isRefetching}
          columns={columns}
          datasource={data?.list}
        />
      </div>
    </>
  );
}
