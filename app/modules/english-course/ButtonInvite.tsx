import { Button } from "@/components/ui/button";

import ModalUser from "./ModalUser";
import supabase from "@/supabase";
import { Dialog } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

const ButtonInvite = ({
  refetch,
  userId,
  setShow,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  refetch: any;
  userId: string | boolean;
  setShow: (id: string | boolean) => void;
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSave = async (data: any) => {
    const id = typeof userId === "boolean" ? "" : userId;
    const { data: getUserAuth } = await supabase.auth.admin.getUserById(id);
    const { data: user, error: errorCreateUser } = !id
      ? await supabase.auth.admin.createUser({
          email: data?.email,
          password: "dev@",
        })
      : await supabase.auth.admin.updateUserById(id, {
          ...(getUserAuth.user || {}),
          email: data?.email,
        });
    const { error: errorInsertUser } = id
      ? await supabase
          .from("users")
          .update({
            ...data,
          })
          .eq("password", id)
      : await supabase.from("users").insert([
          {
            ...data,
            password: user?.user?.id,
          },
        ]);
    if (!errorCreateUser && !errorInsertUser) {
      setShow("");
      refetch?.();
      toast({
        title: " user success",
        description: "Friday, February 10, 2023 at 5:57 PM",
      });
      return;
    }

    toast({
      title: " user fail",
      description: "Friday, February 10, 2023 at 5:57 PM",
    });
  };

  return (
    <Dialog
      open={!!userId}
      onOpenChange={(open) => setShow(open ? userId : "")}
    >
      {JSON.stringify(userId)}
      <Button onClick={() => setShow(true)} variant="outline">
        Invite user
      </Button>
      {userId && <ModalUser handleSave={handleSave} userId={userId} />}
    </Dialog>
  );
};

export default ButtonInvite;
