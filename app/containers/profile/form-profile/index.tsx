"use client";

import Form from "@/app/common/Form";
import FormField from "@/app/common/FormField";
import FormGroup from "@/app/common/FormGroup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import * as yup from "yup";

const schema = yup.object({
  fullname: yup.string().required(),
  email: yup.string().email().required(),
});

const FormProfile = () => {
  const mutation = useMutation({
    mutationKey: [""],
    mutationFn: async () => {},
    onSuccess: () => {
      toast({
        title: "Update profile successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Update profile fail.",
      });
    },
  });
  const buttonText = () => {
    return mutation.isPending ? "Saving" : "Save";
  };
  return (
    <Form onSubmit={mutation.mutate} yupResolver={yupResolver(schema)}>
      <div className="flex flex-col gap-2">
        <FormGroup label="Fullname">
          <FormField name="fullname">
            <Input placeholder="Fullname" />
          </FormField>
        </FormGroup>
        <FormGroup label="Email">
          <FormField name="email">
            <Input
              placeholder="Email"
              disabled
              onChange={(event) => event.preventDefault()}
            />
          </FormField>
        </FormGroup>

        <div className="flex flex-row gap-2 justify-end py-2">
          <Button type="button" variant="secondary">
            Cancel
          </Button>
          <Button type="submit" disabled={mutation.isPending}>
            {buttonText()}
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default FormProfile;
