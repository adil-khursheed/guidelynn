"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2Icon } from "lucide-react";

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
import GoogleSignIn from "../../_components/google-signin";
import { signup } from "../_actions/signup";
import { toast } from "sonner";
import PasswordInput from "../../_components/password-input";

const SignUpFormSchema = z.object({
  name: z
    .string({ error: "Name is required" })
    .min(1, { error: "Name is required" }),
  email: z.email({ error: "Invalid email address" }),
  password: z
    .string()
    .min(8, { error: "Password must be at least 8 characters long" }),
});

const SignUpForm = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof SignUpFormSchema>) => {
    try {
      setLoading(true);

      await signup(data);
      toast.success(
        `We sent a verification link to ${data.email}. Verify it to finish setting up your account.`,
        { duration: 5000 }
      );
      form.reset();
      router.replace("/info/user");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Couldn't create your account. Try again.");
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    autoComplete="name"
                    placeholder="John Doe"
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    {...field}
                    autoComplete="new-password"
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
                Creating account
              </>
            ) : (
              "Create account"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignUpForm;
