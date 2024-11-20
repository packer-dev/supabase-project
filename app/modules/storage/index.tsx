'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { Fragment, useContext } from 'react';
import ItemMedia from './ItemMedia';
import useFetchData from '@/hooks/useFetchData';
import supabase from '@/supabase';
import { StorageContext } from '@/contexts/StorageContext';
import Image from 'next/image';
import { DialogTrigger } from '@/components/ui/dialog';
import ModalFolder from '@/app/modals/storage/ModalFolder';
import ModalDelete from '@/app/modals/storage/ModalDelete';
import StorageContextMenu from './StorageContextMenu';
import { toast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';

const Storage = () => {
  const {
    state: {
      medias: mediasList,
      showModal,
      path,
      refresh,
      selected,
      copy: copies,
    },
    dispatch,
  } = useContext(StorageContext);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const loopCheck = async (list: any[], path_: string) => {
    for (const obj of list) {
      if (obj.metadata) {
        await supabase.storage
          .from('packer-ui')
          .copy(
            `${path_}/${obj.name}`,
            `${path.slice(1, path.length)}/${path_}/${obj.name}`
          );
      } else {
        const { data } = await supabase.storage
          .from('packer-ui')
          .list(`${path_}/${obj.name}`);
        if (data?.length) {
          await loopCheck(data, `${path_}/${obj.name}`);
        }
      }
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { loading } = useFetchData<any>(
    () =>
      supabase.storage.from('packer-ui').list(path.slice(1, path.length), {
        limit: 100, // You can set a limit on the number of files
        offset: 0, // You can paginate using offset
      }),
    (result) =>
      dispatch({
        key: 'medias',
        value: result?.data || [],
      }),
    [path, refresh]
  );
  const medias = mediasList.filter(
    (item) => item.name !== '.emptyFolderPlaceholder'
  );
  const listFolder = path.split('/');
  const down = async (e: KeyboardEvent) => {
    if (e.key === 'a' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      dispatch({
        key: 'selected',
        value: medias,
      });
    }
    if (e.key === 'c' && (e.metaKey || e.ctrlKey)) {
      dispatch({
        key: 'copy',
        value: [...selected].map((item) => ({
          path: `${path}/${item?.name}`,
          name: item?.name,
          mode: item.metadata ? 'file' : 'folder',
        })),
      });
      toast({
        title: 'Copied successfully',
        description: `You copied ${selected.length} items.`,
        action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
      });
    }
    if (e.key === 'v' && (e.metaKey || e.ctrlKey)) {
      if (copies.length > 0) {
        let mediaList = [...medias];
        for (const copy of copies) {
          if (copy?.mode === 'file') {
            await supabase.storage
              .from('packer-ui')
              .copy(
                copy?.path.slice(1, copy?.path.length),
                `${path.slice(1, path.length)}/${copy?.name}`
              );
            mediaList = [{ name: copy?.name, metadata: true }, ...mediaList];
          }
          if (copy?.mode === 'folder') {
            const { data } = await supabase.storage
              .from('packer-ui')
              .list(copy?.path.slice(1, copy?.path.length));
            if (data?.length) {
              await loopCheck(data, copy?.path.slice(1, copy?.path.length));
            }
            mediaList = [{ name: copy?.name, metadata: false }, ...mediaList];
          }
          dispatch({
            key: 'medias',
            value: mediaList,
          });
        }
      }
      toast({
        title: 'Parsed successfully',
        description: `You parse ${copies.length} items.`,
        action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
      });
    }
    if (e.key === 'Escape') {
      dispatch({
        key: 'copy',
        value: [],
      });
      dispatch({
        key: 'selected',
        value: [],
      });
    }
  };
  React.useEffect(() => {
    document.removeEventListener('keydown', down);
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [medias]);
  return (
    <div className="mx-auto">
      <div className="flex-row flex gap-3 justify-between items-center pb-3">
        <span className="font-bold text-2xl">Media explorer</span>
        <Input spellCheck={false} className="w-1/2 border-gray-300" />
      </div>
      <div className="flex flex-row gap-2 items-center py-3">
        <div className="flex gap-2 items-center">
          <i className="bx bxs-cloud"></i>
          <span
            onClick={() => dispatch({ key: 'path', value: '' })}
            aria-hidden
            className={`font-semibold cursor-pointer ${
              path === '' ? '' : 'text-gray-600'
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
                <span className="bx bx-chevron-right" />
                <span
                  aria-hidden
                  onClick={() => {
                    dispatch({
                      key: 'path',
                      value:
                        '/' +
                        listFolder
                          .filter((child) => child)
                          .slice(0, index + 1)
                          .join('/'),
                    });
                  }}
                  className={`font-bold cursor-pointer ${
                    index === listFolder.length - 2 ? '' : 'text-gray-600'
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
            onClick={() => {
              dispatch({
                key: 'selected',
                value: [],
              });
              dispatch({
                key: 'copy',
                value: [],
              });
              dispatch({
                key: 'refresh',
                value: Math.random(),
              });
            }}
            className="bx bx-refresh cursor-pointer"
          />
          <span className="text-gray-600">|</span>
          <span className="text-gray-600 dark:text-gray-300">
            Showing 19 folders and 36 files
          </span>
        </div>
        <div className="flex gap-6 items-center">
          {selected.length > 0 && (
            <Button
              onClick={() =>
                dispatch({
                  key: 'showModal',
                  value: 'delete',
                })
              }
              className="bg-red-500 hover:bg-red-500"
            >
              Delete
            </Button>
          )}
          {showModal === 'delete' && (
            <ModalDelete
              items={selected}
              show={true}
              setShow={(show) =>
                dispatch({
                  key: 'showModal',
                  value: show ? 'delete' : '',
                })
              }
            />
          )}
          <ModalFolder
            show={showModal === 'folder'}
            setShow={(show) =>
              dispatch({
                key: 'showModal',
                value: show ? 'folder' : '',
              })
            }
          >
            <DialogTrigger>
              <div className="flex gap-2 items-center cursor-pointer">
                <span className="bx bx-plus" />
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
                key: 'medias',
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
                dispatch({
                  key: 'medias',
                  value: newResultLast,
                });
              }
            }}
            type="file"
            className="hidden"
            id="file"
            multiple
            accept="jpg, gif"
          />
        </div>
      </div>
      <StorageContextMenu hideCopy>
        <div
          aria-hidden
          className={`w-full grid ${
            !loading && !medias?.length
              ? ''
              : 'lg:grid-cols-5 xl:grid-cols-6 md:grid-cols-4 my-5'
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
                mode={item?.metadata ? 'image' : 'folder'}
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
      </StorageContextMenu>
    </div>
  );
};

export default Storage;
