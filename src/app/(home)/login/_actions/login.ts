"use server";

import { auth } from "@/lib/auth";

export const login = async (data: { email: string; password: string }) => {
  try {
    await auth.api.signInEmail({
      body: {
        email: data.email,
        password: data.password,
        callbackURL: "/new",
        rememberMe: true,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Something went wrong");
  }
};
