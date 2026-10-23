"use client";

import React, { useState } from "react";

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
import { Loader2Icon, MailCheckIcon } from "lucide-react";

const ForgotPasswordFormSchema = z.object({
  email: z.email({ error: "Invalid email address" }),
});

const ForgotPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const [sentTo, setSentTo] = useState<string | null>(null);

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

      setSentTo(data.email);
      toast.success("Check your email for the reset link.");
      form.reset();
    } catch {
      toast.error("Couldn't send the reset link. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (sentTo) {
    return (
      <div className="space-y-4" role="status">
        <div className="flex gap-2.5 rounded-md border border-border bg-muted/40 px-3.5 py-3 text-sm leading-6">
          <MailCheckIcon
            className="mt-0.5 size-4 shrink-0 text-primary"
            aria-hidden="true"
          />
          <p>
            If an account exists for{" "}
            <span className="font-medium text-foreground">{sentTo}</span>, a
            reset link is on its way. It may take a minute to arrive, so check
            your spam folder too.
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full cursor-pointer"
          onClick={() => setSentTo(null)}>
          Use a different email
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  autoCapitalize="none"
                  spellCheck={false}
                  placeholder="johndoe@gmail.com"
                  disabled={loading}
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={loading}
          aria-busy={loading}
          type="submit"
          className="w-full cursor-pointer">
          {loading ? (
            <>
              <Loader2Icon className="animate-spin" aria-hidden="true" />
              Sending reset link
            </>
          ) : (
            "Send reset link"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
