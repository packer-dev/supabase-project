import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ColumnProps, TableProps } from "@/contexts/SchemaVisualizerContext";
import { useState } from "react";

const ModalTable = ({
  submit,
  tableCurrent,
}: {
  submit: (table: TableProps) => void;
  tableCurrent: TableProps | null;
}) => {
  const [name, setName] = useState(
    tableCurrent?.name ?? Math.random().toString().slice(0, 20)
  );
  const [columns, setColumns] = useState<ColumnProps[]>(
    tableCurrent?.columns || []
  );
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>
          <Input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Create table"
            defaultValue="table_"
            className="w-11/12"
          />
        </DialogTitle>
        <DialogDescription>
          Make changes to your table here. Click save when you re done.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4">
        {columns.map((item) => (
          <div key={item.id} className="grid grid-cols-2 items-center gap-4">
            <Input
              id="name"
              value={item.value}
              className="flex-1"
              onChange={(e) =>
                setColumns(
                  [...columns].map((child) => {
                    if (child.id === item.id) {
                      return { ...child, value: e.target.value };
                    }
                    return child;
                  })
                )
              }
            />
            <div className="flex flex-row gap-3">
              <div className="flex-1 relative z-50">
                <Combobox
                  list={[
                    {
                      value: "Integer",
                      label: "Integer",
                    },
                    {
                      value: "String",
                      label: "String",
                    },
                    {
                      value: "Boolean",
                      label: "Boolean",
                    },
                  ]}
                  value={item.type}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  setValue={(value: any) => {
                    setColumns(
                      [...columns].map((child) => {
                        if (child.id === item.id) {
                          return { ...child, type: value };
                        }
                        return child;
                      })
                    );
                  }}
                />
              </div>
              <span
                aria-hidden
                onClick={() =>
                  setColumns(
                    [...columns].filter((child) => child.id !== item.id)
                  )
                }
                className="text-red-500 text-2xl cursor-pointer"
              >
                &times;
              </span>
            </div>
          </div>
        ))}
      </div>
      <Button
        onClick={() =>
          setColumns([
            ...columns,
            {
              id: Math.random().toString(),
              value: "",
              type: "",
              mode: "normal",
            },
          ])
        }
        variant="secondary"
      >
        Add column
      </Button>
      <DialogFooter>
        <Button
          onClick={() =>
            submit?.({
              id: Math.random().toString(),
              name,
              columns,
            })
          }
          type="submit"
        >
          Save changes
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default ModalTable;
