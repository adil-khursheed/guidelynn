import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import React from "react";

const widths = [
  "max-w-xl",
  "max-w-lg",
  "max-w-md",
  "max-w-lg",
  "max-w-sm",
];

const ChatSkeleton = () => {
  return (
    <div role="status" aria-live="polite" className="flex h-full flex-col">
      <span className="sr-only">Loading this session</span>

      <div
        aria-hidden="true"
        className="flex items-center bg-background py-3 pr-3 pl-14 shadow-xs md:pl-3">
        <Skeleton className="h-4 w-48 rounded-full" />
      </div>

      <div
        aria-hidden="true"
        className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-y-10 pt-12">
        {[0, 1, 2].map((turn) => (
          <div key={turn} className="flex flex-col gap-y-10">
            <div className="flex flex-col items-end gap-y-2 px-3">
              {Array.from({ length: 2 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className={cn(
                    "h-3 w-full rounded-full",
                    i === 0 ? "max-w-sm" : "max-w-xs"
                  )}
                />
              ))}
            </div>
            <div className="flex flex-col items-start gap-y-2 px-9">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className={cn(
                    "h-3 w-full rounded-full",
                    widths[(turn + i) % widths.length]
                  )}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div
        aria-hidden="true"
        className="mx-auto mb-5 w-full max-w-3xl px-3">
        <Skeleton className="h-24 w-full rounded-2xl" />
      </div>
    </div>
  );
};

export default ChatSkeleton;
