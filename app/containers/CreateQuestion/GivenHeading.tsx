import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MinusCircle, Plus } from "lucide-react";
import {
  FieldErrors,
  UseFieldArrayReturn,
  UseFormRegister,
} from "react-hook-form";
import { FormFields } from ".";
import FormItem from "./FormItem";

type GivenHeadingProps = {
  givenHeadings: UseFieldArrayReturn<FormFields, never, "id">;
  register: UseFormRegister<FormFields>;
  errors: FieldErrors<FormFields>;
};

const GivenHeading = ({
  givenHeadings,
  register,
  errors,
}: GivenHeadingProps) => {
  return (
    <div className="flex flex-col gap-3">
      {givenHeadings.fields.map((item, index) => (
        <FormItem
          key={item.id}
          error={errors.givenHeadings?.[index]?.value?.message}
        >
          <div className="flex items-center gap-3">
            <Input
              className="flex-1"
              placeholder="Heading 01"
              {...register(`givenHeadings.${index}.value`)}
            />
            <Button
              type="button"
              onClick={() => {
                givenHeadings.remove(index);
                if (givenHeadings.fields.length === 1) {
                  givenHeadings.append({
                    value: "",
                  });
                }
              }}
              variant="secondary"
            >
              <MinusCircle size={24} />
            </Button>
          </div>
        </FormItem>
      ))}
      <Button
        type="button"
        onClick={() =>
          givenHeadings.append({
            value: "",
          })
        }
        variant="secondary"
        className="flex py-0 items-center gap-2"
      >
        <Plus />
        <span>Add new heading</span>
      </Button>
    </div>
  );
};

export default GivenHeading;
