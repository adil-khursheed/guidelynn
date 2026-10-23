import { ArrowDown, History, MessagesSquare, UserRound } from "lucide-react";

import { cn } from "@/lib/utils";

import { SignalLink, signalText, subtleText } from "./cta";

const features = [
  {
    icon: UserRound,
    title: "A profile that grounds the advice",
    body: "Education, current role, experience, industry, skills, interests, location, and career stage — the context the guidance can actually use.",
    practice:
      "Ask about a move and the answer can reference what you have already done.",
  },
  {
    icon: MessagesSquare,
    title: "Conversations that stay in the room",
    body: "Your chats are saved to your account and listed for return visits, so a thread can continue instead of restarting.",
    practice:
      "Come back to the same question after you have tried the first step.",
  },
  {
    icon: History,
    title: "Memory that compounds",
    body: "Persistent career memory keeps the person and the prior conversations in view for later guidance.",
    practice: "The second session begins further along than the first.",
  },
];

const Features = () => {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-[1328px] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <div>
            <h2 className="max-w-[13ch] font-serif text-4xl leading-[1.05] tracking-[-0.025em] sm:text-5xl">
              Built around one continuous relationship.
            </h2>
            <p className={cn("mt-5 max-w-[44ch] text-base leading-7", subtleText)}>
              Most career tools are built for a single question. Guidelynn is
              built for the sequence of decisions that follow.
            </p>
            <SignalLink href="#memory" className="mt-6">
              See what it remembers
              <ArrowDown className="size-3.5" />
            </SignalLink>
          </div>

          <div className="border-t border-border">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="grid gap-3 border-b border-border py-7 sm:grid-cols-[220px_1fr] sm:gap-8">
                  <div className="flex items-start gap-2.5">
                    <Icon className="mt-0.5 size-4 shrink-0 text-primary" />
                    <h3 className="text-sm font-semibold leading-5">
                      {feature.title}
                    </h3>
                  </div>
                  <div>
                    <p className={cn("text-sm leading-6", subtleText)}>
                      {feature.body}
                    </p>
                    <p
                      className={cn(
                        "mt-2 text-xs leading-5",
                        subtleText
                      )}>
                      <span className={signalText}>In practice</span> —{" "}
                      {feature.practice}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
