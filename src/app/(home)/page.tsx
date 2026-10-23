import type { Metadata } from "next";

import Closing from "./_components/closing";
import Features from "./_components/features";
import Footer from "./_components/footer";
import Hero from "./_components/hero";
import Honesty from "./_components/honesty";
import Memory from "./_components/memory";
import Method from "./_components/method";
import Questions from "./_components/questions";

export const metadata: Metadata = {
  title: "Guidelynn — Career counseling that remembers",
  description:
    "Guidelynn is an AI career counselor that starts from your profile and your previous conversations, then helps you leave with one clearer next move.",
};

const Page = () => {
  return (
    <>
      <main id="content">
        <Hero />
        <Method />
        <Memory />
        <Features />
        <Honesty />
        <Questions />
        <Closing />
      </main>
      <Footer />
    </>
  );
};

export default Page;
