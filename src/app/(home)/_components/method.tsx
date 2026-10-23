import { History } from "lucide-react";

import { cn } from "@/lib/utils";

import { subtleText } from "./cta";

const profileRows = [
  ["Education", "BSc Psychology"],
  ["Current role", "Retail associate"],
  ["Skills", "Interviews · research"],
  ["Stage", "Final year"],
];

const Method = () => {
  return (
    <section id="method" className="scroll-mt-20 border-t border-border">
      <div className="mx-auto max-w-[1328px] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
          <h2 className="max-w-[12ch] font-serif text-4xl leading-[1.05] tracking-[-0.025em] sm:text-5xl">
            The hour has a shape.
          </h2>
          <div className={cn("max-w-[60ch] space-y-4 text-base leading-7", subtleText)}>
            <p>
              Career conversations drift when they start from a blank page.
              Guidelynn gives the hour a spine: context first, the real question
              second, a decision you can act on third.
            </p>
            <p>
              Every part uses what you have already shared — and leaves a record
              you can return to.
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-border sm:mt-16">
          <div className="grid gap-6 border-b border-border py-10 md:grid-cols-[72px_minmax(0,1fr)] md:gap-x-10 lg:grid-cols-[96px_minmax(0,1fr)_360px] lg:gap-16">
            <p className={cn("text-sm tabular-nums lg:pt-1", subtleText)}>4:00</p>
            <div>
              <h3 className="font-serif text-2xl leading-tight tracking-[-0.015em] sm:text-[28px]">
                Start from where you are.
              </h3>
              <p className={cn("mt-3 max-w-[52ch] text-sm leading-6", subtleText)}>
                Your profile is the opening move: education, current role,
                experience, industry, skills, interests, location, and career
                stage. It is not a quiz you pass. It is context you can revise
                whenever your situation changes.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4 shadow-sm md:col-start-2 lg:col-start-auto">
              <div className="flex items-center justify-between border-b border-border pb-3 text-[10px] uppercase tracking-[0.09em]">
                <span className="font-semibold text-foreground">Profile</span>
                <span className={subtleText}>Example</span>
              </div>
              <dl className="mt-3 space-y-2.5 text-sm">
                {profileRows.map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-baseline justify-between gap-4">
                    <dt className={subtleText}>{label}</dt>
                    <dd className="text-right font-medium text-foreground">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="grid gap-6 border-b border-border py-10 md:grid-cols-[72px_minmax(0,1fr)] md:gap-x-10 lg:grid-cols-[96px_minmax(0,1fr)_360px] lg:gap-16">
            <p className={cn("text-sm tabular-nums lg:pt-1", subtleText)}>4:15</p>
            <div>
              <h3 className="font-serif text-2xl leading-tight tracking-[-0.015em] sm:text-[28px]">
                Work the real question.
              </h3>
              <p className={cn("mt-3 max-w-[52ch] text-sm leading-6", subtleText)}>
                Bring the decision that is actually on your desk — a role change,
                further study, a first job, a skill gap. Guidelynn answers from
                your context and the conversations you have already had, not from
                a generic script.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4 shadow-sm md:col-start-2 lg:col-start-auto">
              <p className={cn("text-[10px] uppercase tracking-[0.09em]", subtleText)}>
                Sample exchange
              </p>
              <div className="mt-3 rounded-lg border border-border bg-muted/40 p-3 text-sm leading-6">
                “I like research, but I don&apos;t know if I need a design degree
                to move into it.”
              </div>
              <p className={cn("mt-3 text-sm leading-6", subtleText)}>
                <strong className="font-semibold text-foreground">
                  Portfolio first, degree later.
                </strong>{" "}
                You already have interview practice and a psychology background.
                Three short studies would show more than another degree.
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

          <div className="grid gap-6 border-b border-border py-10 md:grid-cols-[72px_minmax(0,1fr)] md:gap-x-10 lg:grid-cols-[96px_minmax(0,1fr)_360px] lg:gap-16">
            <p className={cn("text-sm tabular-nums lg:pt-1", subtleText)}>4:45</p>
            <div>
              <h3 className="font-serif text-2xl leading-tight tracking-[-0.015em] sm:text-[28px]">
                Leave with a next move.
              </h3>
              <p className={cn("mt-3 max-w-[52ch] text-sm leading-6", subtleText)}>
                The session ends with one decision, the reasoning behind it, and
                a first step for the week. You should be able to explain it to a
                friend without repeating the whole conversation.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4 shadow-sm md:col-start-2 lg:col-start-auto">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.09em]">
                <span className="font-semibold text-foreground">Next move</span>
                <span className={subtleText}>One step</span>
              </div>
              <p className="mt-3 font-serif text-xl leading-6">
                Portfolio first, degree later.
              </p>
              <dl className="mt-3 space-y-2 text-sm">
                <div>
                  <dt className={subtleText}>Why</dt>
                  <dd className="mt-0.5 text-foreground">
                    Your background already covers the research basics.
                  </dd>
                </div>
                <div>
                  <dt className={subtleText}>First step</dt>
                  <dd className="mt-0.5 text-foreground">
                    Run one short study and write it up this week.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Method;
