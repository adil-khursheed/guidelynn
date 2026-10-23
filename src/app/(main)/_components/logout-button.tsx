"use client";

import React, { useTransition } from "react";
import { Loader2Icon, LogOutIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logout } from "../_actions/logout";

const LogoutButton = () => {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      variant={"secondary"}
      disabled={isPending}
      onClick={() => startTransition(async () => logout())}
      className="h-auto w-full cursor-pointer justify-start gap-2 bg-transparent p-0 font-medium text-accent-foreground hover:bg-transparent">
      {isPending ? (
        <Loader2Icon className="animate-spin" aria-hidden="true" />
      ) : (
        <LogOutIcon aria-hidden="true" />
      )}
      <span>{isPending ? "Signing out..." : "Sign out"}</span>
    </Button>
  );
};

export default LogoutButton;
