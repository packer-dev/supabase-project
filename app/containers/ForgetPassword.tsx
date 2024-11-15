"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import supabase from "@/supabase";
import { toast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";

const schema = (isConfirm?: boolean) => {
  return yup.object(
    !isConfirm
      ? {
          email: yup
            .string()
            .email("Email invalid")
            .required("Email is required"),
        }
      : {
          password: yup.string().required("Password is required"),
          passwordConfirm: yup
            .string()
            .oneOf([yup.ref("password"), ""], "Passwords must match"),
        }
  );
};

const ForgetPassword = () => {
  const [isConfirm, setIsConfirm] = useState(false);
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    resolver: yupResolver(schema(isConfirm)),
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleResetPassword = async (payload: any) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(
      payload?.email
    );
    if (error) throw error;
    return data;
  };
  const mutation = useMutation({
    mutationKey: ["resetPassword"],
    mutationFn: handleResetPassword,
    onSuccess() {
      toast({
        title: "Reset password",
        description: "Send email successfully.",
      });
    },
    onError() {
      toast({
        title: "Reset password",
        description: "Send email fail.",
      });
    },
  });
  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event) => {
      if (event == "PASSWORD_RECOVERY") {
        setIsConfirm(true);
      }
    });
  }, []);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Forget password?</Button>
      </DialogTrigger>
      <DialogContent className="w-[400px]">
        <DialogTitle className="-mt-1 mb-2">
          {isConfirm ? "Update password" : "Forget password"}
        </DialogTitle>
        <form onSubmit={handleSubmit((payload) => mutation.mutate(payload))}>
          <div className="flex-col flex gap-3">
            {!isConfirm && (
              <p className="text-sm text-gray-500">
                An email will be sent to your email address.
              </p>
            )}
            {isConfirm ? (
              <>
                <Label className="font-semibold">Password</Label>
                <Input
                  {...register("password")}
                  placeholder="Password..."
                  type="password"
                />
                {errors.email?.message && (
                  <p className="text-sm text-red-500">
                    {errors.email?.message}
                  </p>
                )}
                <Label className="font-semibold">Password confirm</Label>
                <Input
                  {...register("passwordConfirm")}
                  placeholder="Password confirm..."
                  type="password"
                />
                {errors.email?.message && (
                  <p className="text-sm text-red-500">
                    {errors.email?.message}
                  </p>
                )}
              </>
            ) : (
              <>
                <Label className="font-semibold">Email</Label>
                <Input
                  {...register("email")}
                  placeholder="Email..."
                  type="email"
                />
                {errors.email?.message && (
                  <p className="text-sm text-red-500">
                    {errors.email?.message}
                  </p>
                )}
              </>
            )}
            <Button type="submit" disabled={mutation.isPending}>
              {isConfirm ? "Update password" : "Reset password"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ForgetPassword;
