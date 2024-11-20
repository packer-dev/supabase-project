/* eslint-disable @typescript-eslint/no-explicit-any */
import FormField from '@/components/shared/FormField';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup.js';
import { UseMutateFunction, useQuery } from '@tanstack/react-query';
import Form from '@/components/shared/Form';
import { Button } from '@/components/ui/button';
import { schema } from './constant';
import { useApi } from '@/services/api';

export type FormTopicType = {
  id: string | null;
  mutate: UseMutateFunction<any, Error, any, unknown>;
  isPending: boolean;
};

const FormTopic = ({ id, mutate, isPending }: FormTopicType) => {
  const { topic } = useApi();
  const fetchTopicById = async () => {
    return await topic.getById(id);
  };
  const {
    data,
    isFetching,
    isPending: isPendingById,
    isLoading,
  } = useQuery({
    queryKey: ['fetchTopicById', id],
    queryFn: fetchTopicById,
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
        <Label htmlFor="name">Topic name</Label>
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

export default FormTopic;
