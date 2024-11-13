import { Input } from "@/components/ui/input";
import FormItem from "../FormItem";
import { UseFieldArrayReturn, useFormContext } from "react-hook-form";
import { FormFields } from "../schema";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ItemQuestion from "./ItemQuestion";

type QuestionListProps = {
  questionList: UseFieldArrayReturn<FormFields, never, "id">;
};

const QuestionList = ({ questionList }: QuestionListProps) => {
  const {
    register,
    formState: { errors },
    clearErrors,
    setValue,
  } = useFormContext<FormFields>();
  return (
    <FormItem className="mt-6" label="Questions">
      <FormItem label="Title" error={errors.questionTitle?.message}>
        <Input
          placeholder="Correct the heading"
          {...register("questionTitle")}
        />
      </FormItem>
      <FormItem label="List" required error={errors.questionList?.message}>
        <div className="border-dashed p-3 border-2 rounded-sm flex flex-col gap-3">
          {questionList.fields.map((item, index) => (
            <ItemQuestion
              key={item.id}
              handleRemoveQuestion={() => {
                questionList.remove(index);
                if (questionList.fields.length === 1) {
                  questionList.append({
                    section: "",
                    correctHeading: "",
                  });
                }
              }}
              index={index}
              register={register}
              errors={errors}
              clearErrors={clearErrors}
              setValue={setValue}
            />
          ))}
        </div>
      </FormItem>
      <Button
        onClick={() =>
          questionList.append({
            section: "",
            correctHeading: "",
          })
        }
        type="button"
        variant="secondary"
        className="flex py-0 items-center gap-2"
      >
        <Plus />
        <span>Add new question</span>
      </Button>
    </FormItem>
  );
};

export default QuestionList;
