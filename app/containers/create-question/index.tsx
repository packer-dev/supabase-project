/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Input } from "@/components/ui/input";
import FormItem from "./FormItem";
import { Button } from "@/components/ui/button";
import {
  SubmitHandler,
  useFieldArray,
  UseFieldArrayReturn,
  useFormContext,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "./schema";
import { Combobox } from "@/app/common/Combobox";
import { useState } from "react";
import { FormFields, questionTypes } from "./utils";
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
    control,
    setValue,
    register,
    formState: { errors },
    clearErrors,
  } = useFormContext<FormFields>();
  const questionList = useFieldArray({
    control,
    name: "questionList" as never,
  });
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
        fieldListQuestion={questionList}
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
  const handleCreateQuestion: SubmitHandler<FormFields> = async (data) => {
    alert(Object.keys(data).join("-"));
  };

  return (
    <Form
      onSubmit={handleCreateQuestion}
      className="p-3"
      yupResolver={yupResolver(schema(questionType?.mode ?? "")) as any}
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
  fieldListQuestion: UseFieldArrayReturn<FormFields, never, "id">;
};

const RenderByQuestionType = ({
  type,
  fieldListQuestion,
  label,
}: RenderByQuestionTypeProps) => {
  const { control } = useFormContext<FormFields>();
  const givenHeadings = useFieldArray({
    control,
    name: "givenHeadings" as never,
  });
  const givenInformation = useFieldArray({
    control,
    name: "givenInformation.items" as never,
  });
  const trueFalse = useFieldArray({
    control,
    name: "trueFalse" as never,
  });
  const yesNo = useFieldArray({
    control,
    name: "yesNo" as never,
  });
  const multipleChoice = useFieldArray({
    control,
    name: "multipleChoice" as never,
  });
  switch (type) {
    case "yesNo":
      return <ListOfQuestion listOfQuestion={yesNo} isYesNo />;
    case "trueFalse":
      return <ListOfQuestion listOfQuestion={trueFalse} />;
    case "multipleChoice":
      return <MultipleChoiceQuestion multipleChoiceQuestion={multipleChoice} />;
    case "information":
    case "headings":
      return (
        <MatchingSection
          fieldGiven={type === "headings" ? givenHeadings : givenInformation}
          fieldListQuestion={fieldListQuestion}
          label={label}
          haveList={type === "information"}
        />
      );
    default:
      return <></>;
  }
};

export default CreateQuestionContainer;
