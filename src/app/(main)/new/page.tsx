import React from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";

import NewChatHero from "./_components/new-chat-hero";

export const dynamic = "force-dynamic";

const Page = async () => {
  const session = await getSession();
  if (!session) redirect("/login");

  const user = session.user;
  const firstName = user.name?.trim().split(" ")[0] || "there";

  return (
    <section className="h-full">
      <NewChatHero firstName={firstName} />
    </section>
  );
};

export default Page;
