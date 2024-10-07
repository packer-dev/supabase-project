import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { StorageContext } from "@/contexts/StorageContext";
import supabase from "@/supabase";
import { DialogTitle } from "@radix-ui/react-dialog";
import React, { useContext, useState } from "react";

type ModalDeleteProps = {
  show: boolean;
  setShow: (bool: boolean) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: any[];
};

const ModalDelete = ({ show, setShow, items }: ModalDeleteProps) => {
  //
  const {
    state: { medias, path },
    dispatch,
  } = useContext(StorageContext);
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const loopCheck = async (list: any[], path: string) => {
    let newValue = "";
    for (const obj of list) {
      if (obj.metadata) {
        await supabase.storage
          .from("packer-ui")
          .remove([`${path}/${obj.name}`]);
      } else {
        const { data } = await supabase.storage
          .from("packer-ui")
          .list(`${path}/${obj.name}`);
        if (data?.length) {
          loopCheck(data, `${path}/${obj.name}`);
        }
        newValue = `/${obj.name}`;
      }
    }
    return newValue;
  };
  const handleSubmit = async () => {
    if (loading) return;

    setLoading(true);
    for (const item of items) {
      if (!item.metadata) {
        // eslint-disable-next-line prefer-const
        let child = `${path}/${item.name}`;
        child = child.slice(1, child.length);
        const { data } = await supabase.storage.from("packer-ui").list(child);
        if (data?.length) {
          loopCheck(data, child);
        }
      } else {
        const newPath = `${path}/${item.name}`;
        await supabase.storage
          .from("packer-ui")
          .remove([newPath.slice(1, newPath.length)]);
      }
    }
    dispatch({
      key: "medias",
      value: [...medias].filter(
        (_) => items.findIndex((child) => child.name === _.name) === -1
      ),
    });
    setShow(false);
  };
  //
  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogContent className="p-3">
        {loading && (
          <div className="absolute top-0 left-0 bottom-0 right-0 bg-white/50 flex items-center justify-center">
            <span className="bx bx-loader-circle text-3xl animate-spin"></span>
          </div>
        )}
        <DialogTitle>Confirm</DialogTitle>
        <p>Are you sure delete this object?</p>
        <DialogFooter>
          <Button variant="secondary">Cancel</Button>
          <Button onClick={handleSubmit}>OK</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalDelete;
