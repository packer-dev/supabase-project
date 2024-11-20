/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { DialogContent } from '@radix-ui/react-dialog';
import { useMutation } from '@tanstack/react-query';
import { PlusCircleIcon } from 'lucide-react';
import React, { ReactNode } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

type ButtonCreateType = {
  id: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children?: ReactNode;
  name?: string;
  schema?: any;
  refetch: any;
  save: (values: any) => Promise<any>;
};

const ButtonCreate = ({
  id,
  open,
  onOpenChange,
  children,
  name,
  schema,
  refetch,
  save,
}: ButtonCreateType) => {
  const mutation = useMutation({
    mutationFn: save,
    onSuccess: () => {
      onOpenChange(false);
      refetch();
    },
  });
  const buttonText = () => {
    if (mutation.isPending) return id ? 'Editing' : 'Creating';
    return id ? 'Edit' : 'Create';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button size="sm" className="h-8 gap-2">
          <PlusCircleIcon className="size-4" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Create new {name}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] pt-5">
        <DialogHeader className="-mt-2 mb-4">
          <DialogTitle>
            <p className="text-xl font-semibold">
              {id ? 'Edit' : 'Create new'} {name}
            </p>
          </DialogTitle>
        </DialogHeader>
        <Form onSubmit={mutation.mutate} yupResolver={yupResolver(schema)}>
          <div className="flex flex-col gap-2">{children}</div>
          <div className="flex justify-end pt-6 gap-3">
            <Button type="button" variant="secondary">
              Cancel
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
              {buttonText()}
            </Button>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ButtonCreate;
