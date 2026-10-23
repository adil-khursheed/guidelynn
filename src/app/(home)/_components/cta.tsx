import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const signalText =
  "text-[oklch(0.5583_0.1276_42.9956)] dark:text-[oklch(0.6724_0.1308_38.7559)]";

export const subtleText =
  "text-secondary-foreground dark:text-muted-foreground";

const primaryFill =
  "bg-[oklch(0.5583_0.1276_42.9956)] text-white hover:bg-[oklch(0.505_0.118_43)] dark:bg-[oklch(0.6724_0.1308_38.7559)] dark:text-[oklch(0.1908_0.002_106.5859)] dark:hover:bg-[oklch(0.715_0.128_38.5)]";

export function PrimaryCta({
  href,
  children,
  className,
  size = "default",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
}) {
  return (
    <Button asChild size={size} className={cn(primaryFill, className)}>
      <Link href={href}>
        {children}
        <ArrowUpRight />
      </Link>
    </Button>
  );
}

export function SignalLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-1.5 text-sm font-medium underline-offset-4 hover:underline",
        signalText,
        className
      )}>
      {children}
    </Link>
  );
}
