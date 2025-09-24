"use client";

import React from "react";
import Link from "next/link";
import { EllipsisIcon } from "lucide-react";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { useTRPC } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import RenameChat from "@/components/ui/rename-chat";
import DeleteChat from "@/components/ui/delete-chat";

const Chats = () => {
  const trpc = useTRPC();

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery(
      trpc.chat.getChats.infiniteQueryOptions(
        {
          limit: 20,
        },
        {
          getNextPageParam: (lastPage) => lastPage.nextCursor,
        }
      )
    );

  const allChats = data.pages.flatMap((page) => page.chats);

  return (
    <div className="flex-1 overflow-y-auto px-3 max-w-3xl w-full mx-auto flex flex-col gap-y-4">
      {allChats && allChats.length > 0 ? (
        allChats.map((chat) => (
          <div
            key={chat.id}
            role="button"
            className="flex items-center justify-between gap-x-2 border border-input shadow-xs bg-background rounded-lg px-3 md:px-6 py-4 md:py-6 group">
            <Link href={`/chat/${chat.id}`} className="flex-1 min-w-0">
              <div className="w-full truncate text-base md:text-lg">
                {chat.title}
              </div>
              <span className="text-xs md:text-sm">
                Last message{" "}
                {formatDistanceToNow(chat.messages[0].createdAt, {
                  addSuffix: true,
                })}
              </span>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant={"ghost"}
                  className="md:hidden md:group-hover:block rounded-sm cursor-pointer">
                  <EllipsisIcon />
                  <span className="sr-only">More</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-24 rounded-lg">
                <RenameChat chatId={chat.id} existingTitle={chat.title} />

                <DeleteChat chatId={chat.id} />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))
      ) : (
        <div className="text-center text-neutral-500 font-medium text-sm md:text-base mt-10">
          <p>No chats available</p>
        </div>
      )}

      {hasNextPage && (
        <Button
          variant={"outline"}
          className="w-full cursor-pointer"
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}>
          {isFetchingNextPage ? "Loading more..." : "Load More"}
        </Button>
      )}
    </div>
  );
};

export default Chats;
