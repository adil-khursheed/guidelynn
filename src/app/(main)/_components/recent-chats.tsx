"use client";

import React from "react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const RecentChats = () => {
  const pathname = usePathname();

  const trpc = useTRPC();

  const { data } = useSuspenseQuery(trpc.chat.getChats.queryOptions());

  return (
    <SidebarMenu>
      {data.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild isActive={pathname === `/chat/${item.id}`}>
            <Link href={`/chat/${item.id}`}>
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};

export default RecentChats;
