"use client";

import Form from "@/components/shared/Form";
import FormField from "@/components/shared/FormField";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import HeaderDetailModule from "./HeaderDetailModule";
import { useParams } from "next/dist/client/components/navigation";
import TableDetailModule from "./TableDetailModule";

const DetailModule = () => {
  //
  const params = useParams();
  console.log(params);
  //
  return (
    <Card className="p-3 bg-white">
      <HeaderDetailModule />
      <Form>
        <div className="flex flex-col gap-2">
          <Label htmlFor="description">Description</Label>
          <FormField name="description" label="Description">
            <Textarea
              id="description"
              className="w-full h-24"
              placeholder="Enter description"
            />
          </FormField>
        </div>
      </Form>
      <TableDetailModule />
    </Card>
  );
};

export default DetailModule;
