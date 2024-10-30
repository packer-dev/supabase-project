"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import supabase from "@/supabase";
import { useQuery } from "@tanstack/react-query";
import ButtonInvite from "../modules/english-course/ButtonInvite";

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
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  //
  return (
    <div>
      <div className="flex justify-end py-5">
        <ButtonInvite refetch={refetch} />
      </div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
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
              </TableRow>
            ))
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default EnglishCourseContainer;
