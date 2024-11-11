/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useMutation } from "@tanstack/react-query";
import React from "react";

type ConfirmDeleteType = {
  show: boolean;
  setShow: (open: boolean) => void;
  title?: string;
  handleDelete: () => Promise<any>;
  refetch: Function;
};

const ConfirmDelete = ({
  show,
  setShow,
  title,
  handleDelete,
  refetch,
}: ConfirmDeleteType) => {
  const mutation = useMutation({
    mutationFn: handleDelete,
    onSuccess: () => {
      setShow(false);
      refetch();
    },
  });
  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogContent>
        <p>{title ?? "Do you want to delete this?"}</p>
        <div className="flex justify-end pt-6 gap-3">
          <Button type="button" variant="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            type="button"
            className="bg-red-500"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Deleting" : "Delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDelete;
