"use server";

import { auth } from "@/lib/auth";

export const signup = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    await auth.api.signUpEmail({
      body: {
        email: data.email,
        password: data.password,
        name: data.name,
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
