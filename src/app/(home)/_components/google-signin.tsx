"use client";

import React, { useState } from "react";
import Google from "@/components/icons/google";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { authClient } from "@/lib/auth-client";

const GoogleSignIn = () => {
  const [loading, setLoading] = useState(false);

  const signin = async () => {
    try {
      setLoading(true);
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/new",
        newUserCallbackURL: "/info/user",
      });
    } catch (error) {
      console.error("Google sign-in error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      type="button"
      onClick={signin}
      variant="outline"
      disabled={loading}
      aria-busy={loading}
      className="w-full cursor-pointer border-input">
      <Google />
      Continue with Google
      {loading && (
        <Loader2Icon className="animate-spin text-primary" aria-hidden="true" />
      )}
    </Button>
  );
};

export default GoogleSignIn;
