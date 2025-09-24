import React, { Suspense } from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import ChatInterface from "./_components/chat-interface";
import ChatSkeleton from "./_components/chat-skeleton";

const Page = async ({ params }: { params: Promise<{ chatId: string }> }) => {
  const session = await getSession();
  if (!session) redirect("/login");

  const chatId = (await params).chatId;
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.chat.getChatById.queryOptions({ chatId })
  );

  return (
    <section className="h-dvh flex flex-col">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<ChatSkeleton />}>
          <ChatInterface chatId={chatId} />
        </Suspense>
      </HydrationBoundary>
    </section>
  );
};

export default Page;
