import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { PrimaryCta, subtleText } from "./cta";

const Closing = () => {
  return (
    <section className="px-4 pb-16 pt-4 sm:px-6 sm:pb-24 sm:pt-6 lg:px-8">
      <div className="mx-auto max-w-[1328px] overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <div className="flex h-11 items-center justify-between gap-4 border-b border-border px-4 text-[10px] uppercase tracking-[0.09em] sm:px-7 sm:text-[11px]">
          <div className="flex items-center gap-3">
            <span className="size-1.5 rounded-full bg-primary" />
            <span className="font-semibold text-foreground">Session 01</span>
            <span className={subtleText}>Your first visit</span>
          </div>
          <p className={cn("hidden sm:block", subtleText)}>45 minutes</p>
        </div>

        <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-12">
          <div>
            <h2 className="max-w-[18ch] font-serif text-4xl leading-[1.03] tracking-[-0.03em] text-balance sm:text-5xl lg:text-[56px]">
              What&apos;s the next move you keep circling?
            </h2>
            <p className={cn("mt-5 max-w-[52ch] text-sm leading-6 sm:text-base", subtleText)}>
              Bring the question. Guidelynn brings the context: your profile,
              your conversations, and the step you are actually ready to take.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <PrimaryCta href="/signup" size="lg">
              Start your first session
            </PrimaryCta>
            <Button asChild variant="outline" size="lg">
              <Link href="/login">Sign in</Link>
            </Button>
          </div>
        </div>

        <div className="border-t border-border bg-muted/30 px-6 py-3 text-[11px] sm:px-8">
          <p className={subtleText}>
            No quiz. No blank slate. Just the question you brought.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Closing;
