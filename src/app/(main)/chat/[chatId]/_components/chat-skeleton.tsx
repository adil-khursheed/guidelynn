import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import React from "react";

const ChatSkeleton = () => {
  return (
    <div className="max-w-3xl w-full mx-auto pt-5 flex flex-col gap-y-10">
      <div className="flex flex-col items-end gap-y-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton
            key={i}
            className={cn(
              "h-3 rounded-full w-full",
              i === 0 ? "max-w-sm" : i === 1 ? "max-w-md" : "max-w-xs"
            )}
          />
        ))}
      </div>
      <div className="flex flex-col items-start gap-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton
            key={i}
            className={cn(
              "h-3 rounded-full w-full",
              i === 0
                ? "max-w-xl"
                : i === 1
                ? "max-w-lg"
                : i === 2
                ? "max-w-md"
                : i === 3
                ? "max-w-lg"
                : "max-w-sm"
            )}
          />
        ))}
      </div>
      <div className="flex flex-col items-end gap-y-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton
            key={i}
            className={cn(
              "h-3 rounded-full w-full",
              i === 0 ? "max-w-sm" : i === 1 ? "max-w-md" : "max-w-xs"
            )}
          />
        ))}
      </div>
      <div className="flex flex-col items-start gap-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton
            key={i}
            className={cn(
              "h-3 rounded-full w-full",
              i === 0
                ? "max-w-xl"
                : i === 1
                ? "max-w-lg"
                : i === 2
                ? "max-w-md"
                : i === 3
                ? "max-w-lg"
                : "max-w-sm"
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatSkeleton;
