"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";

const ForgotPasswordFormSchema = z.object({
  email: z.email({ error: "Invalid email address" }),
});

const ForgotPasswordForm = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof ForgotPasswordFormSchema>>({
    resolver: zodResolver(ForgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof ForgotPasswordFormSchema>) => {
    try {
      setLoading(true);

      const { error } = await authClient.requestPasswordReset({
        email: data.email,
        redirectTo: `${process.env.NEXT_PUBLIC_API_URL}/reset-password`,
      });

      if (error) {
        toast.error(`${error.message}`);
        return;
      }

      toast.success(`Password reset link has been sent to ${data.email}`);
      form.reset();
      router.replace("/login");
    } catch (error) {
      console.log("Request reset password failed: ", error);
      toast.error("Request reset password failed.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="johndoe@gmail.com"
                  disabled={loading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={loading}
          type="submit"
          className="w-full cursor-pointer">
          {loading ? <Loader2Icon className="animate-spin" /> : "Send Request"}
        </Button>
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
