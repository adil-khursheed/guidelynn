import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="px-4 flex-1 border-b border-input mb-3 flex items-center justify-center pt-[60px]">
      <div className="flex-1 flex min-h-[calc(100vh-74px)] flex-col items-center justify-center border-l border-r border-input max-w-[1563px] mx-auto text-center space-y-5 p-3 md:p-5">
        <h2 className="text-4xl font-bold font-serif text-primary">
          AI Career Counseling That Actually Understands You
        </h2>
        <p className="text-lg font-medium max-w-6xl tracking-wider">
          Skip the generic advice. Guidelynn provides intelligent, personalized
          career guidance through natural conversations. Discover your
          strengths, explore opportunities, and plan your next career move with
          confidence.
        </p>

        <Button asChild size={"lg"}>
          <Link href={"/signup"}>
            Get Started <ArrowUpRight />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default Hero;
