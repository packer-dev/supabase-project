/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import React, { ReactNode, useState } from "react";
import ButtonCreate from "./ButtonCreate";
import ConfirmDelete from "./ConfirmDelete";

export type CommonTableType = {
  queryFn: () => Promise<any>;
  queryKey: string[];
  columns: any[];
  messageDelete?: string;
  enableAction?: boolean;
  fnDelete: () => Promise<any>;
  fnInsert: () => Promise<any>;
  fnUpdate: () => Promise<any>;
  schema: any;
  children?: ReactNode;
  name?: string;
};

const TableCommon = ({
  queryFn,
  queryKey,
  columns,
  messageDelete,
  enableAction,
  fnDelete,
  fnInsert,
  fnUpdate,
  schema,
  children,
  name,
}: CommonTableType) => {
  //
  const [value, setValue] = useState("");
  const [id, setId] = useState<string | null>("");
  const [showDialog, setShowDialog] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const { data, isLoading, isPending, isRefetching, refetch } = useQuery({
    queryKey: [...queryKey, value],
    queryFn,
  });
  //
  return (
    <main className="flex flex-1 flex-col gap-4 py-4 lg:gap-4">
      <div className="flex justify-between">
        <div className="w-1/2">
          <Input
            className="h-8 w-1/2 bg-white"
            placeholder="Enter name to find..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <ButtonCreate
          save={id ? fnUpdate : fnInsert}
          refetch={refetch}
          id={id}
          open={showDialog}
          onOpenChange={(open) => {
            setShowDialog(open);
          }}
          schema={schema}
          name={name}
        >
          {children}
        </ButtonCreate>
      </div>
      <div className="p-4 bg-white rounded shadow-md">
        <DataTable
          onDelete={(row) => {
            setShowConfirmDelete(true);
            setId(row.original.id);
          }}
          onEdit={(row) => {
            setShowDialog(true);
            setId(row.original.id);
          }}
          loading={isPending || isRefetching || isLoading}
          columns={columns}
          datasource={data?.data}
          enableAction={enableAction}
        />
        <ConfirmDelete
          refetch={refetch}
          handleDelete={fnDelete}
          title={messageDelete}
          show={showConfirmDelete}
          setShow={setShowConfirmDelete}
        />
      </div>
    </main>
  );
};

export default TableCommon;
