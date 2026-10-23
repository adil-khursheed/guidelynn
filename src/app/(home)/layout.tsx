import React from "react";

import Header from "@/app/(home)/_components/header";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-dvh">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-60 focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground focus:ring-2 focus:ring-ring"
      >
        Skip to content
      </a>
      <Header />
      {children}
    </div>
  );
};

export default HomeLayout;
