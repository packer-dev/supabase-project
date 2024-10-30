import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import supabase from "@/supabase";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useState } from "react";

const ButtonInvite = ({ refetch }: { refetch: any }) => {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState("");
  const handleSave = async () => {
    const { data, error } = await supabase.auth.admin.createUser({
      email: value,
      password: "dev@", // You can generate this or have them set it later,
      user_metadata: { name: "packer-dev" },
    });
    console.log(data, error);
    if (!error) setShow(false);
  };
  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogTrigger asChild>
        <Button variant="outline">Invite user</Button>
      </DialogTrigger>
      {show && (
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Invite user</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="w-full flex flex-col gap-4">
              <Label htmlFor="name" className="text-left block">
                Email
              </Label>
              <Input
                onChange={(event) => setValue(event.target.value)}
                id="name"
                placeholder="example@gmail.com"
                className="w-full"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSave} type="submit">
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default ButtonInvite;
