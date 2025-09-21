import React from "react";
import Link from "next/link";

import ThemeToggle from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="fixed inset-x-0 p-3 border-b border-input">
      <div className="flex items-center justify-between sm:px-3 max-w-[1563px] mx-auto">
        <h1 className="text-lg sm:text-2xl font-bold font-serif text-primary">
          Guidelynn
        </h1>

        <nav className="flex items-center gap-1 sm:gap-3">
          <ThemeToggle />

          <Button asChild variant={"link"}>
            <Link href={"/login"}>Sign In</Link>
          </Button>
          <Button asChild>
            <Link href={"/signup"}>Get Started</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
