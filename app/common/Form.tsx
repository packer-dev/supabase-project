/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function Form({
  defaultValues,
  children,
  onSubmit,
  yupResolver,
}: any) {
  const methods = useForm({
    defaultValues,
    ...(yupResolver ? { resolver: yupResolver } : {}),
  });
  const { handleSubmit, reset } = methods;

  useEffect(() => {
    reset(defaultValues);
    console.log("defaultValues =>>", defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(defaultValues)]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
}
