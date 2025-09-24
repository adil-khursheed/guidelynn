"use client";

import React from "react";
import {
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CircleEllipsisIcon, EllipsisIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import RenameChat from "@/components/ui/rename-chat";
import DeleteChat from "@/components/ui/delete-chat";

const RecentChats = () => {
  const { isMobile } = useSidebar();
  const pathname = usePathname();

  const trpc = useTRPC();

  const { data } = useSuspenseQuery(trpc.chat.getChats.queryOptions({}));

  return (
    <SidebarMenu>
      {data.chats && data.chats.length > 0 ? (
        data.chats.map((item) => (
          <SidebarMenuItem key={item.id}>
            <SidebarMenuButton
              asChild
              isActive={pathname === `/chat/${item.id}`}>
              <Link
                href={`/chat/${item.id}`}
                className="flex item-center justify-between group/menu-link">
                <span className="flex-1 truncate">{item.title}</span>
              </Link>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction
                  showOnHover
                  className="data-[state=open]:bg-accent rounded-sm cursor-pointer">
                  <EllipsisIcon />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-24 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}>
                <RenameChat chatId={item.id} existingTitle={item.title} />

                <DeleteChat chatId={item.id} />
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))
      ) : (
        <SidebarMenuItem className="p-2">
          <span>No chats available</span>
        </SidebarMenuItem>
      )}

      {data.chats && data.chats.length > 0 && (
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link
              href={`/recents`}
              className="flex item-center justify-between group/menu-link">
              <CircleEllipsisIcon />
              <span className="flex-1 truncate">All Chats</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      )}
    </SidebarMenu>
  );
};

export default RecentChats;
