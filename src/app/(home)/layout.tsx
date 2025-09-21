import React from "react";

import Header from "@/app/(home)/_components/header";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen w-screen">
      <Header />
      {children}
    </main>
  );
};

export default HomeLayout;
