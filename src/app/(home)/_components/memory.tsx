import { ArrowDown, History } from "lucide-react";

const rememberedFields = [
  "Education",
  "Current role",
  "Experience",
  "Industry",
  "Skills",
  "Interests",
  "Location",
  "Career stage",
];

const Memory = () => {
  return (
    <section
      id="memory"
      className="scroll-mt-20 border-y border-border bg-[oklch(0.1908_0.002_106.5859)] text-[oklch(0.9818_0.0054_95.0986)]">
      <div className="mx-auto grid max-w-[1328px] gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-20 lg:px-8">
        <div>
          <h2 className="max-w-[16ch] font-serif text-4xl leading-[1.05] tracking-[-0.025em] sm:text-5xl">
            Most guidance starts at hello. Yours starts where you left off.
          </h2>
          <p className="mt-6 max-w-[54ch] text-base leading-7 text-[oklch(0.9818_0.0054_95.0986)]/80">
            Guidelynn remembers the profile you built and the conversations you
            have already had. That memory is not a gimmick. It is what lets the
            next session skip the intake and get to the decision.
          </p>
          <div className="mt-8">
            <p className="text-[10px] uppercase tracking-[0.09em] text-[oklch(0.9818_0.0054_95.0986)]/70">
              What it remembers
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {rememberedFields.map((field) => (
                <span
                  key={field}
                  className="rounded-md border border-[oklch(0.9818_0.0054_95.0986)]/20 px-2.5 py-1 text-xs text-[oklch(0.9818_0.0054_95.0986)]/90">
                  {field}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="rounded-xl border border-[oklch(0.9818_0.0054_95.0986)]/20 bg-[oklch(0.9818_0.0054_95.0986)]/5 p-5">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.09em] text-[oklch(0.9818_0.0054_95.0986)]/70">
              <span className="font-semibold text-[oklch(0.9818_0.0054_95.0986)]">First session</span>
              <span>Sample · March</span>
            </div>
            <div className="mt-4 max-w-[68ch] space-y-3 text-sm leading-6">
              <p className="text-[oklch(0.9818_0.0054_95.0986)]/90">
                <span className="text-[oklch(0.9818_0.0054_95.0986)]/60">You</span> “I want to move
                into UX research, but I don&apos;t have a design degree.”
              </p>
              <p className="text-[oklch(0.9818_0.0054_95.0986)]/80">
                <span className="font-semibold text-[oklch(0.9818_0.0054_95.0986)]">Guidelynn</span>{" "}
                Your psychology background and interview practice are already
                relevant. Start with three short studies before you consider
                another degree.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1.5 border-t border-[oklch(0.9818_0.0054_95.0986)]/15 pt-3 text-[11px] text-[oklch(0.9818_0.0054_95.0986)]/70">
              <History className="size-3.5" />
              Profile: BSc Psychology · Retail · UX interest
            </div>
          </div>

          <div className="flex items-center gap-2 pl-1 text-[11px] text-[oklch(0.9818_0.0054_95.0986)]/70">
            <ArrowDown className="size-3.5" />
            Context carried forward, not restated
          </div>

          <div className="rounded-xl border border-[oklch(0.9818_0.0054_95.0986)]/20 bg-[oklch(0.9818_0.0054_95.0986)]/5 p-5">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.09em] text-[oklch(0.9818_0.0054_95.0986)]/70">
              <span className="font-semibold text-[oklch(0.9818_0.0054_95.0986)]">
                Two weeks later
              </span>
              <span>Sample · March</span>
            </div>
            <div className="mt-4 max-w-[68ch] space-y-3 text-sm leading-6">
              <p className="text-[oklch(0.9818_0.0054_95.0986)]/90">
                <span className="text-[oklch(0.9818_0.0054_95.0986)]/60">You</span> “I finished two
                studies. Should I apply now or keep building?”
              </p>
              <p className="text-[oklch(0.9818_0.0054_95.0986)]/80">
                <span className="font-semibold text-[oklch(0.9818_0.0054_95.0986)]">Guidelynn</span>{" "}
                Apply to junior research roles and one internship. Your portfolio
                now shows the evidence the first session said was missing.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1.5 border-t border-[oklch(0.9818_0.0054_95.0986)]/15 pt-3 text-[11px] text-[oklch(0.9818_0.0054_95.0986)]/70">
              <History className="size-3.5" />
              Memory used: profile + previous session
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Memory;
