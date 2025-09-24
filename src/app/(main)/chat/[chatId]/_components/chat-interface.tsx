"use client";

import React, { useEffect, useRef } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
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
import { ChevronDown } from "lucide-react";

import RenameChat from "@/components/ui/rename-chat";
import DeleteChat from "@/components/ui/delete-chat";

const ChatInterface = ({ chatId }: { chatId: string }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, setMessages, isResponding, isStreaming } = useChat();

  const trpc = useTRPC();

  const { data } = useSuspenseQuery(
    trpc.chat.getChatById.queryOptions({ chatId })
  );

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
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
      <div className="bg-background shadow-xs py-3 pl-14 md:pl-3 pr-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={"ghost"}
              className="h-auto p-0 hover:bg-transparent cursor-pointer max-w-xs">
              <span className="w-full truncate">{data.title}</span>
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom">
            <RenameChat chatId={chatId} existingTitle={data.title} />

            <DeleteChat chatId={chatId} />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex-1 overflow-y-auto px-3 scroll-smooth">
        <div className="max-w-3xl w-full mx-auto pt-5 pb-10 flex flex-col gap-y-10">
          {messages.length > 0 ? (
            messages.map((msg) => {
              return <Message key={msg.id} msg={msg} />;
            })
          ) : (
            <div></div>
          )}

          {isResponding ||
            (isStreaming && (
              <div className="px-6">
                <ResponseLoader
                  text={isResponding ? "Thinking..." : "Generating..."}
                />
              </div>
            ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="max-w-3xl w-full mx-auto -mt-5 mb-5 bg-background px-3">
        <ChatInput chatId={chatId} placeholder="Reply to Guidelynn..." />
      </div>
    </>
  );
};

export default ChatInterface;
