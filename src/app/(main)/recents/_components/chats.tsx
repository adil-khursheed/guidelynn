"use client";

import React from "react";
import Link from "next/link";
import {
  Clock3Icon,
  EllipsisIcon,
  Loader2Icon,
  PlusIcon,
} from "lucide-react";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useTRPC } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import RenameChat from "@/components/ui/rename-chat";
import DeleteChat from "@/components/ui/delete-chat";
import { ArchiveScene } from "../../_components/study-scene";

const ease = [0.16, 1, 0.3, 1] as const;

const Chats = () => {
  const trpc = useTRPC();
  const reduceMotion = useReducedMotion();

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
    <div className="flex-1 overflow-y-auto px-3">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-y-3 pb-10">
        {allChats && allChats.length > 0 ? (
          <motion.ul layout className="flex flex-col gap-y-3">
            <AnimatePresence>
              {allChats.map((chat, index) => {
                const lastMessage = chat.messages[0];

                return (
                  <motion.li
                    key={chat.id}
                    layout
                    initial={
                      reduceMotion ? false : { opacity: 0, y: 8 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{
                      duration: 0.35,
                      delay: reduceMotion
                        ? 0
                        : Math.min(index * 0.035, 0.24),
                      ease,
                    }}>
                    <div className="group flex items-center justify-between gap-x-2 rounded-xl border border-border bg-card px-4 py-4 shadow-xs transition-[border-color,box-shadow] duration-200 hover:border-input hover:shadow-sm md:px-6 md:py-5">
                      <Link
                        href={`/chat/${chat.id}`}
                        className="min-w-0 flex-1 rounded-sm">
                        <div className="w-full truncate text-base md:text-lg">
                          {chat.title}
                        </div>
                        <span className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground md:text-sm">
                          <Clock3Icon className="size-3.5 shrink-0" />
                          {lastMessage ? (
                            <>
                              Last message{" "}
                              {formatDistanceToNow(lastMessage.createdAt, {
                                addSuffix: true,
                              })}
                            </>
                          ) : (
                            "No messages yet"
                          )}
                        </span>
                      </Link>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant={"ghost"}
                            size={"icon"}
                            className="shrink-0 cursor-pointer opacity-100 transition-opacity focus-visible:opacity-100 group-focus-within:opacity-100 md:opacity-0 md:group-hover:opacity-100">
                            <EllipsisIcon />
                            <span className="sr-only">
                              Options for {chat.title}
                            </span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-24 rounded-lg">
                          <RenameChat
                            chatId={chat.id}
                            existingTitle={chat.title}
                          />

                          <DeleteChat chatId={chat.id} />
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </motion.ul>
        ) : (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
            <ArchiveScene className="w-48 sm:w-56" />
            <h2 className="mt-5 font-serif text-2xl tracking-[-0.015em]">
              No sessions on the desk yet.
            </h2>
            <p className="mt-2 max-w-[40ch] text-sm leading-6 text-muted-foreground">
              Start with what you&apos;re weighing. Guidelynn will keep the
              context for when you return.
            </p>
            <Button asChild className="mt-6">
              <Link href={"/new"}>
                <PlusIcon />
                <span>Start a chat</span>
              </Link>
            </Button>
          </motion.div>
        )}

        {hasNextPage && (
          <Button
            variant={"outline"}
            className="w-full cursor-pointer"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}>
            {isFetchingNextPage ? (
              <>
                <Loader2Icon className="animate-spin" />
                Loading more...
              </>
            ) : (
              "Load More"
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Chats;
