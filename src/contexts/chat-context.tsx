"use client";

import React, { createContext, useContext, useState } from "react";

interface IChatContext {
  messages: IMessage[];
  setMessages: React.Dispatch<React.SetStateAction<IMessage[]>>;
  aiResponse: string;
  setAiResponse: React.Dispatch<React.SetStateAction<string>>;
  isResponding: boolean;
  setIsResponding: React.Dispatch<React.SetStateAction<boolean>>;
  isStreaming: boolean;
  setIsStreaming: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatContext = createContext<IChatContext>({
  messages: [],
  setMessages: () => {},
  aiResponse: "",
  setAiResponse: () => {},
  isResponding: false,
  setIsResponding: () => {},
  isStreaming: false,
  setIsStreaming: () => {},
});

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [aiResponse, setAiResponse] = useState("");
  const [isResponding, setIsResponding] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);

  return (
    <ChatContext.Provider
      value={{
        messages,
        setMessages,
        aiResponse,
        setAiResponse,
        isResponding,
        setIsResponding,
        isStreaming,
        setIsStreaming,
      }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): IChatContext => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be within a ChatProvider");
  }

  return context;
};
