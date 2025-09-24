import React, { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient, trpc } from "@/trpc/server";
import { getSession } from "@/lib/auth";

import { ChevronUp, User2Icon } from "lucide-react";
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
import { Skeleton } from "@/components/ui/skeleton";

import RecentChats from "./recent-chats";
import NavMenuItems from "./nav-menu-items";
import ChatsSkeleton from "./chats-skeleton";
import LogoutButton from "./logout-button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const AppSidebar = async () => {
  const session = await getSession();
  if (!session) redirect("/login");

  const user = session?.user;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.chat.getChats.queryOptions({}));

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href={"/"}>
                <span className="text-lg font-bold text-primary font-serif">
                  Guidelynn
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="max-h-max">
        <SidebarGroup>
          <SidebarGroupContent>
            <NavMenuItems />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarContent className="mt-5">
        <SidebarGroupLabel>Recent Chats</SidebarGroupLabel>
        <SidebarGroup>
          <SidebarGroupContent>
            <HydrationBoundary state={dehydrate(queryClient)}>
              <Suspense fallback={<ChatsSkeleton />}>
                <RecentChats />
              </Suspense>
            </HydrationBoundary>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="relative">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center justify-between gap-2">
            <DropdownMenu>
              <Suspense fallback={<Skeleton className="w-full h-8" />}>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <User2Icon /> {user.name}
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
              </Suspense>
              <DropdownMenuContent side="top" className="w-full">
                <DropdownMenuItem>
                  <span className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>
                        {user.name.split(" ")[0].charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    {user.name}
                  </span>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <LogoutButton />
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
