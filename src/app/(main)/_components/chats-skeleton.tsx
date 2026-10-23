import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const widths = ["w-full", "w-4/5", "w-11/12", "w-3/5"];

const ChatsSkeleton = () => {
  return (
    <div className="flex flex-col gap-1" aria-hidden="true">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex h-8 items-center gap-2 px-2">
          <span className="size-2 shrink-0" />
          <Skeleton className={`h-3 rounded-full ${widths[i % widths.length]}`} />
        </div>
      ))}
    </div>
  );
};

export default ChatsSkeleton;
