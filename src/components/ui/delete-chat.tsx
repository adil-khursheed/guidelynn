"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { DropdownMenuItem } from "./dropdown-menu";
import { Button } from "./button";
import { Loader2Icon, Trash2Icon } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

const DeleteChat = ({ chatId }: { chatId: string }) => {
  const [open, setOpen] = useState(false);

  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const trpc = useTRPC();

  const { mutateAsync, isPending } = useMutation(
    trpc.chat.deleteChat.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: trpc.chat.getChats.queryKey(),
        });
        queryClient.invalidateQueries({
          queryKey: trpc.chat.getChats.infiniteQueryKey(),
        });

        if (params && params.chatId === chatId) {
          router.replace("/new");
        }
        setOpen(false);
      },
      onError: (error) => {
        console.log("Chat deletion error => ", error);
        toast.error("Failed to delete chat");
      },
    })
  );

  const handleDelete = async () => {
    try {
      await mutateAsync({ chatId });
    } catch (error) {
      console.log("Chat deletion error catch => ", error);
      toast.error("Failed to delete chat");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
        <DialogTrigger asChild>
          <Button
            variant={"ghost"}
            className="h-auto p-0 w-full justify-start py-1 px-2 hover:bg-transparent cursor-pointer text-red-600 hover:text-red-700">
            <Trash2Icon className="text-red-600 hover:text-red-700" />
            <span>Delete</span>
          </Button>
        </DialogTrigger>
      </DropdownMenuItem>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Chat</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this chat?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"secondary"} disabled={isPending}>
              Cancel
            </Button>
          </DialogClose>

          <Button
            onClick={handleDelete}
            disabled={isPending}
            className="cursor-pointer bg-red-600 hover:bg-red-700">
            {isPending ? <Loader2Icon className="animate-spin" /> : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteChat;
