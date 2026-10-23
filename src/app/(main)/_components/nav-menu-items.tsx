"use client";

import React from "react";
import Link from "next/link";

import { MessagesSquareIcon, PlusCircleIcon } from "lucide-react";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const items = [
  {
    title: "New Chat",
    url: "/new",
    icon: PlusCircleIcon,
    iconClassName: "transition-transform duration-200 group-hover/nav:rotate-90",
  },
  {
    title: "Chats",
    url: "/recents",
    icon: MessagesSquareIcon,
  },
];

const NavMenuItems = () => {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild isActive={pathname === item.url}>
            <Link href={item.url} className="group/nav">
              <item.icon className={cn(item.iconClassName)} />
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};

export default NavMenuItems;
