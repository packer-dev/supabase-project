"use client";

import { Input } from "@/components/ui/input";
import FormItem from "./FormItem";
import GivenHeading from "./GivenHeading";
import { Button } from "@/components/ui/button";
import GivenInformation from "./GivenInformation";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "./schema";
import { Combobox } from "@/app/common/Combobox";
import { useState } from "react";
import { defaultValues, FormFields } from "./utils";
import QuestionList from "./QuestionList";

type CreateQuestionProps = {
  isGivenHeading?: boolean;
};

const CreateQuestion = ({ isGivenHeading }: CreateQuestionProps) => {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: yupResolver(schema(isGivenHeading)),
    defaultValues: defaultValues(isGivenHeading),
  });
  const givenHeadings = useFieldArray({
    control,
    name: "givenHeadings" as never,
  });
  const givenInformation = useFieldArray({
    control,
    name: "givenInformation.items" as never,
  });
  const questionList = useFieldArray({
    control,
    name: "questionList" as never,
  });
  const handleCreateQuestion: SubmitHandler<FormFields> = async (data) => {
    alert(Object.keys(data).join("-"));
  };
  const [questionType, setQuestionType] = useState("");
  const items = [
    {
      label: "Yes/No",
      value: "yes/no",
    },
  ];
  return (
    <form onSubmit={handleSubmit(handleCreateQuestion)} className="p-3">
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
            list={items}
            setItem={(item) => {
              setValue("questionType", item);
              setQuestionType(item);
              clearErrors("questionType");
            }}
            defaultValue={questionType}
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
      <FormItem
        className="mt-6"
        label={`Given ${isGivenHeading ? "Headings" : "Information"}`}
      >
        {isGivenHeading ? (
          <GivenHeading
            givenHeadings={givenHeadings}
            register={register}
            errors={errors}
          />
        ) : (
          <GivenInformation
            givenInformation={givenInformation}
            errors={errors}
            register={register}
          />
        )}
      </FormItem>
      <QuestionList
        questionList={questionList}
        errors={errors}
        clearErrors={clearErrors}
        register={register}
        setValue={setValue}
      />
      <div className="flex justify-end my-6 gap-3">
        <Button type="button" variant="secondary">
          Cancel
        </Button>
        <Button type="submit">Create</Button>
      </div>
    </form>
  );
};

export default CreateQuestion;
