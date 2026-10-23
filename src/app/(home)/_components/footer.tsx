import Link from "next/link";

import { cn } from "@/lib/utils";

import { subtleText } from "./cta";

const footerLinks = [
  { href: "#method", label: "The method" },
  { href: "#memory", label: "Memory" },
  { href: "#questions", label: "Questions" },
  { href: "/login", label: "Sign in" },
  { href: "/signup", label: "Start a session" },
];

const Footer = () => {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-[1328px] px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Link
              href="/"
              className="font-serif text-xl tracking-[-0.01em] text-primary">
              Guidelynn
            </Link>
            <p className={cn("mt-2 max-w-[36ch] text-sm leading-6", subtleText)}>
              Career counseling that remembers where you started.
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm sm:flex sm:flex-wrap sm:gap-x-8">
            {footerLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "transition-colors hover:text-foreground",
                  subtleText
                )}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-5 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p className={subtleText}>
            © {new Date().getFullYear()} Guidelynn. Built for students and
            early-career moves.
          </p>
          <p className={subtleText}>Career counseling that remembers.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
