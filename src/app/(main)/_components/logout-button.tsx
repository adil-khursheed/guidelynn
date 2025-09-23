"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { logout } from "../_actions/logout";

const LogoutButton = () => {
  return (
    <Button
      variant={"secondary"}
      onClick={async () => logout()}
      className="w-full bg-transparent hover:bg-transparent text-accent-foreground font-medium cursor-pointer justify-start p-0 h-auto">
      Sign out
    </Button>
  );
};

export default LogoutButton;
