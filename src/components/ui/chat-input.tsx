"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUp, Loader2Icon } from "lucide-react";
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
  suggestions?: string[];
}

const ChatFormSchema = z.object({
  message: z.string().min(1, "Message is required"),
});

const ChatInput = ({
  chatId,
  placeholder = "",
  suggestions,
}: ChatInputProps) => {
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);
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

  React.useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 320)}px`;
  }, [formMessage]);

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

  const busy = creatingChat || isPending || isResponding || isStreaming;

  const applySuggestion = (suggestion: string) => {
    form.setValue("message", suggestion, { shouldDirty: true });
    form.setFocus("message");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        aria-busy={busy}
        className="w-full border border-input rounded-2xl p-4 dark:bg-input/30 shadow-xs transition-[border-color,box-shadow] duration-200 focus-within:border-ring/60 focus-within:ring-[3px] focus-within:ring-ring/10">
        <FormField
          name="message"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  {...field}
                  ref={(el) => {
                    field.ref(el);
                    textareaRef.current = el;
                  }}
                  rows={1}
                  placeholder={placeholder}
                  disabled={busy}
                  onKeyDown={handleKeyDown}
                  className="max-h-80 resize-none border-0 shadow-none dark:bg-transparent focus-visible:border-0 focus-visible:ring-0 p-0"
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
            disabled={!formMessage?.trim() || busy}
            aria-label={busy ? "Sending message" : "Send message"}
            className="cursor-pointer transition-transform active:scale-95 disabled:active:scale-100">
            {busy ? <Loader2Icon className="animate-spin" /> : <ArrowUp />}
          </Button>
        </div>
      </form>

      {suggestions && suggestions.length > 0 && !busy && (
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => applySuggestion(suggestion)}
              className="rounded-md border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-input hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50">
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </Form>
  );
};

export default ChatInput;
