"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const googleSignIn = async () => {
  try {
    console.log("here====");

    await auth.api.signInSocial({
      headers: await headers(),
      body: {
        provider: "google",
        callbackURL: "/new",
        requestSignUp: true,
        newUserCallbackURL: "/info/user",
      },
    });

    console.log("here after====");
  } catch (error) {
    console.log(error);
    throw new Error("Google sign in failed.");
  }
};
