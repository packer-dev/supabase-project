import ModalDelete from "@/app/modals/storage/ModalDelete";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { StorageContext } from "@/contexts/StorageContext";
import Image from "next/image";
import React, { useContext, useState } from "react";

type ItemMediaProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item?: any;
  loading?: boolean;
  mode?: "folder" | "image" | "video" | "file";
};
const ItemMedia = ({ item, loading, mode }: ItemMediaProps) => {
  const {
    state: { selected, path },
    dispatch,
  } = useContext(StorageContext);
  const [showPopover, setShowPopover] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const check =
    selected.findIndex((child) => child?.name === item?.name) === -1;
  return (
    <>
      <div
        onDoubleClick={() =>
          dispatch({
            key: "path",
            value: `${path}/${item.name}`,
          })
        }
        aria-hidden
        className={`relative border-2 border-solid  ${
          check ? "bg-transparent" : "border-blue-500"
        } rounded-sm shadow-sm ${
          loading || item?.lastModified ? "animate-pulse" : ""
        }`.trim()}
        style={{ paddingTop: "100%" }}
      >
        {!loading && !item?.lastModified ? (
          <label htmlFor={item.name} className="cursor-pointer">
            <div className="absolute top-3 left-3 z-20">
              <Checkbox
                onCheckedChange={(_) => {
                  dispatch({
                    key: "selected",
                    value: _
                      ? [...selected, item]
                      : [...selected].filter(
                          (child) => child.name !== item.name
                        ),
                  });
                }}
                className="bg-white border-solid border-gray-200"
                id={item.name}
              />
            </div>
            {mode === "image" ? (
              <Image
                src={`${
                  process.env.NEXT_PUBLIC_SUPABASE_URL
                }/storage/v1/object/public/packer-ui/${path}/${item?.name?.replace(
                  "packer-ui/",
                  ""
                )}`}
                alt=""
                className="absolute top-0 left-0 bottom-0 right-0 object-cover z-10"
                fill
                sizes="true"
              />
            ) : (
              <div className="absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center">
                <span className="bx bxs-folder text-5xl text-gray-600 -mt-8"></span>
                <div className="absolute left-3 bottom-3">
                  <p className="font-semibold text-gray-800 pb-0.5">
                    {item?.name}
                  </p>
                  <p className="text-gray-700 text-xs">Folder</p>
                </div>
              </div>
            )}
            <div className="absolute right-2 top-2 z-20">
              <Popover
                open={showPopover}
                onOpenChange={setShowPopover}
                modal={false}
              >
                <PopoverTrigger>
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black/30">
                    <span className="bx bx-pencil text-white text-base" />
                  </div>
                </PopoverTrigger>
                <PopoverContent align="start" className="p-0 w-28">
                  <p className="p-2 border-y border-gray-100 hover:bg-gray-50 cursor-pointer">
                    Rename
                  </p>
                  <p
                    onClick={() => {
                      setShowPopover(false);
                      setShowModalDelete(true);
                    }}
                    aria-hidden
                    className="p-2 border-y border-gray-100 hover:bg-gray-50 cursor-pointer text-red-500"
                  >
                    <span>Delete</span>
                  </p>
                </PopoverContent>
              </Popover>
            </div>
          </label>
        ) : (
          <div className="absolute top-0 left-0 bottom-0 right-0 bg-slate-200 flex items-center justify-center">
            {item?.lastModified && (
              <>
                <Image
                  src={URL.createObjectURL(item)}
                  alt=""
                  className="absolute top-0 left-0 bottom-0 right-0  object-cover"
                  fill
                  sizes="true"
                />
                <div className="absolute top-0 left-0 bottom-0 right-0  bg-slate-200 bg-opacity-50" />
                <span className="bx bx-loader-circle text-3xl relative z-10 animate-spin opacity-60"></span>
              </>
            )}
          </div>
        )}
      </div>
      {showModalDelete && (
        <ModalDelete
          show={showModalDelete}
          setShow={setShowModalDelete}
          items={[item]}
        />
      )}
    </>
  );
};

export default ItemMedia;
