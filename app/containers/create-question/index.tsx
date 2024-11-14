/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Input } from "@/components/ui/input";
import FormItem from "./FormItem";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useFormContext } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Combobox } from "@/app/common/Combobox";
import { useState } from "react";
import { schema, FormFields, questionTypes, defaultValues } from "./schema";
import MultipleChoiceQuestion from "./matching-section/MultipleChoiceQuestion";
import ListOfQuestion from "./matching-section/ListOfQuestion";
import MatchingSection from "./matching-section";
import Form from "@/app/common/Form";

type CreateQuestionProps = {
  setQuestionType: (questionType: any) => void;
  questionType: any;
};

const CreateQuestion = ({
  setQuestionType,
  questionType,
}: CreateQuestionProps) => {
  const {
    setValue,
    register,
    formState: { errors },
    clearErrors,
  } = useFormContext<FormFields>();

  return (
    <div>
      <p className="font-bold text-xl">Create questions</p>
      <div className="flex flex-row mt-6 gap-6">
        <FormItem
          className="w-40"
          label="Question start from"
          required
          error={errors["questionStartFrom"]?.message}
          name="questionStartFrom"
        >
          <Input
            id="questionStartFrom"
            placeholder="2"
            {...register("questionStartFrom")}
          />
        </FormItem>
        <FormItem
          className="flex-1"
          label="Question type"
          required
          error={errors["questionType"]?.message}
          name="questionType"
        >
          <Combobox
            list={questionTypes}
            setItem={(item) => {
              setValue("questionType", item?.value);
              setQuestionType(item);
              clearErrors("questionType");
            }}
            defaultValue={questionType?.value || ""}
          />
        </FormItem>
      </div>
      <FormItem
        className="mt-6"
        label="Question instruction"
        required
        error={errors["questionInstruction"]?.message}
      >
        <div
          className="w-full h-40 rounded-sm border border-gray-200 flex items-center justify-center bg-gray-100 text-gray-500 text-sm font-semibold 
        italic"
        >
          Editor here
        </div>
      </FormItem>
      <RenderByQuestionType
        type={questionType?.mode}
        label={questionType?.name}
      />
      <div className="flex justify-end my-6 gap-3">
        <Button type="button" variant="secondary">
          Cancel
        </Button>
        <Button type="submit">Create</Button>
      </div>
    </div>
  );
};

const CreateQuestionContainer = () => {
  const [questionType, setQuestionType] = useState<any>(questionTypes[0]);
  const handleCreateQuestion: SubmitHandler<FormFields> = async (data) => {};

  return (
    <Form
      onSubmit={handleCreateQuestion}
      className="p-3"
      yupResolver={yupResolver(schema(questionType?.mode ?? "")) as any}
      defaultValues={defaultValues(questionType?.mode ?? "")}
    >
      <CreateQuestion
        questionType={questionType}
        setQuestionType={setQuestionType}
      />
    </Form>
  );
};

type RenderByQuestionTypeProps = {
  label: string;
  type: string;
};

const RenderByQuestionType = ({ type, label }: RenderByQuestionTypeProps) => {
  switch (type) {
    case "yesNo":
      return <ListOfQuestion isYesNo />;
    case "trueFalse":
      return <ListOfQuestion />;
    case "multipleChoice":
      return <MultipleChoiceQuestion />;
    case "information":
    case "headings":
      return (
        <MatchingSection label={label} haveList={type === "information"} />
      );
    default:
      return <></>;
  }
};

export default CreateQuestionContainer;
