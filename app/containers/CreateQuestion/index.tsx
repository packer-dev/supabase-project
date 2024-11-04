"use client";

import { Input } from "@/components/ui/input";
import FormItem from "./FormItem";
import { Combobox } from "@/components/ui/combobox";
import GivenHeading from "./GivenHeading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ItemQuestion from "./ItemQuestion";
import GivenInformation from "./GivenInformation";

type CreateQuestionProps = {
  isGivenHeading?: boolean;
};

const CreateQuestion = ({ isGivenHeading }: CreateQuestionProps) => {
  return (
    <form className="p-3">
      <p className="font-bold text-xl">Create questions</p>
      <div className="flex flex-row mt-6 gap-6">
        <FormItem className="w-40" label="Question start from" required>
          <Input placeholder="2" />
        </FormItem>
        <FormItem className="flex-1" label="Question type" required>
          <Combobox list={[]} setValue={() => {}} value="" />
        </FormItem>
      </div>
      <FormItem className="mt-6" label="Question intruction" required>
        <div className="w-full h-40 rounded-sm border border-gray-200" />
      </FormItem>
      <FormItem
        className="mt-6"
        label={`Given ${isGivenHeading ? "Headings" : "Information"}`}
      >
        {isGivenHeading ? <GivenHeading /> : <GivenInformation />}
      </FormItem>
      <FormItem className="mt-6" label="Questions">
        <FormItem label="Title" optional>
          <Input placeholder="Correct the heading" />
        </FormItem>
        <FormItem label="List" required>
          <div className="border-dashed p-3 border-2 rounded-sm flex flex-col gap-3">
            <ItemQuestion />
            <ItemQuestion />
          </div>
        </FormItem>
        <Button variant="secondary" className="flex py-0 items-center gap-2">
          <Plus />
          <span>Add new question</span>
        </Button>
      </FormItem>
      <div className="flex justify-end my-6 gap-3">
        <Button variant="secondary">Cancel</Button>
        <Button>Create</Button>
      </div>
    </form>
  );
};

export default CreateQuestion;
