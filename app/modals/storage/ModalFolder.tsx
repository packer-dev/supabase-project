import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { StorageContext } from '@/contexts/StorageContext';
import supabase from '@/supabase';
import { DialogTitle } from '@radix-ui/react-dialog';
import React, { ReactNode, useContext, useState } from 'react';

type ModalFolderProps = {
  show: boolean;
  setShow: (bool: boolean) => void;
  children?: ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item?: any;
};

const ModalFolder = ({ show, setShow, children, item }: ModalFolderProps) => {
  //
  const {
    state: { medias, path },
    dispatch,
  } = useContext(StorageContext);
  const typeFile = item?.name.split('.')[item?.name.split('.').length - 1];
  const [name, setName] = useState(item?.name?.split('.')[0] || '');
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);

    if (item) {
      await handleRename();
    } else {
      await supabase.storage
        .from('packer-ui')
        .upload(
          `${path}/${name}/.emptyFolderPlaceholder`,
          new Blob([''], { type: 'text/plain' })
        );
      dispatch({
        key: 'medias',
        value: [
          {
            name,
          },
          ...medias,
        ],
      });
    }
    setShow(false);
    setLoading(false);
    setName('');
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const loopCheck = async (list: any[], path: string) => {
    for (const obj of list) {
      if (obj.metadata) {
        await supabase.storage
          .from('packer-ui')
          .copy(
            `${path}/${obj.name}`,
            `${path}/${obj.name}`.replace(item?.name, name)
          );
        await supabase.storage
          .from('packer-ui')
          .remove([`${path}/${obj.name}`]);
      } else {
        const { data } = await supabase.storage
          .from('packer-ui')
          .list(`${path}/${obj.name}`);
        if (data?.length) {
          await loopCheck(data, `${path}/${obj.name}`);
        }
      }
    }
  };
  const handleRename = async () => {
    const path_ = `${
      path.slice(1, path.length) ? `${path.slice(1, path.length)}/` : ''
    }${item.name}`;
    const { data } = await supabase.storage.from('packer-ui').list(path_);
    if (data?.length) {
      for (const obj of data) {
        if (!obj.metadata) {
          // eslint-disable-next-line prefer-const
          let child = `${path_}/${obj.name}`;
          const { data } = await supabase.storage.from('packer-ui').list(child);
          if (data?.length) {
            await loopCheck(data, child);
          }
        } else {
          const newSourcePath = `${
            path.slice(1, path.length) ? `${path.slice(1, path.length)}/` : ''
          }${item.name}/${obj.name}`;
          const newTargetPath = `${
            path.slice(1, path.length) ? `${path.slice(1, path.length)}/` : ''
          }${name}/${obj.name}`;
          await supabase.storage
            .from('packer-ui')
            .copy(newSourcePath, newTargetPath);
          await supabase.storage.from('packer-ui').remove([newSourcePath]);
        }
      }
    } else {
      await supabase.storage
        .from('packer-ui')
        .copy(
          path_,
          `${
            path.slice(1, path.length) ? `${path.slice(1, path.length)}/` : ''
          }${name}.${typeFile}`
        );
      await supabase.storage.from('packer-ui').remove([path_]);
    }
    dispatch({
      key: 'medias',
      value: [...medias].map((media) =>
        media.name === item?.name
          ? { ...media, name: item.metadata ? `${name}.${typeFile}` : name }
          : media
      ),
    });
  };
  //
  return (
    <Dialog open={show} onOpenChange={setShow}>
      {children}
      <DialogContent className="p-3 w-80">
        {loading && (
          <div className="absolute top-0 left-0 bottom-0 right-0 bg-white/50 flex items-center justify-center">
            <span className="bx bx-loader-circle text-3xl animate-spin" />
          </div>
        )}
        <DialogTitle>Confirm</DialogTitle>
        <Input
          placeholder="Enter a folder name"
          className="my-2 h-12"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <DialogFooter>
          <Button onClick={() => setShow(false)} variant="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!name}>
            OK
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalFolder;
