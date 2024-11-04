import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MinusCircle, Plus } from "lucide-react";

const GivenHeading = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <Input className="flex-1" placeholder="Heading 01" />
        <Button variant="secondary">
          <MinusCircle size={24} />
        </Button>
      </div>
      <Button variant="secondary" className="flex py-0 items-center gap-2">
        <Plus />
        <span>Add new heading</span>
      </Button>
    </div>
  );
};

export default GivenHeading;
