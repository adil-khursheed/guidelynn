"use client";

import React from "react";
import Markdown from "react-markdown";
import { CheckIcon, CopyIcon } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

const markdownClassName = cn(
  "text-[0.9375rem] leading-7 text-foreground",
  "[&_p]:my-3 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0",
  "[&_h1]:mt-6 [&_h1]:mb-2 [&_h1]:font-serif [&_h1]:text-2xl [&_h1]:leading-tight [&_h1]:tracking-[-0.015em]",
  "[&_h2]:mt-6 [&_h2]:mb-2 [&_h2]:font-serif [&_h2]:text-xl [&_h2]:leading-tight [&_h2]:tracking-[-0.015em]",
  "[&_h3]:mt-5 [&_h3]:mb-1.5 [&_h3]:text-base [&_h3]:font-semibold",
  "[&_strong]:font-semibold [&_strong]:text-foreground",
  "[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:decoration-primary",
  "[&_ul]:my-3 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5",
  "[&_ol]:my-3 [&_ol]:list-decimal [&_ol]:space-y-1.5 [&_ol]:pl-5",
  "[&_li]:pl-1 [&_li::marker]:text-primary/70",
  "[&_blockquote]:my-4 [&_blockquote]:border-l [&_blockquote]:border-border [&_blockquote]:pl-4 [&_blockquote]:text-muted-foreground",
  "[&_hr]:my-6 [&_hr]:border-border",
  "[&_code]:rounded [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.8125rem]",
  "[&_pre]:my-4 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:border [&_pre]:border-border [&_pre]:bg-muted/60 [&_pre]:p-4",
  "[&_pre_code]:bg-transparent [&_pre_code]:p-0",
  "[&_table]:my-4 [&_table]:w-full [&_table]:border-collapse [&_table]:text-sm",
  "[&_th]:border [&_th]:border-border [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold",
  "[&_td]:border [&_td]:border-border [&_td]:px-3 [&_td]:py-2"
);

const Message = ({ msg, index = 0 }: { msg: IMessage; index?: number }) => {
  const reduceMotion = useReducedMotion();
  const [copied, setCopied] = React.useState(false);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(msg.message);
      setCopied(true);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error("Couldn't copy this reply.");
    }
  };

  const isUser = msg.role === "user";

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: reduceMotion ? 0 : Math.min(index * 0.03, 0.18),
        ease,
      }}
      className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      {isUser ? (
        <div className="max-w-[85%] rounded-xl border border-border bg-card px-5 py-3.5 text-[15px] leading-7 break-words whitespace-pre-wrap shadow-xs">
          {msg.message}
        </div>
      ) : (
        <div className="group/message min-w-0 px-6">
          <div className={markdownClassName}>
            <Markdown>{msg.message}</Markdown>
          </div>

          {msg.message.trim().length > 0 && (
            <div className="mt-1.5 flex items-center">
              <button
                type="button"
                onClick={handleCopy}
                aria-label={copied ? "Reply copied" : "Copy reply"}
                className="inline-flex h-7 items-center gap-1.5 rounded-md px-2 text-[11px] text-muted-foreground opacity-100 transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none sm:opacity-0 sm:group-hover/message:opacity-100 sm:group-focus-within/message:opacity-100">
                {copied ? (
                  <CheckIcon className="size-3.5 text-primary" />
                ) : (
                  <CopyIcon className="size-3.5" />
                )}
                <span aria-live="polite" className="sr-only sm:not-sr-only">
                  {copied ? "Copied" : "Copy"}
                </span>
              </button>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default Message;
