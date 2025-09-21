"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUp } from "lucide-react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./form";
import { useParams } from "next/navigation";

const ChatFormSchema = z.object({
  message: z.string().min(1, "Message is required"),
});

const ChatInput = () => {
  const form = useForm<z.infer<typeof ChatFormSchema>>({
    resolver: zodResolver(ChatFormSchema),
  });

  const params = useParams();
  console.log({ params });

  return (
    <Form {...form}>
      <form className="w-full border border-input rounded-2xl p-4 dark:bg-input/30 shadow-xs">
        <FormField
          name="message"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="How can I help you today?"
                  className="max-h-96 resize-none border-0 shadow-none dark:bg-transparent focus-visible:border-0 focus-visible:ring-0 p-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit" size={"icon"} className="cursor-pointer">
            <ArrowUp />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ChatInput;
