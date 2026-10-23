import { cn } from "@/lib/utils";

import { subtleText } from "./cta";
import StudyIllustration from "./study-illustration";

const boundaries = [
  {
    title: "No personality quiz.",
    body: "You are not sorted into a type. You talk through the situation you are actually in.",
  },
  {
    title: "No job-board dump.",
    body: "The goal is a next move you can explain, not a list of openings.",
  },
  {
    title: "No promises about outcomes.",
    body: "Guidance is not a guarantee. You stay the decision-maker.",
  },
];

const Honesty = () => {
  return (
    <section className="border-t border-border bg-muted/35">
      <div className="mx-auto grid max-w-332 gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20 lg:px-8">
        <div>
          <h2 className="max-w-[12ch] font-serif text-4xl leading-[1.05] tracking-[-0.025em] sm:text-5xl">
            A counselor, not an oracle.
          </h2>
          <p
            className={cn("mt-5 max-w-[46ch] text-base leading-7", subtleText)}
          >
            Guidelynn is built to help you decide, not to decide for you. That
            means being clear about what it can and cannot do.
          </p>
          <StudyIllustration className="mt-9 max-w-70" />
        </div>

        <div className="border-t border-border">
          {boundaries.map((boundary) => (
            <div key={boundary.title} className="border-b border-border py-5">
              <h3 className="text-sm font-semibold">{boundary.title}</h3>
              <p className={cn("mt-1 text-sm leading-6", subtleText)}>
                {boundary.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Honesty;
