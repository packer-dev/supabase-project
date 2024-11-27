'use client';

import Form from '@/app/common/Form';
import FormField from '@/app/common/FormField';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { authService } from '@/services/auth.service';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import * as yup from 'yup';

export const FORM_PROFILE_EMIT_EVENT = 'FORM_PROFILE_EMIT_EVENT';

type FormProfileProps = {
  loading: boolean;
};

export type FormProfileValues = {
  full_name: string;
  email: string;
};

const schema = yup.object({
  full_name: yup.string().required(),
  email: yup.string().email().required(),
});

const FormProfile = ({ loading }: FormProfileProps) => {
  const { setValue, watch } = useFormContext<FormProfileValues>();
  const full_name = watch('full_name');
  const auth = {
    user: {
      id: '73',
      full_name: null,
      email: null,
    },
  };
  useEffect(() => {
    setValue('full_name', auth?.user?.full_name ?? 'Packer Tra');
    setValue('email', 'dev@gmail.com');
    console.log('updated');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="flex flex-col gap-2">
      <FormField label="Fullname" name="full_name">
        <Input placeholder="Fullname" />
      </FormField>
      <FormField label="Email" name="email">
        <Input
          placeholder="Email"
          disabled
          onChange={(event) => event.preventDefault()}
        />
      </FormField>

      <div className="flex flex-row gap-2 justify-end py-2">
        <Button type="button" variant="secondary">
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={loading || full_name === (auth?.user?.full_name ?? '')}
        >
          {loading ? 'Saving' : 'Save'}
        </Button>
      </div>
    </div>
  );
};

const FormProfileContainer = () => {
  const [reset, setReset] = useState(false);
  const auth = {
    user: {
      id: '73',
      full_name: '',
      email: 'dev@gmail.com',
    },
  };
  const mutation = useMutation({
    mutationKey: [FORM_PROFILE_EMIT_EVENT],
    mutationFn: async (data: FormProfileValues) => {
      await authService.updateProfile({
        full_name: data.full_name,
        userId: auth?.user?.id ?? '',
      });
    },
    onSuccess: () => {
      toast({
        title: 'Update profile successfully.',
      });
      setReset(!reset);
    },
    onError: () => {
      toast({
        title: 'Update profile fail.',
      });
    },
  });
  return (
    <Form
      onSubmit={mutation.mutate}
      yupResolver={yupResolver(schema)}
      defaultValues={{
        full_name: 'Packer Tra',
        email: 'packer.tra@gmail.com',
      }}
    >
      <FormProfile loading={mutation.isPending} />
    </Form>
  );
};

export default FormProfileContainer;
