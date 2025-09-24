"use client";

import React, { useEffect, useState } from "react";
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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input } from "./input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { toast } from "sonner";
import { EditIcon, Loader2Icon } from "lucide-react";

const RenameChatSchema = z.object({
  title: z.string().min(1).max(150),
});

const MAX_TITLE_LENGTH = 150;

const RenameChat = ({
  chatId,
  existingTitle,
}: {
  chatId: string;
  existingTitle?: string;
}) => {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof RenameChatSchema>>({
    resolver: zodResolver(RenameChatSchema),
    defaultValues: {
      title: existingTitle ? existingTitle : "",
    },
  });

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation(
    trpc.chat.updateChatTitle.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: trpc.chat.getChatById.queryKey({ chatId }),
        });
        queryClient.invalidateQueries({
          queryKey: trpc.chat.getChats.queryKey(),
        });

        setOpen(false);
      },
      onError: (error) => {
        console.log("Title update error =>", error);
        toast.error("Failed to update the title.");
      },
    })
  );

  const handleFormSubmit = async (data: z.infer<typeof RenameChatSchema>) => {
    try {
      await mutateAsync({
        chatId,
        title: data.title,
      });
    } catch (error) {
      console.log("Title update error catch =>", error);
      toast.error("Failed to update the title.");
    }
  };

  const watchedTitle = form.watch("title");

  useEffect(() => {
    if (watchedTitle.length >= MAX_TITLE_LENGTH) {
      form.setError("title", {
        message: "Title should be less than 150 characters.",
      });
    } else {
      form.clearErrors("title");
    }
  }, [watchedTitle, form]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
        <DialogTrigger asChild>
          <Button
            variant={"ghost"}
            className="h-auto p-0 w-full justify-start py-1 px-2 hover:bg-transparent cursor-pointer">
            <EditIcon />
            <span>Rename</span>
          </Button>
        </DialogTrigger>
      </DropdownMenuItem>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename Chat</DialogTitle>
          <DialogDescription>Give this chat a title</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="space-y-3">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center justify-between">
                    <span>Title</span>
                    <span className="text-xs">
                      {watchedTitle.length}/{MAX_TITLE_LENGTH}
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter a title"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="flex flex-row items-center justify-end gap-3">
              <DialogClose asChild>
                <Button variant={"secondary"} disabled={isPending}>
                  Cancel
                </Button>
              </DialogClose>

              <Button
                type="submit"
                disabled={isPending}
                className="cursor-pointer">
                {isPending ? (
                  <Loader2Icon className="animate-spin" />
                ) : (
                  "Update"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default RenameChat;
