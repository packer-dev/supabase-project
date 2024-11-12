import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MinusCircle, Plus } from "lucide-react";
import { UseFieldArrayReturn, useFormContext } from "react-hook-form";
import { FormFields } from "../utils";
import FormItem from "../FormItem";

type GivenHeadingProps = {
  fieldArray: UseFieldArrayReturn<FormFields, never, "id">;
};

const GivenHeading = ({ fieldArray }: GivenHeadingProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormFields>();
  return (
    <div className="flex flex-col gap-3">
      {fieldArray.fields.map((item, index) => (
        <FormItem
          key={item.id}
          error={errors.givenHeadings?.[index]?.value?.message}
          name={`givenHeadings.${index}`}
        >
          <div className="flex items-center gap-3">
            <Input
              id={`givenHeadings.${index}`}
              className="flex-1"
              placeholder="Heading 01"
              {...register(`givenHeadings.${index}.value`)}
            />
            <Button
              type="button"
              onClick={() => {
                fieldArray.remove(index);
                if (fieldArray.fields.length === 1) {
                  fieldArray.append({
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
          fieldArray.append({
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
