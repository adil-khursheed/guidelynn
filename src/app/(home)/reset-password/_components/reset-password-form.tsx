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
import Link from "next/link";
import PasswordInput from "../../_components/password-input";
import { Button } from "@/components/ui/button";
import { AlertCircleIcon, Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { authLinkClass } from "../../_components/auth-link";
import { cn } from "@/lib/utils";

const ResetPasswordFormSchema = z
  .object({
    "new-password": z
      .string()
      .min(8, { error: "Password must be at least 8 characters long" }),
    "confirm-password": z
      .string()
      .min(8, { error: "Confirm your password" }),
  })
  .refine((data) => data["new-password"] === data["confirm-password"], {
    error: "Passwords do not match",
    path: ["confirm-password"],
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
    } catch {
      toast.error("Couldn't reset your password. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = loading || !token;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        className="space-y-4">
        {!token ? (
          <div
            role="alert"
            className="flex gap-2.5 rounded-md border border-border bg-muted/40 px-3 py-2.5 text-sm leading-5">
            <AlertCircleIcon
              className="mt-0.5 size-4 shrink-0 text-primary"
              aria-hidden="true"
            />
            <p>
              This reset link is missing or invalid.{" "}
              <Link
                href="/forgot-password"
                className={cn(authLinkClass, "underline")}>
                Request a new link
              </Link>
              .
            </p>
          </div>
        ) : null}

        <FormField
          control={form.control}
          name="new-password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New password</FormLabel>
              <FormControl>
                <PasswordInput
                  {...field}
                  autoComplete="new-password"
                  disabled={isDisabled}
                  required
                />
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
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <PasswordInput
                  {...field}
                  autoComplete="new-password"
                  disabled={isDisabled}
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={isDisabled}
          aria-busy={loading}
          type="submit"
          className="w-full cursor-pointer">
          {loading ? (
            <>
              <Loader2Icon className="animate-spin" aria-hidden="true" />
              Resetting password
            </>
          ) : (
            "Reset password"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
