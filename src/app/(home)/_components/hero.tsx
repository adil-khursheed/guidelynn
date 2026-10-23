import Link from "next/link";
import { ArrowUpRight, History } from "lucide-react";

import { cn } from "@/lib/utils";

import { PrimaryCta, SignalLink, subtleText } from "./cta";

const profile = [
  "BSc Psychology · final year",
  "Part-time retail",
  "Curious about UX research",
];

const timeCell = cn(
  "border-r border-dashed border-border px-3 py-5 text-xs tabular-nums md:py-7 md:pl-7 md:pr-0",
  subtleText
);

const labelCell =
  "px-4 py-5 md:border-r md:border-dashed md:border-border md:px-5 md:py-7";

const contentCell =
  "col-span-2 border-t border-dashed border-border px-4 py-5 md:col-span-1 md:border-t-0 md:px-6 md:py-7";

const Hero = () => {
  return (
    <section className="px-4 pb-14 pt-5 sm:px-6 sm:pb-20 sm:pt-8 lg:px-8">
      <div className="mx-auto max-w-[1328px] overflow-hidden rounded-xl border border-border bg-card shadow-sm motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-500">
        <div className="flex h-11 items-center justify-between gap-4 border-b border-border px-4 text-[10px] uppercase tracking-[0.09em] sm:px-7 sm:text-[11px]">
          <div className="flex items-center gap-3">
            <span className="size-1.5 rounded-full bg-primary" />
            <span className="font-semibold text-foreground">Session 01</span>
            <span className={subtleText}>First visit</span>
          </div>
          <p className={cn("hidden truncate sm:block", subtleText)}>
            Career counseling · 45 minutes
          </p>
        </div>

        <div className="grid gap-8 border-b border-border p-5 sm:p-7 lg:grid-cols-[minmax(0,1fr)_348px] lg:items-end lg:gap-10 lg:p-8">
          <h1 className="max-w-[900px] font-serif text-[2.4rem] leading-[1.0] tracking-[-0.03em] text-balance sm:text-5xl lg:text-5xl xl:text-[60px]">
            A clearer next move,{" "}
            <span className="text-primary">one conversation</span> at a time.
          </h1>

          <div>
            <p
              className={cn(
                "max-w-[34ch] text-sm leading-6 sm:text-[15px]",
                subtleText
              )}>
              Guidelynn keeps your profile and your conversations, so each
              session starts from where you actually are.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
              <PrimaryCta href="/signup" size="lg">
                Start your first session
              </PrimaryCta>
              <SignalLink href="#method">How it works</SignalLink>
            </div>
          </div>
        </div>

        <div className="divide-y divide-border">
          <section className="grid grid-cols-[56px_1fr] md:grid-cols-[92px_214px_minmax(0,1fr)]">
            <div className={timeCell}>4:00</div>
            <div className={labelCell}>
              <h2 className="text-sm font-semibold">Where you are now</h2>
              <p className={cn("mt-1 text-xs leading-5", subtleText)}>
                From your profile. Yours to change.
              </p>
            </div>
            <div className={contentCell}>
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={cn(
                    "mr-1 text-[10px] uppercase tracking-[0.09em]",
                    subtleText
                  )}>
                  Example profile
                </span>
                {profile.map((item) => (
                  <span
                    key={item}
                    className={cn(
                      "inline-flex h-8 items-center gap-2 rounded-md border border-border bg-background px-2.5 text-xs",
                      subtleText
                    )}>
                    <span className="size-1 rounded-full bg-primary" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <section className="grid grid-cols-[56px_1fr] md:grid-cols-[92px_214px_minmax(0,1fr)]">
            <div className={timeCell}>4:15</div>
            <div className={labelCell}>
              <h2 className="text-sm font-semibold">What you&apos;re weighing</h2>
              <p className={cn("mt-1 text-xs leading-5", subtleText)}>
                You bring the question. The context is already here.
              </p>
            </div>
            <div className={contentCell}>
              <p
                className={cn(
                  "text-[10px] uppercase tracking-[0.09em]",
                  subtleText
                )}>
                Sample exchange · not a real user
              </p>
              <div className="mt-3 grid gap-5 lg:grid-cols-[280px_1fr] lg:gap-7">
                <div className="rounded-xl border border-border bg-muted/40 p-4">
                  <p
                    className={cn(
                      "text-[10px] uppercase tracking-[0.09em]",
                      subtleText
                    )}>
                    You
                  </p>
                  <p className="mt-2 text-sm leading-6">
                    “I like research, but I don&apos;t know if I need a design
                    degree to move into it.”
                  </p>
                </div>
                <div>
                  <p
                    className={cn(
                      "max-w-[68ch] text-sm leading-6",
                      "text-secondary-foreground dark:text-muted-foreground"
                    )}>
                    <strong className="font-semibold text-foreground">
                      You already have two of the three things UX research teams
                      hire for:
                    </strong>{" "}
                    interview practice and a psychology background. The gap is a
                    portfolio of evidence — three short studies would show more
                    than another degree.
                  </p>
                  <p
                    className={cn(
                      "mt-2 inline-flex items-center gap-1.5 text-[11.5px]",
                      subtleText
                    )}>
                    <History className="size-3.5 text-primary" />
                    Memory used: profile + last session
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-[56px_1fr] md:grid-cols-[92px_214px_minmax(0,1fr)]">
            <div className={timeCell}>4:45</div>
            <div className={labelCell}>
              <h2 className="text-sm font-semibold">What you leave with</h2>
              <p className={cn("mt-1 text-xs leading-5", subtleText)}>
                Not a list of jobs. A next move you can defend.
              </p>
            </div>
            <div className={contentCell}>
              <div className="flex w-full flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                <p className="max-w-[24ch] font-serif text-xl leading-7 tracking-[-0.015em] sm:text-2xl">
                  One next move, the reason for it, and the{" "}
                  <span className="text-primary">first step this week.</span>
                </p>
                <Link
                  href="/signup"
                  aria-label="Start a session with your own question"
                  className="group flex w-full items-center gap-3 rounded-xl border border-border bg-background p-2 pl-4 transition-colors hover:border-primary/60 hover:bg-muted/40 xl:w-[320px]">
                  <span className={cn("flex-1 text-sm", subtleText)}>
                    Bring your own question
                  </span>
                  <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
                    <ArrowUpRight className="size-4" />
                  </span>
                </Link>
              </div>
            </div>
          </section>
        </div>

        <div className="flex flex-col gap-1 border-t border-border bg-muted/30 px-4 py-3 text-[11px] sm:flex-row sm:items-center sm:justify-between sm:px-7">
          <p className={subtleText}>
            Sample session content. Your own profile and conversations stay in
            your account.
          </p>
          <p className={cn("hidden sm:block", subtleText)}>
            One next move · one first step
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
