/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { FormFields } from '../schema';
import FormItem from '../FormItem';
import { Button } from '@/components/ui/button';
import { CirclePlus, MinusCircle, Pen, Plus, Trash } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';

const MultipleChoiceQuestion = () => {
  const { control, watch, trigger } = useFormContext<FormFields>();
  const fieldArray = useFieldArray<FormFields, `multipleChoice`, 'id'>({
    control,
    name: `multipleChoice`,
  });
  const items = watch('multipleChoice');
  return (
    <FormItem className="mt-6" label="List of question" required>
      <div className="flex flex-col gap-2 w-full">
        {items?.map((item, index) =>
          item.is_done ? (
            <ItemMultipleChoice
              key={fieldArray.fields[index].id}
              item={fieldArray.fields[index]}
              index={index}
            />
          ) : (
            <FormMultipleChoice
              key={fieldArray.fields[index].id}
              index={index}
            />
          )
        )}
        <Button
          type="button"
          onClick={async () => {
            const index = items.length - 1;
            const isValid = await trigger(`multipleChoice.${index}.answers`);
            if (isValid) {
              fieldArray.update(index, {
                ...items[index],
                is_done: true,
              });
              fieldArray.append({
                question: '',
                answers: [
                  {
                    is_new: true,
                    is_correct: false,
                    content: '',
                  },
                ],
              });
            }
          }}
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
    getValues,
    setValue,
    trigger,
  } = useFormContext<FormFields>();
  const fieldArray = useFieldArray<
    FormFields,
    `multipleChoice.${number}.answers`,
    'id'
  >({ control, name: `multipleChoice.${index}.answers` });
  return (
    <div className="border-dashed border-2 border-gray-200 p-3 rounded-sm">
      <FormItem
        label="Question"
        error={errors[`multipleChoice`]?.[index]?.question?.message ?? ''}
        required
      >
        <textarea
          className="w-full h-40 p-3 rounded-sm border border-gray-200 flex items-center justify-center bg-gray-100 text-gray-500 text-sm font-semibold"
          {...register(`multipleChoice.${index}.question`)}
          placeholder="Question name"
        />
      </FormItem>
      <FormItem
        label="Answers"
        className="mt-4"
        error={errors?.multipleChoice?.[index]?.message}
      >
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
                      onCheckedChange={(checked) => {
                        setValue(
                          `multipleChoice.${index}.answers.${pos}.is_correct`,
                          !!checked
                        );
                      }}
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
                  onClick={async () => {
                    if (!item.is_new) {
                      fieldArray.remove(index);
                    } else {
                      const isValid = await trigger(
                        `multipleChoice.${index}.answers.${pos}.content`
                      );
                      if (isValid) {
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
                          content: '',
                        });
                      }
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

const ItemMultipleChoice = ({ item, index }: { item: any; index: number }) => {
  const { control } = useFormContext<FormFields>();
  const fieldArray = useFieldArray<FormFields, `multipleChoice`, 'id'>({
    control,
    name: `multipleChoice`,
  });
  return (
    <div className="flex gap-2 w-full">
      <Button variant="secondary" type="button" className="w-10 h-10">
        2
      </Button>
      <div className="flex-1">
        <p>{item?.question}</p>
        <div className="flex flex-col gap-0.5 mt-2">
          {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K']
            .slice(0, item?.answers?.length - 1)
            .map((_, index) => (
              <div key={_} className="flex gap-2 items-start">
                <span
                  className={`rounded-full px-1.5 block ${
                    item?.answers?.[index]?.is_correct
                      ? 'border border-black'
                      : ''
                  }`}
                >
                  {_}
                </span>
                <p>{item?.answers?.[index]?.content}</p>
              </div>
            ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Button variant="secondary" type="button" className="w-8 h-8 p-1">
          <Pen size={20} />
        </Button>
        <Button
          onClick={() => {
            fieldArray.remove(index);
          }}
          variant="secondary"
          type="button"
          className="w-8 h-8 p-1"
        >
          <Trash size={20} />
        </Button>
      </div>
    </div>
  );
};

export default MultipleChoiceQuestion;
