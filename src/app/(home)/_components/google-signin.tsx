"use client";

import React, { useState } from "react";
import Google from "@/components/icons/google";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { googleSignIn } from "../_actions/google-signin";

const GoogleSignIn = () => {
  const [loading, setLoading] = useState(false);

  const signin = async () => {
    try {
      setLoading(true);
      await googleSignIn();
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
