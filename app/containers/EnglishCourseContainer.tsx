"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import supabase from "@/supabase";
import { useQuery } from "@tanstack/react-query";
import ButtonInvite from "../modules/english-course/ButtonInvite";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

export const EnglishCourseContainer = () => {
  //
  const fetchUsers = async () => {
    const { data: users } = await supabase
      .from("users")
      .select(
        `
      *,
      roles!inner(*)
    `
      )
      .eq("roles.role_name", "admin");

    return users;
  };
  const [userId, setUserId] = useState<boolean | string>("");
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDelete = async (item: any) => {
    const { error: errorDatabase } = await supabase
      .from("users")
      .delete()
      .eq("id", item?.id);
    const { error: errorAuth } = await supabase.auth.admin.deleteUser(
      item?.password
    );
    refetch();
    if (errorAuth || errorDatabase) {
      toast({
        title: "Delete fail",
        description: "Friday, February 10, 2023 at 5:57 PM",
      });
    } else {
      toast({
        title: "Delete success",
        description: "Friday, February 10, 2023 at 5:57 PM",
      });
    }
  };

  //
  return (
    <div>
      <div className="flex justify-end py-5">
        <ButtonInvite refetch={refetch} userId={userId} setShow={setUserId} />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Edit/delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={4} className="py-40 text-center">
                <i className="bx bx-loader animate-spin text-3xl" />
              </TableCell>
            </TableRow>
          ) : (
            data?.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.roles?.role_name}</TableCell>
                <TableCell className="w-20">
                  <div className="flex items-center gap-3 justify-end">
                    <Button onClick={() => setUserId(user?.password)}>
                      <i className="bx bx-pencil" />
                    </Button>
                    <Button
                      onClick={() => handleDelete(user)}
                      className="bg-red-500"
                    >
                      <i className="bx bx-trash" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default EnglishCourseContainer;
