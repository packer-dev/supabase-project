"use client";

import ModalTable from "@/app/modals/schema-visualizer/ModalTable";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { useContext, useRef } from "react";
import ItemTable from "./ItemTable";
import {
  SchemaVisualizerContext,
  TableProps,
} from "@/contexts/SchemaVisualizerContext";

const SchemaVisualizer = () => {
  const {
    state: { tables, relationships, tableCurrent, current, showModalTable },
    dispatch,
  } = useContext(SchemaVisualizerContext);
  console.log(relationships);
  const refParent = useRef<HTMLDivElement>(null);
  const handleRandomPosition = () => {
    if (!refParent.current) return;

    const parentWidth = refParent.current.clientWidth;
    const parentHeight = refParent.current.clientHeight;
    const randomX = Math.random() * (parentWidth - 128);
    const randomY = Math.random() * (parentHeight - 128);
    return {
      x: randomX,
      y: randomY,
    };
  };
  return (
    <div className="gap-2 flex-col flex">
      <Button
        onClick={() => dispatch({ key: "showModalTable", value: true })}
        className="w-28"
      >
        Add table
      </Button>
      {showModalTable && (
        <Dialog
          open={showModalTable}
          onOpenChange={(show: boolean) => {
            dispatch({ key: "showModalTable", value: show });
            if (!show) dispatch({ key: "tableCurrent", value: null });
          }}
        >
          <ModalTable
            submit={(table: TableProps) => {
              const result = handleRandomPosition();
              dispatch({
                key: "tables",
                value: tableCurrent
                  ? [...tables].map((item) =>
                      tableCurrent.id === item.id
                        ? { ...tableCurrent, ...table }
                        : item
                    )
                  : [
                      ...tables,
                      { ...table, ...(result ? { position: result } : {}) },
                    ],
              });
              dispatch({ key: "showModalTable", value: !showModalTable });
            }}
            tableCurrent={tableCurrent}
          />
        </Dialog>
      )}
      <div
        aria-hidden
        ref={refParent}
        className="p-3 border border-solid border-gray-300 flex-1 shadow-lg bg-white dark:bg-black dark:border-gray-900 
        relative overflow-scroll"
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          const newTableList = [...tables].map((item) => {
            if (current?.id === item.id) {
              return {
                ...item,
                position: {
                  x: event.clientX - 160 < 0 ? 0 : event.clientX - 160,
                  y: event.clientY - 95,
                },
              };
            }
            return item;
          });
          dispatch({
            key: "tables",
            value: newTableList,
          });

          const mapNewTableList = (
            item: TableProps,
            index: number,
            relationship: TableProps[]
          ) =>
            newTableList.find((child) => child.id === item.id) ||
            relationship[index];

          const handleCallback = (relationship: TableProps[]) =>
            relationship.map((item, index) =>
              mapNewTableList(item, index, relationship)
            );
          dispatch({
            key: "relationships",
            value: [...relationships].map((item) => ({
              ...item,
              list: handleCallback(item.list),
            })),
          });
        }}
      >
        <svg className="w-[880px] h-[561px]">
          {[...relationships].map((relationship) => (
            <line
              key={relationship.list[0].id + relationship.list[1].id}
              x1={(relationship.list[0].position?.x ?? 0) + 80}
              y1={relationship.list[0].position?.y}
              x2={(relationship.list[1].position?.x ?? 0) + 80}
              y2={relationship.list[1].position?.y}
              stroke="gray"
            />
          ))}
        </svg>
        {tables.map((item) => (
          <ItemTable key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default SchemaVisualizer;
