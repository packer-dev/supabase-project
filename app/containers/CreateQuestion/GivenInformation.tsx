import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MinusCircle, Plus } from "lucide-react";
import FormItem from "./FormItem";

const GivenInformation = () => {
  return (
    <div className="flex flex-col gap-3">
      <FormItem label="Title" optional>
        <Input placeholder="What makes people happy" />
      </FormItem>
      <FormItem className="" label="List" required>
        <div className="flex items-center gap-3">
          <Input className="flex-1" placeholder="Heading 01" />
          <Button variant="secondary">
            <MinusCircle size={24} />
          </Button>
        </div>
        <div className="flex items-center gap-3">
          <Input className="flex-1" placeholder="Heading 01" />
          <Button variant="secondary">
            <MinusCircle size={24} />
          </Button>
        </div>
      </FormItem>
      <Button variant="secondary" className="flex py-0 items-center gap-2">
        <Plus />
        <span>Add new item</span>
      </Button>
    </div>
  );
};

export default GivenInformation;
