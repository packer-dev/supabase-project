import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Dialog } from "@/components/ui/dialog";
import {
  SchemaVisualizerContext,
  TableProps,
} from "@/contexts/SchemaVisualizerContext";
import React, { useContext } from "react";
import ModalForeign from "../../modals/schema-visualizer/ModalForeign";
import ItemColumn from "../ItemColumn";

const ItemTable = ({ item }: { item: TableProps }) => {
  const {
    state: { showModalForeign, tables, relationships },
    dispatch,
  } = useContext(SchemaVisualizerContext);
  return (
    <ContextMenu modal={false}>
      <ContextMenuTrigger
        onDragOver={() => {
          dispatch({
            key: "current",
            value: item,
          });
        }}
        draggable
        className="absolute w-48 border-2 border-solid border-gray-500 rounded-lg pt-2 bg-gray-500 dark:bg-black/60"
        style={{
          left: item.position?.x ?? 0,
          top: item.position?.y ?? 0,
        }}
      >
        <div className="bg-white w-full rounded-lg cursor-pointer dark:bg-black/80">
          <div className="bg-gray-200 px-3 py-2 font-bold dark:bg-black">
            {item.name.slice(0, 12)}
          </div>
          <div className="flex flex-col gap-2 p-1.5">
            {showModalForeign === item.id && (
              <Dialog
                open={!!showModalForeign}
                onOpenChange={(open) =>
                  dispatch({
                    key: "showModalForeign",
                    value: open ? showModalForeign : "",
                  })
                }
              >
                <ModalForeign
                  type={
                    item.columns.find(
                      (item) => item.type && item.mode === "primary"
                    )?.type
                  }
                  current={item}
                  closeDialog={() =>
                    dispatch({
                      key: "showModalForeign",
                      value: "",
                    })
                  }
                />
              </Dialog>
            )}
            {item.columns.map((column) => (
              <ItemColumn item={item} column={column} key={column.id} />
            ))}
          </div>
        </div>
        <ContextMenuContent>
          <ContextMenuItem
            onClick={() => {
              dispatch({ key: "showModalTable", value: true });
              dispatch({ key: "tableCurrent", value: item });
            }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <span className="bx bx-pencil text-xl text-orange-500" />
            <span>Edit</span>
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => {
              dispatch({
                key: "tables",
                value: [...tables].filter((table) => table.id !== item.id),
              });
              dispatch({
                key: "relationships",
                value: [...relationships].filter(
                  (relationship) =>
                    relationship.list.findIndex(
                      (child) => child.id === item.id
                    ) === -1
                ),
              });
            }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <span className="bx bx-x text-xl text-red-500" />
            <span>Remove</span>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenuTrigger>
    </ContextMenu>
  );
};

export default ItemTable;
