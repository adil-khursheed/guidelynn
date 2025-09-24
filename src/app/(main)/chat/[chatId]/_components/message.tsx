"use client";

import React from "react";
import Markdown from "react-markdown";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const Message = ({ msg }: { msg: IMessage }) => {
  return (
    <div
      key={msg.id}
      className={cn(
        "flex",
        msg.role === "user" ? "justify-end" : "justify-start"
      )}>
      {msg.role === "user" ? (
        <Card className="py-4">
          <CardContent>{msg.message}</CardContent>
        </Card>
      ) : (
        <div className="px-6 whitespace-pre-wrap">
          <Markdown>{msg.message}</Markdown>
        </div>
      )}
    </div>
  );
};

export default Message;
