"use client";

import React from "react";

import ChatInput from "@/components/ui/chat-input";

import { Reveal } from "../../_components/reveal";
import { StudyScene } from "../../_components/study-scene";

const starters = [
  "I don't know where to start.",
  "I'm choosing between two paths.",
  "How do I move into a new field?",
];

const NewChatHero = ({ firstName }: { firstName: string }) => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center px-3 pb-16 pt-16 md:pt-10">
      <div className="w-full max-w-3xl">
        <Reveal className="mx-auto w-36 sm:w-44">
          <StudyScene />
        </Reveal>

        <Reveal delay={0.06}>
          <h1 className="mt-4 text-center font-serif text-[clamp(2.1rem,5vw,3rem)] leading-[1.05] tracking-[-0.03em] text-balance">
            Hello, {firstName}.
          </h1>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mx-auto mt-3 max-w-[46ch] text-center text-sm leading-6 text-muted-foreground sm:text-[15px]">
            Bring the decision that&apos;s on your desk. Guidelynn starts from
            your profile and what you&apos;ve already shared.
          </p>
        </Reveal>

        <Reveal delay={0.18} className="mt-7 sm:mt-8">
          <ChatInput
            placeholder="What are you weighing?"
            suggestions={starters}
          />
        </Reveal>

        <Reveal delay={0.24}>
          <p className="mt-3 hidden text-center text-[11px] text-muted-foreground sm:block">
            <kbd className="rounded border border-border bg-muted/50 px-1 py-0.5 font-sans text-[10px]">
              Enter
            </kbd>{" "}
            to send ·{" "}
            <kbd className="rounded border border-border bg-muted/50 px-1 py-0.5 font-sans text-[10px]">
              Shift
            </kbd>{" "}
            +{" "}
            <kbd className="rounded border border-border bg-muted/50 px-1 py-0.5 font-sans text-[10px]">
              Enter
            </kbd>{" "}
            for a new line
          </p>
        </Reveal>
      </div>
    </div>
  );
};

export default NewChatHero;
