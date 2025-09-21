import React from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import ChatInput from "@/components/ui/chat-input";

const Page = async () => {
  const session = await getSession();
  if (!session) redirect("/login");

  const user = session.user;

  return (
    <section className="h-full flex items-center justify-center">
      <div className="max-w-3xl mx-auto w-full">
        <div className="w-full text-center mb-10">
          <h2 className="text-4xl font-semibold font-serif">
            Hello {user.name.split(" ")[0]}, How are you?
          </h2>
        </div>

        <ChatInput />
      </div>
    </section>
  );
};

export default Page;
