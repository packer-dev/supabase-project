"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { Fragment, useContext } from "react";
import ItemMedia from "./ItemMedia";
import useFetchData from "@/hooks/useFetchData";
import supabase from "@/supabase";
import { StorageContext } from "@/contexts/StorageContext";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import Image from "next/image";
import { DialogTrigger } from "@/components/ui/dialog";
import ModalFolder from "@/app/modals/storage/ModalFolder";
import ModalDelete from "@/app/modals/storage/ModalDelete";

const Storage = () => {
  const {
    state: { medias: mediasList, showModal, path, refresh, selected },
    dispatch,
  } = useContext(StorageContext);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { loading } = useFetchData<any>(
    () =>
      supabase.storage.from("packer-ui").list(path.slice(1, path.length), {
        limit: 100, // You can set a limit on the number of files
        offset: 0, // You can paginate using offset
      }),
    (result) =>
      dispatch({
        key: "medias",
        value: result?.data || [],
      }),
    [path, refresh]
  );
  const medias = mediasList.filter(
    (item) => item.name !== ".emptyFolderPlaceholder"
  );
  const listFolder = path.split("/");
  return (
    <div className="w-3/4 mx-auto p-10">
      <div className="flex-row flex gap-3 justify-between items-center pb-3">
        <span className="font-bold text-2xl">Media explorer</span>
        <Input spellCheck={false} className="w-1/2 border-gray-300" />
      </div>
      <div className="flex flex-row gap-2 items-center py-3">
        <div className="flex gap-2 items-center">
          <i className="bx bxs-cloud"></i>
          <span
            onClick={() => dispatch({ key: "path", value: "" })}
            aria-hidden
            className={`font-semibold cursor-pointer ${
              path === "" ? "" : "text-gray-600"
            }`}
          >
            Home
          </span>
        </div>
        {listFolder.length > 1 &&
          listFolder
            .filter((item) => item)
            .map((item, index) => (
              <Fragment key={item}>
                <span className="bx bx-chevron-right"></span>
                <span
                  aria-hidden
                  onClick={() => {
                    dispatch({
                      key: "path",
                      value:
                        "/" +
                        listFolder
                          .filter((child) => child)
                          .slice(0, index + 1)
                          .join("/"),
                    });
                  }}
                  className={`font-bold cursor-pointer ${
                    index === listFolder.length - 2 ? "" : "text-gray-600"
                  }`}
                >
                  {item}
                </span>
              </Fragment>
            ))}
      </div>
      <div className="flex justify-between items-center py-3">
        <div className="flex gap-3 items-center">
          <span
            aria-hidden
            onClick={() =>
              dispatch({
                key: "refresh",
                value: Math.random(),
              })
            }
            className="bx bx-refresh cursor-pointer"
          ></span>
          <span className="text-gray-600">|</span>
          <span className="text-gray-600">Showing 19 folders and 36 files</span>
        </div>
        <div className="flex gap-6 items-center">
          {selected.length > 0 && (
            <Button
              onClick={() =>
                dispatch({
                  key: "showModal",
                  value: "delete",
                })
              }
              className="bg-red-500 hover:bg-red-500"
            >
              Delete
            </Button>
          )}
          {showModal === "delete" && (
            <ModalDelete
              items={selected}
              show={true}
              setShow={(show) =>
                dispatch({
                  key: "showModal",
                  value: show ? "delete" : "",
                })
              }
            />
          )}
          <ModalFolder
            show={showModal === "folder"}
            setShow={(show) =>
              dispatch({
                key: "showModal",
                value: show ? "folder" : "",
              })
            }
          >
            <DialogTrigger>
              <div className="flex gap-2 items-center cursor-pointer">
                <span className="bx bx-plus"></span>
                <span>New folder</span>
              </div>
            </DialogTrigger>
          </ModalFolder>
          <label htmlFor="file" className="block relative">
            <Button type="button">Upload</Button>
            <div className="absolute top-0 left-0 bottom-0 right-0" />
          </label>
          <input
            onChange={async (event) => {
              if (!event.target.files?.length) return;
              const newResult = [
                ...Array.from(event.target.files || []),
                ...medias,
              ];
              dispatch({
                key: "medias",
                value: newResult,
              });
              let newResultLast = [...newResult];
              const files = event.target.files;
              for (const file of Array.from(files)) {
                const { data } = await supabase.storage
                  .from(`packer-ui${path}`)
                  .upload(`${new Date().getTime()}_${file.name}`, file);
                newResultLast = [...newResultLast].map((item) =>
                  item.name === file.name
                    ? {
                        ...item,
                        name: data?.path,
                        metadata: true,
                      }
                    : item
                );
              }
              dispatch({
                key: "medias",
                value: newResultLast,
              });
            }}
            type="file"
            className="hidden"
            id="file"
            multiple
            accept="jpg"
          />
        </div>
      </div>
      <ContextMenu>
        <ContextMenuTrigger>
          <div
            className={`w-full grid ${
              !loading && !medias?.length ? "" : "grid-cols-4 my-5"
            } gap-3`}
          >
            {loading && (
              <>
                <ItemMedia loading />
                <ItemMedia loading />
                <ItemMedia loading />
                <ItemMedia loading />
                <ItemMedia loading />
                <ItemMedia loading />
                <ItemMedia loading />
                <ItemMedia loading />
              </>
            )}
            {!loading &&
              !!medias?.length &&
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              medias?.map((item: any) => (
                <ItemMedia
                  key={item?.name}
                  item={item}
                  loading={loading}
                  mode={item?.metadata ? "image" : "folder"}
                />
              ))}
            {!loading && !medias?.length && (
              <div
                className="flex justify-center items-center py-8 text-sm font-semibold flex-col 
          text-gray-500"
              >
                <div className="relative w-80 h-80">
                  <Image
                    src="https://media-explorer.cloudinary.com/assets/images/AssetFolderViewEmptyState..svg"
                    alt=""
                    fill
                    sizes="true"
                    className="w-80 h-80 object-contain"
                  />
                </div>
                <p>No result.</p>
              </div>
            )}
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Copy</ContextMenuItem>
          <ContextMenuItem className="opacity-50 cursor-not-allowed">
            Parse
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  );
};

export default Storage;
