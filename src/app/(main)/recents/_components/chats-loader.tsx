import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ChatsLoader = () => {
  return (
    <div
      role="status"
      aria-live="polite"
      className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-y-3 overflow-y-auto px-3 pb-10">
      <span className="sr-only">Loading your chat history</span>
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          aria-hidden="true"
          className="flex flex-col space-y-2 rounded-xl border border-border bg-card px-4 py-4 md:px-6 md:py-5">
          <Skeleton className="h-3.5 w-full max-w-sm rounded-full" />
          <Skeleton className="h-3 w-full max-w-[10rem] rounded-full" />
        </div>
      ))}
    </div>
  );
};

export default ChatsLoader;
