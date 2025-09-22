"use client";

import React, { useEffect, useRef } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import ChatInput from "@/components/ui/chat-input";
import { useChat } from "@/contexts/chat-context";
import { useTRPC } from "@/trpc/client";
import Message from "./message";

const ChatInterface = ({ chatId }: { chatId: string }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, setMessages } = useChat();

  const trpc = useTRPC();

  const { data } = useSuspenseQuery(
    trpc.chat.getChatById.queryOptions({ chatId })
  );

  useEffect(() => {
    if (data && data.messages) {
      setMessages((prev) => {
        const existingIds = new Set(prev.map((m) => m.id));
        const merged = [...prev];

        data.messages.forEach((msg) => {
          if (!existingIds.has(msg.id)) {
            merged.push(msg);
          }
        });

        return merged;
      });
    }
  }, [data, setMessages]);

  useEffect(() => {
    setMessages([]); // reset when chatId changes
  }, [chatId, setMessages]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
      <div className="flex-1 overflow-y-auto px-3 scroll-smooth">
        <div className="max-w-3xl w-full mx-auto pt-5 pb-10 flex flex-col gap-y-10">
          {messages.length > 0 ? (
            messages.map((msg) => {
              const isLastAIMessage =
                msg.role !== "user" &&
                msg.id === messages.filter((m) => m.role !== "user").at(-1)?.id;
              return (
                <Message
                  key={msg.id}
                  msg={msg}
                  isLastAIMessage={isLastAIMessage}
                />
              );
            })
          ) : (
            <div></div>
          )}

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
