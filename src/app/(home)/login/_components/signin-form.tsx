"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import GoogleSignIn from "../../_components/google-signin";
import { useRouter } from "next/navigation";
import { login } from "../_actions/login";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import PasswordInput from "../../_components/password-input";
import { authLinkClass } from "../../_components/auth-link";
import { cn } from "@/lib/utils";

const SignInFormSchema = z.object({
  email: z.email({ error: "Invalid email address" }),
  password: z
    .string()
    .min(8, { error: "Password must be at least 8 characters long" }),
});

const SignInForm = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof SignInFormSchema>>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof SignInFormSchema>) => {
    try {
      setLoading(true);

      await login(data);
      router.replace("/new");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Couldn't sign you in. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <GoogleSignIn />

      <div className="flex items-center gap-4">
        <div className="h-px w-full bg-border" />
        <span className="text-[11px] font-medium uppercase tracking-[0.09em] text-secondary-foreground dark:text-muted-foreground">
          or
        </span>
        <div className="h-px w-full bg-border" />
      </div>

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

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between gap-4">
                  <FormLabel>Password</FormLabel>
                  <Link
                    href="/forgot-password"
                    className={cn(authLinkClass, "text-xs")}>
                    Forgot password?
                  </Link>
                </div>
                <FormControl>
                  <PasswordInput
                    {...field}
                    autoComplete="current-password"
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
                Signing in
              </>
            ) : (
              "Sign in"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignInForm;
