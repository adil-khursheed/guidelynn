"use client";

import React, { useState } from "react";
import Google from "@/components/icons/google";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";

const GoogleSignIn = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const signin = async () => {
    try {
      setLoading(true);
      const { error } = await authClient.signIn.social({
        provider: "google",
      });

      if (error) {
        console.log("Better-auth error => ", error);
        return;
      }

      router.replace("/new");
    } catch (err) {
      console.log("Catch err => ", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={signin}
      variant="outline"
      disabled={loading}
      className="w-full border-input cursor-pointer">
      <Google />
      Sign in with Google
      {loading && <Loader2Icon className="animate-spin text-primary" />}
    </Button>
  );
};

export default GoogleSignIn;
