/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircleIcon } from "lucide-react";
import React from "react";
import FormTopic from "./FormTopic";
import { useMutation } from "@tanstack/react-query";
import { useApi } from "@/services/api";

type CreateTopicType = {
  id: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  refetch: any;
};

const CreateTopic = ({ id, open, onOpenChange, refetch }: CreateTopicType) => {
  const { topic } = useApi();
  const mutation = useMutation({
    mutationFn: (values: any) => {
      return id ? topic.update({ ...values, id }) : topic.insert({ ...values });
    },
    onSuccess: () => {
      onOpenChange(false);
      refetch();
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button size="sm" className="h-8 gap-2">
          <PlusCircleIcon className="size-4" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Create new topic
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] pt-5">
        <DialogHeader className="-mt-2 mb-4">
          <DialogTitle>
            <p className="text-xl font-semibold">
              {id ? "Edit" : "Create"} new topic
            </p>
          </DialogTitle>
        </DialogHeader>
        <FormTopic
          id={id}
          isPending={mutation.isPending}
          mutate={mutation.mutate}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateTopic;
