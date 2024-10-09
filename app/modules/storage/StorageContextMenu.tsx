import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { ToastAction } from "@/components/ui/toast";
import { StorageContext } from "@/contexts/StorageContext";
import { toast } from "@/hooks/use-toast";
import supabase from "@/supabase";
import React, { ReactNode, useContext } from "react";

type StorageContextMenuProps = {
  children: ReactNode;
  hideCopy?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item?: any;
};

const StorageContextMenu = ({
  children,
  hideCopy,
  item,
}: StorageContextMenuProps) => {
  const {
    state: { path, copy: copies, medias },
    dispatch,
  } = useContext(StorageContext);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const loopCheck = async (list: any[], path_: string) => {
    for (const obj of list) {
      if (obj.metadata) {
        await supabase.storage
          .from("packer-ui")
          .copy(
            `${path_}/${obj.name}`,
            `${path.slice(1, path.length)}/${path_}/${obj.name}`
          );
      } else {
        const { data } = await supabase.storage
          .from("packer-ui")
          .list(`${path_}/${obj.name}`);
        if (data?.length) {
          await loopCheck(data, `${path_}/${obj.name}`);
        }
      }
    }
  };
  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        {!hideCopy && (
          <ContextMenuItem
            onClick={() => {
              dispatch({
                key: "copy",
                value: [
                  ...copies,
                  {
                    path: `${path}/${item?.name}`,
                    name: item?.name,
                    mode: item.metadata ? "file" : "folder",
                  },
                ],
              });
              toast({
                title: "Scheduled: Catch up ",
                description: "Friday, February 10, 2023 at 5:57 PM",
                action: (
                  <ToastAction altText="Goto schedule to undo">
                    Undo
                  </ToastAction>
                ),
              });
            }}
          >
            Copy
          </ContextMenuItem>
        )}
        <ContextMenuItem
          onClick={async () => {
            let mediaList = [...medias];
            for (const copy of copies) {
              if (copy?.mode === "file") {
                await supabase.storage
                  .from("packer-ui")
                  .copy(
                    copy?.path.slice(1, copy?.path.length),
                    `${path.slice(1, path.length)}/${copy?.name}`
                  );
                mediaList = [
                  { name: copy?.name, metadata: true },
                  ...mediaList,
                ];
              }
              if (copy?.mode === "folder") {
                const { data } = await supabase.storage
                  .from("packer-ui")
                  .list(copy?.path.slice(1, copy?.path.length));
                if (data?.length) {
                  await loopCheck(data, copy?.path.slice(1, copy?.path.length));
                }
                mediaList = [
                  { name: copy?.name, metadata: false },
                  ...mediaList,
                ];
              }
              dispatch({
                key: "medias",
                value: mediaList,
              });
            }
          }}
          disabled={copies.length === 0}
        >
          Parse
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default StorageContextMenu;
