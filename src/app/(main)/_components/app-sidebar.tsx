import React, { Suspense } from "react";
import Link from "next/link";

import {
  ChevronUp,
  MessagesSquareIcon,
  PlusCircleIcon,
  User2Icon,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ThemeToggle from "@/components/ui/theme-toggle";
import { getQueryClient, trpc } from "@/trpc/server";
import RecentChats from "./recent-chats";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

const items = [
  {
    title: "New Chat",
    url: "/new",
    icon: PlusCircleIcon,
  },
  {
    title: "Chats",
    url: "recents",
    icon: MessagesSquareIcon,
  },
];

const AppSidebar = () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.chat.getChats.queryOptions());

  return (
    <Sidebar>
      <SidebarHeader>
        <h3 className="text-lg font-bold text-primary font-serif">Guidelynn</h3>
      </SidebarHeader>

      <SidebarContent className="max-h-max">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarContent className="mt-5">
        <SidebarGroupLabel>Recent Chats</SidebarGroupLabel>
        <SidebarGroup>
          <SidebarGroupContent>
            <HydrationBoundary state={dehydrate(queryClient)}>
              <Suspense>
                <RecentChats />
              </Suspense>
            </HydrationBoundary>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu className="">
          <SidebarMenuItem className="flex items-center justify-between gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2Icon /> Username
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-full">
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <ThemeToggle />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
