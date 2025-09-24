import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ChatsLoader = () => {
  return (
    <div className="max-w-3xl w-full mx-auto flex-1 overflow-y-auto px-3 flex flex-col gap-y-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton
          key={i}
          className="rounded-lg px-3 md:px-6 py-4 md:py-6 border border-input bg-transparent flex flex-col space-y-2">
          <Skeleton className="max-w-xl w-full h-3 rounded-full" />
          <Skeleton className="max-w-md w-full h-3 rounded-full" />
        </Skeleton>
      ))}
    </div>
  );
};

export default ChatsLoader;
