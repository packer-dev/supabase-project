import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { StorageContext } from "@/contexts/StorageContext";
import supabase from "@/supabase";
import { DialogTitle } from "@radix-ui/react-dialog";
import React, { ReactNode, useContext, useState } from "react";

type ModalFolderProps = {
  show: boolean;
  setShow: (bool: boolean) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: ReactNode;
};

const ModalFolder = ({ show, setShow, children }: ModalFolderProps) => {
  //
  const {
    state: { medias, path },
    dispatch,
  } = useContext(StorageContext);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);
    await supabase.storage
      .from("packer-ui")
      .upload(
        `${path}/${name}/.emptyFolderPlaceholder`,
        new Blob([""], { type: "text/plain" })
      );
    dispatch({
      key: "medias",
      value: [
        {
          name,
        },
        ...medias,
      ],
    });
    setShow(false);
    setLoading(false);
    setName("");
  };
  //
  return (
    <Dialog open={show} onOpenChange={setShow}>
      {children}
      <DialogContent className="p-3 w-80">
        {loading && (
          <div className="absolute top-0 left-0 bottom-0 right-0 bg-white/50 flex items-center justify-center">
            <span className="bx bx-loader-circle text-3xl animate-spin"></span>
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
          <Button variant="secondary">Cancel</Button>
          <Button onClick={handleSubmit} disabled={!name}>
            OK
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalFolder;
