import { Combobox } from "@/app/common/Combobox";
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
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const ButtonInvite = ({ refetch }: { refetch: any }) => {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState("");
  const fetchRoles = async () => {
    const { data: roles } = await supabase.from("roles").select(`*`);

    return roles;
  };
  const { data: roles } = useQuery({
    queryKey: ["fetchRoles"],
    queryFn: fetchRoles,
  });
  const handleSave = async () => {
    const { error: errorCreateUser } = await supabase.auth.admin.createUser({
      email: value,
      password: "dev@",
    });
    const { error: errorInsertUser } = await supabase.from("users").insert([
      {
        username: value.split("@")[0],
        password: "dev@",
        email: value,
        role_id: Number(value),
      },
    ]);
    if (!errorCreateUser && !errorInsertUser) setShow(false);
    refetch?.();
  };
  const roleData = (Array.isArray(roles) ? roles : []).map((item) => ({
    value: item.id,
    label: item.role_name,
  }));
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
            <div className="w-full flex flex-col gap-4">
              <Label htmlFor="name" className="text-left block">
                Role
              </Label>
              <Combobox list={roleData} />
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
