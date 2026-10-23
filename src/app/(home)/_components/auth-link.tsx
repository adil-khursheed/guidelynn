import Link from "next/link";
import React from "react";

import { cn } from "@/lib/utils";

export const authLinkClass =
  "rounded-sm font-medium text-chart-1 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:text-primary";

export function AuthLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={cn(authLinkClass, className)}>
      {children}
    </Link>
  );
}
