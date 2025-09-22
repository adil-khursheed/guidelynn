"use client";

import React, { createContext, useContext, useState } from "react";

interface IChatContext {
  messages: IMessage[];
  setMessages: React.Dispatch<React.SetStateAction<IMessage[]>>;
  aiResponse: string;
  setAiResponse: React.Dispatch<React.SetStateAction<string>>;
}

const ChatContext = createContext<IChatContext>({
  messages: [],
  setMessages: () => {},
  aiResponse: "",
  setAiResponse: () => {},
});

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [aiResponse, setAiResponse] = useState("");

  return (
    <ChatContext.Provider
      value={{ messages, setMessages, aiResponse, setAiResponse }}>
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
