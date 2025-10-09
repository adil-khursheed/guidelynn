"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUp, Square } from "lucide-react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./form";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCreateChat } from "@/hooks/use-create-chat";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { useChat } from "@/contexts/chat-context";

interface ChatInputProps {
  chatId?: string;
  onSendMessage?: (message: string) => void;
  placeholder?: string;
  isLoading?: boolean;
}

const ChatFormSchema = z.object({
  message: z.string().min(1, "Message is required"),
});

const ChatInput = ({ chatId, placeholder = "" }: ChatInputProps) => {
  const {
    setMessages,
    setIsStreaming,
    isStreaming,
    setIsResponding,
    isResponding,
  } = useChat();

  const form = useForm<z.infer<typeof ChatFormSchema>>({
    resolver: zodResolver(ChatFormSchema),
    defaultValues: {
      message: "",
    },
  });

  const formMessage = form.watch("message");

  const { startConversation, isPending: creatingChat } = useCreateChat();

  const queryClient = useQueryClient();
  const trpc = useTRPC();

  const { mutate: sendMessage, isPending } = useMutation(
    trpc.chat.sendNewMessage.mutationOptions({
      onSuccess: async (data) => {
        const aiMessageId = uuidv4();
        setMessages((prev) => [
          ...prev,
          {
            id: aiMessageId,
            chatId: chatId!,
            createdAt: new Date(),
            updatedAt: new Date(),
            role: "assistant",
            message: "",
          },
        ]);

        let aiResponse = "";
        setIsResponding(false);
        setIsStreaming(true);
        for await (const textPart of data) {
          aiResponse += textPart;
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === aiMessageId ? { ...msg, message: aiResponse } : msg
            )
          );
        }
        setIsStreaming(false);

        queryClient.invalidateQueries({
          queryKey: trpc.chat.getChatById.queryKey(),
        });
      },
      onError: (error) => {
        setIsResponding(false);
        setIsStreaming(false);
        toast.error("Error", {
          description: error.message || "Failed to send message",
        });
      },
    })
  );

  const onSubmit = async (data: z.infer<typeof ChatFormSchema>) => {
    if (creatingChat) return;

    if (chatId) {
      setIsResponding(true);
      const messageId = uuidv4();

      const optimisticMessage = {
        id: messageId,
        chatId,
        role: "user",
        message: data.message,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      setMessages((prev) => [...prev, optimisticMessage]);
      sendMessage({
        messageId,
        chatId,
        message: data.message,
      });
    } else {
      setIsResponding(true);
      const messageId = uuidv4();
      const newChatId = uuidv4();

      setMessages((prev) => [
        ...prev,
        {
          id: messageId,
          chatId: newChatId,
          role: "user",
          message: data.message,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);

      await startConversation(data.message, newChatId);

      sendMessage({
        messageId,
        chatId: newChatId,
        message: data.message,
      });
    }

    form.reset();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      form.handleSubmit(onSubmit)();
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full border border-input rounded-2xl p-4 dark:bg-input/30 shadow-xs">
        <FormField
          name="message"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder={placeholder}
                  disabled={
                    creatingChat || isPending || isResponding || isStreaming
                  }
                  onKeyDown={handleKeyDown}
                  className="max-h-96 resize-none border-0 shadow-none dark:bg-transparent focus-visible:border-0 focus-visible:ring-0 p-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button
            type="submit"
            size={"icon"}
            disabled={
              !formMessage?.trim() ||
              creatingChat ||
              isPending ||
              isResponding ||
              isStreaming
            }
            className="cursor-pointer">
            {creatingChat || isPending || isResponding || isStreaming ? (
              <Square />
            ) : (
              <ArrowUp />
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ChatInput;
