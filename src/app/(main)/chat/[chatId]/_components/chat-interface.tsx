"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowDownIcon, ChevronDown } from "lucide-react";

import ChatInput from "@/components/ui/chat-input";
import { useChat } from "@/contexts/chat-context";
import { useTRPC } from "@/trpc/client";
import Message from "./message";
import { ResponseLoader } from "@/components/ui/response-loader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { StudyScene } from "../../../_components/study-scene";

import RenameChat from "@/components/ui/rename-chat";
import DeleteChat from "@/components/ui/delete-chat";

const ease = [0.16, 1, 0.3, 1] as const;

const ChatInterface = ({ chatId }: { chatId: string }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPinned, setIsPinned] = useState(true);
  const [showLatest, setShowLatest] = useState(false);
  const reduceMotion = useReducedMotion();

  const { messages, setMessages, isResponding, isStreaming } = useChat();

  const trpc = useTRPC();

  const { data } = useSuspenseQuery(
    trpc.chat.getChatById.queryOptions({ chatId })
  );

  const scrollToLatest = useCallback((behavior: ScrollBehavior = "smooth") => {
    const el = scrollRef.current;
    if (!el) return;

    el.scrollTo({ top: el.scrollHeight, behavior });
  }, []);

  useEffect(() => {
    if (data && data.messages) {
      setMessages((prev) => {
        const merged = [...prev];

        data.messages.forEach((msg) => {
          const existingIndex = merged.findIndex((m) => m.id === msg.id);

          if (existingIndex >= 0) {
            // Update existing message
            merged[existingIndex] = msg;
          } else {
            // Add new message
            merged.push(msg);
          }
        });

        return merged;
      });
    }

    return () => {
      setMessages([]);
    };
  }, [data, setMessages]);

  useEffect(() => {
    const newest = messages[messages.length - 1];
    const followsLatest = newest?.role === "user";

    if (followsLatest && !isPinned) setIsPinned(true);
    if (isPinned || followsLatest) scrollToLatest("auto");
  }, [messages, isResponding, isStreaming, isPinned, scrollToLatest]);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    const distance = el.scrollHeight - el.scrollTop - el.clientHeight;

    setIsPinned(distance < 96);
    setShowLatest(distance > 240);
  };

  const jumpToLatest = () => {
    setIsPinned(true);
    setShowLatest(false);
    scrollToLatest("smooth");
  };

  const isEmpty = messages.length === 0 && !isResponding && !isStreaming;

  return (
    <>
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease }}
        className="bg-background py-3 pr-3 pl-14 shadow-xs md:pl-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={"ghost"}
              className="h-auto max-w-xs cursor-pointer p-0 hover:bg-transparent">
              <span className="w-full truncate">{data.title}</span>
              <ChevronDown aria-hidden="true" />
              <span className="sr-only">Chat options</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom">
            <RenameChat chatId={chatId} existingTitle={data.title} />

            <DeleteChat chatId={chatId} />
          </DropdownMenuContent>
        </DropdownMenu>
      </motion.div>

      <div className="relative min-h-0 flex-1">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="h-full overflow-y-auto px-3">
          <div className="mx-auto flex min-h-full w-full max-w-3xl flex-col gap-y-10 pt-5 pb-10">
            {messages.length > 0 &&
              messages.map((msg, index) => {
                return <Message key={msg.id} msg={msg} index={index} />;
              })}

            {isEmpty && (
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease }}
                className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
                <StudyScene className="w-40 opacity-90 sm:w-48" />
                <p className="mt-4 font-serif text-2xl tracking-[-0.015em]">
                  The desk is clear.
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Ask the first question below.
                </p>
              </motion.div>
            )}

            {(isResponding || isStreaming) && (
              <div className="px-6">
                <ResponseLoader
                  text={isResponding ? "Thinking..." : "Generating..."}
                />
              </div>
            )}
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-8 z-20 flex justify-center">
          <AnimatePresence>
            {showLatest && (
              <motion.button
                type="button"
                onClick={jumpToLatest}
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.22, ease }}
                className="pointer-events-auto inline-flex items-center gap-1.5 rounded-full border border-border bg-popover px-3 py-1.5 text-xs text-popover-foreground shadow-md transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none">
                <ArrowDownIcon className="size-3.5" aria-hidden="true" />
                Latest
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="relative z-10 mx-auto -mt-5 mb-5 w-full max-w-3xl bg-background px-3">
        <ChatInput
          chatId={chatId}
          placeholder={
            messages.length > 0
              ? "Reply to Guidelynn..."
              : "Ask your first question..."
          }
        />
      </div>
    </>
  );
};

export default ChatInterface;
