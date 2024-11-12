import React from "react";
import {
  useFieldArray,
  UseFieldArrayReturn,
  useFormContext,
} from "react-hook-form";
import { FormFields } from "../utils";
import FormItem from "../FormItem";
import { Button } from "@/components/ui/button";
import { CirclePlus, MinusCircle, Pen, Plus, Trash } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

type MultipleChoiceQuestionProps = {
  multipleChoiceQuestion: UseFieldArrayReturn<
    FormFields,
    "multipleChoice",
    "id"
  >;
};

const MultipleChoiceQuestion = ({
  multipleChoiceQuestion,
}: MultipleChoiceQuestionProps) => {
  return (
    <FormItem className="mt-6" label="List of question" required>
      <div className="flex flex-col gap-2 w-full">
        {multipleChoiceQuestion.fields.map((item, index) =>
          item.is_done ? (
            <ItemMultipleChoice key={item.id} />
          ) : (
            <FormMultipleChoice key={item.id} index={index} />
          )
        )}

        <Button
          type="button"
          onClick={() =>
            multipleChoiceQuestion.append({
              content: "",
              answers: [
                {
                  is_new: true,
                  is_correct: false,
                  content: "",
                },
              ],
            })
          }
          variant="secondary"
          className="flex py-0 items-center gap-2 mt-3"
        >
          <Plus />
          <span>Add new question</span>
        </Button>
      </div>
    </FormItem>
  );
};

type FormMultipleChoiceProps = {
  index: number;
};

const FormMultipleChoice = ({ index }: FormMultipleChoiceProps) => {
  const {
    control,
    register,
    formState: { errors },
    setValue,
    getValues,
  } = useFormContext<FormFields>();
  const fieldArray = useFieldArray<
    FormFields,
    `multipleChoice.${number}.answers`,
    "id"
  >({ control, name: `multipleChoice.${index}.answers` });
  return (
    <div className="border-dashed border-2 border-gray-200 p-3 rounded-sm">
      <FormItem label="Question" required>
        <div
          className="w-full h-40 rounded-sm border border-gray-200 flex items-center justify-center bg-gray-100 text-gray-500 text-sm font-semibold 
            italic"
        >
          Editor here
        </div>
      </FormItem>
      <FormItem label="Answers" className="mt-4">
        <div className="flex flex-col gap-2">
          {fieldArray.fields.map((item: any, pos) => (
            <FormItem
              key={item.id}
              error={
                errors?.multipleChoice?.[index]?.answers?.[pos]?.content
                  ?.message
              }
            >
              <div className="flex items-center gap-2">
                <div className="w-5">
                  {!item.is_new && (
                    <Checkbox
                      {...register(
                        `multipleChoice.${index}.answers.${pos}.is_correct`
                      )}
                    />
                  )}
                </div>
                <Input
                  className="flex-1"
                  placeholder="Answer 01"
                  {...register(
                    `multipleChoice.${index}.answers.${pos}.content`
                  )}
                />
                <Button
                  onClick={() => {
                    if (!item.is_new) {
                      fieldArray.remove(index);
                    } else {
                      fieldArray.update(pos, {
                        ...item,
                        content: getValues(
                          `multipleChoice.${index}.answers.${pos}.content`
                        ),
                        is_correct: getValues(
                          `multipleChoice.${index}.answers.${pos}.is_correct`
                        ),
                        is_new: false,
                      });
                      fieldArray.append({
                        is_correct: false,
                        is_new: true,
                        content: "",
                      });
                    }
                  }}
                  type="button"
                >
                  {!item.is_new ? (
                    <MinusCircle size={20} />
                  ) : (
                    <CirclePlus size={20} />
                  )}
                </Button>
              </div>
            </FormItem>
          ))}
        </div>
      </FormItem>
    </div>
  );
};

const ItemMultipleChoice = () => {
  return (
    <div className="flex gap-2 w-full">
      <Button variant="secondary" type="button" className="w-10 h-10">
        2
      </Button>
      <div className="flex-1">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
          officiis aut ea sit non iusto alias sint dicta quo commodi in
          molestias iste nobis enim, a perferendis animi illo. Iusto?
        </p>
        <div className="flex flex-col gap-0.5 mt-2">
          {["A", "B", "C", "D"].map((item) => (
            <div key={item} className="flex gap-2 items-start">
              <span
                className={`rounded-full px-1.5 block ${
                  item === "B" || item === "C" ? "border border-black" : ""
                }`}
              >
                {item}
              </span>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Delectus quibusdam, totam hic minus at id?
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Button variant="secondary" type="button" className="w-8 h-8 p-1">
          <Pen size={20} />
        </Button>
        <Button variant="secondary" type="button" className="w-8 h-8 p-1">
          <Trash size={20} />
        </Button>
      </div>
    </div>
  );
};

export default MultipleChoiceQuestion;
