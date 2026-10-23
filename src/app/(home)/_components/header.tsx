import Link from "next/link";

import ThemeToggle from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";

import { PrimaryCta } from "./cta";

const navItems = [
  { href: "#method", label: "The method" },
  { href: "#memory", label: "Memory" },
  { href: "#questions", label: "Questions" },
];

const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="mx-auto flex h-16 max-w-[1328px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="font-serif text-xl tracking-[-0.01em] text-primary sm:text-2xl">
          Guidelynn
        </Link>

        <nav
          className="hidden items-center gap-8 text-sm text-secondary-foreground dark:text-muted-foreground md:flex"
          aria-label="Primary">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <ThemeToggle />
          <Button asChild variant="ghost">
            <Link href="/login">Sign in</Link>
          </Button>
          <PrimaryCta href="/signup" size="sm">
            <span className="sm:hidden">Start</span>
            <span className="hidden sm:inline">Start a session</span>
          </PrimaryCta>
        </div>
      </div>
    </header>
  );
};

export default Header;
