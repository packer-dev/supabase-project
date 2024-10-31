import React, { useEffect, useState } from "react";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import supabase from "@/supabase";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useQuery } from "@tanstack/react-query";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Combobox } from "@/app/common/Combobox";
import { Button } from "@/components/ui/button";

const schema = yup
  .object({
    username: yup.string().required(),
    email: yup.string().email().required(),
    role_id: yup.string(),
  })
  .required();
const ModalUser = ({
  handleSave,
  userId,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleSave: SubmitHandler<any>;
  userId: string | boolean;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [role, setRole] = useState("");
  const fetchRoles = async () => {
    const { data: roles } = await supabase.from("roles").select(`*`);
    if (!Array.isArray(roles)) return [];
    if (roles.length > 0) {
      const filterRole = roles.find((item) => item.role_name === "admin");
      setValue("role_id", filterRole?.id);
      setRole(filterRole?.id);
    }
    return roles;
  };
  const { data: roles } = useQuery({
    queryKey: ["fetchRoles"],
    queryFn: fetchRoles,
  });
  const fetchGetUserById = async () => {
    const { data } = await supabase
      .from("users")
      .select(`*`)
      .eq("password", userId);
    return data;
  };
  const { data: getUser } = useQuery({
    queryKey: ["getUser"],
    queryFn: fetchGetUserById,
  });

  useEffect(() => {
    if (getUser?.length === 0) return;
    setValue("username", getUser?.[0]?.username);
    setValue("email", getUser?.[0]?.email);
    setValue("role_id", getUser?.[0]?.role_id);
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
        <DialogTitle>Invite user</DialogTitle>
      </DialogHeader>
      <form action="" onSubmit={handleSubmit(handleSave)}>
        <div className="grid gap-4 py-4">
          <div className="w-full flex flex-col gap-4">
            <Label htmlFor="name" className="text-left block">
              Username
            </Label>
            <Input
              {...register("username")}
              id="username"
              placeholder="Username"
              className="w-full"
            />
            {errors["username"] && (
              <p className="text-red-500 text-sm">
                {errors["username"].message}
              </p>
            )}
          </div>
          <div className="w-full flex flex-col gap-4">
            <Label htmlFor="name" className="text-left block">
              Email
            </Label>
            <Input
              {...register("email")}
              id="email"
              placeholder="example@gmail.com"
              className="w-full"
            />
            {errors["email"] && (
              <p className="text-red-500 text-sm">{errors["email"].message}</p>
            )}
          </div>
          <div className="w-full flex flex-col gap-4">
            <Label htmlFor="name" className="text-left block">
              Role
            </Label>
            <Combobox
              list={roleData}
              setItem={(item) => {
                setValue("role_id", item);
                setRole(item);
              }}
              defaultValue={role}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default ModalUser;
