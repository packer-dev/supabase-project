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
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CircleHelp, EllipsisVertical, X } from "lucide-react";
import Image from "next/image";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import { toast } from "@/hooks/use-toast";

export const EnglishCourseContainer = () => {
  //
  const [value, setValue] = useState("");
  const fetchUsers = async () => {
    const { data: users } = await supabase
      .from("users")
      .select(
        `
      *,
      roles!inner(*)
    `
      )
      .eq("roles.role_name", "admin")
      .like("email", `%${value}%`);

    return users;
  };
  const [userId, setUserId] = useState<boolean | string>("");
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["users", value],
    queryFn: fetchUsers,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCancelInvitation = async (item: any) => {
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
    <div className="w-11/12 mx-auto">
      <div className="flex justify-between items-center py-5">
        <Input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          className="w-60"
          placeholder="Filter member"
        />
        <ButtonInvite refetch={refetch} userId={userId} setShow={setUserId} />
      </div>
      <Table className="border">
        <TableHeader>
          <TableRow className="bg-gray-100 dark:bg-black">
            <TableHead className="w-1/2">User</TableHead>
            <TableHead className="w-40 text-center">Enabled MFA</TableHead>
            <TableHead className="flex-1">
              <Tooltip>
                <TooltipTrigger>
                  <div className="flex items-center gap-2">
                    <span>Role</span>
                    <CircleHelp size={16} />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>How to configure access control?</p>
                </TooltipContent>
              </Tooltip>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={4} className="py-8 text-center">
                <i className="bx bx-loader animate-spin text-3xl" />
              </TableCell>
            </TableRow>
          ) : (
            data?.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="flex items-center justify-between">
                  <div className="w-full flex items-center gap-5">
                    <Image
                      className="rounded-full object-cover"
                      width={45}
                      height={45}
                      src="https://nqhlmtbglaailxpcvkwb.supabase.co/storage/v1/object/public/packer-ui/1728536336079_69659d3d-0e5f-4361-8a1c-ee918ae688a5.webp"
                      alt=""
                    />
                    <span className="font-semibold">{user.email}</span>
                  </div>
                  <div className="flex-1 px-4">
                    <span className="py-1.5 px-2 text-xs font-300 rounded-sm text-orange-500 border border-orange-500">
                      Invited
                    </span>
                  </div>
                </TableCell>
                <TableCell className="w-40">
                  <X size={14} className="mx-auto opacity-80" />
                </TableCell>
                <TableCell className="flex-1">
                  <div className="w-full flex items-center justify-between">
                    <span>{user.roles?.role_name}</span>
                    <Popover>
                      <PopoverTrigger>
                        <EllipsisVertical size={15} />
                      </PopoverTrigger>
                      <PopoverContent align="end">
                        <div className="shadow-lg border border-gray-100 rounded-sm bg-white dark:bg-black p-1">
                          <div
                            aria-hidden
                            onClick={() => handleCancelInvitation(user)}
                            className="border-b border-solid border-gray-200 p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-black/60"
                          >
                            <p>Cancel invitation</p>
                            <p className="text-sm text-gray-500">
                              Revoke this invitation.
                            </p>
                          </div>
                          <div className="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-black">
                            <p>Resend invitation</p>
                            <p className="text-sm text-gray-500">
                              Invites expire after 24hrs.
                            </p>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
          {!isLoading && value && !data?.length && (
            <TableRow className="bg-gray-100 dark:bg-black">
              <TableCell
                className="px-4 py-2 text-gray-500 text-sm"
                colSpan={3}
              >
                <div className="flex items-center gap-3">
                  <CircleHelp size={16} />
                  <span>No users matched the search query {`"${value}"`}</span>
                </div>
              </TableCell>
            </TableRow>
          )}
          {!!data?.length && (
            <TableRow className="bg-gray-100 dark:bg-black">
              <TableCell
                className="px-4 py-2 text-gray-500 text-sm"
                colSpan={3}
              >{`${data.length} users`}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default EnglishCourseContainer;
