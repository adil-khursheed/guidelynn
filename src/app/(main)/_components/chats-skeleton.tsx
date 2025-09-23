import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ChatsSkeleton = () => {
  return (
    <div className="flex flex-col gap-1">
      {Array.from({ length: 10 }).map((_, i) => (
        <Skeleton key={i} className="w-full h-4" />
      ))}
    </div>
  );
};

export default ChatsSkeleton;
