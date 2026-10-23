import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

import { subtleText } from "./cta";

const questions = [
  {
    question: "Who is Guidelynn for?",
    answer:
      "Students and early-career people choosing a first career or first job, often without a professional network to ask.",
  },
  {
    question: "Do I need a complete profile before I start?",
    answer:
      "No. Start with what you know and update it as you go. The more context you add, the more grounded the guidance can be.",
  },
  {
    question: "Does it remember previous conversations?",
    answer:
      "Yes. Your profile and prior conversations are retained in your account and used in later guidance, so you do not have to restate everything.",
  },
  {
    question: "Is this therapy?",
    answer:
      "No. Guidelynn is career guidance, not therapy or medical advice. It also cannot promise a job or an outcome.",
  },
  {
    question: "What can I ask about?",
    answer:
      "A role change, further study, a first job, a skill gap, a decision you keep circling. If it is about your next move, it is fair game.",
  },
  {
    question: "Can I change my profile or manage chats?",
    answer:
      "Yes. Update your profile whenever your situation changes, and manage your saved conversations from your account.",
  },
];

const Questions = () => {
  return (
    <section id="questions" className="scroll-mt-20 border-t border-border">
      <div className="mx-auto max-w-[1100px] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-20">
          <div>
            <h2 className="max-w-[10ch] font-serif text-4xl leading-[1.05] tracking-[-0.025em] sm:text-5xl">
              Questions worth asking.
            </h2>
            <p className={cn("mt-5 max-w-[38ch] text-base leading-7", subtleText)}>
              If yours is not here, bring it to a session. That is what the hour
              is for.
            </p>
          </div>

          <div className="border-t border-border">
            {questions.map((item) => (
              <details
                key={item.question}
                className="group border-b border-border py-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 rounded-sm text-sm font-medium marker:hidden focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <ChevronDown className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <p
                  className={cn(
                    "mt-3 max-w-[62ch] pr-8 text-sm leading-6",
                    subtleText
                  )}>
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Questions;
