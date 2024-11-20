import React, { useEffect, useState } from 'react';
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import supabase from '@/supabase';
import { DialogTitle } from '@radix-ui/react-dialog';
import { UseMutateFunction, useQuery } from '@tanstack/react-query';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Combobox } from '@/app/common/Combobox';
import { Button } from '@/components/ui/button';

const schema = yup
  .object({
    email: yup.string().email().required(),
    role_id: yup.string().required(),
  })
  .required();

type ModalUserProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleSave: UseMutateFunction<
    void,
    Error,
    { email: string; role_id: string },
    unknown
  >;
  userId: string | boolean;
  loading?: boolean;
};

const ModalUser = ({ handleSave, userId, loading }: ModalUserProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [role, setRole] = useState('');
  const fetchRoles = async () => {
    const { data: roles } = await supabase
      .from('roles')
      .select(`*`)
      .neq('role_name', 'superuser');
    if (!Array.isArray(roles)) return [];
    if (roles.length > 0) {
      const filterRole = roles.find((item) => item.role_name === 'admin');
      setValue('role_id', filterRole?.id);
      setRole(filterRole?.id);
    }
    return roles;
  };
  const { data: roles } = useQuery({
    queryKey: ['fetchRoles'],
    queryFn: fetchRoles,
  });
  const fetchGetUserById = async () => {
    const { data } = await supabase
      .from('users')
      .select(`*`)
      .eq('password', userId);
    return data;
  };
  const { data: getUser } = useQuery({
    queryKey: ['getUser'],
    queryFn: fetchGetUserById,
  });

  useEffect(() => {
    setValue('email', getUser?.[0]?.email);
    setValue('role_id', getUser?.[0]?.role_id);
    setRole(getUser?.[0]?.role_id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getUser]);

  const roleData = (Array.isArray(roles) ? roles : []).map((item) => ({
    value: item.id,
    label: item.role_name,
  }));
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Invite a member to this organization</DialogTitle>
      </DialogHeader>
      <form action="" onSubmit={handleSubmit((data) => handleSave(data))}>
        <div className="grid gap-4 py-4">
          <div className="w-full flex flex-col gap-4">
            <Label htmlFor="email" className="text-left block">
              Email
            </Label>
            <Input
              {...register('email')}
              id="email"
              placeholder="example@gmail.com"
              className="w-full"
            />
            {errors['email'] && (
              <p className="text-red-500 text-sm">{errors['email'].message}</p>
            )}
          </div>
          <div className="w-full flex flex-col gap-4">
            <Label htmlFor="role_id" className="text-left block">
              Role
            </Label>
            <Combobox
              list={roleData}
              setItem={(item) => {
                setValue('role_id', item);
                setRole(item);
              }}
              defaultValue={role}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">{loading ? 'Saving' : 'Save'}</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default ModalUser;
