import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import AppSidebar from "./_components/app-sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 relative">
        <SidebarTrigger className="md:hidden absolute top-4 left-4" />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default MainLayout;
