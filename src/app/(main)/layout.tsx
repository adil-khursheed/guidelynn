import type { Metadata } from "next";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import AppSidebar from "./_components/app-sidebar";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="relative min-w-0 flex-1">
        <SidebarTrigger className="md:hidden absolute top-2.5 left-3" />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default MainLayout;
