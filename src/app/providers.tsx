"use client";

import React from "react";
import { ThemeProvider, useTheme } from "next-themes";
import { TRPCReactProvider } from "@/trpc/client";
import { Toaster } from "@/components/ui/sonner";

export const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <TRPCReactProvider>
      <ThemeProvider
        enableSystem
        defaultTheme="system"
        attribute="class"
        disableTransitionOnChange>
        {children}
        <ToastProvider />
      </ThemeProvider>
    </TRPCReactProvider>
  );
};

function ToastProvider() {
  const { resolvedTheme } = useTheme();
  return (
    <Toaster
      richColors
      closeButton
      position="top-right"
      theme={resolvedTheme === "dark" ? "dark" : "light"}
    />
  );
}
