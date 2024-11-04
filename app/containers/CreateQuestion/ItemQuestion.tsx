import { Input } from "@/components/ui/input";
import FormItem from "./FormItem";
import { Combobox } from "@/app/common/Combobox";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

const ItemQuestion = () => {
  return (
    <div className="border-dashed p-3 border-2 rounded-sm">
      <FormItem label="Question 1" styles={{ label: "" }}>
        <Input placeholder="Section A" />
      </FormItem>
      <FormItem label="Correct heading" className="my-3" styles={{ label: "" }}>
        <Combobox list={[]} setItem={() => ""} defaultValue="" />
      </FormItem>
      <Button className="bg-red-100 hover:bg-red-400 hover:text-white text-gray-800 py-0 w-full flex items-center justify-center gap-2">
        <Trash size={18} />
        <span>Remove question 1</span>
      </Button>
    </div>
  );
};

export default ItemQuestion;
