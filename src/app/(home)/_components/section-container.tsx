import { cn } from "@/lib/utils";
import React from "react";

const SectionContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <section
      id="content"
      tabIndex={-1}
      className={cn(
        "flex min-h-[calc(100dvh-4rem)] w-full items-center justify-center px-4 py-10 focus:outline-none sm:px-6 sm:py-14",
        className
      )}>
      {children}
    </section>
  );
};

export default SectionContainer;
