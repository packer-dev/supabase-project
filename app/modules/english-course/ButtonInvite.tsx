import { Button } from "@/components/ui/button";

import ModalUser from "./ModalUser";
import supabase from "@/supabase";
import { Dialog } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";

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
  const { mutate: signIn, isPending } = useMutation({
    mutationFn: (credentials: { email: string; role_id: string }) => {
      return handleSave(credentials);
    },
    onSuccess: () => {
      refetch();
      toast({
        title: "Add user successfully",
        description: "Add user successfully",
      });
      setShow(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
      });
    },
  });
  const handleSave = async (data: { email: string; role_id: string }) => {
    const { data: user } = await supabase.auth.admin.createUser({
      email: data?.email,
      password: "dev@",
    });
    console.log(data);
    await supabase.from("users").insert([
      {
        ...data,
        password: user?.user?.id,
        username: "test",
      },
    ]);
  };

  return (
    <Dialog
      open={!!userId}
      onOpenChange={(open) => setShow(open ? userId : "")}
    >
      <Button onClick={() => setShow(true)} variant="outline">
        Invite user
      </Button>
      {userId && (
        <ModalUser handleSave={signIn} userId={userId} loading={isPending} />
      )}
    </Dialog>
  );
};

export default ButtonInvite;
