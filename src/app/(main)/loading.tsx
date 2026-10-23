import React from "react";

const loading = () => {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-svh w-full flex-col items-center justify-center gap-4">
      <span className="font-serif text-lg text-primary">Guidelynn</span>
      <span className="flex items-center gap-1.5" aria-hidden="true">
        {Array.from({ length: 3 }).map((_, i) => (
          <span
            key={i}
            className="size-1.5 animate-pulse rounded-full bg-primary/50 motion-reduce:animate-none"
            style={{ animationDelay: `${i * 180}ms` }}
          />
        ))}
      </span>
      <span className="sr-only">Loading your session</span>
    </div>
  );
};

export default loading;
