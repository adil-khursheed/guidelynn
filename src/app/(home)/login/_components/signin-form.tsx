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
      console.log("Login Err => ", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <GoogleSignIn />

      <div className="flex items-center justify-between gap-4">
        <div className="w-full h-px bg-input" />
        <span className="text-sm text-muted-foreground">OR</span>
        <div className="w-full h-px bg-input" />
      </div>

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

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter a password"
                    disabled={loading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-end">
            <Button asChild variant={"link"} className="px-0 py-0 h-auto">
              <Link href="/forgot-password">Forgot password?</Link>
            </Button>
          </div>

          <Button
            disabled={loading}
            type="submit"
            className="w-full cursor-pointer">
            {loading ? <Loader2Icon className="animate-spin" /> : "Sign In"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignInForm;
