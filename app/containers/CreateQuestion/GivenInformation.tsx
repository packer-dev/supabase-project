import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MinusCircle, Plus } from "lucide-react";
import FormItem from "./FormItem";
import {
  FieldErrors,
  UseFieldArrayReturn,
  UseFormRegister,
} from "react-hook-form";
import { FormFields } from ".";

type GivenHeadingProps = {
  givenInformation: UseFieldArrayReturn<FormFields, never, "id">;
  register: UseFormRegister<FormFields>;
  errors: FieldErrors<FormFields>;
};

const GivenInformation = ({
  givenInformation,
  register,
  errors,
}: GivenHeadingProps) => {
  return (
    <div className="flex flex-col gap-3">
      <FormItem label="Title" error={errors.givenInformation?.title?.message}>
        <Input
          placeholder="What makes people happy"
          {...register("givenInformation.title")}
        />
      </FormItem>
      <FormItem className="" label="List" required>
        {givenInformation.fields.map((item, index) => (
          <FormItem
            key={item.id}
            error={errors.givenInformation?.items?.[index]?.value?.message}
          >
            <div className="flex items-center gap-3">
              <Input
                className="flex-1"
                placeholder="Heading 01"
                {...register(`givenInformation.items.${index}.value`)}
              />
              <Button
                type="button"
                onClick={() => {
                  givenInformation.remove(index);
                }}
                variant="secondary"
              >
                <MinusCircle size={24} />
              </Button>
            </div>
          </FormItem>
        ))}
      </FormItem>
      <Button
        type="button"
        onClick={() =>
          givenInformation.append({
            value: "",
          })
        }
        variant="secondary"
        className="flex py-0 items-center gap-2"
      >
        <Plus />
        <span>Add new item</span>
      </Button>
    </div>
  );
};

export default GivenInformation;
