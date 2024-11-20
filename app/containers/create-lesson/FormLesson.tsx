/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Form from '@/components/shared/Form';
import { Button } from '@/components/ui/button';
import { useApi } from '@/services/api';
import * as yup from 'yup';
import { UseMutateFunction, useQuery } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup.js';
import { Label } from '@radix-ui/react-label';
import { Input } from '@/components/ui/input';

export const schema = yup
  .object({
    name: yup.string().required(),
  })
  .required();

export type FormTopicType = {
  id: string | null;
  mutate: UseMutateFunction<any, Error, any, unknown>;
  isPending: boolean;
};

const FormLesson = ({ id, mutate, isPending }: FormTopicType) => {
  const { lesson } = useApi();
  const fetchLessonById = async () => {
    return await lesson.getById(id);
  };
  const {
    data,
    isFetching,
    isPending: isPendingById,
    isLoading,
  } = useQuery({
    queryKey: ['fetchLessonById', id],
    queryFn: fetchLessonById,
  });
  const defaultValues = {
    ...(data || {}),
  };
  const buttonText = () => {
    if (isPending) return id ? 'Editing' : 'Creating';
    return id ? 'Edit' : 'Create';
  };
  return (
    <Form
      onSubmit={mutate}
      yupResolver={yupResolver(schema)}
      defaultValues={defaultValues}
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Lesson name</Label>
        <FormField name="name">
          <Input
            id="name"
            type="text"
            className="w-full"
            placeholder="Enter title"
          />
        </FormField>
      </div>
      <div className="flex justify-end pt-6 gap-3">
        <Button type="button" variant="secondary">
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isPending || isFetching || isLoading || isPendingById}
        >
          {buttonText()}
        </Button>
      </div>
    </Form>
  );
};
export default FormLesson;
