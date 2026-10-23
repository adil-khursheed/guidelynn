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
import { motion, useReducedMotion } from "motion/react";
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
  const reduceMotion = useReducedMotion();

  const trpc = useTRPC();

  const { data } = useSuspenseQuery(trpc.chat.getChats.queryOptions({}));

  return (
    <SidebarMenu>
      {data.chats && data.chats.length > 0 ? (
        data.chats.map((item) => {
          const isActive = pathname === `/chat/${item.id}`;

          return (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton asChild isActive={isActive}>
                <Link
                  href={`/chat/${item.id}`}
                  className="group/menu-link flex items-center justify-between">
                  <span className="flex size-4 shrink-0 items-center justify-center">
                    {isActive && (
                      <motion.span
                        layoutId={
                          reduceMotion ? undefined : "active-chat-signal"
                        }
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                        }}
                        className="size-1.5 rounded-full bg-primary"
                      />
                    )}
                  </span>
                  <span className="min-w-0 flex-1 truncate">{item.title}</span>
                </Link>
              </SidebarMenuButton>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuAction
                    showOnHover
                    className="data-[state=open]:bg-accent cursor-pointer rounded-sm">
                    <EllipsisIcon />
                    <span className="sr-only">
                      Options for {item.title}
                    </span>
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
          );
        })
      ) : (
        <SidebarMenuItem className="px-2 py-1">
          <p className="text-xs text-sidebar-foreground/70">
            No sessions yet.
          </p>
          <Link
            href="/new"
            className="mt-1 inline-flex text-xs font-medium text-primary underline-offset-4 hover:underline">
            Start a chat
          </Link>
        </SidebarMenuItem>
      )}

      {data.chats && data.chats.length > 0 && (
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link
              href={`/recents`}
              className="group/menu-link flex items-center justify-between">
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
