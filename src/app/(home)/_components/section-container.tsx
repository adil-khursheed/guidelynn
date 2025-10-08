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
      className={cn(
        "min-h-dvh w-screen flex items-center justify-center pt-[60px] px-3",
        className
      )}>
      {children}
    </section>
  );
};

export default SectionContainer;
