'use client';

import Form from '@/app/common/Form';
import FormField from '@/app/common/FormField';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { authService } from '@/services/auth.service';
import supabase from '@/supabase';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup.object({
  oldPassword: yup.string().required('Current password is required'),
  newPassword: yup
    .string()
    .notOneOf(
      [yup.ref('oldPassword'), ''],
      'Passwords must different old password'
    ).required('New password is required')
    .min(8, 'Password must be at least 8 characters long'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), ''], 'Passwords must match').required('Confirm password is required')
});

type FormPasswordProps = {
  loading: boolean;
  reset: boolean;
  error: boolean
};

export type FormPasswordValues = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const FormPassword = ({ loading, reset, error }: FormPasswordProps) => {
  const { reset: resetForm, setError } = useFormContext<FormPasswordValues>();
  useEffect(() => {
    resetForm()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset])
  useEffect(() => {
    if (error) {
      setError("oldPassword", {
        message: "Password incorrect. Please try again."
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error])
  return (
    <div className="flex flex-col gap-2">
      <FormField label="Old password" name="oldPassword">
        <Input type="password" placeholder="Old password" />
      </FormField>
      <FormField label="New password" name="newPassword">
        <Input type="password" placeholder="New password" />
      </FormField>
      <FormField label="Confirm password" name="confirmPassword">
        <Input type="password" placeholder="Confirm password" />
      </FormField>

      <div className="flex flex-row gap-2 justify-end py-2">
        <Button type="button" variant="secondary">
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving' : 'Save'}
        </Button>
      </div>
    </div>
  );
};

const FormPasswordContainer = () => {
  const [reset, setReset] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const { mutate: handleChangePassword, isPending } = useMutation({
    mutationKey: ['change-password'],
    mutationFn: async (values: FormPasswordValues) => {
      setErrorPassword(false);
      const { data: output, error: errorPassword } = await supabase.auth.signInWithPassword({
        email: 'test@gmail.com',
        password: values.oldPassword,
      });
      if (errorPassword) {
        setErrorPassword(true);
      }
      else if (output) {
        await authService.updatePassword(
          values.newPassword,
          '250b9dfc-88b4-4a8d-9b10-bdfeb06fd682'
        );
        return true;
      }
      return false;
    },
    onSuccess: (res) => {
      if (!res) return;
      toast({
        title: 'Change password successfully.',
      });
      setReset(!reset)
    },
    onError: () => {
      toast({
        title: 'Change password fail.',
      });
    },
  });
  return (
    <Form onSubmit={handleChangePassword} yupResolver={yupResolver(schema)}>
      <FormPassword loading={isPending} reset={reset} error={errorPassword} />
    </Form>
  );
};

export default FormPasswordContainer;