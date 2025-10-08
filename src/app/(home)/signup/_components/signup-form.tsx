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

const SignInFormSchema = z.object({
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

  const form = useForm<z.infer<typeof SignInFormSchema>>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof SignInFormSchema>) => {
    try {
      setLoading(true);

      await signup(data);
      toast.success(
        `Please verify your email with the link we have sent you on your email ${data.email}`,
        { duration: 5000 }
      );
      form.reset();
      router.replace("/info/user");
    } catch (err) {
      console.log("Signup Err => ", err);
      if (err instanceof Error) {
        toast.error(`${err.message}`);
      } else {
        toast.error("Login failed");
      }
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="John Doe" disabled={loading} />
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
                  <PasswordInput {...field} disabled={loading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={loading}
            type="submit"
            className="w-full cursor-pointer">
            {loading ? <Loader2Icon className="animate-spin" /> : "Sign Up"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignUpForm;
