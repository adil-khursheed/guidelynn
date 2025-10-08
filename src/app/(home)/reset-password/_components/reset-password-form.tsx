"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import PasswordInput from "../../_components/password-input";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const ResetPasswordFormSchema = z.object({
  "new-password": z.string().min(8),
  "confirm-password": z.string().min(8),
});

const ResetPasswordForm = ({ token }: { token: string }) => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof ResetPasswordFormSchema>>({
    resolver: zodResolver(ResetPasswordFormSchema),
    defaultValues: {
      "confirm-password": "",
      "new-password": "",
    },
  });

  const onSubmit = async (data: z.infer<typeof ResetPasswordFormSchema>) => {
    if (!token) {
      toast.error("Reset password token is required.");
      return;
    }

    if (data["new-password"] !== data["confirm-password"]) {
      toast.warning("Passwords should be same.");
      return;
    }

    try {
      setLoading(true);
      const { error } = await authClient.resetPassword({
        newPassword: data["new-password"],
        token,
      });

      if (error) {
        toast.error(`${error.message}`);
        return;
      }

      toast.success("Password changed successfully.");
      form.reset();
      router.replace("/login");
    } catch (error) {
      console.log("Reset password failed: ", error);
      toast.error("Reset password failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="new-password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <PasswordInput {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirm-password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <PasswordInput {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={loading}
          type="submit"
          className="w-full cursor-pointer">
          {loading ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            "Reset Password"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
